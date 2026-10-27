import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { whyIcons } from "@/components/blocks/WhyPanel";
import { gbaEn } from "@/content/en/game-based-assessment";
import { gameImages, gameMissing, images, missingScreens, type ScreenCaption } from "@/content/images";
import messages from "../../messages/en.json";

// R2 (F10): the four module sections on the Game-Based Assessment page, which were the DEUS Discover
// and Next Chapter pages: the module tabs (F40), the miss/gain columns, the tiles with a TODO in place of a
// screen, and the content that feeds them. The page's behaviour (sticky, switching, module links,
// no-JS, the redirects) is in tests/e2e/gba.spec.ts.

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href === "/" ? "" : href}`} {...props} />
  ),
}));

const { ModuleTabs } = await import("@/components/blocks/ModuleTabs");
const { MissGain } = await import("@/components/blocks/MissGain");
const { GameGrid, GameTile } = await import("@/components/blocks/GameTile");

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

const m = gbaEn.modules;
const games = [...m.cognitive.games, ...m.neuro.games];

describe("GBA module content", () => {
  it("points the sub-nav at the four module sections, in page order", () => {
    expect(m.nav.map((item) => item.id)).toEqual([m.personality.id, m.cognitive.id, m.neuro.id, m.simulation.id]);
    expect(m.nav.map((item) => item.label)).toEqual(["Personality", "Cognitive", "Neuroscience", "Simulation"]);
  });

  it("numbers the modules in their eyebrows and titles each with its product name over a sub-line (F64–F67)", () => {
    const modules = [m.personality, m.cognitive, m.neuro, m.simulation];
    expect(modules.map((module) => module.intro.eyebrow)).toEqual(["Module 1 of 4", "Module 2 of 4", "Module 3 of 4", "Module 4 of 4"]);
    expect(modules.map((module) => module.intro.title)).toEqual([
      "DEUS Discover: Personality Test",
      "Cognitive Assessment",
      "Neuroscience Assessment",
      "Simulation Assessment",
    ]);
    expect(modules.map((module) => module.intro.subtitle)).toEqual([
      "Know your candidates before the interview.",
      "Measure cognitive skills through seven interactive games.",
      "See how candidates really behave, not only what they say.",
      "Test business problem-solving skills against the clock.",
    ]);
  });

  it("drops the module science lines (D8)", () => {
    expect("science" in m.cognitive).toBe(false);
    expect("science" in m.neuro).toBe(false);
    expect("title" in m.personality.customization).toBe(false);
  });

  it("carries the D9 headings and the search keywords (F60–F63, F69)", () => {
    expect(gbaEn.hero.title).toBe("Game-based assessment for better hiring.");
    expect(gbaEn.principles.intro.title).toBe("A smarter assessment for better hiring results.");
    expect(gbaEn.modules.intro.title).toBe("All your talent assessments on one platform.");
    expect(gbaEn.meta.title).toMatch(/Game-Based Assessment/);
    expect(gbaEn.meta.title).toMatch(/Talent Assessment/);
    expect(gbaEn.meta.description).toMatch(/game-based assessment/i);
    expect(gbaEn.meta.description).toMatch(/talent assessment/);
  });

  it("carries the R3 wording (F13 to F17, F20): no promise of one module at a time, no campus-only card", () => {
    expect(gbaEn.modules.intro.lede).toBe("Every module runs on the same platform, and reports are generated automatically.");
    expect(gbaEn.modules.personality.measures.stats.at(-1)).toEqual({
      value: "Custom",
      label: "competencies from your own framework",
    });
    const titles = gbaEn.useCases.items.map((item) => item.title);
    expect(titles.slice(0, 2)).toEqual(["Recruitment", "Management Trainee recruitment"]);
    expect(titles).toContain("Promotions and rotations");
    expect(titles).not.toContain("Internal talent mapping");
    expect(titles).not.toContain("Campus recruitment");
  });

  it("gives the story screen alt text, and every customization panel an icon WhyPanel can draw", () => {
    expect(m.personality.story.alt).not.toBe("");
    for (const item of m.personality.customization.items) {
      expect(whyIcons[item.icon], item.title).toBeDefined();
    }
  });

  it("has a screen for every game and simulation: the screenshot on disk, or its TODO, never both", () => {
    const names = [...games, ...m.simulation.scenarios].map((item) => item.name);
    const mapped = Object.keys(gameMissing);
    expect(mapped.toSorted()).toEqual(names.filter((name) => !(name in gameImages)).toSorted());
    for (const name of mapped) {
      const captions: Record<string, ScreenCaption> = missingScreens;
      expect(captions[gameMissing[name as keyof typeof gameMissing]]?.en).toContain(name);
    }
  });

  it("gives alt text to every game that has a screenshot", () => {
    for (const game of games.filter((game) => game.name in gameImages)) {
      expect(game.alt, game.name).toBeTruthy();
    }
  });
});

describe("ModuleTabs", () => {
  const html = render(
    <ModuleTabs
      label={m.navLabel}
      nextLabel={m.next}
      items={m.nav.map((item) => ({ id: item.id, label: item.label, content: <section id={item.id}>{item.label} panel</section> }))}
    />,
  );

  it("is a named tab list of the four modules, Personality selected before the script runs", () => {
    expect(html).toContain('role="tablist"');
    expect(html).toContain('aria-label="Game-Based Assessment modules"');
    expect(html.match(/role="tab"/g)).toHaveLength(4);
    expect(html).toMatch(/aria-selected="true"[^>]*>Personality</);
  });

  it("keeps every module in the HTML, the inactive ones hidden", () => {
    for (const id of ["personality", "cognitive", "neuro", "simulation"]) expect(html).toContain(`<section id="${id}">`);
    expect(html.match(/data-state="inactive"[^>]*role="tabpanel"|role="tabpanel"[^>]*data-state="inactive"/g)).toHaveLength(3);
  });

  it("sticks under the header", () => {
    expect(html).toContain("sticky");
    expect(html).toContain("top-[var(--header-h)]");
  });

  it("has an arrow button beside the pill, named after the next module (F68)", () => {
    expect(html).toMatch(/<button[^>]*type="button"[^>]*aria-label="Next module: Cognitive"/);
    expect(html.indexOf('aria-label="Next module: Cognitive"')).toBeGreaterThan(html.indexOf('role="tablist"'));
    expect(html.indexOf('aria-label="Next module: Cognitive"')).toBeLessThan(html.indexOf('role="tabpanel"'));
  });

  it("names the next module at the end of each one (F40)", () => {
    expect(m.next.replace("{module}", "Cognitive")).toBe("Next module: Cognitive");
  });
});

describe("MissGain", () => {
  it("shows the two columns with their headings and every point", () => {
    const html = render(<MissGain missGain={m.cognitive.missGain} />);
    expect(html).toContain("<h3");
    expect(html).toContain("What traditional tests miss");
    expect(html).toContain("What you get instead");
    for (const point of [...m.cognitive.missGain.miss.points, ...m.cognitive.missGain.gain.points]) {
      expect(html).toContain(point.replaceAll("'", "&#x27;"));
    }
  });

  it("draws every point with an icon that screen readers skip, and no ember", () => {
    const html = render(<MissGain missGain={m.neuro.missGain} />);
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(6);
    expect(html).not.toContain("ember");
  });

  it("flips the panels to white with a hairline on a Cloud section", () => {
    expect(render(<MissGain missGain={m.neuro.missGain} />)).toContain("bg-cloud");
    expect(render(<MissGain missGain={m.neuro.missGain} surface="cloud" />)).toContain("border-line bg-white");
  });
});

describe("GameTile in the games list", () => {
  it("shows a screenshot with its alt text, with the measure under the name", () => {
    const html = render(
      <GameGrid variant="list">
        <GameTile
          size="list"
          image={{ ...images.gbaSpeed, alt: "The Keypress Game" }}
          title="Keypress Game"
          caption="Motivation and processing speed"
        />
      </GameGrid>,
    );
    expect(html).toContain('alt="The Keypress Game"');
    expect(html).toContain("flex-col");
    expect(html).not.toContain("data-placeholder");
  });

  it("shows the TODO tile in place of a screen that isn't supplied yet", () => {
    const html = render(
      <GameGrid variant="list">
        <GameTile size="list" placeholder="TODO: Tower Game screenshot" title="Tower Game" />
      </GameGrid>,
    );
    expect(html).toContain("data-placeholder");
    expect(html).toContain("TODO: Tower Game screenshot");
    expect(html).not.toContain("<img");
  });
});
