import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { nextChapterEn } from "@/content/en/next-chapter";
import { images, missingScreens, nextChapterImages, nextChapterMissing } from "@/content/images";
import messages from "../../messages/en.json";

// Task 3.5: the parts the Next Chapter page adds: the sub-nav, the miss/gain columns, the tiles
// with a TODO in place of a screen, and the content that feeds them. The page's behaviour (sticky,
// active module, jump links, the table on a phone, no-JS) is in tests/e2e/next-chapter.spec.ts.

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href === "/" ? "" : href}`} {...props} />
  ),
}));

const { ModuleNav } = await import("@/components/blocks/ModuleNav");
const { ModuleChipsCard } = await import("@/components/blocks/ModuleChipsCard");
const { MissGain } = await import("@/components/blocks/MissGain");
const { GameGrid, GameTile } = await import("@/components/blocks/GameTile");

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

const c = nextChapterEn;
const games = [...c.cognitive.games, ...c.neuro.games];

describe("Next Chapter content", () => {
  it("names the hero window's game and gives its screenshot alt text", () => {
    expect(c.hero.window.game.title).toBe("Keypress Game");
    expect(c.hero.window.game.alt).not.toBe("");
    // the card says what the game measures, as the module list does
    expect(c.neuro.games.find((game) => game.name === c.hero.window.game.title)?.measures).toBe(
      c.hero.window.game.meta,
    );
  });

  it("points the three module chips at the three module sections", () => {
    expect(c.moduleChips.map((chip) => chip.id)).toEqual([c.cognitive.id, c.neuro.id, c.simulation.id]);
    expect(c.moduleChips.map((chip) => chip.detail)).toEqual([
      `${c.cognitive.games.length} games`,
      `${c.neuro.games.length} games`,
      `${c.simulation.scenarios.length} scenarios`,
    ]);
  });

  it("gives the use-case table its two column headings, and every row both cells", () => {
    expect(c.choosing.columns).toEqual({ useCase: "Use case", modules: "Recommended modules" });
    expect(c.choosing.rows).toHaveLength(5);
    for (const row of c.choosing.rows) {
      expect(row.useCase).not.toBe("");
      expect(row.modules).not.toBe("");
    }
  });

  it("has a screen for every game and simulation: the screenshot on disk, or its TODO, never both", () => {
    const names = [...games, ...c.simulation.scenarios].map((item) => item.name);
    const mapped = Object.keys(nextChapterMissing);
    expect(mapped.toSorted()).toEqual(names.filter((name) => !(name in nextChapterImages)).toSorted());
    for (const name of mapped) {
      expect(missingScreens[nextChapterMissing[name as keyof typeof nextChapterMissing]].en).toContain(name);
    }
  });

  it("gives alt text to every game that has a screenshot", () => {
    for (const game of games.filter((game) => game.name in nextChapterImages)) {
      expect(game.alt, game.name).toBeTruthy();
    }
  });
});

describe("ModuleNav", () => {
  const html = render(<ModuleNav items={c.moduleChips} label={c.moduleNavLabel} />);

  it("is a named nav of plain in-page links, which work without JavaScript", () => {
    expect(html).toContain('<nav aria-label="Next Chapter modules"');
    expect(html).toContain('href="#cognitive"');
    expect(html).toContain('href="#neuro"');
    expect(html).toContain('href="#simulation"');
    expect(html).toContain(">Cognitive</a>");
    expect(html).toContain(">Neuroscience</a>");
    expect(html).toContain(">Simulation</a>");
  });

  it("sticks under the header and marks no module current before the script runs", () => {
    expect(html).toContain("sticky");
    expect(html).toContain("top-[var(--header-h)]");
    expect(html).not.toContain("aria-current");
  });
});

describe("ModuleChipsCard", () => {
  it("lists the three modules as jump links with their sizes", () => {
    const html = render(<ModuleChipsCard chips={c.moduleChips} label={c.moduleNavLabel} />);
    expect(html).toContain('aria-label="Next Chapter modules"');
    expect(html.match(/<li>/g)).toHaveLength(3);
    expect(html).toContain('href="#neuro"');
    expect(html).toContain("6 games");
    expect(html).toContain("2 scenarios");
  });
});

describe("MissGain", () => {
  it("shows the two columns with their headings and every point", () => {
    const html = render(<MissGain missGain={c.cognitive.missGain} />);
    expect(html).toContain("<h3");
    expect(html).toContain("What traditional tests miss");
    expect(html).toContain("What you get instead");
    for (const point of [...c.cognitive.missGain.miss.points, ...c.cognitive.missGain.gain.points]) {
      expect(html).toContain(point.replaceAll("'", "&#x27;"));
    }
  });

  it("draws every point with an icon that screen readers skip, and no ember", () => {
    const html = render(<MissGain missGain={c.neuro.missGain} />);
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(6);
    expect(html).not.toContain("ember");
  });

  it("flips the panels to white with a hairline on a Cloud section", () => {
    expect(render(<MissGain missGain={c.neuro.missGain} />)).toContain("bg-cloud");
    expect(render(<MissGain missGain={c.neuro.missGain} surface="cloud" />)).toContain("border-line bg-white");
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
        <GameTile size="list" placeholder={missingScreens.nextChapterBalloonGame.en} title="Balloon Game" />
      </GameGrid>,
    );
    expect(html).toContain("data-placeholder");
    expect(html).toContain("TODO: Balloon Game screenshot");
    expect(html).not.toContain("<img");
  });
});
