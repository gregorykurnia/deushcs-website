import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { clientsEn } from "@/content/en/clients";
import { siteFlags } from "@/content/flags";

// Task 4.3: the Clients hub. Copy and the content shape are checked in the unit tests
// (tests/unit/clients-content.test.ts); here: what a visitor and a crawler get from the built page.
// The story card follows the Q7 and Q11 switches, the same way the unit tests do.

const PATH = "/en/clients";
const wallShows = siteFlags.showLogoWall && clientsEn.logoWall.wall.length > 0;
const telkom = siteFlags.telkomNamed
  ? { slug: "telkom-group", client: "Telkom Group" }
  : { slug: "national-telecom-group", client: "A national telecom group" };

test.describe("Clients hub", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders the hero, with the title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Clients and Client Stories | DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Trusted by 40+ brands across Indonesia." }),
    ).toBeVisible();
  });

  test("the sections come in the order of the copy, and the logo wall waits for Q8", async ({ page }) => {
    await page.goto(PATH);
    const ids = await page.locator("main section[id]").evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual(wallShows ? ["logos", "industries", "stories"] : ["industries", "stories"]);
  });

  test("each section heading reads as written", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#industries h2")).toHaveText("Where our clients work.");
    await expect(page.locator("#stories h2")).toHaveText("Real programs, real results.");
  });

  test("the six industries rotate one at a time, listed once for screen readers in the order of the copy (F81)", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#industries .industry-ticker-word")).toHaveCount(6);
    await expect(page.locator("#industries .industry-ticker > [aria-hidden='true']")).toBeVisible();
    await expect(page.locator("#industries ul > li")).toHaveText([
      "Retail",
      "Telecommunications",
      "Education",
      "FMCG",
      "F&B",
      "Electronics",
    ]);
  });

  test("the Telkom card carries its product, its client and its result, and links to its story", async ({ page }) => {
    await page.goto(PATH);
    const card = page.locator("#stories li").first();
    await expect(card.getByRole("link")).toHaveAttribute("href", `/en/clients/${telkom.slug}`);
    await expect(card).toContainText("Game-Based Assessment");
    await expect(card).toContainText(telkom.client);
    await expect(card.getByRole("heading", { level: 3 })).toHaveText(
      "1,000+ Management Trainee candidates across 30+ provinces, with results in one day.",
    );
    await expect(card).toContainText("Read the story");
  });

  test("Telkom is not named on the hub while Q7 is open", async ({ page }) => {
    test.skip(siteFlags.telkomNamed, "telkomNamed is on: the client is named");
    await page.goto(PATH);
    await expect(page.locator("main")).not.toContainText("Telkom");
  });

  test("Calvin's card is held until Q11 is confirmed", async ({ page }) => {
    test.skip(siteFlags.publishCalvin, "publishCalvin is on: the card shows");
    await page.goto(PATH);
    await expect(page.locator("#stories li")).toHaveCount(1);
    await expect(page.locator("main")).not.toContainText("Calvin");
  });

  test("Calvin's card shows, flagged as Indonesian, once Q11 is confirmed", async ({ page }) => {
    test.skip(!siteFlags.publishCalvin, "publishCalvin is off: the card is held");
    await page.goto(PATH);
    await expect(page.locator("#stories li")).toHaveCount(2);
    await expect(page.locator("#stories li").nth(1)).toContainText("Story is in Indonesian");
  });

  test("the closer: its heading, the demo button to contact, and the WhatsApp button", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#closing-title")).toHaveText("Want results like these?");
    await expect(page.locator("main").getByRole("link", { name: "Request a demo" })).toHaveAttribute(
      "href",
      "/en/contact",
    );
    await expect(page.locator("main").getByRole("link", { name: /Chat on WhatsApp/ })).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\//,
    );
  });

  test("the language switch shows Bahasa Indonesia disabled, since the hub is English only", async ({ page }) => {
    await page.goto(PATH);
    const lang = page.getByRole("navigation", { name: "Language", exact: true });
    await expect(lang.getByRole("link", { name: "Bahasa Indonesia (not available for this page yet)" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  test("Indonesian has no clients hub, so it sends the visitor to English", async ({ page }) => {
    await page.goto("/id/clients");
    await expect(page).toHaveURL(/\/en\/clients$/);
  });

  test("without JavaScript, the sections, the cards and the closer are in the HTML", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(PATH);
    await expect(page.locator("#industries")).toHaveCount(1);
    await expect(page.locator("#stories")).toHaveCount(1);
    const html = await page.content();
    expect(html).toContain("Telecommunications");
    expect(html).toContain("Management Trainee candidates");
    // the closer's heading is split into lines, so read it from the DOM rather than the raw HTML
    await expect(page.locator("#closing-title")).toHaveText("Want results like these?");
    // nothing is held back at opacity 0 before the script runs
    await expect(page.locator("[data-reveal='pending']")).toHaveCount(0);
    await context.close();
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    await page.goto(PATH);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });
});

test.describe("Clients hub on a phone", () => {
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

test.describe("Clients hub with reduced motion", () => {
  test.use({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });

  test("the industries are one still line, and the rotating words are gone", async ({ page }) => {
    await page.goto(PATH);
    const list = page.locator("#industries ul");
    await expect(list.getByText("Telecommunications", { exact: true })).toBeVisible();
    const box = await list.boundingBox();
    expect(box?.height).toBeGreaterThan(20);
    await expect(page.locator("#industries .industry-ticker > [aria-hidden='true']")).toBeHidden();
  });
});
