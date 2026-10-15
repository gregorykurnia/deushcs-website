import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Task 3.6: the Science page. Copy and the content shape are checked in the unit tests
// (tests/unit/assessment-content.test.ts); here: what a visitor and a crawler get from the built page.

const PATH = "/en/science";
const sections = ["frameworks", "process", "validated", "normed", "fair"];

test.describe("Science page", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders the hero and the closer, with the title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("The Science Behind DEUS Assessments | DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Games on the surface. Serious assessment underneath." }),
    ).toBeVisible();
    await expect(page.getByText("See the evidence")).toBeVisible();
  });

  test("the sections come in the order of the copy, each once", async ({ page }) => {
    await page.goto(PATH);
    const ids = await page.locator("main section[id]").evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual(sections);
  });

  test("each section heading reads as written", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#frameworks h2")).toHaveText("We didn't invent new theories. We built on proven ones.");
    await expect(page.locator("#process h2")).toHaveText("Four phases, before a single candidate plays.");
    await expect(page.locator("#validated h2")).toHaveText("Checked against the tests you already trust.");
    await expect(page.locator("#normed h2")).toHaveText("Your candidates are compared with people like them.");
    await expect(page.locator("#fair h2")).toHaveText(
      "Built so results reflect the candidate, not the circumstances.",
    );
  });

  test("the four frameworks are one tile each, in the order of the copy", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#frameworks li h3")).toHaveText([
      "Personality: the Big Five",
      "Behavior: neuroscience paradigms",
      "Thinking: cognitive assessment",
      "Children: CHC theory",
    ]);
  });

  test("the four development phases are a numbered list, in order", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#process ol > li h3")).toHaveText(["Theory", "Item development", "Validation", "Norming"]);
  });

  test("the validation section publishes no figures, since the copy has none yet", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#validated")).toContainText("convergent validity");
    await expect(page.locator("#validated")).not.toContainText(/\d/);
  });

  test("the Indonesia norms paragraph shows, and the claims held behind the owner's flags do not", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#normed")).toContainText("Our assessments are normed on the Indonesian population.");
    await expect(page.getByText("Many assessments used in Indonesia")).toHaveCount(0);
    await expect(page.locator("#partnership")).toHaveCount(0);
    await expect(page.getByText("Universitas Gadjah Mada")).toHaveCount(0);
  });

  test("the three fairness points are benefit panels, each with an icon", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#fair li h3")).toHaveText([
      "Hard to coach",
      "Anti-cheat checks",
      "The same experience for everyone",
    ]);
    await expect(page.locator("#fair li svg")).toHaveCount(3);
  });

  test("the header's and the closer's demo buttons go to the contact page", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole("banner").getByRole("link", { name: "Request a demo" })).toHaveAttribute(
      "href",
      "/en/contact",
    );
    await expect(page.locator("main").getByRole("link", { name: "Request a demo" })).toHaveAttribute(
      "href",
      "/en/contact",
    );
  });

  test("the language switch shows Bahasa Indonesia disabled, since Science is English only", async ({ page }) => {
    await page.goto(PATH);
    const lang = page.getByRole("navigation", { name: "Language", exact: true });
    await expect(lang.getByRole("link", { name: "Bahasa Indonesia (not available for this page yet)" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  test("without JavaScript, every section and the closer are in the HTML", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(PATH);
    for (const id of sections) await expect(page.locator(`section#${id}`), id).toHaveCount(1);
    const html = await page.content();
    expect(html).toContain("Hard to coach");
    expect(html).toContain("Norming");
    expect(html).toContain("See the evidence");
    // nothing is held back at opacity 0 before the script runs
    await expect(page.locator("[data-reveal='pending']")).toHaveCount(0);
    await context.close();
  });

  test("Indonesian has no Science page yet, so it sends the visitor to English", async ({ page }) => {
    await page.goto("/id/science");
    await expect(page).toHaveURL(/\/en\/science$/);
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    await page.goto(PATH);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });
});

test.describe("Science page on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("doesn't scroll sideways, and the header keeps the demo button", async ({ page }) => {
    await page.goto(PATH);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
    await expect(page.getByRole("banner").getByRole("link", { name: "Request a demo" })).toBeVisible();
  });
});
