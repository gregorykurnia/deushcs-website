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
      "Vision and mission",
      "Six values, one letter.",
      "2022 to today.",
      "Recognition and partners",
    ]);
    await expect(page.getByText("Leadership", { exact: true })).toHaveCount(0);
    await expect(page.getByText("Gregory Amadeus Kurnia")).toHaveCount(0);
  });

  test("vision and mission are both visible, with no tab or toggle", async ({ page }) => {
    await page.goto(PATH);
    const panels = page.locator("section[aria-labelledby='vision-mission-label']");
    await expect(panels.getByRole("heading", { level: 3, name: "Vision" })).toBeVisible();
    await expect(
      panels.getByText("Empowering organizations to achieve sustainable growth through human capital development."),
    ).toBeVisible();
    await expect(panels.getByRole("heading", { level: 3, name: "Mission" })).toBeVisible();
    await expect(panels.getByRole("tab")).toHaveCount(0);
  });

  test("the 6 I's are six panels", async ({ page }) => {
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
  });

  test("the timeline runs 2022 to 2026 and 2026 is the current step", async ({ page }) => {
    await page.goto(PATH);
    const timeline = page.getByRole("list", { name: "Our journey" });
    const years = timeline.locator(":scope > li");
    await expect(years).toHaveCount(5);
    await expect(years.first()).toContainText("2022");
    await expect(years.first()).toContainText("The beginning");
    await expect(years.last()).toContainText("2026");
    await expect(years.last()).toContainText("Wider coverage");
    await expect(years.last()).toContainText("(current step)");
    await expect(timeline.getByText("(current step)")).toHaveCount(1);
  });

  test("recognition names four recognitions with UGM, and Agate nowhere", async ({ page }) => {
    await page.goto(PATH);
    const section = page.locator("section[aria-labelledby='recognition-label']");
    await expect(section.getByRole("listitem")).toHaveCount(4);
    await expect(section.getByText("Startup Studio Indonesia, Batch 6")).toBeVisible();
    // about.md §7: UGM confirmed by the owner (showUgmPartnership on); Agate is not named (owner, 2026-10-15).
    await expect(section.getByText("Universitas Gadjah Mada")).toBeVisible();
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
    await expect(page.getByRole("list", { name: "Our journey" }).locator(":scope > li")).toHaveCount(5);
  });
});
