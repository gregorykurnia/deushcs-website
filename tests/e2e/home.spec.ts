import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { siteFlags } from "@/content/flags";

// Home (Tasks 2.2 and 2.3): the hero with its sky window, "From hire to reward", and the rest of
// the page. Task 2.7 closes Phase 2 at the bottom: every link on Home, About and Solutions, the
// Potentia links, and the 1280 and 390 screenshots the design review reads (saved to
// screenshots/phase-2/, which git ignores).

const journey = (page: Page) =>
  page.getByRole("list", { name: "Example: one candidate from assessment to first bonus" });
/** The journey's own steps, not the trait rows inside the profile card. */
const steps = (page: Page) => journey(page).locator(":scope > li");
const tabs = (page: Page) =>
  page.getByRole("tablist", { name: "One partner, from assessment to bonus." });

test.describe("Home hero and From hire to reward", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("the hero shows the headline, both buttons and the three-step journey", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Every person has potential. We help you see it.");
    await expect(page.getByRole("main").getByRole("link", { name: "Request a demo" })).toHaveAttribute("href", "/en/contact");
    await expect(page.getByRole("link", { name: "Explore our solutions" })).toHaveAttribute("href", "#solutions");

    const step = steps(page);
    await expect(step).toHaveCount(3);
    await expect(step.nth(0)).toContainText("March 2025, assessed");
    // the window names the stages, not the products (F43)
    await expect(step.nth(0)).toContainText("Plays an assessment game");
    await expect(step.nth(1)).toContainText("Rina Wulandari");
    await expect(step.nth(2)).toContainText("Q1 2026 appraisal");
    await expect(step.nth(2)).toContainText("Approved");
    await expect(journey(page)).not.toContainText("DEUS");
    await expect(step.nth(2)).toContainText("(current step)");
  });

  test("picking a tab swaps the screen on the stage", async ({ page }) => {
    await page.goto("/en");
    const list = tabs(page);
    await expect(list.getByRole("tab")).toHaveCount(3);
    await expect(list.getByRole("tab", { selected: true })).toContainText("Choose the right people");
    await expect(page.getByRole("img", { name: /DEUS Discover story scene/ })).toBeVisible();

    await list.getByRole("tab", { name: /Pay for performance you can prove/ }).click();
    await expect(list.getByRole("tab", { selected: true })).toContainText("Pay for performance you can prove");
    await expect(page.getByRole("img", { name: /DEUS Enhance bonus dashboard/ })).toBeVisible();
    await expect(page.getByRole("img", { name: /DEUS Discover story scene/ })).toBeHidden();

    await page.keyboard.press("ArrowUp");
    await expect(list.getByRole("tab", { selected: true })).toContainText("Find the potential you already have");
    await expect(page.getByRole("img", { name: /batch report: a cohort overview/ })).toBeVisible();
  });

  // The 3.5s timer is the progress bar's CSS animation, which a fake clock doesn't drive: real time.
  test("the tabs move on by themselves, and stop once the visitor picks one", async ({ page }) => {
    test.slow();
    await page.goto("/en");
    const list = tabs(page);
    const selected = list.getByRole("tab", { selected: true });
    await list.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0); // hovering the showcase pauses it
    await expect(selected).toContainText("Find the potential you already have", { timeout: 10_000 });

    await list.getByRole("tab", { name: /Choose the right people/ }).click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(6_000);
    await expect(selected).toContainText("Choose the right people");
  });
});

test.describe("Home remaining sections", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("the sections come in home.md's order", async ({ page }) => {
    await page.goto("/en");
    const headings = await page.getByRole("main").getByRole("heading", { level: 2 }).allTextContents();
    expect(headings).toEqual([
      "Most people decisions still run on thin, scattered evidence.",
      "One partner, from assessment to bonus.",
      "Three solutions, one idea: better evidence.",
      // the GBA, Enhance and Potentia spotlights are gone (D1)
      "What you can expect from us.",
    ]);
  });

  test("the proof row: 40+ brands, then the ten industries one at a time, and no logos while Q8 is open (F44)", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByText("Trusted by 40+ brands across Indonesia.")).toBeVisible();
    const ticker = page.locator(".industry-ticker");
    // screen readers get the list once; the moving words are hidden from them
    await expect(ticker.getByRole("listitem")).toHaveText(["Retail", "Telecommunications", "Education", "FMCG", "F&B", "Electronics", "Fashion", "Healthcare", "Manufacturing", "Finance"]);
    await expect(ticker.locator("[aria-hidden='true'] > span")).toHaveCount(10);
    // one word at a time, and it changes; hovering holds everything where it is
    const words = ticker.locator(".industry-ticker-word");
    const shown = () =>
      words.evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity === "1").map((el) => el.textContent));
    await expect.poll(async () => (await shown()).length).toBe(1);
    const first = (await shown())[0];
    await expect.poll(async () => (await shown())[0] ?? first, { timeout: 4000 }).not.toBe(first);
    await ticker.hover();
    const opacities = () => words.evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
    const held = await opacities();
    await page.waitForTimeout(3000);
    expect(await opacities()).toEqual(held);
    await expect(page.getByRole("link", { name: "Read client stories" })).toHaveAttribute("href", "/en/clients");
    // no client logo, and no "See all 40+", until the owner approves them (Q8)
    await expect(page.getByRole("link", { name: "See all 40+" })).toHaveCount(siteFlags.showLogoWall ? 1 : 0);
  });

  test("Explore our solutions lands on the products, each tile one link", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: "Explore our solutions" }).click();
    await expect(page).toHaveURL(/#solutions$/);
    const solutions = page.locator("#solutions");
    await expect(solutions).toBeInViewport();
    // three tiles (F10): Game-Based Assessment, which names its four modules, Enhance and Potentia
    await expect(solutions.getByRole("link")).toHaveCount(3);
    const gba = solutions.getByRole("link", { name: /Game-Based Assessment/ });
    await expect(gba).toHaveAttribute("href", "/en/solutions/game-based-assessment");
    await expect(gba).toContainText("Short online games that show how a candidate thinks, works and makes decisions.");
    await expect(solutions.getByRole("link", { name: /DEUS Enhance/ })).toHaveAttribute("href", "/en/solutions/enhance");
    const potentia = solutions.getByRole("link", { name: /Potentia/ });
    await expect(potentia).toHaveAttribute("href", /^https:\/\/deuspotentia\.com\/\?utm_source=deushcs\.com/);
    await expect(potentia).toHaveAttribute("target", "_blank");
  });

  test("the three solution cards are the same size and all in view at 1280×800 under their heading (F50)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/en");
    const heading = page.getByRole("heading", { name: "Three solutions, one idea: better evidence." });
    // the heading at the top of the screen, just under the sticky header
    const headerHeight = await page.locator("header").first().evaluate((el) => el.getBoundingClientRect().height);
    await heading.evaluate((el, offset) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - offset), headerHeight);
    const cards = page.locator("#solutions").getByRole("listitem");
    await expect(cards).toHaveCount(3);
    const boxes = await cards.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().toJSON() as DOMRect));
    for (const box of boxes) {
      expect(Math.round(box.width)).toBe(Math.round(boxes[0].width));
      expect(Math.round(box.height)).toBe(Math.round(boxes[0].height));
      expect(Math.round(box.top)).toBe(Math.round(boxes[0].top));
      expect(box.bottom).toBeLessThanOrEqual(800);
    }
    expect(await heading.evaluate((el) => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(headerHeight - 1);
  });

  test("the page still ends in the closing panel, with no Recognition section (F58, D2)", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("section[aria-labelledby='recognition-title']")).toHaveCount(0);
    await expect(page.getByText("Backed by Indonesia's startup ecosystem.")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Ready to transform with DEUS?" })).toBeVisible();
  });
});

test.describe("Home without motion or script", () => {
  test.use({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });

  // Reduced motion, so axe reads the journey's final colours rather than a frame of its fade-in.
  test("has no serious or critical accessibility violations", async ({ page }) => {
    await page.goto("/en");
    const results = await new AxeBuilder({ page }).analyze();
    const bad = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });

  test("with reduced motion the journey shows its final state and the tabs hold still", async ({ page }) => {
    await page.goto("/en");
    const now = steps(page).nth(2);
    await expect(now).toBeVisible();
    await expect(now).toHaveCSS("opacity", "1");
    await tabs(page).scrollIntoViewIfNeeded();
    await page.waitForTimeout(7_500);
    await expect(tabs(page).getByRole("tab", { selected: true })).toContainText("Choose the right people");
  });

  test.describe("without JavaScript", () => {
    test.use({ javaScriptEnabled: false });

    test("the hero, the journey and the first tab are all there", async ({ page }) => {
      await page.goto("/en");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(steps(page)).toHaveCount(3);
      await expect(page.getByText("Rina Wulandari")).toBeVisible();
      await expect(page.getByRole("img", { name: /DEUS Discover story scene/ })).toBeVisible();
    });
  });
});

test.describe("Home on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("nothing scrolls sideways, and the journey keeps its dates", async ({ page }) => {
    await page.goto("/en");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(journey(page).getByText("March 2026")).toBeVisible();
    await expect(tabs(page)).toBeVisible();
  });
});

// ---- Task 2.7: Phase 2 end to end -------------------------------------------------------------

const phase2Pages = [
  { name: "home", path: "/en" },
  { name: "about", path: "/en/about" },
  { name: "solutions", path: "/en/solutions" },
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

test.describe("Phase 2: links", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  for (const { name, path } of phase2Pages) {
    // No route is exempt: Task 2.6 gave every route Home links to a page or a placeholder, and 4.2 built the Telkom story.
    test(`${name}: every internal link returns 200 and every in-page anchor has its target`, async ({ page, request }) => {
      await page.goto(path);
      const internal = new Set<string>();
      const anchors = new Set<string>();
      for (const { href } of await hrefs(page)) {
        if (href.startsWith("#")) anchors.add(href.slice(1));
        else if (href.startsWith("/")) internal.add(href.split("#")[0].split("?")[0]);
      }
      expect(internal.size).toBeGreaterThan(0);

      const broken: string[] = [];
      for (const route of internal) {
        // No redirects followed: a link must point at its final page, not one that bounces elsewhere.
        const response = await request.get(route, { maxRedirects: 0 });
        if (response.status() !== 200) broken.push(`${route} -> ${response.status()}`);
      }
      expect(broken, broken.join("\n")).toEqual([]);

      const missing: string[] = [];
      for (const id of anchors) {
        if (id && (await page.locator(`[id="${id}"]`).count()) === 0) missing.push(`#${id}`);
      }
      expect(missing, missing.join("\n")).toEqual([]);
    });

    test(`${name}: every link that leaves the site opens in a new tab without handing over the window`, async ({ page }) => {
      await page.goto(path);
      const external = (await hrefs(page)).filter(({ href }) => /^(https?:)?\/\//.test(href));
      expect(external.length).toBeGreaterThan(0); // the WhatsApp or Potentia link, at least
      for (const { href, target, rel } of external) {
        expect(target, href).toBe("_blank");
        expect(rel, href).toMatch(/noopener/);
      }
    });

    test(`${name}: every Potentia link carries the UTM query`, async ({ page }) => {
      await page.goto(path);
      const potentia = (await hrefs(page)).filter(({ href }) => href.includes("deuspotentia.com"));
      expect(potentia.length).toBeGreaterThan(0);
      for (const { href, target, rel } of potentia) {
        const url = new URL(href);
        expect(url.origin, href).toBe("https://deuspotentia.com");
        expect(url.searchParams.get("utm_source"), href).toBe("deushcs.com");
        expect(url.searchParams.get("utm_medium"), href).toBe("referral");
        expect(target, href).toBe("_blank");
        expect(rel, href).toMatch(/noopener/);
      }
    });
  }

  test("Home reaches the pages its copy promises", async ({ page }) => {
    await page.goto("/en");
    const own = new Set((await hrefs(page)).map(({ href }) => href.split("#")[0]));
    for (const route of [
      "/en/contact",
      "/en/clients",
      "/en/solutions/enhance",
      "/en/solutions/game-based-assessment",
    ]) {
      expect(own, `Home links to ${route}`).toContain(route);
    }
    await expect(page.locator('a[href*="/solutions/discover"], a[href*="/solutions/next-chapter"]')).toHaveCount(0);
  });
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
        .filter((img) => !img.complete)
        .map((img) => new Promise((done) => ((img.onload = img.onerror = done), undefined))),
    );
    await document.fonts.ready;
    window.scrollTo(0, 0);
  });
}

test.describe("Phase 2: screenshots for the design review", () => {
  // Reduced motion shows everything at rest, so the full-page capture has no half-revealed
  // sections and no moving journey.
  test.use({ reducedMotion: "reduce" });
  test.setTimeout(90_000);

  const widths = [
    { label: "1280", width: 1280, height: 900 },
    { label: "390", width: 390, height: 844 },
  ];

  for (const { name, path } of phase2Pages) {
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

        mkdirSync("screenshots/phase-2", { recursive: true });
        await page.screenshot({ path: `screenshots/phase-2/${name}-${label}.png`, fullPage: true });
      });
    }
  }
});
