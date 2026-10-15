import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Task 1.8: the privacy policy draft. The text's match with the `leads` table is checked in
// tests/unit/privacy-page.test.tsx; here: what a visitor gets from the built page.

const PATH = "/en/privacy";

test.describe("Privacy policy", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("renders the title, the sections in order and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Privacy Policy | DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("main").locator("h1, h2")).toHaveText([
      "Privacy policy",
      "Who we are",
      "What we collect",
      "Why we use it",
      "Who sees your data",
      "Data stored outside Indonesia",
      "How long we keep it",
      "How we protect it",
      "Your rights",
      "Changes to this policy",
      "Contact us",
    ]);
  });

  test("has no closing panel, and ends with email and WhatsApp links", async ({ page }) => {
    await page.goto(PATH);
    const main = page.getByRole("main");
    await expect(main.getByRole("link", { name: "Email us" })).toHaveAttribute("href", "mailto:admin@deushcs.com");
    await expect(main.getByRole("link", { name: /Chat on WhatsApp/ })).toHaveAttribute("href", /^https:\/\/wa\.me\/6282312121660/);
    await expect(page.locator("#closing-title")).toHaveCount(0);
  });

  test("the footer links here", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("contentinfo").getByRole("link", { name: "Privacy policy" }).click();
    await expect(page).toHaveURL(/\/en\/privacy$/);
  });

  test("the Indonesian address redirects to English until Phase 6", async ({ page }) => {
    await page.goto("/id/privacy");
    await expect(page).toHaveURL(/\/en\/privacy$/);
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    await page.goto(PATH);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });

  test("fits a phone with no horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
