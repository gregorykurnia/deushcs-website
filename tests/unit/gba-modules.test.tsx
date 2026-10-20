import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { whyIcons } from "@/components/blocks/WhyPanel";
import { gbaEn } from "@/content/en/game-based-assessment";
import { gameImages, gameMissing, images, missingScreens } from "@/content/images";
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

  it("numbers the modules in their eyebrows, with DEUS Discover as the Personality module's name", () => {
    expect(m.personality.intro.eyebrow).toBe("Module 1 · Personality · DEUS Discover");
    expect(m.cognitive.intro.eyebrow).toBe("Module 2 · Cognitive");
    expect(m.neuro.intro.eyebrow).toBe("Module 3 · Neuroscience");
    expect(m.simulation.intro.eyebrow).toBe("Module 4 · Simulation");
  });

  it("carries the R3 wording (F13 to F17, F20): no promise of one module at a time, no campus-only card", () => {
    expect(gbaEn.modules.intro.title).toBe("Four modules, one platform.");
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
    expect(gbaEn.impact.intro).toEqual({ eyebrow: "Before and after", title: "What changes for your team." });
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
      expect(missingScreens[gameMissing[name as keyof typeof gameMissing]].en).toContain(name);
    }
  });

  it("gives alt text to every game that has a screenshot", () => {
    for (const game of games.filter((game) => game.name in gameImages)) {
      expect(game.alt, game.name).toBeTruthy();
    }
  });

  it("gives each personality report alt text for its screenshot, and a TODO for the one not sent yet", () => {
    expect(gbaEn.reports.personality.items.map((item) => item.alt)).toEqual([
      expect.stringContaining("individual report"),
      expect.stringContaining("profile"),
    ]);
    expect(images.discoverReport.src).toBe("/assets/discover-report-crop.png");
    expect(missingScreens.discoverProfileSuitability.en).toBe(
      "TODO: Discover individual profile suitability screenshot",
    );
  });
});

describe("ModuleTabs", () => {
  const html = render(
    <ModuleTabs
      label={m.navLabel}
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

  it("names the next module at the end of each one (F40)", () => {
    expect(m.next.replace("{module}", "Cognitive")).toBe("Next module: Cognitive");
    expect(gbaEn.reports.personality.label).toBe("Personality reports");
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
