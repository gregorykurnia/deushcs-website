import { expect, test, type Page } from "@playwright/test";

// The per-change gate (CLAUDE.md): the shells render, the shared furniture is there, the site
// stays out of search engines, and a bad path gets the 404 page. Fast on purpose. The detail of
// each piece is in its own spec (header, closing-footer, styleguide).

const header = (page: Page) => page.getByRole("banner");
const footer = (page: Page) => page.getByRole("contentinfo");
const whatsApp = (page: Page) => page.getByRole("link", { name: "Chat with us on WhatsApp" });

test.describe("smoke", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("/en shell: header, main, footer and WhatsApp button", async ({ page }) => {
    const response = await page.goto("/en");
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(header(page)).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(footer(page)).toBeVisible();
    await expect(whatsApp(page)).toHaveAttribute("href", /^https:\/\/wa\.me\/6282312121660\?text=/);
  });

  // Home is English only until Phase 6, so /id sends the visitor to /en (IMPLEMENTATION_PLAN.md,
  // review focus 4). When the Indonesian Home arrives, this goes back to checking an /id shell.
  test("/id redirects to the English Home until it is translated", async ({ page }) => {
    const response = await page.goto("/id");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(header(page)).toBeVisible();
  });

  test("/en/styleguide renders, and is noindexed", async ({ page }) => {
    const response = await page.goto("/en/styleguide");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: "Styleguide" })).toBeVisible();
    await expect(header(page)).toBeVisible();
    await expect(footer(page)).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("a path that doesn't exist renders the 404 page with the shell around it", async ({ page }) => {
    const response = await page.goto("/en/no-such-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "This page has drifted out of orbit." })).toBeVisible();
    await expect(header(page)).toBeVisible();
    await expect(footer(page)).toBeVisible();
  });

  test("GET /robots.txt disallows everything until launch", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/plain");
    const body = await response.text();
    expect(body).toMatch(/^User-Agent: \*$/im);
    expect(body).toMatch(/^Disallow: \/$/m);
    expect(body).not.toMatch(/^Allow:/im);
  });

  test("pages carry noindex and the site name in the title", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle("DEUS Human Capital Services | Game-Based Assessment and Performance Management");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  });

  test("the favicon and app icons are served", async ({ request }) => {
    for (const path of ["/favicon.ico", "/icon.png", "/apple-icon.png"]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      expect(response.headers()["content-type"], path).toMatch(/image\//);
    }
  });

  // From Task 0.7: the floating button gets out of the way of the contact bar.
  test("WhatsApp button hides when the contact bar is visible", async ({ page }) => {
    await page.goto("/en");
    // make sure the page is long enough that the contact bar starts off screen
    await page.evaluate(() => (document.body.style.minHeight = "3000px"));
    const button = whatsApp(page);
    const bar = page.getByRole("group", { name: "Contact us" });
    await expect(button).toBeVisible();

    await bar.scrollIntoViewIfNeeded();
    await expect(button).toHaveCSS("opacity", "0");
    await expect(button).toHaveAttribute("inert", "");

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(button).toHaveCSS("opacity", "1");
    await expect(button).not.toHaveAttribute("inert");
  });
});
