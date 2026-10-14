import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// /styleguide, the 404 page and the interactive pieces from Tasks 0.9 and 0.10.

const noSideScroll = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

test.describe("styleguide", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("renders every component group, noindexed", async ({ page }) => {
    await page.goto("/en/styleguide");
    await expect(page.getByRole("heading", { level: 1, name: "Styleguide" })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    for (const name of [
      "One person, from first game to first bonus.",
      "One partner, from the first assessment to the last bonus decision.",
      "Four products, built on the same idea: better evidence about people.",
      "Candidates can't fake how they play.",
      "What you can expect from us.",
      "Soft fields that turn white on focus.",
      "Questions HR teams usually ask.",
      "Pricing, games and the use-case matrix.",
    ]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
    }
    await expect(page.getByRole("list", { name: "Example: one candidate from assessment to first bonus" }).locator(":scope > li")).toHaveCount(3);
  });

  test("Potentia tile and band open deuspotentia.com in a new tab, with UTM tags", async ({ page }) => {
    await page.goto("/en/styleguide");
    const tile = page.getByRole("link", { name: /Potentia by DEUS/ });
    await expect(tile).toHaveAttribute("target", "_blank");
    await expect(tile).toHaveAttribute("href", "https://deuspotentia.com/?utm_source=deushcs.com&utm_medium=referral");
    await expect(page.locator('[lang="id"]').getByRole("link", { name: /Kunjungi Potentia/ })).toHaveAttribute("target", "_blank");
  });

  test("Where we help: arrow keys move between tabs and stop autoplay", async ({ page }) => {
    await page.goto("/en/styleguide");
    const tabs = page.getByRole("tablist", { name: "From hire to reward" }).getByRole("tab");
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await tabs.nth(0).focus();
    await page.keyboard.press("ArrowDown");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(1)).toBeFocused();
    await page.keyboard.press("End");
    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    // picked by the visitor: the bar stops (no animation) and shows full
    await expect(tabs.nth(0).locator("i")).not.toHaveClass(/tab-progress/);
  });

  test("Where we help: autoplay moves on when the bar fills, while on screen", async ({ page }) => {
    await page.goto("/en/styleguide");
    const list = page.getByRole("tablist", { name: "From hire to reward" });
    // shorten the 7s dwell for the test
    await page.evaluate(() => document.documentElement.style.setProperty("--tab-dwell", "400ms"));
    await list.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0); // pointer outside, so autoplay isn't paused
    await expect(list.getByRole("tab").nth(1)).toHaveAttribute("aria-selected", "true", { timeout: 5000 });
    await expect(list.getByRole("tab").nth(2)).toHaveAttribute("aria-selected", "true", { timeout: 5000 });
  });

  test("segmented tabs switch panels; FAQ opens several answers at once", async ({ page }) => {
    await page.goto("/en/styleguide");
    const seg = page.getByRole("tablist", { name: "Report types" });
    await seg.getByRole("tab", { name: "Batch" }).click();
    await expect(page.getByText("Every candidate in an intake, side by side.")).toBeVisible();
    await expect(page.getByText("One candidate's profile, ready as soon as they finish.")).toBeHidden();
    await page.keyboard.press("ArrowRight");
    await expect(seg.getByRole("tab", { name: "Interactive" })).toHaveAttribute("aria-selected", "true");

    const answer1 = page.getByText("No. The assessment runs in a mobile or desktop browser.", { exact: false });
    const answer2 = page.getByText("Scores and reports are generated as soon as each candidate finishes.", { exact: false });
    await expect(answer1).toBeHidden();
    await page.getByText("Do candidates need to install anything?").click();
    await page.getByText("How quickly do we get results?").click();
    await expect(answer1).toBeVisible();
    await expect(answer2).toBeVisible();
  });

  test("long text toggle swaps the copy and keeps the page still", async ({ page }) => {
    await page.goto("/en/styleguide");
    await page.getByRole("link", { name: "Show long text" }).first().click();
    await expect(page).toHaveURL(/\?long=1$/);
    await expect(page.getByRole("heading", { level: 2, name: "Apa yang bisa Anda harapkan dari kami." })).toBeVisible();
  });

  test("has no serious or critical accessibility violations", async ({ page }) => {
    await page.goto("/en/styleguide");
    const results = await new AxeBuilder({ page }).analyze();
    const bad = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
});

test.describe("styleguide on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const path of ["/en/styleguide", "/en/styleguide?long=1"]) {
    test(`nothing overflows sideways: ${path}`, async ({ page }) => {
      await page.goto(path);
      expect(await noSideScroll(page)).toBe(0);
      // buttons never wrap (guide §3.3): one line of text each
      const wrapped = await page.locator('[data-slot="button"]').evaluateAll((buttons) =>
        buttons.filter((b) => b.getBoundingClientRect().height > 60).map((b) => b.textContent),
      );
      expect(wrapped).toEqual([]);
    });
  }

  test("the journey keeps its dates above stacked cards; the list table becomes cards", async ({ page }) => {
    await page.goto("/en/styleguide");
    const journey = page.getByRole("list", { name: "Example: one candidate from assessment to first bonus" });
    await expect(journey.getByText("April 2025")).toBeVisible();
    await expect(page.getByRole("list", { name: "Next Chapter cognitive games" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Recommended modules by use case" })).toBeVisible();
  });
});

test.describe("404", () => {
  test("unknown paths show the localized 404 panel with a 404 status", async ({ page }) => {
    const response = await page.goto("/en/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "This page has drifted out of orbit." })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "Go to the homepage" })).toHaveAttribute("href", "/en");
    await expect(page.getByRole("main").getByRole("link", { name: "See our solutions" })).toHaveAttribute("href", "/en/solutions");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
});
