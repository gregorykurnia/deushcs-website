import { describe, expect, it } from "vitest";
import { gbaEn } from "@/content/en/game-based-assessment";
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
const assessmentModules = [gbaEn];

describe("assessment page content", () => {
  it("registers the GBA page in English only", () => {
    expect(localesFor("gba")).toEqual(["en"]);
  });

  it("no longer uses the name Next Chapter (F10): the modules have their own names", () => {
    for (const content of assessmentModules) {
      expect(allText(content)).not.toContain("Next Chapter");
    }
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
    expect(gbaEn.meta.title).toBe("Game-Based Assessment: Talent Assessment for Hiring");
  });

  it.skipIf(siteFlags.telkomNamed)("keeps Telkom's name out of the copy until Q7 is confirmed", () => {
    expect(allText(gbaEn)).not.toContain("Telkom");
  });
});
