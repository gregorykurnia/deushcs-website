import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Task 2.5: the Solutions overview. The copy is checked in the content tests; here: what a visitor
// and a crawler get from the built page. Enhance's page is Phase 1's, so its link is checked by
// href, the way Home's spec checks it.

const PATH = "/en/solutions";

test.describe("Solutions overview", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("renders the headline, title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Solutions | DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Evidence for hiring, promotion and pay decisions." }),
    ).toBeVisible();
  });

  test("the three groups come in the mega menu's order, then the help block", async ({ page }) => {
    await page.goto(PATH);
    const headings = page.getByRole("main").locator("h1, h2");
    await expect(headings).toHaveText([
      "Evidence for hiring, promotion and pay decisions.",
      "Know who you're hiring, and who's ready to grow.",
      "Run fair appraisals, and pay for real performance.",
      "Help every child learn the way they learn best.",
      "Tell us the problem. We'll point you to the right tool.",
    ]);
  });

  test("each product's tile is followed by links to its use-case pages, and each answers 200 (G2.4)", async ({ page }) => {
    await page.goto(PATH);
    const assess = page.locator("section[aria-labelledby='assess-title']").getByRole("link", { name: /assessment$|promotions$/ });
    const perform = page.locator("section[aria-labelledby='perform-title']").getByRole("link", { name: "Linking performance appraisal to pay" });
    await expect(assess.filter({ hasText: /Management Trainee|Campus|Talent mapping/ })).toHaveText([
      "Management Trainee assessment",
      "Campus recruitment assessment",
      "Talent mapping and internal promotions",
    ]);
    await expect(perform).toHaveAttribute("href", "/en/solutions/performance-appraisal-and-pay");
    for (const link of [...(await assess.filter({ hasText: /Management Trainee|Campus|Talent mapping/ }).all()), perform]) {
      expect((await page.request.get((await link.getAttribute("href"))!)).status()).toBe(200);
    }
  });

  test("Assess: Game-Based Assessment is the group's one tile, full width, naming its four modules (F10)", async ({ page }) => {
    await page.goto(PATH);
    const tiles = page
      .locator("section[aria-labelledby='assess-title']")
      .getByRole("list")
      .locator(":scope > li");
    await expect(tiles).toHaveCount(1);
    await expect(tiles.nth(0)).toContainText("Game-Based Assessment");
    await expect(tiles.nth(0)).toContainText("Personality · DEUS Discover, Cognitive, Neuroscience and Simulation");
    const link = tiles.nth(0).getByRole("link");
    await expect(link).toHaveAttribute("href", "/en/solutions/game-based-assessment");
    expect((await link.boundingBox())?.width).toBeGreaterThan(900);
    await expect(page.getByText("Next Chapter")).toHaveCount(0);
  });

  test("Perform: Enhance is the group's one tile, full width, and it links to Enhance's page", async ({ page }) => {
    await page.goto(PATH);
    const perform = page.locator("section[aria-labelledby='perform-title']");
    await expect(perform.getByRole("list").locator(":scope > li")).toHaveCount(1);
    const enhance = perform.getByRole("link", { name: /DEUS Enhance/ });
    await expect(enhance).toHaveAttribute("href", "/en/solutions/enhance");
    // full width on desktop: in the two-column grid the tile would be about 600px wide
    const box = await enhance.boundingBox();
    expect(box?.width).toBeGreaterThan(900);
  });

  test("Education: Potentia opens in a new tab with the referral tags, and says it is in Indonesian", async ({
    page,
  }) => {
    await page.goto(PATH);
    const potentia = page
      .locator("section[aria-labelledby='education-title']")
      .getByRole("link", { name: /Potentia by DEUS/ });
    await expect(potentia).toHaveAttribute(
      "href",
      /^https:\/\/deuspotentia\.com\/?\?utm_source=deushcs\.com&utm_medium=referral$/,
    );
    await expect(potentia).toHaveAttribute("target", "_blank");
    await expect(potentia).toHaveAttribute("rel", /noopener/);
    await expect(potentia).toContainText("Visit Potentia (in Indonesian)");
  });

  test("the product pages the tiles link to resolve", async ({ page }) => {
    const overview = await page.goto(PATH);
    expect(overview?.status()).toBe(200);
    for (const path of ["/en/solutions/game-based-assessment", "/en/solutions/enhance"]) {
      const response = await page.request.get(path);
      expect(response.status(), path).toBe(200);
    }
  });

  test("the help block offers a call with the team, and a WhatsApp chat in a new tab", async ({ page }) => {
    await page.goto(PATH);
    const help = page.locator("section[aria-labelledby='help-title']");
    await expect(help.getByRole("link", { name: "Talk to us" })).toHaveAttribute("href", "/en/contact");
    const whatsapp = help.getByRole("link", { name: /Chat on WhatsApp/ });
    await expect(whatsapp).toHaveAttribute("href", /^https:\/\/wa\.me\/6282312121660\?text=/);
    await expect(whatsapp).toHaveAttribute("target", "_blank");
  });

  test("the language switch shows Bahasa Indonesia disabled, since the overview is English only", async ({
    page,
  }) => {
    await page.goto(PATH);
    const lang = page.getByRole("navigation", { name: "Language", exact: true });
    await expect(lang.getByRole("link", { name: "Bahasa Indonesia (not available for this page yet)" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  test("the Indonesian address goes to the English page", async ({ page }) => {
    await page.goto("/id/solutions");
    await expect(page).toHaveURL(/\/en\/solutions$/);
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });
});

test.describe("Solutions overview without JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });

  test("every group heading and tile is in the HTML", async ({ page }) => {
    await page.goto(PATH);
    // scoped to main: the header's mega menu also lists these products in the HTML
    const main = page.getByRole("main");
    await expect(main.locator("h2")).toHaveCount(4);
    await expect(main.getByRole("link", { name: /DEUS Enhance/ })).toBeVisible();
    await expect(main.getByRole("link", { name: /Potentia by DEUS/ })).toBeVisible();
  });
});

test.describe("Solutions overview on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("nothing scrolls sideways, and the Assess tiles stack in one column", async ({ page }) => {
    await page.goto(PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const tiles = page
      .locator("section[aria-labelledby='assess-title']")
      .getByRole("list")
      .locator(":scope > li");
    const lefts = await tiles.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().left)));
    expect(new Set(lefts).size).toBe(1);
  });
});
