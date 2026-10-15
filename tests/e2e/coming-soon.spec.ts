import { expect, test } from "@playwright/test";

// Task 2.6: placeholders for the routes Home links to that have no page yet, so every Home link
// resolves. Each shows the "Coming soon" panel (DESIGN-GUIDE.md §7.27) and is English only. When a
// route's real page lands on a merge, the real page wins: delete its line from this list in that merge.
const PLACEHOLDERS = ["/clients", "/contact", "/privacy"];

test.describe("Coming soon placeholders", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  for (const path of PLACEHOLDERS) {
    test(`${path} answers 200 with the panel and noindex`, async ({ page }) => {
      const response = await page.goto(`/en${path}`);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle("Coming soon | DEUS Human Capital Services");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      await expect(
        page.getByRole("heading", { level: 1, name: "This page is on its way." }),
      ).toBeVisible();
    });
  }

  test("the Indonesian address redirects to the English placeholder", async ({ page }) => {
    await page.goto("/id/clients");
    await expect(page).toHaveURL(/\/en\/clients$/);
  });
});
