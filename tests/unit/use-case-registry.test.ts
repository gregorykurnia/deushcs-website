import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { telkomStoryEn } from "@/content/en/stories/telkom-group";
import { gbaEn } from "@/content/en/game-based-assessment";
import { campusRecruitmentEn } from "@/content/en/use-cases/campus-recruitment-assessment";
import { managementTraineeEn } from "@/content/en/use-cases/management-trainee-assessment";
import { performanceAppraisalEn } from "@/content/en/use-cases/performance-appraisal-and-pay";
import { talentMappingEn } from "@/content/en/use-cases/talent-mapping";
import { siteFlags } from "@/content/flags";
import { pagePaths } from "@/content/registry";
import * as site from "@/content/use-cases";
import { createUseCaseRegistry, modulesForFlags } from "@/content/use-cases";
import { unknownUseCaseRewrite } from "@/content/use-cases/paths";
import { llmsTxt } from "@/lib/llms";
import { ogName, ogTitles } from "@/lib/og";
import { formatIDR } from "@/lib/format";
import { sitemapEntries, sitemapPaths } from "@/lib/sitemap";

// Tasks G2.2 and G2.3: the use-case registry, with the four pages of §S8 in the order the table lists them.
// The site's own registry follows `showUseCases`; the variants the switch would flip to are built here with
// `modulesForFlags`, so both stay tested whichever way it is set.

const allUseCases = [managementTraineeEn, campusRecruitmentEn, talentMappingEn, performanceAppraisalEn];
const allSlugs = allUseCases.map((useCase) => useCase.slug);
const slug = managementTraineeEn.slug;
const gbaPath = "/solutions/game-based-assessment";
const on = createUseCaseRegistry(modulesForFlags({ showUseCases: true }));
const off = createUseCaseRegistry(modulesForFlags({ showUseCases: false }));
const pages = [{ path: "/", locales: ["en"] }] as const;
const origin = new URL("https://deushcs.com");

describe("use-case registry, as the site has it", () => {
  it("serves the four use-case pages in English while showUseCases is on", () => {
    expect(site.listUseCaseSlugs()).toEqual(siteFlags.showUseCases ? allSlugs : []);
    for (const useCase of allUseCases) {
      expect(site.getUseCase(useCase.slug, "en")).toBe(siteFlags.showUseCases ? useCase : null);
      expect(site.localesOfUseCase(useCase.slug)).toEqual(siteFlags.showUseCases ? ["en"] : []);
    }
  });

  it("is on in the build the plan describes (switches stay on on staging, off before a release for what the owner hasn't approved)", () => {
    expect(siteFlags.showUseCases).toBe(true);
  });
});

describe("the switch", () => {
  it("registers the pages while it is on, in English only, in the order of §S8", () => {
    expect(on.listUseCaseSlugs()).toEqual(allSlugs);
    expect(on.inLocale("en")).toEqual(allUseCases);
    expect(on.inLocale("id")).toEqual([]);
  });

  it("registers nothing while it is off, so every slug is a 404, never a redirect", () => {
    expect(off.listUseCaseSlugs()).toEqual([]);
    expect(off.resolveUseCase(slug, "en")).toEqual({ kind: "notFound" });
    expect(off.resolveUseCase(slug, "id")).toEqual({ kind: "notFound" });
  });
});

describe("resolving a page", () => {
  it("serves each page in English, and sends Indonesian to the English page", () => {
    for (const s of allSlugs) {
      expect(on.resolveUseCase(s, "en")).toEqual({ kind: "ok", locale: "en" });
      expect(on.resolveUseCase(s, "id")).toEqual({ kind: "redirect", locale: "en", slug: s });
    }
  });

  it("404s a slug it doesn't know, and a product page's slug", () => {
    expect(on.resolveUseCase("nope", "en")).toEqual({ kind: "notFound" });
    expect(on.resolveUseCase("enhance", "en")).toEqual({ kind: "notFound" });
  });
});

describe("sitemap", () => {
  it("lists a use case only while showUseCases is on", () => {
    const listed = (registry: typeof on) =>
      sitemapPaths({ pages, storySlugs: [], useCaseSlugs: registry.inLocale("en").map((u) => u.slug) });
    expect(listed(on)).toEqual(["/en", ...allSlugs.map((s) => `/en/solutions/${s}`)]);
    expect(listed(off)).toEqual(["/en"]);
  });

  it("builds the URL from the origin", () => {
    expect(sitemapEntries({ pages, storySlugs: [], useCaseSlugs: [slug] }, origin)).toEqual([
      { url: "https://deushcs.com/en" },
      { url: `https://deushcs.com/en/solutions/${slug}` },
    ]);
  });

  it("is what src/app/sitemap.ts lists, llms.txt and the Open Graph images follow, for the site's own flag", () => {
    for (const s of allSlugs) {
      const url = `/en/solutions/${s}`;
      const inSitemap = sitemap().some((entry) => entry.url.endsWith(url));
      expect(inSitemap, s).toBe(siteFlags.showUseCases);
      expect(llmsTxt().includes(`${url}):`), s).toBe(siteFlags.showUseCases);
      expect(ogName(`/solutions/${s}`) in ogTitles(), s).toBe(siteFlags.showUseCases);
    }
  });
});

describe("the pages' copy", () => {
  it("carries the search phrase as its H1, and an answer passage that stands alone", () => {
    expect(managementTraineeEn.hero.title).toBe("Management Trainee assessment");
    for (const useCase of allUseCases) {
      expect(useCase.hero.passage.split(/\s+/).length, useCase.slug).toBeLessThanOrEqual(90);
      expect(useCase.hero.passage, useCase.slug).toContain("DEUS");
    }
  });

  it("anonymises the client while telkomNamed is off, and never names it in the copy", () => {
    for (const useCase of allUseCases) {
      if (!siteFlags.telkomNamed) expect(JSON.stringify(useCase), useCase.slug).not.toMatch(/Telkom/);
    }
  });

  it("has 3 to 5 FAQ items on every page, and the Management Trainee price is the GBA page's own", () => {
    for (const useCase of allUseCases) {
      expect(useCase.faq.items.length, useCase.slug).toBeGreaterThanOrEqual(3);
      expect(useCase.faq.items.length, useCase.slug).toBeLessThanOrEqual(5);
    }
    const price = managementTraineeEn.faq.items.map((item) => item.answer).join(" ");
    expect(price).toContain(formatIDR(gbaEn.pricing.from.amount, "en"));
  });

  it("holds no minimum order and no bad-hire multiple while their switches are off", () => {
    for (const useCase of allUseCases) {
      const text = JSON.stringify(useCase);
      if (!siteFlags.showMinimumOrder) expect(text, useCase.slug).not.toMatch(/minimum/i);
      if (!siteFlags.showBadHireCost) expect(text, useCase.slug).not.toMatch(/5 to 10 times/);
    }
  });

  it("links every module card to a section the GBA page has", () => {
    const ids = gbaEn.modules.nav.map((item) => item.id);
    for (const useCase of allUseCases) {
      for (const { link } of useCase.how.items) {
        if (!link) continue;
        expect(link.href.startsWith(`${useCase.product.path}#`), useCase.slug).toBe(true);
        if (useCase.product.path === gbaPath) expect(ids, useCase.slug).toContain(link.href.split("#")[1]);
      }
    }
  });
});

describe("unknownUseCaseRewrite", () => {
  it("leaves every page that exists alone, with or without a trailing slash", () => {
    if (siteFlags.showUseCases) {
      for (const s of allSlugs) {
        expect(unknownUseCaseRewrite(`/en/solutions/${s}`)).toBeNull();
        expect(unknownUseCaseRewrite(`/en/solutions/${s}/`)).toBeNull();
      }
    }
  });

  it("leaves the product pages, the Solutions page and other routes alone", () => {
    for (const path of Object.values(pagePaths)) expect(unknownUseCaseRewrite(`/en${path === "/" ? "" : path}`), path).toBeNull();
    expect(unknownUseCaseRewrite("/solutions/whatever")).toBeNull(); // no locale yet: the locale redirect comes first
    expect(unknownUseCaseRewrite("/en/clients/whatever")).toBeNull();
  });

  it("sends an unknown slug to a path no route matches, so the catch-all answers 404", () => {
    expect(unknownUseCaseRewrite("/en/solutions/no-such-page")).toBe("/en/solutions/no-such-page/not-found");
    expect(unknownUseCaseRewrite("/id/solutions/no-such-page")).toBe("/id/solutions/no-such-page/not-found");
    expect(unknownUseCaseRewrite("/en/solutions/%E0%A4%A")).toBe("/en/solutions/%E0%A4%A/not-found");
  });
});

describe("links into the use-case pages (G2.4)", () => {
  it("every use-case card on the GBA page and the Telkom story names a page that exists", () => {
    const slugs = createUseCaseRegistry(modulesForFlags({ showUseCases: true })).listUseCaseSlugs();
    const named = gbaEn.useCases.items.flatMap((item) => (item.useCase ? [item.useCase] : []));
    expect(named.length).toBeGreaterThan(0);
    for (const slug of [...named, telkomStoryEn.useCase!]) expect(slugs).toContain(slug);
  });

  it("the footer's list follows the switch: the four pages, in the table's order, or none", () => {
    const on = createUseCaseRegistry(modulesForFlags({ showUseCases: true })).inLocale("en");
    expect(on.map((useCase) => useCase.slug)).toEqual([
      "management-trainee-assessment",
      "campus-recruitment-assessment",
      "talent-mapping",
      "performance-appraisal-and-pay",
    ]);
    expect(createUseCaseRegistry(modulesForFlags({ showUseCases: false })).inLocale("en")).toEqual([]);
  });
});
