import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SectionNav } from "@/components/blocks/SectionNav";
import { gbaEn } from "@/content/en/game-based-assessment";
import en from "../../messages/en.json";
import id from "../../messages/id.json";

// F103 (round 5 B3, D1): the "On this page" bar. Its behaviour on the pages (landing under the header
// and the bar, the current mark, no script, phones) is in tests/e2e/enhance.spec.ts and gba.spec.ts.

const items = [
  { id: "one", label: "The problem" },
  { id: "two", label: "The solution" },
];

describe("SectionNav", () => {
  it("is a nav named by its label, with one plain #id link per section, in order", () => {
    const html = renderToStaticMarkup(<SectionNav items={items} label="On this page" />);
    expect(html).toMatch(/^<nav [^>]*aria-label="On this page"/);
    expect([...html.matchAll(/<a href="#(\w+)"[^>]*>([^<]+)<\/a>/g)].map((m) => [m[1], m[2]])).toEqual([
      ["one", "The problem"],
      ["two", "The solution"],
    ]);
  });

  it("marks no link current until script runs, or the one it was given", () => {
    expect(renderToStaticMarkup(<SectionNav items={items} label="On this page" />)).not.toContain("aria-current");
    const html = renderToStaticMarkup(<SectionNav items={items} label="On this page" current="two" sticky={false} />);
    expect(html.match(/aria-current="location"/g)).toHaveLength(1);
    expect(html).toMatch(/<a href="#two" aria-current="location"/);
  });

  it("sticks under the header (84px, 68px below 480px), unless it is a sample", () => {
    const stuck = renderToStaticMarkup(<SectionNav items={items} label="On this page" />);
    expect(stuck).toContain("sticky top-[var(--header-h)] max-[479px]:top-[68px]");
    expect(renderToStaticMarkup(<SectionNav items={items} label="On this page" sticky={false} />)).not.toContain("sticky");
  });

  it("has its accessible name in both languages' messages", () => {
    expect(en.SectionNav.label).toBe("On this page");
    expect(id.SectionNav.label).toBeTruthy();
  });
});

describe("the pages that carry the bar", () => {
  const enhance = readFileSync("src/app/[locale]/solutions/enhance/page.tsx", "utf8");
  const gba = readFileSync("src/app/[locale]/solutions/game-based-assessment/page.tsx", "utf8");

  /** The ids in a page's `navItems` array literal. */
  const navIds = (source: string) => [...source.slice(source.indexOf("const navItems")).split("];")[0]!.matchAll(/id: "([\w-]+)"/g)].map((m) => m[1]);

  it("links Enhance's labelled sections, each one a section with that id, by their small labels", () => {
    const ids = navIds(enhance);
    expect(ids).toEqual(["problem", "urgency", "solution", "systems", "outcome", "better-together", "next-step", "faq"]);
    for (const sectionId of ids) expect(enhance, sectionId).toMatch(new RegExp(`id="${sectionId}"`));
    // the labels are each section's own small label from the content, not new copy
    for (const key of ["problem", "urgency", "solution", "systems", "outcome", "betterTogether", "faq"]) {
      expect(enhance, key).toContain(`label: c.${key}.eyebrow`);
    }
    expect(enhance).toContain("label: next.eyebrow");
  });

  it("links GBA's labelled sections; \"What's different\" has no label, so no link", () => {
    expect(navIds(gba)).toEqual(["modules", "use-cases", "faq"]);
    expect("eyebrow" in gbaEn.principles.intro).toBe(false);
    expect(gbaEn.modules.intro.eyebrow).toBe("The suite · 4 modules");
  });
});
