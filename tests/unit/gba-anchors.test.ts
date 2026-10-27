import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { solutionColumns } from "@/components/site/nav";
import { gbaEn } from "@/content/en/game-based-assessment";
import { modulesForFlags } from "@/content/use-cases";
import { oldSiteRedirects } from "@/lib/old-site-redirects";

// Phase C1 review (round 4): every link into the GBA page with a fragment names a section or a module
// card the page still has, so none lands on an anchor round 4 removed (#reports, #science, #pricing,
// ...). The e2e spec checks that arriving with each module anchor shows its card.

const GBA = /\/solutions\/game-based-assessment#([\w-]+)$/;

// The section ids in the page's source, and the four cards' ids from its content
const pageSource = readFileSync("src/app/[locale]/solutions/game-based-assessment/page.tsx", "utf8");
const sectionIds = [...pageSource.matchAll(/<GbaSection id="([\w-]+)"/g)].map((match) => match[1]);
const anchors = new Set([...sectionIds, ...gbaEn.modules.cards.map((card) => card.id)]);

/** Every `href` string anywhere in a content object. */
function hrefsIn(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(hrefsIn);
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, inner]) =>
      key === "href" && typeof inner === "string" ? [inner] : hrefsIn(inner),
    );
  }
  return [];
}

const useCases = modulesForFlags({ showUseCases: true, showIndonesianLeadPages: true });
const sources: Record<string, string[]> = {
  "header menu": hrefsIn(solutionColumns),
  "English use-case pages": hrefsIn(useCases.en),
  "Indonesian use-case pages": hrefsIn(useCases.id),
  // read from the source: the "Better together" link sits behind showBetterTogether, off for now
  Enhance: [...readFileSync("src/content/en/enhance.ts", "utf8").matchAll(/href: "([^"]+)"/g)].map((match) => match[1]),
  "old-site redirects": oldSiteRedirects.map((redirect) => redirect.to),
  "moved pages (next.config.ts)": [...readFileSync("next.config.ts", "utf8").matchAll(/to: `\$\{gba\}(#[\w-]+)`/g)].map(
    (match) => `/solutions/game-based-assessment${match[1]}`,
  ),
};

describe("links into the GBA page", () => {
  it("the page has its four sections and four cards to link to", () => {
    expect(sectionIds).toEqual(["principles", "modules", "use-cases", "faq"]);
    expect(anchors.size).toBe(8);
  });

  for (const [source, hrefs] of Object.entries(sources)) {
    it(`from the ${source} land on a section or card that exists`, () => {
      const fragments = hrefs.flatMap((href) => href.match(GBA)?.[1] ?? []);
      expect(fragments.length).toBeGreaterThan(0);
      expect(fragments.filter((fragment) => !anchors.has(fragment))).toEqual([]);
    });
  }
});
