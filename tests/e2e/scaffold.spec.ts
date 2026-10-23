import { expect, test } from "@playwright/test";

test("/ redirects to the default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

// Browser language detection is off while Phase 6 is on hold (src/i18n/routing.ts): an Indonesian
// browser went to /id and was bounced back to /en, two hops for one page. Task 6.4 turns it back on.
test("/ goes to /en in one hop, whatever the browser language", async ({ request }) => {
  const response = await request.get("/", { headers: { "accept-language": "id-ID,id;q=0.9" }, maxRedirects: 0 });
  expect(response.status()).toBeGreaterThanOrEqual(300);
  expect(response.status()).toBeLessThan(400);
  expect(response.headers()["location"]).toMatch(/\/en$/);
});

// The styleguide exists in both languages.
test("each locale sets <html lang>", async ({ page }) => {
  for (const locale of ["en", "id"]) {
    await page.goto(`/${locale}/styleguide`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  }
});
