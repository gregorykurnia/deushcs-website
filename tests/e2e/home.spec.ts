import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Home (Tasks 2.2 and 2.3): the hero with its sky window, "From hire to reward", and the rest of
// the page. Task 2.7 adds the link checks for the whole page.

const journey = (page: Page) =>
  page.getByRole("list", { name: "Example: one candidate from assessment to first bonus" });
/** The journey's own steps, not the trait rows inside the profile card. */
const steps = (page: Page) => journey(page).locator(":scope > li");
const tabs = (page: Page) =>
  page.getByRole("tablist", { name: "One partner, from the first assessment to the last bonus decision." });

test.describe("Home hero and From hire to reward", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("the hero shows the headline, both buttons and the three-step journey", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hire on evidence. Reward on evidence.");
    await expect(page.getByRole("main").getByRole("link", { name: "Request a demo" })).toHaveAttribute("href", "/en/contact");
    await expect(page.getByRole("link", { name: "Explore our solutions" })).toHaveAttribute("href", "#solutions");

    const step = steps(page);
    await expect(step).toHaveCount(3);
    await expect(step.nth(0)).toContainText("March 2025, assessed");
    await expect(step.nth(1)).toContainText("Rina Wulandari");
    await expect(step.nth(2)).toContainText("Approved");
    await expect(step.nth(2)).toContainText("(current step)");
  });

  test("picking a tab swaps the screen on the stage", async ({ page }) => {
    await page.goto("/en");
    const list = tabs(page);
    await expect(list.getByRole("tab")).toHaveCount(3);
    await expect(list.getByRole("tab", { selected: true })).toContainText("Choose the right people");
    await expect(page.getByRole("img", { name: "Next Chapter numerical reasoning game" })).toBeVisible();

    await list.getByRole("tab", { name: /Pay for performance you can prove/ }).click();
    await expect(list.getByRole("tab", { selected: true })).toContainText("DEUS Enhance");
    await expect(page.getByRole("img", { name: "DEUS Enhance performance appraisal dashboard" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Next Chapter numerical reasoning game" })).toBeHidden();

    await page.keyboard.press("ArrowUp");
    await expect(list.getByRole("tab", { selected: true })).toContainText("Find the potential you already have");
    await expect(page.getByText("TODO: GBA batch report screenshot")).toBeVisible();
  });

  // The 7s timer is the progress bar's CSS animation, which a fake clock doesn't drive: real time.
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
    await page.waitForTimeout(8_000);
    await expect(selected).toContainText("Choose the right people");
  });
});

test.describe("Home remaining sections", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("the sections come in home.md's order", async ({ page }) => {
    await page.goto("/en");
    const headings = await page.getByRole("main").getByRole("heading", { level: 2 }).allTextContents();
    expect(headings).toEqual([
      "Most people decisions still run on thin evidence.",
      "One partner, from the first assessment to the last bonus decision.",
      "Four products, built on the same idea: better evidence about people.",
      "Candidates can't fake how they play.",
      "From scattered data to better decisions.",
      "What you can expect from us.",
      "Backed by Indonesia's startup ecosystem.",
      "Kita tahu nilai rapor anak. Tapi seberapa kenal kita dengan cara mereka belajar?",
    ]);
  });

  test("the proof row shows the six industries and no logos while Q8 is open", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByText("Trusted by 40+ brands")).toBeVisible();
    await expect(page.getByText("Telecommunications", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Read client stories" })).toHaveAttribute("href", "/en/clients");
  });

  test("Explore our solutions lands on the products, each tile one link", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: "Explore our solutions" }).click();
    await expect(page).toHaveURL(/#solutions$/);
    const solutions = page.locator("#solutions");
    await expect(solutions).toBeInViewport();
    await expect(solutions.getByRole("link", { name: /DEUS Enhance/ })).toHaveAttribute("href", "/en/solutions/enhance");
    await expect(solutions.getByRole("link", { name: /DEUS Discover/ })).toHaveAttribute("href", "/en/solutions/discover");
    await expect(solutions.getByRole("link", { name: /Next Chapter/ })).toHaveAttribute("href", "/en/solutions/next-chapter");
    const potentia = solutions.getByRole("link", { name: /Potentia/ });
    await expect(potentia).toHaveAttribute("href", /^https:\/\/deuspotentia\.com\/\?utm_source=deushcs\.com/);
    await expect(potentia).toHaveAttribute("target", "_blank");
  });

  test("the assessment spotlight shows three game tiles and the recording log", async ({ page }) => {
    await page.goto("/en");
    const spotlight = page.getByRole("region", { name: "Candidates can't fake how they play." });
    for (const name of ["Personality", "Cognitive", "Neuroscience", "Business simulation"]) {
      await expect(spotlight.getByText(name, { exact: true }).first()).toBeVisible();
    }
    await expect(spotlight.getByText("Recording this scene")).toBeVisible();
    await expect(spotlight.getByRole("link", { name: "See how game-based assessment works" })).toHaveAttribute(
      "href",
      "/en/solutions/game-based-assessment",
    );
  });

  test("the Potentia band is in Indonesian and opens deuspotentia.com in a new tab", async ({ page }) => {
    await page.goto("/en");
    const band = page.locator('[lang="id"]').filter({ hasText: "Kunjungi Potentia" });
    await expect(band).toBeVisible();
    const link = band.getByRole("link", { name: /Kunjungi Potentia/ });
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  });

  test("the page still ends in the closing panel", async ({ page }) => {
    await page.goto("/en");
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
      await expect(page.getByRole("img", { name: "Next Chapter numerical reasoning game" })).toBeVisible();
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
