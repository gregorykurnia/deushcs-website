import { describe, expect, it } from "vitest";
import { siteFlags } from "@/content/flags";
import { campusRecruitmentEn } from "@/content/en/use-cases/campus-recruitment-assessment";
import { managementTraineeEn } from "@/content/en/use-cases/management-trainee-assessment";
import { performanceAppraisalEn } from "@/content/en/use-cases/performance-appraisal-and-pay";
import { talentMappingEn } from "@/content/en/use-cases/talent-mapping";
import { campusRecruitmentId } from "@/content/id/use-cases/campus-recruitment-assessment";
import { managementTraineeId } from "@/content/id/use-cases/management-trainee-assessment";
import { performanceAppraisalId } from "@/content/id/use-cases/performance-appraisal-and-pay";
import { talentMappingId } from "@/content/id/use-cases/talent-mapping";
import * as site from "@/content/use-cases";
import { createUseCaseRegistry, modulesForFlags, useCasesId } from "@/content/use-cases";
import type { UseCaseContent } from "@/content/types";
import { llmsTxt } from "@/lib/llms";

// Task G4.3: the four use-case pages in Indonesian (SEO/geo-implementation-plan.md §S12). Each is written for
// Indonesian search, not word for word, so what's checked is what must not drift: the same facts, the same
// links, the search phrases in the H1 and the answer passage, and the switch.

const pairs: { en: UseCaseContent; id: UseCaseContent; phrases: string[] }[] = [
  { en: managementTraineeEn, id: managementTraineeId, phrases: ["asesmen management trainee"] },
  { en: campusRecruitmentEn, id: campusRecruitmentId, phrases: ["rekrutmen kampus"] },
  { en: talentMappingEn, id: talentMappingId, phrases: ["talent mapping", "pemetaan talenta"] },
  { en: performanceAppraisalEn, id: performanceAppraisalId, phrases: ["remunerasi berbasis kinerja", "sistem appraisal karyawan"] },
];

const strings = (value: unknown): string[] =>
  typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];

/** Every number a page prints, "1.000" and "1,000" alike, "Rp69.000" and "IDR 69,000" alike. */
const numbers = (page: UseCaseContent) =>
  [...new Set(strings(page).join(" ").match(/\d[\d.,]*\d\+?|\d\+?/g)?.map((n) => n.replace(/[.,](?=\d{3}\b)/g, "")))].sort();

const links = (page: UseCaseContent) =>
  [
    page.hero.cta.href,
    ...page.how.items.flatMap((item) => (item.link ? [item.link.href] : [])),
    ...(page.how.note ? [page.how.note.link.href] : []),
    page.closing.cta?.href,
    page.product.path,
    page.whatsapp,
  ];

describe("the four Indonesian use-case pages", () => {
  it("are the English pages' slugs, in the same order", () => {
    expect(useCasesId.map((page) => page.slug)).toEqual(pairs.map(({ en }) => en.slug));
    expect(useCasesId).toEqual(pairs.map(({ id }) => id));
  });

  for (const { en, id, phrases } of pairs) {
    describe(id.slug, () => {
      it("has the same sections, counts and links as the English page", () => {
        expect(id.problem.items).toHaveLength(en.problem.items.length);
        expect(id.how.items).toHaveLength(en.how.items.length);
        expect(id.runs.steps).toHaveLength(en.runs.steps.length);
        expect(id.faq.items).toHaveLength(en.faq.items.length);
        expect(id.hero.screens.map((s) => s.image)).toEqual(en.hero.screens.map((s) => s.image));
        expect(id.offer).toBe(en.offer);
        expect(Boolean(id.how.note)).toBe(Boolean(en.how.note));
        expect(links(id)).toEqual(links(en));
      });

      it("adds and drops no number: the same figures as the English page", () => {
        expect(numbers(id)).toEqual(numbers(en));
      });

      it("never names a client, and never invents one", () => {
        expect(JSON.stringify(id)).not.toMatch(/Telkom/i);
      });

      it("carries the search phrase in its H1 and its answer passage", () => {
        const h1 = String(id.hero.title).toLowerCase();
        const passage = id.hero.passage.toLowerCase();
        expect(h1).toContain(phrases[0]);
        for (const phrase of phrases) expect(passage, phrase).toContain(phrase);
        expect(id.hero.passage.split(/\s+/).length).toBeLessThanOrEqual(100);
        expect(id.hero.passage).toContain("DEUS");
      });

      it("is in Indonesian: Anda, never kamu, and its own labels", () => {
        const text = strings(id).join(" ");
        expect(text).toMatch(/\bAnda\b/);
        expect(text).not.toMatch(/\bkamu\b/i);
        expect(id.proof.line).toBe("Dipercaya **40+ merek** di seluruh Indonesia.");
        expect(id.proof.moreLabel).toBe("Lihat 40+");
        expect(id.proof.storiesLabel).toBe("Baca cerita klien");
        for (const label of [id.hero.eyebrow, id.problem.eyebrow, id.how.eyebrow, id.runs.eyebrow, id.faq.eyebrow]) {
          expect(label).not.toBe("The problem");
        }
        expect(id.hero.cta.label).toMatch(/^(Minta uji coba gratis|Jadwalkan panggilan 30 menit)$/);
      });

      it("has its own title and description, not the English ones", () => {
        expect(id.meta.title).not.toBe(en.meta.title);
        expect(id.meta.description).not.toBe(en.meta.description);
        expect(id.meta.title.length).toBeLessThanOrEqual(80);
      });
    });
  }

  it("uses the glossary: asesmen, kalibrasi, remunerasi, kompetensi", () => {
    const text = (page: UseCaseContent) => strings(page).join(" ").toLowerCase();
    expect(text(managementTraineeId)).toContain("asesmen");
    expect(text(performanceAppraisalId)).toContain("kalibrasi");
    expect(text(performanceAppraisalId)).toContain("remunerasi");
    expect(text(talentMappingId)).toContain("kompetensi");
    expect(text(managementTraineeId)).toContain("rp69.000");
  });
});

describe("the showIndonesianLeadPages switch", () => {
  const on = createUseCaseRegistry(modulesForFlags({ showUseCases: true, showIndonesianLeadPages: true }));
  const off = createUseCaseRegistry(modulesForFlags({ showUseCases: true, showIndonesianLeadPages: false }));

  it("serves the four Indonesian pages while it is on", () => {
    for (const { id } of pairs) {
      expect(on.resolveUseCase(id.slug, "id")).toEqual({ kind: "ok", locale: "id" });
      expect(on.getUseCase(id.slug, "id")).toBe(id);
      expect(on.localesOfUseCase(id.slug)).toEqual(["en", "id"]);
    }
  });

  it("sends each /id/solutions/<slug> to the English page while it is off", () => {
    for (const { id } of pairs) {
      expect(off.resolveUseCase(id.slug, "id")).toEqual({ kind: "redirect", locale: "en", slug: id.slug });
      expect(off.localesOfUseCase(id.slug)).toEqual(["en"]);
    }
  });

  it("is the site's own registry for its flags, and drops them with showUseCases", () => {
    for (const { id } of pairs) {
      expect(site.getUseCase(id.slug, "id")).toBe(siteFlags.showUseCases && siteFlags.showIndonesianLeadPages ? id : null);
    }
    const noUseCases = createUseCaseRegistry(modulesForFlags({ showUseCases: false, showIndonesianLeadPages: true }));
    expect(noUseCases.listUseCaseSlugs()).toEqual([]);
  });

  it("puts each Indonesian page in llms.txt's Indonesian section, with its own title, only while on", () => {
    const text = llmsTxt();
    const section = text.split("## In Indonesian")[1] ?? "";
    for (const { id } of pairs) {
      const listed = section.includes(`/id/solutions/${id.slug}`);
      expect(listed, id.slug).toBe(siteFlags.showUseCases && siteFlags.showIndonesianLeadPages);
      if (listed) expect(section).toContain(id.meta.description);
    }
  });
});
