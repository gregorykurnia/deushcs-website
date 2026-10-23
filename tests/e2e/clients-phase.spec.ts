import { mkdirSync } from "node:fs";
import { expect, type Page, test } from "@playwright/test";
import { siteFlags } from "@/content/flags";

// Task 4.5: Phase 4 e2e. The page-level checks live with each page (clients.spec.ts for the hub,
// story.spec.ts for the story template); this spec covers what spans them: where a story goes when
// it is visited in the wrong language or under its old slug, what the language switch offers, and
// that a held story is a real 404 that says nothing about the client. Calvin (Q11) and the Telkom
// name (Q7) are switches, so each test follows them the way the hub's tests do.

const telkomSlug = siteFlags.telkomNamed ? "telkom-group" : "national-telecom-group";
const calvin = "calvin-christian-school";

test.describe("Client stories: language and slug redirects", () => {
  test.skip(!siteFlags.showStories, "showStories is off: no story is published");

  test("a story that exists only in English sends the Indonesian URL to the English one", async ({ page }) => {
    await page.goto(`/id/clients/${telkomSlug}`);
    await expect(page).toHaveURL(new RegExp(`/en/clients/${telkomSlug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toContainText("1,000+ candidates");
  });

  test("Calvin, visited in English, redirects to the Indonesian story", async ({ page }) => {
    test.skip(!siteFlags.publishCalvin, "publishCalvin is off: the story is held, see the 404 tests below");
    await page.goto(`/en/clients/${calvin}`);
    await expect(page).toHaveURL(new RegExp(`/id/clients/${calvin}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", "id");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Calvin's story shows English as unavailable in both language switches", async ({ page }) => {
    test.skip(!siteFlags.publishCalvin, "publishCalvin is off: the story is held");
    await page.goto(`/id/clients/${calvin}`);
    for (const nav of [
      page.getByRole("navigation", { name: "Language", exact: true }),
      page.getByRole("navigation", { name: "Language options in the footer" }),
    ]) {
      const english = nav.getByRole("link", { name: /^English/ });
      await expect(english).toHaveAttribute("aria-disabled", "true");
      await expect(nav.locator("a[href^='/en']")).toHaveCount(0);
    }
  });

  test("the anonymised slug redirects to the named one once Telkom is named", async ({ page }) => {
    test.skip(!siteFlags.telkomNamed, "telkomNamed is off: the named slug is a 404, see below");
    await page.goto("/en/clients/national-telecom-group");
    await expect(page).toHaveURL(/\/en\/clients\/telkom-group$/);
  });

  test("Game-Based Assessment's one line leads to the clients hub, and Home has no story card (F6, F18)", async ({ page }) => {
    await page.goto("/en/solutions/game-based-assessment");
    const link = page.getByRole("link", { name: "Read client stories" });
    await expect(link).toHaveCount(1);
    const response = await page.goto((await link.getAttribute("href"))!);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/en\/clients$/);
    await page.goto("/en");
    await expect(page.getByRole("link", { name: /Read the story/ })).toHaveCount(0);
  });

  test("a story hub card leads to a story that loads", async ({ page }) => {
    await page.goto("/en/clients");
    const cards = page.locator("#stories li a[href^='/']");
    const hrefs = await cards.evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      const response = await page.goto(href);
      expect(response?.status(), href).toBe(200);
      await expect(page.getByRole("heading", { level: 1 }), href).toBeVisible();
    }
  });
});

test.describe("Client stories: held stories are real 404s", () => {
  const held: string[] = [];
  if (!siteFlags.telkomNamed) held.push("/en/clients/telkom-group", "/id/clients/telkom-group");
  if (!siteFlags.publishCalvin) held.push(`/en/clients/${calvin}`, `/id/clients/${calvin}`);
  if (!siteFlags.showStories) held.push("/en/clients/national-telecom-group", "/id/clients/national-telecom-group");
  held.push("/en/clients/no-such-client", "/id/clients/no-such-client");

  for (const path of held) {
    test(`${path} answers 404 and names no client`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      // the requested path is echoed in the 404's own markup; only what else the page says counts
      const html = (await page.content()).replaceAll(path.split("/").pop()!, "");
      // a held story must not leak through its 404 (the page, the title, or a redirect target)
      // (Potentia is not checked: the header and footer link to it on every page)
      expect(html).not.toMatch(/calvin/i);
      if (!siteFlags.telkomNamed) expect(html).not.toMatch(/telkom/i);
    });
  }

  test("held stories are not in the hub, the sitemap or the story's own pages", async ({ page, request }) => {
    await page.goto("/en/clients");
    // the logo wall names every client (owner, 2026-10-23); the stories are what is held
    const main = (await page.locator("main > :not(#logos)").allInnerTexts()).join("\n");
    if (!siteFlags.publishCalvin) expect(main).not.toContain("Calvin");
    if (!siteFlags.telkomNamed) expect(main).not.toMatch(/telkom/i);

    const sitemap = await request.get("/sitemap.xml");
    if (sitemap.ok()) {
      const xml = await sitemap.text();
      if (!siteFlags.publishCalvin) expect(xml).not.toContain(calvin);
      if (!siteFlags.telkomNamed) expect(xml).not.toContain("telkom-group");
      if (!siteFlags.showStories) expect(xml).not.toContain("/clients/national-telecom-group");
    }
  });
});

test.describe("Phase 4 on a phone", () => {
  for (const width of [360, 390]) {
    test(`the story's big numbers fit their half of the panel at ${width}px`, async ({ page }) => {
      test.skip(!siteFlags.showStories, "showStories is off: no story is published");
      await page.setViewportSize({ width, height: 800 });
      await page.goto(`/en/clients/${telkomSlug}`);
      const values = page.locator("section[aria-labelledby='story-glance'] dd");
      await expect(values.first()).toBeVisible();
      const boxes = await values.evaluateAll((dds) =>
        dds.map((dd) => ({ text: dd.textContent, overflow: dd.scrollWidth - dd.clientWidth })),
      );
      for (const { text, overflow } of boxes) expect(overflow, `"${text}" runs out of its cell`).toBeLessThanOrEqual(0);
    });
  }

  test("a wordy odd one out doesn't shrink the other big numbers (GBA, Personality module)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/solutions/game-based-assessment");
    const sizes = await page
      .locator("#personality dl dd")
      .evaluateAll((dds) => dds.map((dd) => [dd.textContent, getComputedStyle(dd).fontSize]));
    expect(sizes).toContainEqual(["32", "52px"]);
    expect(sizes).toContainEqual(["24", "52px"]);
  });

  test("a story card shows its whole result, not an ellipsis", async ({ page }) => {
    test.skip(!siteFlags.showStories, "showStories is off: the hub has no story cards");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/clients");
    const results = page.locator("#stories li h3");
    await expect(results.first()).toBeVisible();
    const clipped = await results.evaluateAll((h3s) =>
      h3s.filter((h3) => h3.scrollHeight > h3.clientHeight + 1).map((h3) => h3.textContent),
    );
    expect(clipped).toEqual([]);
  });
});

/** Scrolls through the page so lazy images load, waits for them and the fonts, then goes back up. */
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

test.describe("Phase 4: screenshots for the design review", () => {
  // Reduced motion shows everything at rest, so the full-page capture has no half-revealed sections.
  test.use({ reducedMotion: "reduce" });
  test.setTimeout(90_000);

  const pages = [
    { name: "clients", path: "/en/clients" },
    ...(siteFlags.showStories ? [{ name: "story-telkom", path: `/en/clients/${telkomSlug}` }] : []),
    ...(siteFlags.showStories && siteFlags.publishCalvin ? [{ name: "story-calvin", path: `/id/clients/${calvin}` }] : []),
    // Home and GBA are captured in place (GBA's one-line clients link since R4)
    { name: "home", path: "/en" },
    { name: "game-based-assessment", path: "/en/solutions/game-based-assessment" },
  ];
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

        mkdirSync("screenshots/phase-4", { recursive: true });
        await page.screenshot({ path: `screenshots/phase-4/${name}-${label}.png`, fullPage: true });
      });
    }
  }
});
