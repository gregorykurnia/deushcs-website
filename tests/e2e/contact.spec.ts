import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Task 1.7: the Contact page. The form's sending is LeadForm's (tests/leads, Task 1.4); here: what a
// visitor and a crawler get from the built page, and that `?product=` preselects the product.

const PATH = "/en/contact";

test.describe("Contact page", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders the hero, the form and the side column, with the title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Contact DEUS | Request a Demo | DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("heading", { level: 1, name: "Let's talk about your people." })).toBeVisible();
    const form = page.locator("main form");
    await expect(form).toHaveCount(1);
    await expect(form.locator("input[name='formType']")).toHaveValue("contact");
    await expect(form.getByRole("radiogroup", { name: /What are you interested in\?/ })).toBeVisible();
    await expect(form.getByRole("button", { name: "Send message" })).toBeVisible();
  });

  test("has no closing panel and no floating WhatsApp button, but the side column's links", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("[data-contact-bar]")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Chat with us on WhatsApp" })).toHaveCount(0);
    const main = page.getByRole("main");
    await expect(main.getByRole("link", { name: "Chat on WhatsApp" })).toHaveAttribute("href", /wa\.me\/6282312121660/);
    await expect(main.getByRole("link", { name: "Send an email" })).toHaveAttribute("href", "mailto:admin@deushcs.com");
    await expect(main.getByRole("link", { name: /Visit Potentia \(in Indonesian\)/ })).toHaveAttribute(
      "href",
      /^https:\/\/deuspotentia\.com\//,
    );
  });

  test("hides the office address until Q9 is answered", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole("main").getByText("Office", { exact: true })).toHaveCount(0);
  });

  test("with nothing in the URL no product is chosen", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("main form input[name='productInterest']:checked")).toHaveCount(0);
  });

  test("?product=enhance preselects DEUS Enhance", async ({ page }) => {
    await page.goto(`${PATH}?product=enhance`);
    await expect(page.getByRole("radio", { name: "DEUS Enhance" })).toBeChecked();
  });

  test("an unknown ?product= is ignored", async ({ page }) => {
    await page.goto(`${PATH}?product=pricing`);
    await expect(page.locator("main form input[name='productInterest']:checked")).toHaveCount(0);
  });

  test("the preselected product can be changed", async ({ page }) => {
    await page.goto(`${PATH}?product=discover`);
    await expect(page.getByRole("radio", { name: "DEUS Discover" })).toBeChecked();
    await page.getByText("Not sure yet").click();
    await expect(page.getByRole("radio", { name: "Not sure yet" })).toBeChecked();
  });

  test("the header marks Contact as the current page", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole("banner").getByRole("link", { name: "Contact" })).toHaveAttribute("aria-current", "page");
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    await page.goto(PATH);
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(violations.filter((v) => v.impact === "serious" || v.impact === "critical")).toEqual([]);
  });

  test("the Indonesian address redirects to the English page", async ({ page }) => {
    await page.goto("/id/contact");
    await expect(page).toHaveURL(/\/en\/contact$/);
  });
});

test.describe("Contact page without JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });

  // ?product= is read by script, so without it the visitor picks the product themselves
  test("the form and the side column are in the HTML", async ({ page }) => {
    await page.goto(`${PATH}?product=enhance`);
    await expect(page.locator("main form")).toHaveCount(1);
    await expect(page.getByRole("radio", { name: "DEUS Enhance" })).not.toBeChecked();
    await expect(page.getByRole("link", { name: "Send an email" })).toBeVisible();
    await expect(page.locator("[data-reveal='pending']")).toHaveCount(0);
  });
});

test.describe("Contact page on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("doesn't scroll sideways, and the form comes before the side column", async ({ page }) => {
    await page.goto(PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
    const formTop = await page.locator("main form").evaluate((el) => el.getBoundingClientRect().top);
    const sideTop = await page.getByRole("link", { name: "Chat on WhatsApp" }).evaluate((el) => el.getBoundingClientRect().top);
    expect(formTop).toBeLessThan(sideTop);
  });
});
