import { expect, test } from "@playwright/test";

// Task 3.4: the Discover page. Copy and the content shape are checked in the unit tests; here:
// what a visitor and a crawler get from the built page.

const PATH = "/en/solutions/discover";
const sections = ["measures", "how", "why", "customization", "reports", "beyond", "suite"];

test.describe("Discover page", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders the hero, every section and the closer, with the title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(
      "DEUS Discover: Gamified Personality and Competency Assessment | DEUS Human Capital Services",
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("heading", { level: 1, name: "Personality, revealed through a story." })).toBeVisible();
    for (const id of sections) {
      await expect(page.locator(`section#${id}`), id).toHaveCount(1);
    }
    await expect(
      page.getByRole("heading", { level: 2, name: "A questionnaire asks people who they are. A story shows you." }),
    ).toBeVisible();
    await expect(page.getByText("Try Discover")).toBeVisible();
  });

  test("the header and WhatsApp button are the assessment ones", async ({ page }) => {
    await page.goto(PATH);
    const header = page.getByRole("banner");
    await expect(header.getByRole("link", { name: "Request a free trial" })).toHaveAttribute(
      "href",
      "/en/contact?product=discover",
    );
    await expect(page.getByRole("link", { name: "Chat with us on WhatsApp" })).toHaveAttribute(
      "href",
      /text=Halo%20DEUS%2C%20saya%20tertarik%20dengan%20asesmen/,
    );
  });

  test("the hero buttons, the suite link and the closer go where the content says", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section[aria-labelledby='hero-title']");
    await expect(hero.getByRole("link", { name: "Request a demo" })).toHaveAttribute(
      "href",
      "/en/contact?product=discover",
    );
    await expect(hero.getByRole("link", { name: "Request a free trial" })).toHaveAttribute(
      "href",
      "/en/contact?product=discover",
    );
    await expect(page.locator("#suite").getByRole("link", { name: "See the full Game-Based Assessment suite" })).toHaveAttribute(
      "href",
      "/en/solutions/game-based-assessment",
    );
    await expect(page.getByRole("link", { name: "Request a demo" }).last()).toHaveAttribute(
      "href",
      "/en/contact?product=discover",
    );
  });

  test("the three measures read as big numbers, with their labels", async ({ page }) => {
    await page.goto(PATH);
    const measures = page.locator("#measures");
    await expect(measures.locator("dd")).toHaveText(["32", "24", "+ your own"]);
    await expect(measures.locator("dt")).toHaveText([
      "personality subtraits",
      "competency traits",
      "custom competencies",
    ]);
  });

  test("Reports: the personality report is the screenshot, and the profile report shows its TODO", async ({ page }) => {
    await page.goto(PATH);
    const reports = page.locator("#reports");
    await expect(reports.getByRole("img", { name: /individual report for one candidate/ })).toBeAttached();
    await expect(reports.locator("[data-report-scroll]")).toHaveCount(1);
    await expect(page.getByText("TODO: Discover individual profile suitability screenshot")).toBeVisible();
    await expect(reports.getByRole("heading", { name: "Individual profile suitability" })).toBeVisible();
  });

  test("the personality report scrolls with a CSS animation (not a script)", async ({ page }) => {
    await page.goto(PATH);
    const name = await page.evaluate(() => getComputedStyle(document.querySelector("#reports .report-scroll-image")!).animationName);
    expect(name).toBe("report-scroll");
  });

  test("the beyond-recruitment points and the closer's label are on the page", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#beyond").getByText("map leadership potential across the company")).toBeVisible();
    await expect(page.locator("#beyond").getByText("plan employee development")).toBeVisible();
  });

  test("without JavaScript, every section and both report screens are in the HTML", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(PATH);
    for (const id of sections) await expect(page.locator(`section#${id}`), id).toHaveCount(1);
    const html = await page.content();
    expect(html).toContain("Plays DEUS Discover");
    expect(html).toContain("Individual profile suitability");
    expect(html).toContain("TODO: Discover individual profile suitability screenshot");
    expect(html).toContain("map leadership potential across the company");
    // nothing is held back at opacity 0 before the script runs
    await expect(page.locator("[data-reveal='pending']")).toHaveCount(0);
    await context.close();
  });

  test("Indonesian has no Discover page yet, so it sends the visitor to English", async ({ page }) => {
    await page.goto("/id/solutions/discover");
    await expect(page).toHaveURL(/\/en\/solutions\/discover$/);
  });
});

test.describe("Discover page on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("doesn't scroll sideways, and the header keeps the trial button", async ({ page }) => {
    await page.goto(PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
    await expect(page.getByRole("banner").getByRole("link", { name: "Request a free trial" })).toBeVisible();
  });
});
