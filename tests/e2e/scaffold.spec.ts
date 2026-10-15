import { expect, test } from "@playwright/test";

test("/ redirects to the default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

// Checked on the proxy's own redirect: Home is English only until Phase 6, so /id forwards on to /en.
test("/ follows the browser language", async ({ request }) => {
  const response = await request.get("/", { headers: { "accept-language": "id-ID,id;q=0.9" }, maxRedirects: 0 });
  expect(response.status()).toBeGreaterThanOrEqual(300);
  expect(response.status()).toBeLessThan(400);
  expect(response.headers()["location"]).toMatch(/\/id$/);
});

// The styleguide exists in both languages.
test("each locale sets <html lang>", async ({ page }) => {
  for (const locale of ["en", "id"]) {
    await page.goto(`/${locale}/styleguide`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  }
});
