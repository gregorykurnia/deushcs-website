import { describe, expect, it } from "vitest";
import { whyIcons } from "@/components/blocks/WhyPanel";
import { discoverEn } from "@/content/en/discover";
import { images, missingScreens } from "@/content/images";

// Task 3.4: the parts the Discover page adds to the blocks it reuses: WhyPanel icons, the hero
// window's story and stat card, and the alt text of each report. The page's behaviour (sections,
// links, the report scroll, no-JS, the redirect) is in tests/e2e/discover.spec.ts.

describe("Discover content", () => {
  it("gives every why and customization panel an icon that WhyPanel can draw", () => {
    for (const item of [...discoverEn.why.items, ...discoverEn.customization.items]) {
      expect(whyIcons[item.icon], item.title).toBeDefined();
    }
  });

  it("puts the story in the hero window as a play card with alt text, and one stat card beside it", () => {
    expect(discoverEn.hero.window.story.title).toBe("Plays DEUS Discover");
    expect(discoverEn.hero.window.story.alt).not.toBe("");
    expect(discoverEn.hero.window.result).toEqual({ label: "Big Five (OCEAN)", value: "5", unit: "factors" });
  });

  it("gives each report alt text for its screenshot, and a TODO for the one not sent yet", () => {
    expect(discoverEn.reports.items.map((item) => item.alt)).toEqual([
      expect.stringContaining("individual report"),
      expect.stringContaining("profile"),
    ]);
    expect(images.discoverReport.src).toBe("/assets/discover-report-crop.png");
    expect(missingScreens.discoverProfileSuitability.en).toBe(
      "TODO: Discover individual profile suitability screenshot",
    );
  });
});
