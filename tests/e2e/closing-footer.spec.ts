import { expect, test, type Page } from "@playwright/test";

// Closing panel, footer and floating WhatsApp button (Task 0.7, DESIGN-GUIDE.md §7.18, §7.19, §7.26). The button-hides-at-the-contact-bar test lives in smoke.spec.ts.

// The scaffold home page is short enough to show the contact bar at the top; push it down.
const tallPage = (page: Page) => page.evaluate(() => (document.body.style.minHeight = "3000px"));

const waLink = /^https:\/\/wa\.me\/6282312121660\?text=/;

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("closing panel has the default copy, two buttons and the contact bar", async ({ page }) => {
    await page.goto("/en");
    const panel = page.getByRole("region", { name: /Ready to transform/ });
    await expect(panel.getByRole("heading", { level: 2 })).toHaveText("Ready to transform with DEUS?");
    await expect(panel.getByRole("link", { name: "Request a demo" })).toHaveAttribute("href", "/en/contact");
    await expect(panel.getByRole("link", { name: /^Chat on WhatsApp/ }).first()).toHaveAttribute("href", waLink);

    const bar = panel.getByRole("group", { name: "Contact us" });
    await expect(bar.getByRole("link", { name: /\+62 823-1212-1660/ })).toHaveAttribute("href", waLink);
    await expect(bar.getByRole("link", { name: /admin@deushcs\.com/ })).toHaveAttribute(
      "href",
      "mailto:admin@deushcs.com",
    );
  });

  test("footer has four columns, the owner's link order and the language links", async ({ page }) => {
    await page.goto("/en");
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByText("Game-based assessment and performance management for Indonesian companies.")).toBeVisible();
    await expect(footer.getByRole("list", { name: "Solutions" }).getByRole("link")).toHaveText([
      "Game-Based Assessment",
      "DEUS Discover",
      "Next Chapter",
      "DEUS Enhance",
      /Potentia/,
    ]);
    await expect(footer.getByRole("list", { name: "Company" }).getByRole("link")).toHaveText([
      "Clients",
      "Science",
      "About",
      "Contact",
    ]);
    await expect(footer.getByRole("link", { name: "Privacy policy" })).toHaveAttribute("href", "/en/privacy");
    await expect(footer.getByText("PT Investama Persada Kurnia")).toBeVisible();
    await expect(footer.getByText("© 2026 DEUS Human Capital Services")).toBeVisible();

    const potentia = footer.getByRole("link", { name: /Potentia/ });
    await expect(potentia).toHaveAttribute("target", "_blank");
    await expect(potentia).toHaveAttribute("href", "https://deuspotentia.com/?utm_source=deushcs.com&utm_medium=referral");

    // Home is English only until Phase 6, so Indonesian shows disabled here.
    const lang = footer.getByRole("navigation", { name: "Language options in the footer" });
    await expect(lang.getByRole("link", { name: "English" })).toHaveAttribute("aria-current", "true");
    await expect(lang.getByRole("link", { name: "Bahasa Indonesia (not available for this page yet)" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  test("footer language links switch a page that exists in both languages", async ({ page }) => {
    await page.goto("/en/styleguide");
    const lang = page.getByRole("contentinfo").getByRole("navigation", { name: "Language options in the footer" });
    await lang.getByRole("link", { name: "Bahasa Indonesia" }).click();
    await expect(page).toHaveURL(/\/id\/styleguide$/);
  });

  test("floating WhatsApp button opens the page's chat and shows a tooltip on hover", async ({ page }) => {
    await page.goto("/en");
    await tallPage(page);
    const button = page.getByRole("link", { name: "Chat with us on WhatsApp" });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("href", waLink);
    await expect(button).toHaveAttribute("target", "_blank");
    const box = await button.boundingBox();
    expect(box?.width).toBe(56);
    expect(box?.height).toBe(56);
    // 24px from the right and bottom edges
    expect(1280 - (box!.x + box!.width)).toBe(24);
    expect(800 - (box!.y + box!.height)).toBe(24);

    const tooltip = button.locator("span[aria-hidden]");
    await expect(tooltip).toHaveCSS("opacity", "0");
    await button.hover();
    await expect(tooltip).toHaveCSS("opacity", "1");
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("closing panel and footer fit at 390px and the button sits 16px from the edges", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

    const box = await page.getByRole("link", { name: "Chat with us on WhatsApp" }).boundingBox();
    expect(390 - (box!.x + box!.width)).toBe(16);
    expect(844 - (box!.y + box!.height)).toBe(16);

    // contact bar becomes a column
    const bar = page.getByRole("group", { name: "Contact us" });
    const [wa, mail] = await Promise.all([bar.getByRole("link").nth(0).boundingBox(), bar.getByRole("link").nth(1).boundingBox()]);
    expect(mail!.y).toBeGreaterThan(wa!.y);
  });
});
