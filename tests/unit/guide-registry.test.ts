import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { enhanceEn } from "@/content/en/enhance";
import { gbaEn } from "@/content/en/game-based-assessment";
import { gbaVsPsychometricEn } from "@/content/en/guides/game-based-assessment-vs-psychometric-tests";
import { whatIsGbaEn } from "@/content/en/guides/what-is-game-based-assessment";
import { siteFlags } from "@/content/flags";
import * as site from "@/content/guides";
import { createGuideRegistry, guidesEn, modulesForFlags } from "@/content/guides";
import { unknownGuideRewrite } from "@/content/guides/paths";
import { modulesForFlags as useCaseModulesForFlags } from "@/content/use-cases";
import type { GuideContent } from "@/content/types";
import { formatIDR } from "@/lib/format";
import { llmsTxt } from "@/lib/llms";
import { ogName, ogTitles } from "@/lib/og";
import { sitemapEntries, sitemapPaths } from "@/lib/sitemap";

// Tasks G3.2 to G3.4: the guide registry, the six guides' copy and each page's related guide (SEO/geo-implementation-plan.md §S9). Which guide
// reaches the index, the sitemap, llms.txt, the Open Graph images and "Related guides" is one question, answered
// by the registry, so it is tested here with drafts and both switches; tests/unit/guide-switches.test.ts follows
// it through the files that list guides.

const first = whatIsGbaEn;
const second = gbaVsPsychometricEn;
const draft: GuideContent = { ...first, slug: "draft-guide", published: false, related: [first.slug] };
const origin = new URL("https://deushcs.com");
const pages = [{ path: "/", locales: ["en"] }] as const;
const on = createGuideRegistry(modulesForFlags({ showGuides: true }, [first, second, draft]));
const off = createGuideRegistry(modulesForFlags({ showGuides: false }, [first, second, draft]));

describe("guide registry, as the site has it", () => {
  it("serves guides 1 to 6 in English, in the order of §S9, while showGuides is on", () => {
    expect(guidesEn.map((guide) => guide.slug)).toEqual([
      "what-is-game-based-assessment",
      "game-based-assessment-vs-psychometric-tests",
      "management-trainee-recruitment",
      "campus-recruitment-screening",
      "link-performance-appraisal-to-pay",
      "kpis-and-competencies-for-appraisal",
    ]);
    expect(site.listGuideSlugs()).toEqual(siteFlags.showGuides ? guidesEn.filter((g) => g.published).map((g) => g.slug) : []);
    // the Indonesian guides (G4.4) are in tests/unit/indonesian-guides.test.ts
    expect(site.listGuides("id").map((guide) => guide.slug)).toEqual(
      siteFlags.showGuides && siteFlags.showIndonesianLeadPages ? ["what-is-game-based-assessment", "game-based-assessment-vs-psychometric-tests"] : [],
    );
  });

  it("is on in the build the plan describes (switches stay on on staging, off before a release for what the owner hasn't approved)", () => {
    expect(siteFlags.showGuides).toBe(true);
    expect(guidesEn.every((guide) => guide.published)).toBe(true);
  });
});

describe("published", () => {
  it("leaves an unpublished guide out of the list, the slugs and every lookup", () => {
    expect(on.inLocale("en")).toEqual([first, second]);
    expect(on.listGuideSlugs()).toEqual([first.slug, second.slug]);
    expect(on.getGuide(draft.slug, "en")).toBeNull();
    expect(on.localesOfGuide(draft.slug)).toEqual([]);
  });

  it("makes an unpublished guide's URL a 404, never a redirect", () => {
    expect(on.resolveGuide(draft.slug, "en")).toEqual({ kind: "notFound" });
    expect(on.resolveGuide(draft.slug, "id")).toEqual({ kind: "notFound" });
  });

  it("leaves it out of every other guide's related list, even one that names it", () => {
    const names = createGuideRegistry({ en: [{ ...first, related: [draft.slug, second.slug] }, second, draft] });
    expect(names.relatedGuides(names.inLocale("en")[0], "en")).toEqual([second]);
  });

  it("leaves it out of the sitemap", () => {
    const listed = (registry: typeof on) => sitemapPaths({ pages, storySlugs: [], guideSlugs: registry.inLocale("en").map((g) => g.slug) });
    expect(listed(on)).toEqual(["/en", "/en/guides", `/en/guides/${first.slug}`, `/en/guides/${second.slug}`]);
    expect(listed(on)).not.toContain(`/en/guides/${draft.slug}`);
  });

  it("registers no guide, and so no index, when every one is unpublished", () => {
    const none = createGuideRegistry({ en: [{ ...first, published: false }, draft] });
    expect(none.inLocale("en")).toEqual([]);
    expect(none.localesWithGuides()).toEqual([]);
    expect(none.resolveGuideIndex("en")).toEqual({ kind: "notFound" });
    expect(sitemapPaths({ pages, storySlugs: [], guideSlugs: none.listGuideSlugs() })).toEqual(["/en"]);
  });
});

describe("the switch", () => {
  it("registers every published guide while it is on, in English only", () => {
    expect(on.listGuideSlugs()).toEqual([first.slug, second.slug]);
    expect(on.inLocale("id")).toEqual([]);
  });

  it("registers nothing while it is off, so every slug and the index are 404s, never redirects", () => {
    expect(off.listGuideSlugs()).toEqual([]);
    expect(off.resolveGuide(first.slug, "en")).toEqual({ kind: "notFound" });
    expect(off.resolveGuide(first.slug, "id")).toEqual({ kind: "notFound" });
    expect(off.resolveGuideIndex("en")).toEqual({ kind: "notFound" });
    expect(off.relatedGuides(first, "en")).toEqual([]);
  });

  it("lists no guide in the sitemap while it is off", () => {
    expect(sitemapPaths({ pages, storySlugs: [], guideSlugs: off.listGuideSlugs() })).toEqual(["/en"]);
  });
});

describe("resolving a guide", () => {
  it("serves each guide in English, and sends Indonesian to the English guide", () => {
    for (const { slug } of [first, second]) {
      expect(on.resolveGuide(slug, "en")).toEqual({ kind: "ok", locale: "en" });
      expect(on.resolveGuide(slug, "id")).toEqual({ kind: "redirect", locale: "en", slug });
    }
  });

  it("serves the index in English, and sends Indonesian to it in English", () => {
    expect(on.resolveGuideIndex("en")).toEqual({ kind: "ok" });
    expect(on.resolveGuideIndex("id")).toEqual({ kind: "redirect", locale: "en" });
    expect(on.localesWithGuides()).toEqual(["en"]);
  });

  it("404s a slug it doesn't know, and a use-case or product slug", () => {
    expect(on.resolveGuide("nope", "en")).toEqual({ kind: "notFound" });
    expect(on.resolveGuide("enhance", "en")).toEqual({ kind: "notFound" });
    expect(on.resolveGuide("management-trainee-assessment", "en")).toEqual({ kind: "notFound" });
  });

  it("lists the related guides that exist, in the guide's own order, never the guide itself", () => {
    expect(on.relatedGuides(first, "en")).toEqual([second]);
    expect(on.relatedGuides(second, "en")).toEqual([first]);
    const self = createGuideRegistry({ en: [{ ...first, related: [first.slug, second.slug] }, second] });
    expect(self.relatedGuides(self.inLocale("en")[0], "en")).toEqual([second]);
  });
});

describe("sitemap", () => {
  it("builds the URLs from the origin: the index, then each guide", () => {
    expect(sitemapEntries({ pages, storySlugs: [], guideSlugs: [first.slug] }, origin)).toEqual([
      { url: "https://deushcs.com/en" },
      { url: "https://deushcs.com/en/guides" },
      { url: `https://deushcs.com/en/guides/${first.slug}` },
    ]);
  });
});

describe("what lists guides, for the site's own flag", () => {
  it("is what src/app/sitemap.ts lists, and llms.txt and the Open Graph images follow", () => {
    for (const { slug } of [first, second]) {
      const url = `/en/guides/${slug}`;
      expect(sitemap().some((entry) => entry.url.endsWith(url)), slug).toBe(siteFlags.showGuides);
      expect(llmsTxt().includes(`${url}):`), slug).toBe(siteFlags.showGuides);
      expect(ogName(`/guides/${slug}`) in ogTitles(), slug).toBe(siteFlags.showGuides);
    }
    expect(sitemap().some((entry) => entry.url.endsWith("/en/guides"))).toBe(siteFlags.showGuides);
    expect(ogName("/guides") in ogTitles()).toBe(siteFlags.showGuides);
  });
});

describe("the proxy's 404 rule", () => {
  it("lets a registered guide and the index through, in every language", () => {
    for (const locale of ["en", "id"]) {
      expect(unknownGuideRewrite(`/${locale}/guides`)).toBeNull();
      expect(unknownGuideRewrite(`/${locale}/guides/${first.slug}`)).toBeNull();
    }
  });

  it("sends an unknown slug to a path no route matches, so the catch-all 404s it", () => {
    expect(unknownGuideRewrite("/en/guides/nope")).toBe("/en/guides/nope/not-found");
    expect(unknownGuideRewrite("/id/guides/%E0%A4%A")).toBe("/id/guides/%E0%A4%A/not-found");
  });

  it("ignores every other URL", () => {
    expect(unknownGuideRewrite("/en/about")).toBeNull();
    expect(unknownGuideRewrite("/en/solutions/enhance")).toBeNull();
    expect(unknownGuideRewrite("/en/guides/a/b")).toBeNull();
  });
});

const guides = guidesEn;
const words =(text: string) => text.split(/\s+/).filter(Boolean).length;
/** What a reader reads on the page: the answer, key points, sections, FAQ and call to action. */
function articleText(guide: GuideContent): string {
  const blocks = guide.sections.flatMap((section) => [
    section.title,
    ...section.blocks.flatMap((block) =>
      block.type === "paragraph" ? [block.text] : block.type === "list" ? block.items : [...block.columns, ...block.rows.flat()],
    ),
  ]);
  return [
    guide.header.title,
    guide.header.answer,
    ...guide.header.keyPoints,
    guide.nextStep.text,
    ...blocks,
    guide.faq.title,
    ...guide.faq.items.flatMap((item) => [item.question, item.answer]),
    guide.cta.text,
  ].join(" ");
}

describe("the guides' copy", () => {
  it("has every part §S9 lists: an answer of 2 to 3 sentences, 3 to 5 key points, a question-shaped H2 each, a table, 3 to 5 FAQ items and sources", () => {
    for (const guide of guides) {
      const sentences = guide.header.answer.split(/[.!?](?:\s|$)/).filter(Boolean);
      expect(sentences.length, guide.slug).toBeGreaterThanOrEqual(2);
      expect(sentences.length, guide.slug).toBeLessThanOrEqual(3);
      expect(guide.header.keyPoints.length, guide.slug).toBeGreaterThanOrEqual(3);
      expect(guide.header.keyPoints.length, guide.slug).toBeLessThanOrEqual(5);
      for (const section of guide.sections) expect(section.title, `${guide.slug}: ${section.id}`).toMatch(/\?$/);
      expect(guide.sections.some((s) => s.blocks.some((b) => b.type === "table")), guide.slug).toBe(true);
      expect(guide.faq.items.length, guide.slug).toBeGreaterThanOrEqual(3);
      expect(guide.faq.items.length, guide.slug).toBeLessThanOrEqual(5);
      expect(guide.sources.length, guide.slug).toBeGreaterThan(0);
      expect(guide.author, guide.slug).toBe("DEUS Human Capital Services");
    }
  });

  it("runs 1,200 to 2,000 words", () => {
    for (const guide of guides) {
      const count = words(articleText(guide));
      expect(count, guide.slug).toBeGreaterThanOrEqual(1200);
      expect(count, guide.slug).toBeLessThanOrEqual(2000);
    }
  });

  it("gives each section and table a unique anchor and a rectangular table", () => {
    for (const guide of guides) {
      const ids = guide.sections.map((section) => section.id);
      expect(new Set(ids).size, guide.slug).toBe(ids.length);
      for (const section of guide.sections) {
        for (const block of section.blocks) {
          if (block.type !== "table") continue;
          for (const row of block.rows) expect(row.length, `${guide.slug}: ${section.id}`).toBe(block.columns.length);
        }
      }
    }
  });

  it("links every source to an https page, once", () => {
    for (const guide of guides) {
      const hrefs = guide.sources.map((source) => source.href);
      for (const href of hrefs) expect(href, guide.slug).toMatch(/^https:\/\//);
      expect(new Set(hrefs).size, guide.slug).toBe(hrefs.length);
    }
  });

  it("dates itself, with the update no earlier than the first publication", () => {
    for (const guide of guides) {
      expect(guide.dates.published, guide.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.dates.updated >= guide.dates.published, guide.slug).toBe(true);
    }
  });

  it("anonymises the client while telkomNamed is off, and never names it in the copy", () => {
    for (const guide of guides) {
      if (!siteFlags.telkomNamed) expect(JSON.stringify(guide), guide.slug).not.toMatch(/Telkom/);
    }
  });

  it("holds no minimum order and no bad-hire multiple while their switches are off, and any price a guide names is the GBA page's own", () => {
    const price = formatIDR(gbaEn.pricing.from.amount, "en");
    for (const guide of guides) {
      const text = JSON.stringify(guide);
      if (!siteFlags.showMinimumOrder) expect(text, guide.slug).not.toMatch(/minimum/i);
      if (!siteFlags.showBadHireCost) expect(text, guide.slug).not.toMatch(/5 to 10 times/);
      // a guide needn't name a price (guides 3 to 6 don't); one it names must be the GBA page's "starting from" amount
      for (const [shown] of text.matchAll(/IDR \d[\d,]*/g)) expect(shown, guide.slug).toBe(price);
    }
  });

  it("uses none of the words content/VOICE.md bans, and no markup but **bold**", () => {
    const banned = /\b(unlock|unleash|empower|elevate|supercharge|seamless(ly)?|leverage|robust|cutting-edge|state-of-the-art|revolutionize|game-changer|next-generation|holistic|synergy)\b/i;
    for (const guide of guides) {
      const text = articleText(guide);
      expect(text, guide.slug).not.toMatch(banned);
      expect(text.replace(/\*\*/g, ""), guide.slug).not.toMatch(/[*_]{1}\w|\\|<\/?\w/);
    }
  });

  it("links to a use-case page that exists, or to the product page, and to a product page section the GBA page has", () => {
    const useCases = useCaseModulesForFlags({ showUseCases: true }).en!.map((useCase) => useCase.slug);
    const ids = gbaEn.modules.nav.map((item) => item.id);
    for (const guide of guides) {
      if (guide.nextStep.useCase) {
        expect(useCases, guide.slug).toContain(guide.nextStep.useCase);
        expect(guide.nextStep.link.href, guide.slug).toBe(`/solutions/${guide.nextStep.useCase}`);
      }
      // the call to action goes to the product page, or to one of the use-case pages (§S8); the product page is the one the JSON-LD names
      const [target, anchor] = guide.cta.link.href.split("#");
      const useCase = target.startsWith("/solutions/") ? target.slice("/solutions/".length) : "";
      expect(target === guide.product.path || useCases.includes(useCase), guide.slug).toBe(true);
      if (anchor && guide.product.path === "/solutions/game-based-assessment") expect(ids, guide.slug).toContain(anchor);
    }
  });

  it("offers the download on guides 1 to 4, each with a fallback line to its use-case page; guides 5 and 6 get one line to Enhance's call to action instead", () => {
    const enhanceLine = new Set(["link-performance-appraisal-to-pay", "kpis-and-competencies-for-appraisal"]);
    for (const guide of guides) {
      if (enhanceLine.has(guide.slug)) {
        expect(guide.nextStep.offer, guide.slug).toBeUndefined();
        expect(guide.nextStep.link.href, guide.slug).toBe("/solutions/enhance#book-a-call");
      } else {
        expect(guide.nextStep.offer, guide.slug).toBe(true);
        expect(guide.nextStep.useCase, guide.slug).toBeDefined();
        expect(guide.nextStep.link.href, guide.slug).toBe(`/solutions/${guide.nextStep.useCase}`);
      }
    }
  });
});

describe("the related guide on each product and use-case page", () => {
  it("names one published English guide per page (§S9's link list), and each page's guide is in the list", () => {
    const pages = [
      ["game-based-assessment", gbaEn.relatedGuide],
      ["enhance", enhanceEn.relatedGuide],
      ...useCaseModulesForFlags({ showUseCases: true }).en!.map((useCase) => [useCase.slug, useCase.relatedGuide] as const),
    ] as const;
    for (const [page, slug] of pages) {
      expect(slug, page).toBeDefined();
      expect(guidesEn.some((guide) => guide.slug === slug && guide.published), page).toBe(true);
    }
  });
});
