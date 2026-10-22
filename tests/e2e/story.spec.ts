import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Task 4.2: the shared story page, on the one story that is published: the anonymised Telkom story.
// Its content is in tests/unit/clients-content.test.ts and the registry in story-registry.test.ts;
// here, what a visitor and a crawler get from the built page. Phase 4's e2e (Task 4.5) adds the
// cross-language redirects once the hub and the link cards are on staging.

const PATH = "/en/clients/national-telecom-group";

test.describe("Client story page", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("renders the header, at a glance, the three parts, the quotes and the closer", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/^A National Telecom Group: Game-Based Assessment for Management Trainee Recruitment \| DEUS/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(
      page.getByRole("heading", { level: 1, name: "1,000+ Management Trainee candidates. 30+ provinces. Results in one day." }),
    ).toBeVisible();

    // F83: a way back to the hub, above the label
    await expect(page.getByRole("main").getByRole("link", { name: "All client stories" })).toHaveAttribute("href", "/en/clients");

    const glance = page.getByRole("region", { name: "At a glance" });
    await expect(glance.locator("dd")).toHaveText(["1,000+", "30+", "1 day", "2"]);

    for (const name of [
      "A national intake, on a recruitment timeline.",
      "One assessment, run everywhere at once.",
      "Faster decisions, and candidates who enjoyed the process.",
    ]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
    }
    await expect(page.getByRole("heading", { level: 2, name: "In their words" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "From the candidates" })).toBeVisible();
    await expect(page.locator("blockquote")).toHaveCount(3);
    // each Indonesian quote keeps its language and carries its translation
    await expect(page.locator("blockquote p[lang='id']")).toHaveCount(3);
    await expect(page.locator("blockquote p[lang='en']")).toHaveCount(3);
  });

  test("the anonymised story names no one anywhere in the page", async ({ page }) => {
    await page.goto(PATH);
    const html = await page.content();
    expect(html).not.toMatch(/telkom|\bLina\b|graha merah putih|bandung/i);
    await expect(page.locator("main figure img, [data-placeholder]")).toHaveCount(0); // no photo
  });

  test("the closing panel goes to the story's own next step, with the assessment WhatsApp message", async ({ page }) => {
    await page.goto(PATH);
    const closing = page.locator("#closing-title").locator("xpath=ancestor::section[1]");
    await expect(closing.getByRole("link", { name: "Request a demo" })).toHaveAttribute("href", "/en/contact?product=gba");
    await expect(page.getByRole("link", { name: "Chat with us on WhatsApp" })).toHaveAttribute(
      "href",
      /text=Halo%20DEUS%2C%20saya%20tertarik%20dengan%20asesmen/,
    );
  });

  test("the language switch offers no Indonesian page for a story that has none", async ({ page }) => {
    await page.goto(PATH);
    for (const label of ["Language", "Language options in the footer"]) {
      const nav = page.getByRole("navigation", { name: label, exact: true });
      await expect(nav.locator("a[href^='/id']"), label).toHaveCount(0);
    }
  });

  test("one h1, headings never skip a level, no serious accessibility issues", async ({ page }) => {
    await page.goto(PATH);
    const levels = await page
      .locator("main :is(h1, h2, h3, h4)")
      .evaluateAll((headings) => headings.map((h) => Number(h.tagName[1])));
    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    const skips = levels.flatMap((level, i) => (i > 0 && level > levels[i - 1] + 1 ? [`h${levels[i - 1]} → h${level}`] : []));
    expect(skips).toEqual([]);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });

  test("the article stays in the 720px column", async ({ page }) => {
    await page.goto(PATH);
    const box = await page.locator("#challenge-title").locator("xpath=ancestor::section[1]").boundingBox();
    expect(box?.width).toBeLessThanOrEqual(720);
  });
});

test.describe("Client story page: stories that are not published", () => {
  for (const path of [
    "/en/clients/telkom-group", // the named slug stays a 404 while Telkom is anonymised
    "/en/clients/calvin-christian-school", // held until Q11
    "/id/clients/calvin-christian-school",
    "/en/clients/no-such-client",
  ]) {
    test(`${path} is a 404`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
    });
  }
});
