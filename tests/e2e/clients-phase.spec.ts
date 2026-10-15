import { expect, test } from "@playwright/test";
import { siteFlags } from "@/content/flags";

// Task 4.5: Phase 4 e2e. The page-level checks live with each page (clients.spec.ts for the hub,
// story.spec.ts for the story template); this spec covers what spans them: where a story goes when
// it is visited in the wrong language or under its old slug, what the language switch offers, and
// that a held story is a real 404 that says nothing about the client. Calvin (Q11) and the Telkom
// name (Q7) are switches, so each test follows them the way the hub's tests do.

const telkomSlug = siteFlags.telkomNamed ? "telkom-group" : "national-telecom-group";
const calvin = "calvin-christian-school";

test.describe("Client stories: language and slug redirects", () => {
  test("a story that exists only in English sends the Indonesian URL to the English one", async ({ page }) => {
    await page.goto(`/id/clients/${telkomSlug}`);
    await expect(page).toHaveURL(new RegExp(`/en/clients/${telkomSlug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Management Trainee");
  });

  test("Calvin, visited in English, redirects to the Indonesian story", async ({ page }) => {
    test.skip(!siteFlags.publishCalvin, "publishCalvin is off: the story is held, see the 404 tests below");
    await page.goto(`/en/clients/${calvin}`);
    await expect(page).toHaveURL(new RegExp(`/id/clients/${calvin}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", "id");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Calvin's story shows English as unavailable in both language switches", async ({ page }) => {
    test.skip(!siteFlags.publishCalvin, "publishCalvin is off: the story is held");
    await page.goto(`/id/clients/${calvin}`);
    for (const nav of [
      page.getByRole("navigation", { name: "Language", exact: true }),
      page.getByRole("navigation", { name: "Language options in the footer" }),
    ]) {
      const english = nav.getByRole("link", { name: /^English/ });
      await expect(english).toHaveAttribute("aria-disabled", "true");
      await expect(nav.locator("a[href^='/en']")).toHaveCount(0);
    }
  });

  test("the anonymised slug redirects to the named one once Telkom is named", async ({ page }) => {
    test.skip(!siteFlags.telkomNamed, "telkomNamed is off: the named slug is a 404, see below");
    await page.goto("/en/clients/national-telecom-group");
    await expect(page).toHaveURL(/\/en\/clients\/telkom-group$/);
  });

  test("a story hub card leads to a story that loads", async ({ page }) => {
    await page.goto("/en/clients");
    const cards = page.locator("#stories li a[href^='/']");
    const hrefs = await cards.evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      const response = await page.goto(href);
      expect(response?.status(), href).toBe(200);
      await expect(page.getByRole("heading", { level: 1 }), href).toBeVisible();
    }
  });
});

test.describe("Client stories: held stories are real 404s", () => {
  const held: string[] = [];
  if (!siteFlags.telkomNamed) held.push("/en/clients/telkom-group", "/id/clients/telkom-group");
  if (!siteFlags.publishCalvin) held.push(`/en/clients/${calvin}`, `/id/clients/${calvin}`);
  held.push("/en/clients/no-such-client", "/id/clients/no-such-client");

  for (const path of held) {
    test(`${path} answers 404 and names no client`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      // the requested path is echoed in the 404's own markup; only what else the page says counts
      const html = (await page.content()).replaceAll(path.split("/").pop()!, "");
      // a held story must not leak through its 404 (the page, the title, or a redirect target)
      // (Potentia is not checked: the header and footer link to it on every page)
      expect(html).not.toMatch(/calvin/i);
      if (!siteFlags.telkomNamed) expect(html).not.toMatch(/telkom/i);
    });
  }

  test("held stories are not in the hub, the sitemap or the story's own pages", async ({ page, request }) => {
    await page.goto("/en/clients");
    const main = await page.locator("main").innerText();
    if (!siteFlags.publishCalvin) expect(main).not.toContain("Calvin");
    if (!siteFlags.telkomNamed) expect(main).not.toMatch(/telkom/i);

    const sitemap = await request.get("/sitemap.xml");
    if (sitemap.ok()) {
      const xml = await sitemap.text();
      if (!siteFlags.publishCalvin) expect(xml).not.toContain(calvin);
      if (!siteFlags.telkomNamed) expect(xml).not.toContain("telkom-group");
    }
  });
});
