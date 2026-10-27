import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";

// Task 3.7: Phase 3 end to end. Discover and Next Chapter (R2) and Science (R6) are part of the GBA
// page now, so it is the one assessment page. The gba spec checks its sections; this one checks
// every link, an accessibility scan, the heading outline, the
// language switches, and the 390 and 1280 screenshots the design
// review reads (saved to screenshots/phase-3/, which git ignores).

const pages = [
  { name: "game-based-assessment", path: "/en/solutions/game-based-assessment" },
];

async function hrefs(page: Page) {
  return page.locator("a[href]").evaluateAll((links) =>
    links.map((a) => ({
      href: a.getAttribute("href") ?? "",
      target: a.getAttribute("target"),
      rel: a.getAttribute("rel") ?? "",
    })),
  );
}

test.describe("Phase 3: links", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  for (const { name, path } of pages) {
    test(`${name}: every internal link resolves and every in-page anchor has its target`, async ({ page, request }) => {
      await page.goto(path);
      const links = await hrefs(page);

      const internal = new Set<string>();
      const anchors = new Set<string>();
      for (const { href } of links) {
        if (href.startsWith("#")) anchors.add(href.slice(1));
        else if (href.startsWith("/")) internal.add(href.split("#")[0].split("?")[0]);
      }

      const broken: string[] = [];
      for (const route of internal) {
        const response = await request.get(route);
        if (response.status() !== 200) broken.push(`${route} -> ${response.status()}`);
      }
      expect(broken, broken.join("\n")).toEqual([]);

      const missing: string[] = [];
      for (const id of anchors) {
        if (id && (await page.locator(`[id="${id}"]`).count()) === 0) missing.push(`#${id}`);
      }
      expect(missing, missing.join("\n")).toEqual([]);
    });

    test(`${name}: links that leave the site open in a new tab without handing over the window`, async ({ page }) => {
      await page.goto(path);
      const external = (await hrefs(page)).filter(({ href }) => /^https?:\/\//.test(href));
      expect(external.length).toBeGreaterThan(0); // the WhatsApp button, at least
      for (const { href, target, rel } of external) {
        expect(target, href).toBe("_blank");
        expect(rel, href).toMatch(/noopener/);
      }
    });
  }
});

test.describe("Phase 3: every page", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  for (const { name, path } of pages) {
    test(`${name}: no serious or critical accessibility issues`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
    });

    test(`${name}: one h1, and headings never skip a level on the way down`, async ({ page }) => {
      await page.goto(path);
      const levels = await page
        .locator("main :is(h1, h2, h3, h4)")
        .evaluateAll((headings) => headings.map((h) => Number(h.tagName[1])));
      expect(levels.filter((level) => level === 1)).toHaveLength(1);
      const skips = levels.flatMap((level, i) => (i > 0 && level > levels[i - 1] + 1 ? [`h${levels[i - 1]} → h${level}`] : []));
      expect(skips).toEqual([]);
    });

    test(`${name}: neither language switch links to an Indonesian page that doesn't exist yet`, async ({ page }) => {
      await page.goto(path);
      for (const label of ["Language", "Language options in the footer"]) {
        const nav = page.getByRole("navigation", { name: label, exact: true });
        await expect(nav, label).toHaveCount(1);
        await expect(nav.locator("a[href^='/id']"), label).toHaveCount(0);
      }
    });
  }
});

/** Scrolls the page top to bottom so lazy images load, then waits for them and the fonts, and
 * returns to the top. Without this a full-page capture shows empty tiles below the fold. */
async function loadEverything(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y);
      await new Promise((done) => setTimeout(done, 80));
    }
    await Promise.all(
      Array.from(document.images)
        // only images that are shown: a lazy one in a closed tab (GBA's modules, F40) never loads
        .filter((img) => !img.complete && img.getClientRects().length > 0)
        .map((img) => new Promise((done) => ((img.onload = img.onerror = done), undefined))),
    );
    await document.fonts.ready;
    window.scrollTo(0, 0);
  });
}

test.describe("Phase 3: screenshots for the design review", () => {
  // Reduced motion shows everything at rest, so the full-page capture has no half-revealed
  // sections and no moving report.
  test.use({ reducedMotion: "reduce" });
  test.setTimeout(90_000);

  const widths = [
    { label: "1280", width: 1280, height: 900 },
    { label: "390", width: 390, height: 844 },
  ];

  for (const { name, path } of pages) {
    for (const { label, width, height } of widths) {
      test(`${name} at ${label}px`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        const response = await page.goto(path);
        expect(response?.status()).toBe(200);
        await loadEverything(page);

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, "sideways scroll").toBe(0);

        mkdirSync("screenshots/phase-3", { recursive: true });
        await page.screenshot({ path: `screenshots/phase-3/${name}-${label}.png`, fullPage: true });
      });
    }
  }
});
