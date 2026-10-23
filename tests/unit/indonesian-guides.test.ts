import { describe, expect, it } from "vitest";
import { gbaVsPsychometricEn } from "@/content/en/guides/game-based-assessment-vs-psychometric-tests";
import { whatIsGbaEn } from "@/content/en/guides/what-is-game-based-assessment";
import { siteFlags } from "@/content/flags";
import * as site from "@/content/guides";
import { createGuideRegistry, guidesId, modulesForFlags } from "@/content/guides";
import { gbaVsPsychometricId } from "@/content/id/guides/game-based-assessment-vs-psychometric-tests";
import { whatIsGbaId } from "@/content/id/guides/what-is-game-based-assessment";
import type { GuideContent } from "@/content/types";
import { llmsTxt } from "@/lib/llms";

// Task G4.4: guides 1 and 2 in Indonesian (SEO/geo-implementation-plan.md §S9 and §S12). Written for Indonesian
// search, not word for word, so what's checked is what must not drift: the same structure, links and figures, the
// search phrases in the H1 and the answer, and the switch. Guide 2 adds one Indonesian source (items shared online).

const pairs: { en: GuideContent; id: GuideContent; phrases: string[] }[] = [
  { en: whatIsGbaEn, id: whatIsGbaId, phrases: ["asesmen berbasis game"] },
  { en: gbaVsPsychometricEn, id: gbaVsPsychometricId, phrases: ["asesmen berbasis game", "psikotes online"] },
];

const strings = (value: unknown): string[] =>
  typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];

/** Every number a guide prints, "1.000" and "1,000" alike, ".31" and "0,31" alike, "Rp69.000" and "IDR 69,000" alike. */
const numbers = (guide: GuideContent) =>
  [
    ...new Set(
      strings({ ...guide, sources: [] })
        .join(" ")
        .match(/\d*[.,]?\d[\d.,]*\d\+?|\d\+?/g)
        ?.map((n) => n.replace(/[.,](?=\d{3}\b)/g, ""))
        .map((n) => (n.startsWith(".") ? `0${n}` : n).replace(",", ".")),
    ),
  ].sort();

const blockShape = (guide: GuideContent) =>
  guide.sections.map((section) => section.blocks.map((block) => [block.type, block.type === "table" ? block.rows.length : block.type === "list" ? block.items.length : 0]));

describe("guides 1 and 2 in Indonesian", () => {
  it("are the English guides' slugs, in the same order, and the registry lists exactly these two", () => {
    expect(guidesId.map((guide) => guide.slug)).toEqual(pairs.map(({ en }) => en.slug));
    expect(guidesId).toEqual(pairs.map(({ id }) => id));
  });

  for (const { en, id, phrases } of pairs) {
    describe(id.slug, () => {
      it("has the same sections, blocks, FAQ and links as the English guide", () => {
        expect(id.sections.map((s) => s.id)).toEqual(en.sections.map((s) => s.id));
        expect(blockShape(id)).toEqual(blockShape(en));
        expect(id.header.keyPoints).toHaveLength(en.header.keyPoints.length);
        expect(id.faq.items).toHaveLength(en.faq.items.length);
        expect(id.related).toEqual(en.related);
        expect(id.product).toEqual(en.product);
        expect([id.cta.link.href, id.nextStep.link.href, id.contactHref, id.whatsapp, id.nextStep.useCase]).toEqual([
          en.cta.link.href,
          en.nextStep.link.href,
          en.contactHref,
          en.whatsapp,
          en.nextStep.useCase,
        ]);
        expect(id.nextStep.offer).toBe(en.nextStep.offer);
        expect(id.dates).toEqual(en.dates);
        expect(id.author).toBe(en.author);
        expect(id.published).toBe(true);
      });

      it("adds and drops no number: the same figures as the English guide", () => {
        expect(numbers(id)).toEqual(numbers(en));
      });

      it("keeps every English source, in order, and adds only Indonesian ones", () => {
        const enHrefs = en.sources.map((s) => s.href);
        const idHrefs = id.sources.map((s) => s.href);
        expect(idHrefs.filter((href) => enHrefs.includes(href))).toEqual(enHrefs);
        for (const source of id.sources) {
          expect(source.href).toMatch(/^https:\/\//);
          if (!enHrefs.includes(source.href)) expect(source.href, source.label).toMatch(/^https:\/\/(id\.wikipedia\.org|jurnal\.)/);
        }
        // a source that stays in English says so
        for (const source of id.sources.filter((s) => enHrefs.includes(s.href))) {
          expect(source.label, source.href).toMatch(/dalam bahasa Inggris|\(2022\), Guidelines|Frontiers|Lejuez|Ramos-Villagrasa/);
        }
      });

      it("never names a client", () => {
        expect(JSON.stringify(id)).not.toMatch(/Telkom/i);
      });

      it("carries the search phrases in its H1 and its answer", () => {
        expect(id.header.title.toLowerCase()).toContain(phrases[0]);
        for (const phrase of phrases) expect(id.header.answer.toLowerCase(), phrase).toContain(phrase);
        expect(id.header.title.toLowerCase()).toContain(phrases[phrases.length - 1]);
        expect(id.header.answer.split(/\s+/).length).toBeLessThanOrEqual(110);
      });

      it("is in Indonesian: Anda, never kamu, glossary terms, every section a question", () => {
        const text = strings({ ...id, sources: [] }).join(" ");
        expect(text).toMatch(/\bAnda\b/);
        expect(text).not.toMatch(/\bkamu\b/i);
        expect(text.toLowerCase()).toContain("asesmen");
        expect(text.toLowerCase()).toContain("kompetensi");
        expect(text).toContain("Rp69.000");
        expect(text).not.toContain("IDR");
        expect(id.header.eyebrow).toMatch(/^Panduan/);
        for (const section of id.sections) expect(section.title, section.id).toMatch(/\?$/);
        expect(id.faq.title).not.toBe(en.faq.title);
        expect(id.nextStep.text).not.toBe(en.nextStep.text);
      });

      it("has its own title and description, not the English ones", () => {
        expect(id.meta.title).not.toBe(en.meta.title);
        expect(id.meta.description).not.toBe(en.meta.description);
        expect(id.meta.title.length).toBeLessThanOrEqual(80);
      });

      it("has between 1,200 and 2,600 words (Indonesian runs longer than the 2,000 §S9 allows English)", () => {
        const words = strings({ ...id, sources: [], meta: {}, closing: {} }).join(" ").split(/\s+/).length;
        expect(words).toBeGreaterThan(1200);
        expect(words).toBeLessThan(2600);
      });
    });
  }
});

describe("the showIndonesianLeadPages switch", () => {
  const on = createGuideRegistry(modulesForFlags({ showGuides: true, showIndonesianLeadPages: true }));
  const off = createGuideRegistry(modulesForFlags({ showGuides: true, showIndonesianLeadPages: false }));
  const noGuides = createGuideRegistry(modulesForFlags({ showGuides: false, showIndonesianLeadPages: true }));

  it("serves the two Indonesian guides and their index while it is on", () => {
    for (const { id } of pairs) {
      expect(on.resolveGuide(id.slug, "id")).toEqual({ kind: "ok", locale: "id" });
      expect(on.getGuide(id.slug, "id")).toBe(id);
      expect(on.localesOfGuide(id.slug)).toEqual(["en", "id"]);
    }
    expect(on.resolveGuideIndex("id")).toEqual({ kind: "ok" });
    expect(on.inLocale("id").map((guide) => guide.slug)).toEqual(pairs.map(({ en }) => en.slug));
  });

  it("lists only these two in the Indonesian index, and no other guide is served in Indonesian", () => {
    expect(on.inLocale("id")).toHaveLength(2);
    expect(on.resolveGuide("management-trainee-recruitment", "id")).toEqual({ kind: "redirect", locale: "en", slug: "management-trainee-recruitment" });
    expect(on.resolveGuide("campus-recruitment-screening", "id")).toEqual({ kind: "redirect", locale: "en", slug: "campus-recruitment-screening" });
  });

  it("lists as related only the guides that exist in Indonesian: guide 1 shows guide 2, and the rest wait", () => {
    expect(on.relatedGuides(whatIsGbaId, "id").map((guide) => guide.slug)).toEqual([gbaVsPsychometricId.slug]);
    expect(on.relatedGuides(gbaVsPsychometricId, "id").map((guide) => guide.slug)).toEqual([whatIsGbaId.slug]);
  });

  it("sends each /id/guides page to the English guide, and the index to English, while it is off", () => {
    for (const { id } of pairs) {
      expect(off.resolveGuide(id.slug, "id")).toEqual({ kind: "redirect", locale: "en", slug: id.slug });
      expect(off.localesOfGuide(id.slug)).toEqual(["en"]);
    }
    expect(off.resolveGuideIndex("id")).toEqual({ kind: "redirect", locale: "en" });
    expect(off.localesWithGuides()).toEqual(["en"]);
  });

  it("drops them with showGuides", () => {
    expect(noGuides.listGuideSlugs()).toEqual([]);
    expect(noGuides.resolveGuideIndex("id")).toEqual({ kind: "notFound" });
  });

  it("is the site's own registry for its flags", () => {
    for (const { id } of pairs) {
      expect(site.getGuide(id.slug, "id")).toBe(siteFlags.showGuides && siteFlags.showIndonesianLeadPages ? id : null);
    }
  });

  it("puts the index and both guides in llms.txt's Indonesian section, with their own titles, only while on", () => {
    const section = llmsTxt().split("## In Indonesian")[1] ?? "";
    const listed = siteFlags.showGuides && siteFlags.showIndonesianLeadPages;
    expect(section.includes("/id/guides"), "index").toBe(listed);
    for (const { id } of pairs) {
      expect(section.includes(`/id/guides/${id.slug}`), id.slug).toBe(listed);
      if (listed) expect(section).toContain(id.meta.description);
    }
    // nothing else in Indonesian
    expect(section.includes("/id/guides/management-trainee-recruitment")).toBe(false);
  });
});
