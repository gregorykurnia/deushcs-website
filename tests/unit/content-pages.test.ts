import { describe, expect, it } from "vitest";
import { images, missingScreens } from "@/content/images";
import { getPageContent, localesFor, pagePaths, resolvePage } from "@/content/registry";
import type { PageKey } from "@/content/types";
import { telkomStoryEn } from "@/content/en/stories/telkom-group";
import { potentiaHref, whatsappHref } from "@/lib/links";

// Phase 2 pages, English first. Their copy comes from content/en/*.md. These tests check that
// each page is registered and that its links only go to planned pages, in-page anchors,
// Potentia or WhatsApp.

const pages: PageKey[] = ["home", "about", "solutions"];
// The Telkom story is a planned route (WEBSITE-PLAN §4) that `pagePaths` doesn't list, because story
// routes come from the story registry. Home's and GBA's link cards point at it (Task 4.4).
const plannedPaths = new Set<string>([...Object.values(pagePaths), `/clients/${telkomStoryEn.slug}`]);

/** Every `href` string in a content module, however deeply it is nested. */
function hrefsIn(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(hrefsIn);
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      key === "href" && typeof child === "string" ? [child] : hrefsIn(child),
    );
  }
  return [];
}

describe("Home, About and Solutions content", () => {
  it.each(pages)("%s is written in English and nowhere else yet", (page) => {
    expect(localesFor(page)).toEqual(["en"]);
  });

  it("sends an Indonesian visitor to the English About page until Phase 6", () => {
    expect(resolvePage("about", "id")).toEqual({ kind: "redirect", locale: "en", path: "/about" });
  });

  it.each(pages)("%s links only to planned pages, anchors, Potentia or WhatsApp", (page) => {
    const content = getPageContent(page, "en");
    expect(content).not.toBeNull();
    for (const href of hrefsIn(content)) {
      if (href.startsWith("#") || href === potentiaHref() || href === whatsappHref()) continue;
      expect(plannedPaths.has(href), href).toBe(true);
    }
  });
});

describe("Home hero and From hire to reward (Task 2.2)", () => {
  const home = getPageContent("home", "en")!;

  it("tells the journey in three dated steps, each date in bold", () => {
    const { play, profile, appraisal } = home.hero.journey;
    for (const when of [play.when, profile.when, appraisal.when]) {
      expect(when).toMatch(/^\*\*[^*]+\*\*, \w+$/);
    }
    expect(profile.traits).toHaveLength(3);
    for (const trait of profile.traits) expect(trait.value).toBeGreaterThanOrEqual(0);
  });

  it("gives every stage a screen that exists, or a listed placeholder", () => {
    expect(home.hireToReward.stages).toHaveLength(3);
    for (const stage of home.hireToReward.stages) {
      if ("image" in stage.screen) {
        expect(images[stage.screen.image], stage.title).toBeDefined();
        expect(stage.screen.alt, stage.title).not.toBe("");
      } else {
        expect(missingScreens[stage.screen.missing], stage.title).toBeDefined();
      }
    }
  });
});

describe("Home remaining sections (Task 2.3)", () => {
  const home = getPageContent("home", "en")!;

  it("never lists a logo until the owner has approved it (Q8)", () => {
    expect(home.logos.industries).toHaveLength(6);
    expect(home.logos.wall).toEqual([]);
    expect(home.logos.logoWallFlag).toBe("showLogoWall");
  });

  it("has three products, four reasons, no recognition section (D2), and Potentia on the outbound link", () => {
    expect(home.solutions.products.map((p) => p.name)).toEqual(["Game-Based Assessment", "DEUS Enhance", "Potentia"]);
    expect(home.whyDeus.items).toHaveLength(4);
    expect(home).not.toHaveProperty("recognition");
    expect(home.solutions.products[2].cta.href).toBe(potentiaHref());
  });

  it("has no product spotlights after the solutions (D1), so no Indonesian band either (F53)", () => {
    for (const key of ["gbaSpotlight", "enhanceSpotlight", "potentia"]) expect(home).not.toHaveProperty(key);
  });
});
