import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Task 2.4: the About page. Copy and the content shape are checked in the unit tests; here: what a
// visitor and a crawler get from the built page.

const PATH = "/en/about";

test.describe("About", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("renders the headline, title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("About DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(
      page.getByRole("heading", { level: 1, name: "We believe people are a company's most important asset." }),
    ).toBeVisible();
  });

  test("the sections come in about.md's order, with leadership hidden (Q10)", async ({ page }) => {
    await page.goto(PATH);
    const headings = page.getByRole("main").locator("h1, h2");
    await expect(headings).toHaveText([
      "We believe people are a company's most important asset.",
      "It started with a game.",
      "Delivering evidence-based solutions that help organizations understand, develop, and optimize the best potential of every individual.",
      "Six values, one letter.",
      "2022 to today.",
    ]);
    await expect(page.getByText("Leadership", { exact: true })).toHaveCount(0);
    await expect(page.getByText("Gregory Amadeus Kurnia")).toHaveCount(0);
  });

  test("one mission section, the vision under the statement, no tab or toggle (D14)", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("section[aria-labelledby='vision-mission-label']")).toHaveCount(0);
    const mission = page.locator("section[aria-labelledby='mission-title']");
    await expect(mission.getByRole("heading", { level: 3, name: "Our vision" })).toBeVisible();
    await expect(
      mission.getByText("Empowering organizations to achieve sustainable growth through human capital development."),
    ).toBeVisible();
    await expect(page.getByRole("main").getByText(/^Delivering evidence-based solutions/)).toHaveCount(1);
    await expect(mission.getByRole("tab")).toHaveCount(0);
  });

  test("the 6 I's are a plain list of six, no panels (F90)", async ({ page }) => {
    await page.goto(PATH);
    const values = page.locator("section[aria-labelledby='values-title']");
    await expect(values.getByRole("heading", { level: 3 })).toHaveText([
      "Innovative",
      "Inspiring",
      "Invested in our clients",
      "Inclusive",
      "Insightful",
      "Improvement oriented",
    ]);
    // no card boxes: each value sits on the section's own background
    const backgrounds = await values
      .locator("li")
      .evaluateAll((items) => items.map((li) => getComputedStyle(li).backgroundColor));
    expect(backgrounds).toEqual(Array(6).fill("rgba(0, 0, 0, 0)"));
  });

  test("the timeline runs 2022 to 2026 and 2026 is the current step", async ({ page }) => {
    await page.goto(PATH);
    const timeline = page.getByRole("list", { name: "Our history" });
    const years = timeline.locator(":scope > li");
    await expect(years).toHaveCount(5);
    await expect(years.first()).toContainText("2022");
    await expect(years.first()).toContainText("The beginning");
    await expect(years.last()).toContainText("2026");
    await expect(years.last()).toContainText("Wider coverage");
    await expect(years.last()).toContainText("(current step)");
    await expect(timeline.getByText("(current step)")).toHaveCount(1);
  });

  test("the journey's dots are alike, no ember, and fill in one after another as it comes into view (F91)", async ({ page }) => {
    await page.goto(PATH);
    const dots = page.locator("section[aria-labelledby='timeline-title'] .timeline-dot");
    await expect(dots).toHaveCount(5);
    const fills = () => dots.evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor));
    // below the fold: empty, waiting (once the page's script has run)
    await expect.poll(fills).toEqual(Array(5).fill("rgb(255, 255, 255)"));
    await dots.first().scrollIntoViewIfNeeded();
    await expect.poll(fills).toEqual(Array(5).fill("rgb(37, 99, 235)"));
  });

  test("recognition is cut (F92, D2); the timeline keeps its facts and the page has no Agate", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("section[aria-labelledby='recognition-label']")).toHaveCount(0);
    const timeline = page.locator("section[aria-labelledby='timeline-title']");
    await expect(timeline.getByText(/Startup Studio/).first()).toBeVisible();
    await expect(timeline.getByText(/Innovfest/).first()).toBeVisible();
    await expect(page.getByRole("main").getByText("Agate")).toHaveCount(0);
  });

  test("the legal entity is not on the page (F30; it stays in the footer and the privacy policy), and the closing panel follows", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole("main").getByText("PT Investama Persada Kurnia")).toHaveCount(0);
    await expect(page.getByRole("main").getByText("[Address")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Request a demo" }).last()).toHaveAttribute("href", "/en/contact");
  });

  test("the language switch shows Bahasa Indonesia disabled, since About is English only", async ({ page }) => {
    await page.goto(PATH);
    const lang = page.getByRole("navigation", { name: "Language", exact: true });
    await expect(lang.getByRole("link", { name: "Bahasa Indonesia (not available for this page yet)" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    await page.goto(PATH);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });
});

test.describe("About on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("nothing scrolls sideways, and the timeline is a vertical list of five", async ({ page }) => {
    await page.goto(PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(page.getByRole("list", { name: "Our history" }).locator(":scope > li")).toHaveCount(5);
  });
});

test.describe("About with reduced motion", () => {
  test.use({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });

  test("the journey's dots are all filled from the start", async ({ page }) => {
    await page.goto(PATH);
    const dots = page.locator("section[aria-labelledby='timeline-title'] .timeline-dot");
    await expect(dots).toHaveCount(5);
    const fills = await dots.evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor));
    expect(fills).toEqual(Array(5).fill("rgb(37, 99, 235)"));
  });
});
