import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { gbaEn } from "@/content/en/game-based-assessment";
import { images } from "@/content/images";
import messages from "../../messages/en.json";

// Round 4 §S2: the four modules on the Game-Based Assessment page as cards in one 2 × 2 grid (they were
// tabs, F40). Here: the cards' content and the ModuleCard block's markup. The page's behaviour (all four
// seen at once, the anchors landing under the header, the height limits) is in tests/e2e/gba.spec.ts.

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href === "/" ? "" : href}`} {...props} />
  ),
}));

const { ModuleCard, ModuleGrid } = await import("@/components/blocks/ModuleCard");

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

const m = gbaEn.modules;
const words = (text: string) => text.replaceAll("**", "").split(/\s+/).filter(Boolean).length;

describe("GBA module cards content", () => {
  it("has four cards in page order: Personality, Cognitive, Neuroscience, Simulation", () => {
    expect(m.cards.map((card) => card.id)).toEqual(["personality", "cognitive", "neuro", "simulation"]);
    expect(m.cards.map((card) => card.title)).toEqual([
      "DEUS Discover: Personality Test",
      "Cognitive Assessment",
      "Neuroscience Assessment",
      "Simulation Assessment",
    ]);
  });

  it("has no tabs, sub-lines or numbering any more", () => {
    for (const gone of ["nav", "navLabel", "next", "personality", "cognitive", "neuro", "simulation"]) {
      expect(gone in m, gone).toBe(false);
    }
    expect(JSON.stringify(m)).not.toMatch(/Module \d of 4|Next module|Know your candidates before the interview/);
    for (const card of m.cards) expect(Object.keys(card).toSorted()).toEqual(["body", "id", "measures", "screen", "title"]);
  });

  it("starts each card's measures with a bold count", () => {
    for (const card of m.cards) expect(card.measures, card.id).toMatch(/^\*\*[^*]+\*\*/);
    expect(m.cards.map((card) => card.measures.match(/^\*\*([^*]+)\*\*/)![1])).toEqual(["32", "7 games:", "6 games:", "2 scenarios:"]);
  });

  it("keeps each card to about 50 words, with a short body (Simulation's copy has three sentences)", () => {
    for (const card of m.cards) {
      expect(words(`${card.body} ${card.measures}`), card.id).toBeLessThanOrEqual(60);
      // a sentence ends at a full stop followed by a space or the end; "(OCEAN)" and "Big Five" add none
      expect(card.body.split(/\.(?:\s|$)/).filter(Boolean).length, card.id).toBeLessThanOrEqual(3);
    }
  });

  it("gives every card one screen from `images`, with alt text", () => {
    expect(m.cards.map((card) => card.screen.image)).toEqual([
      "discoverFestival",
      "gameObjectiveShooter",
      "gameBalloon",
      "gbaSimulation",
    ]);
    for (const card of m.cards) {
      expect(images[card.screen.image], card.id).toBeDefined();
      expect(card.screen.alt, card.id).not.toBe("");
    }
    // Cognitive shows Objective Shooter: the hero already shows Mallet Math
    expect(m.cards[1]!.screen.alt).toMatch(/^Objective Shooter/);
    expect(m.cards[3]!.screen.alt).toBe("Business Operations: a mini case analysis with a calculator.");
  });

  it("shows no game names (§S2): each card says how many and what they measure", () => {
    const text = JSON.stringify(m.cards.map(({ title, body, measures }) => ({ title, body, measures })));
    for (const name of ["Objective Shooter", "Mallet Math", "Balloon Game", "Tower Game", "Faces Game", "Business Operations", "Event Operations"]) {
      expect(text, name).not.toContain(name);
    }
  });

  it("carries the D9 headings and the search keywords (F60–F63, F69), and the suite's new lede", () => {
    expect(gbaEn.hero.title).toBe("Game-based assessment for hiring.");
    expect(gbaEn.principles.intro.title).toBe("What makes game-based assessment different.");
    expect(m.intro.eyebrow).toBe("The suite · 4 modules");
    expect(m.intro.title).toBe("All your talent assessments on one platform.");
    expect(m.intro.lede).toBe(
      "Use any module on its own or combine them. Their reports are produced automatically.",
    );
    expect(gbaEn.meta.title).toMatch(/Game-Based Assessment/);
    expect(gbaEn.meta.title).toMatch(/Talent Assessment/);
    expect(gbaEn.meta.description).toMatch(/game-based assessment/i);
    expect(gbaEn.meta.description).toMatch(/talent assessment/);
  });

  it("keeps the R3 wording (F13 to F17, F20): no campus-only card", () => {
    const titles = gbaEn.useCases.items.map((item) => item.title);
    expect(titles.slice(0, 2)).toEqual(["Recruitment", "Management Trainee recruitment"]);
    expect(titles).not.toContain("Internal talent mapping");
    expect(titles).not.toContain("Campus recruitment");
  });
});

describe("ModuleCard", () => {
  const [personality, cognitive] = m.cards as [(typeof m.cards)[number], (typeof m.cards)[number]];
  const card = (c: typeof personality, index = 0) => (
    <ModuleCard
      id={c.id}
      index={index}
      title={c.title}
      body={c.body}
      measures={c.measures}
      image={{ ...images[c.screen.image], alt: c.screen.alt }}
    />
  );
  const html = render(<ModuleGrid>{card(personality)}{card(cognitive, 1)}</ModuleGrid>);

  it("is an li carrying the module's id, with its title as an H3 named `<id>-title`", () => {
    expect(html).toMatch(/<li [^>]*id="personality"/);
    expect(html).toMatch(/<h3 id="personality-title"[^>]*>DEUS Discover: Personality Test<\/h3>/);
    expect(html).toMatch(/<li [^>]*id="cognitive"/);
    expect(html).toMatch(/<h3 id="cognitive-title"[^>]*>Cognitive Assessment<\/h3>/);
  });

  it("scrolls to 12px under the header: 96px, and 80px below 480px", () => {
    expect(html).toContain("scroll-mt-[96px]");
    expect(html).toContain("max-[479px]:scroll-mt-20");
  });

  it("shows the body, then the measures with the count in bold, over a hairline", () => {
    expect(html).toContain("Candidates play through an RPG-style story");
    expect(html).toMatch(/<b[^>]*>32<\/b> personality subtraits and <b[^>]*>24<\/b> competency traits/);
    expect(html).toMatch(/<b[^>]*>7 games:<\/b> processing speed/);
    expect(html).toMatch(/border-t border-line[^"]*"><b/);
  });

  it("puts the screen in the sky strip at the bottom, with alt text, and no placeholder", () => {
    expect(html.match(/<img /g)).toHaveLength(2);
    expect(html).toContain('alt="A DEUS Discover story scene at a town festival');
    expect(html).toContain("mt-auto");
    expect(html).toContain("grad-thumb");
    expect(html).toContain("h-[150px]");
    expect(html).toContain("min-[600px]:h-[170px]");
    expect(html).not.toContain("data-placeholder");
  });

  it("is static: no link and no hover lift", () => {
    expect(html).not.toContain("<a ");
    expect(html).not.toContain("hover:");
  });

  it("sits in a two-column grid above 900px and one column below", () => {
    expect(html).toMatch(/^<ul class="[^"]*grid[^"]*gap-5[^"]*desk:grid-cols-2/);
  });
});
