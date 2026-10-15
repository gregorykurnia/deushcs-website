import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Task 1.7: the Contact page. Copy and the product mapping are checked in the unit tests; here: what a
// visitor and a crawler get from the built page, and that the form is there and reads ?product=. Sending
// a lead is LeadForm's (tests/leads, Task 1.4), so nothing is submitted here.

const PATH = "/en/contact";
const productGroup = (page: Page) => page.getByRole("radiogroup", { name: "What are you interested in?" });

test.describe("Contact page", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders the hero and the form, with the title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Contact DEUS | Request a Demo | DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("heading", { level: 1, name: "Let's talk about your people." })).toBeVisible();
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  });

  test("has the contact form's fields", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByLabel("Full name", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Work email", { exact: true })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Company", exact: true })).toBeVisible();
    await expect(page.getByLabel("Your role", { exact: true })).toBeVisible();
    await expect(page.getByLabel(/WhatsApp number/)).toBeVisible();
    await expect(productGroup(page).getByRole("radio")).toHaveCount(5);
    await expect(page.getByRole("radiogroup", { name: "Company size" }).getByRole("radio")).toHaveCount(4);
    await expect(page.getByLabel(/How many candidates or employees would this cover/)).toBeVisible();
    await expect(page.getByLabel(/How can we help/)).toBeVisible();
    await expect(page.getByRole("checkbox", { name: /I agree that DEUS may contact me/ })).toBeVisible();
  });

  test("?product=enhance preselects DEUS Enhance, and only that", async ({ page }) => {
    await page.goto(`${PATH}?product=enhance`);
    await expect(productGroup(page).getByRole("radio", { name: "DEUS Enhance", exact: true })).toBeChecked();
    await expect(productGroup(page).getByRole("radio", { checked: true })).toHaveCount(1);
  });

  test("an unknown ?product= is ignored and nothing is preselected", async ({ page }) => {
    await page.goto(`${PATH}?product=bogus`);
    await page.waitForLoadState("networkidle");
    await expect(productGroup(page).getByRole("radio")).toHaveCount(5);
    await expect(productGroup(page).getByRole("radio", { checked: true })).toHaveCount(0);
  });

  test("the side column links WhatsApp, email and Potentia, and shows no office address", async ({ page }) => {
    await page.goto(PATH);
    const side = page.locator("aside");
    await expect(side.getByRole("link", { name: /Chat on WhatsApp/ })).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/6282312121660\?text=/,
    );
    await expect(side.getByRole("link", { name: "Send an email" })).toHaveAttribute("href", "mailto:admin@deushcs.com");
    await expect(side.getByRole("link", { name: /Visit Potentia/ })).toHaveAttribute(
      "href",
      /utm_source=deushcs\.com/,
    );
    await expect(side).not.toContainText("Office");
    await expect(side).not.toContainText("Hours");
  });

  test("has no closing panel and no floating WhatsApp button", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("section[aria-labelledby='closing-title']")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Chat with us on WhatsApp" })).toHaveCount(0);
  });

  test("the Indonesian page redirects to the English one", async ({ page }) => {
    await page.goto("/id/contact");
    await expect(page).toHaveURL(/\/en\/contact$/);
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    await page.goto(PATH);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });

});

test.describe("Contact page without JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });

  test("the form and its fields are in the HTML", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByLabel("Work email", { exact: true })).toBeVisible();
    await expect(productGroup(page).getByRole("radio")).toHaveCount(5);
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
  });
});

test.describe("Contact page on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("doesn't scroll sideways", async ({ page }) => {
    await page.goto(PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    await page.goto(PATH);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
