import { describe, expect, it } from "vitest";
import { enhanceEn } from "@/content/en/enhance";
import { siteFlags } from "@/content/flags";
import { createRegistry, localesFor, pagePaths } from "@/content/registry";

// Mirrors the site until Phase 6: Enhance in English only, About not written yet.
const registry = createRegistry({ enhance: { en: enhanceEn } });

describe("content registry", () => {
  it("returns a page's module, or null for a missing locale", () => {
    expect(registry.getPageContent("enhance", "en")).toBe(enhanceEn);
    expect(registry.getPageContent("enhance", "id")).toBeNull();
    expect(registry.getPageContent("about", "en")).toBeNull();
  });

  it("lists the locales a page exists in", () => {
    expect(registry.localesFor("enhance")).toEqual(["en"]);
  });

  it("returns no locales for a page key with no module", () => {
    expect(registry.localesFor("about")).toEqual([]);
  });

  it("serves a page in a locale it has", () => {
    expect(registry.resolvePage("enhance", "en")).toEqual({ kind: "ok", locale: "en" });
  });

  it("redirects a missing locale to the first one that has the page", () => {
    expect(registry.resolvePage("enhance", "id")).toEqual({
      kind: "redirect",
      locale: "en",
      path: "/solutions/enhance",
    });
  });

  it("is a 404 when the page exists in no locale", () => {
    expect(registry.resolvePage("about", "id")).toEqual({ kind: "notFound" });
  });

  it("lists only real locales for every page in the site registry", () => {
    for (const page of Object.keys(pagePaths) as (keyof typeof pagePaths)[]) {
      for (const locale of localesFor(page)) expect(["en", "id"]).toContain(locale);
    }
  });
});

describe("siteFlags", () => {
  it("keeps every [VERIFY] item hidden by default (WEBSITE-PLAN.md §14)", () => {
    expect(siteFlags).toEqual({
      showLogoWall: true, // owner cleared every client for the wall, 2026-10-23
      showStories: false, // owner hid the stories until new ones are added, 2026-10-23
      telkomNamed: false,
      publishCalvin: false,
      showAddress: false,
      showLeadership: false,
      showBetterTogether: false,
      showBadHireCost: false,
      showMinimumOrder: false,
      showMarketClaim: true,
      showSampleReport: false, // until the owner's sample PDF is in public/downloads/ (§S11)
      replyTime: null,
    });
  });
});
