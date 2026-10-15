import { describe, expect, it } from "vitest";
import { discoverEn } from "@/content/en/discover";
import { gbaEn } from "@/content/en/game-based-assessment";
import { nextChapterEn } from "@/content/en/next-chapter";
import { scienceEn } from "@/content/en/science";
import { siteFlags } from "@/content/flags";
import { localesFor } from "@/content/registry";

// Every string a page module holds, so the checks below read the copy, not the structure.
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

const allText = (content: unknown) => strings(content).join("\n");
const assessmentModules = [gbaEn, discoverEn, nextChapterEn, scienceEn];

describe("assessment page content", () => {
  it("registers the four assessment pages in English only", () => {
    expect(localesFor("gba")).toEqual(["en"]);
    expect(localesFor("discover")).toEqual(["en"]);
    expect(localesFor("nextChapter")).toEqual(["en"]);
    expect(localesFor("science")).toEqual(["en"]);
  });

  it("keeps editor notes and [VERIFY] markers out of the copy", () => {
    for (const content of assessmentModules) {
      for (const text of strings(content)) {
        expect(text).not.toMatch(/\[VERIFY|Note:|Eyebrow:|^> /);
      }
    }
  });

  it("leaves the site name to pageMetadata, so SEO titles carry no '| DEUS' suffix", () => {
    for (const content of assessmentModules) {
      expect(content.meta.title).not.toContain("|");
    }
    expect(gbaEn.meta.title).toBe("Game-Based Assessment for Hiring and Talent Mapping");
  });

  it.skipIf(siteFlags.telkomNamed)("keeps Telkom's name out of the copy until Q7 is confirmed", () => {
    expect(allText(gbaEn)).not.toContain("Telkom");
    expect(allText(gbaEn)).toContain("A national telecom group");
  });

  it.skipIf(siteFlags.showBadHireCost)("hides the bad-hire cost claim until the owner confirms it", () => {
    expect(allText(gbaEn)).not.toContain("5 to 10 times");
  });

  it.skipIf(siteFlags.showMinimumOrder)("hides the minimum order terms until the owner confirms them", () => {
    expect(allText(gbaEn)).not.toContain("10,000,000");
  });

  it("shows the market comparison and the UGM partnership exactly when their switches are on", () => {
    expect(allText(scienceEn).includes("Western populations")).toBe(siteFlags.showMarketClaim);
    expect(allText(scienceEn).includes("Universitas Gadjah Mada")).toBe(siteFlags.showUgmPartnership);
  });
});
