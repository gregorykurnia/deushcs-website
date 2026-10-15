import { expect, test } from "@playwright/test";

// Header behaviour (Task 0.6, DESIGN-GUIDE.md §7.1–7.4).

test.describe("desktop header", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("is transparent at the top and frosted once scrolled", async ({ page }) => {
    await page.goto("/en");
    const header = page.locator("header").first();
    await expect(header).not.toHaveAttribute("data-scrolled");
    await page.evaluate(() => {
      document.body.style.minHeight = "3000px";
      window.scrollTo(0, 400);
    });
    await expect(header).toHaveAttribute("data-scrolled", "");
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).not.toHaveAttribute("data-scrolled");
  });

  test("shows the pill nav in the owner's order, language switch, Contact and the CTA", async ({ page }) => {
    await page.goto("/en");
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("button", { name: "Solutions" })).toBeVisible();
    await expect(nav.getByRole("link")).toHaveText(["Clients", "Science", "About"]);
    await expect(page.locator("header").getByRole("link", { name: "Contact", exact: true })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Request a demo" })).toHaveAttribute("href", "/en/contact");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  });

  test("Solutions menu opens from the keyboard and Esc returns focus to the trigger", async ({ page }) => {
    await page.goto("/en");
    const trigger = page.getByRole("button", { name: "Solutions" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const enhance = page.getByRole("link", { name: /DEUS Enhance KPIs/ });
    await expect(enhance).toBeVisible();
    await expect(enhance).toHaveAttribute("href", "/en/solutions/enhance");
    await expect(page.getByRole("link", { name: /All solutions/ })).toHaveAttribute("href", "/en/solutions");

    const potentia = page.getByRole("link", { name: /Potentia by DEUS/ });
    await expect(potentia).toHaveAttribute("target", "_blank");
    await expect(potentia).toHaveAttribute(
      "href",
      "https://deuspotentia.com/?utm_source=deushcs.com&utm_medium=referral",
    );

    // Arrow keys move into the panel and between its items
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("link", { name: /Game-Based Assessment The full suite/ })).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("link", { name: /DEUS Discover Personality/ })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(enhance).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("Solutions menu opens on hover and closes on outside click", async ({ page }) => {
    await page.goto("/en");
    const trigger = page.getByRole("button", { name: "Solutions" });
    await trigger.hover();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.mouse.click(40, 600);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  // The styleguide exists in both languages; Home is English only until Phase 6.
  test("language switch keeps the page and marks the current language", async ({ page }) => {
    await page.goto("/en/styleguide");
    const lang = page.getByRole("navigation", { name: "Language", exact: true });
    await expect(lang.getByRole("link", { name: "English" })).toHaveAttribute("aria-current", "true");
    await lang.getByRole("link", { name: "Bahasa Indonesia" }).click();
    await expect(page).toHaveURL(/\/id\/styleguide$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "id");
  });

  test("language switch shows a language the page isn't in yet as disabled", async ({ page }) => {
    await page.goto("/en");
    const lang = page.getByRole("navigation", { name: "Language", exact: true });
    await expect(lang.getByRole("link", { name: "Bahasa Indonesia (not available for this page yet)" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});

test.describe("mobile header", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("shows brand, CTA and menu button only", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
    await expect(page.getByRole("navigation", { name: "Language", exact: true })).toBeHidden();
    await expect(page.locator("header").getByRole("link", { name: "Request a demo" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("menu sheet traps focus, locks scroll and closes on Esc", async ({ page }) => {
    await page.goto("/en");
    const open = page.getByRole("button", { name: "Open menu" });
    await open.click();

    const sheet = page.getByRole("dialog", { name: "Menu" });
    await expect(sheet).toBeVisible();
    await expect(sheet.getByRole("link", { name: "DEUS Discover" })).toBeVisible();
    await expect(sheet.getByRole("link", { name: "Chat on WhatsApp" })).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/6282312121660\?text=/,
    );
    await expect(sheet.getByRole("link", { name: "Email us" })).toHaveAttribute("href", "mailto:admin@deushcs.com");
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe("hidden");

    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      expect(await sheet.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
    await expect(open).toBeFocused();
  });

  test("menu sheet closes with the X button", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
  });
});
