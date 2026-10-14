import { expect, test } from "@playwright/test";

test("/ redirects to the default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("/ follows the browser language", async ({ browser }) => {
  const context = await browser.newContext({ locale: "id-ID" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/id$/);
  await context.close();
});

test("each locale sets <html lang>", async ({ page }) => {
  for (const locale of ["en", "id"]) {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  }
});
