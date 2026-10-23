import { expect, test } from "@playwright/test";
import { oldSiteRedirects } from "../../src/lib/old-site-redirects";

// Task 7.3b: each old WordPress URL, with and without the trailing slash, is one permanent redirect
// straight to a page of the new site that answers 200. Request API only: no page is loaded.

for (const { from, to } of oldSiteRedirects) {
  for (const path of [from, `${from}/`]) {
    test(`${path} → ${to}`, async ({ request, baseURL }) => {
      const redirect = await request.get(path, { maxRedirects: 0 });
      expect(redirect.status()).toBe(308);
      const location = new URL(redirect.headers()["location"], baseURL);
      expect(`${location.pathname}${location.hash}`).toBe(to);

      const page = await request.get(location.pathname, { maxRedirects: 0 });
      expect(page.status()).toBe(200);
    });
  }
}

test("a trailing slash on a page of the new site still redirects to the page without it", async ({ request, baseURL }) => {
  const redirect = await request.get("/en/solutions/enhance/", { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(new URL(redirect.headers()["location"], baseURL).pathname).toBe("/en/solutions/enhance");
});
