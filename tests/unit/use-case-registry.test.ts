import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { gbaEn } from "@/content/en/game-based-assessment";
import { managementTraineeEn } from "@/content/en/use-cases/management-trainee-assessment";
import { siteFlags } from "@/content/flags";
import { pagePaths } from "@/content/registry";
import * as site from "@/content/use-cases";
import { createUseCaseRegistry, modulesForFlags } from "@/content/use-cases";
import { unknownUseCaseRewrite } from "@/content/use-cases/paths";
import { llmsTxt } from "@/lib/llms";
import { ogName, ogTitles } from "@/lib/og";
import { formatIDR } from "@/lib/format";
import { sitemapEntries, sitemapPaths } from "@/lib/sitemap";

// Task G2.2: the use-case registry. The site's own registry follows `showUseCases`; the variants the
// switch would flip to are built here with `modulesForFlags`, so both stay tested whichever way it is set.

const slug = managementTraineeEn.slug;
const on = createUseCaseRegistry(modulesForFlags({ showUseCases: true }));
const off = createUseCaseRegistry(modulesForFlags({ showUseCases: false }));
const pages = [{ path: "/", locales: ["en"] }] as const;
const origin = new URL("https://deushcs.com");

describe("use-case registry, as the site has it", () => {
  it("serves the Management Trainee page in English while showUseCases is on", () => {
    expect(site.getUseCase(slug, "en")).toBe(siteFlags.showUseCases ? managementTraineeEn : null);
    expect(site.localesOfUseCase(slug)).toEqual(siteFlags.showUseCases ? ["en"] : []);
    expect(site.listUseCaseSlugs()).toEqual(siteFlags.showUseCases ? [slug] : []);
  });

  it("is on in the build the plan describes (switches stay on on staging, off before a release for what the owner hasn't approved)", () => {
    expect(siteFlags.showUseCases).toBe(true);
  });
});

describe("the switch", () => {
  it("registers the page while it is on, in English only", () => {
    expect(on.listUseCaseSlugs()).toEqual([slug]);
    expect(on.inLocale("en")).toEqual([managementTraineeEn]);
    expect(on.inLocale("id")).toEqual([]);
  });

  it("registers nothing while it is off, so every slug is a 404, never a redirect", () => {
    expect(off.listUseCaseSlugs()).toEqual([]);
    expect(off.resolveUseCase(slug, "en")).toEqual({ kind: "notFound" });
    expect(off.resolveUseCase(slug, "id")).toEqual({ kind: "notFound" });
  });
});

describe("resolving a page", () => {
  it("serves it in English, and sends Indonesian to the English page", () => {
    expect(on.resolveUseCase(slug, "en")).toEqual({ kind: "ok", locale: "en" });
    expect(on.resolveUseCase(slug, "id")).toEqual({ kind: "redirect", locale: "en", slug });
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
    expect(listed(on)).toEqual(["/en", `/en/solutions/${slug}`]);
    expect(listed(off)).toEqual(["/en"]);
  });

  it("builds the URL from the origin", () => {
    expect(sitemapEntries({ pages, storySlugs: [], useCaseSlugs: [slug] }, origin)).toEqual([
      { url: "https://deushcs.com/en" },
      { url: `https://deushcs.com/en/solutions/${slug}` },
    ]);
  });

  it("is what src/app/sitemap.ts lists, llms.txt and the Open Graph images follow, for the site's own flag", () => {
    const url = `/en/solutions/${slug}`;
    const inSitemap = sitemap().some((entry) => entry.url.endsWith(url));
    expect(inSitemap).toBe(siteFlags.showUseCases);
    expect(llmsTxt().includes(`${url}):`)).toBe(siteFlags.showUseCases);
    expect(ogName(`/solutions/${slug}`) in ogTitles()).toBe(siteFlags.showUseCases);
  });
});

describe("the page's copy", () => {
  it("carries the search phrase as its H1, and an answer passage that stands alone", () => {
    expect(managementTraineeEn.hero.title).toBe("Management Trainee assessment");
    expect(managementTraineeEn.hero.passage.split(/\s+/).length).toBeLessThanOrEqual(90);
    expect(managementTraineeEn.hero.passage).toContain("DEUS");
  });

  it("anonymises the client while telkomNamed is off, and never names it in the copy", () => {
    const text = JSON.stringify(managementTraineeEn);
    if (!siteFlags.telkomNamed) expect(text).not.toMatch(/Telkom/);
  });

  it("has 3 to 5 FAQ items, and the price is the GBA page's own", () => {
    expect(managementTraineeEn.faq.items.length).toBeGreaterThanOrEqual(3);
    expect(managementTraineeEn.faq.items.length).toBeLessThanOrEqual(5);
    const price = managementTraineeEn.faq.items.map((item) => item.answer).join(" ");
    expect(price).toContain(formatIDR(gbaEn.pricing.from.amount, "en"));
  });

  it("holds no minimum order and no bad-hire multiple while their switches are off", () => {
    const text = JSON.stringify(managementTraineeEn);
    if (!siteFlags.showMinimumOrder) expect(text).not.toMatch(/minimum/i);
    if (!siteFlags.showBadHireCost) expect(text).not.toMatch(/5 to 10 times/);
  });

  it("links every module card to a section the GBA page has", () => {
    const ids = gbaEn.modules.nav.map((item) => item.id);
    for (const { link } of managementTraineeEn.how.items) {
      expect(link?.href.startsWith(`${managementTraineeEn.product.path}#`)).toBe(true);
      expect(ids).toContain(link!.href.split("#")[1]);
    }
  });
});

describe("unknownUseCaseRewrite", () => {
  it("leaves a page that exists alone, with or without a trailing slash", () => {
    if (siteFlags.showUseCases) {
      expect(unknownUseCaseRewrite(`/en/solutions/${slug}`)).toBeNull();
      expect(unknownUseCaseRewrite(`/en/solutions/${slug}/`)).toBeNull();
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
