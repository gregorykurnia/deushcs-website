import { expect, test } from "@playwright/test";

// Task 3.3: the Game-Based Assessment page. Section copy is checked in the unit tests; here:
// what a visitor and a crawler get from the built page.

const PATH = "/en/solutions/game-based-assessment";
const sections = [
  "problem",
  "principles",
  "modules",
  "use-cases",
  "how-it-works",
  "platform",
  "reports",
  "science",
  "impact",
  "pricing",
  "adoption",
  "faq",
];

test.describe("Game-Based Assessment page", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders the hero, every section and the closer, with the title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Game-Based Assessment for Hiring and Talent Mapping | DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("heading", { level: 1, name: "Reveal real potential through play." })).toBeVisible();
    for (const id of sections) {
      await expect(page.locator(`section#${id}`), id).toHaveCount(1);
      await expect(page.locator(`section#${id} h2`), id).toHaveCount(1);
    }
    await expect(page.getByRole("heading", { level: 2, name: /The best way to understand it\s+is to play it\./ })).toBeVisible();
  });

  test("the header and WhatsApp button are the assessment ones", async ({ page }) => {
    await page.goto(PATH);
    const header = page.getByRole("banner");
    await expect(header.getByRole("link", { name: "Request a free trial" })).toHaveAttribute("href", "/en/contact?product=gba");
    await expect(page.getByRole("link", { name: "Chat with us on WhatsApp" })).toHaveAttribute(
      "href",
      /text=Halo%20DEUS%2C%20saya%20tertarik%20dengan%20asesmen/,
    );
  });

  test("the hero buttons and the modules link where the content says", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section[aria-labelledby='hero-title']");
    await expect(hero.getByRole("link", { name: "Request a free trial" })).toHaveAttribute("href", "/en/contact?product=gba");
    await expect(hero.getByRole("link", { name: "Book a demo" })).toHaveAttribute("href", "/en/contact?product=gba");
    const modules = page.locator("#modules");
    await expect(modules.getByRole("link", { name: "Explore DEUS Discover" })).toHaveAttribute("href", "/en/solutions/discover");
    await expect(modules.getByRole("link", { name: "See the cognitive games" })).toHaveAttribute(
      "href",
      "/en/solutions/next-chapter#cognitive",
    );
    await expect(page.locator("#science").getByRole("link", { name: "Read about our science" })).toHaveAttribute("href", "/en/science");
  });

  test("shows the 'starting from' price through formatIDR, and no hidden claims", async ({ page }) => {
    await page.goto(PATH);
    const pricing = page.locator("#pricing");
    await expect(pricing.getByText("Starting from")).toBeVisible();
    await expect(pricing.getByText("IDR 69,000")).toBeVisible();
    await expect(pricing.getByText("per candidate", { exact: true })).toBeVisible();
    await expect(pricing.getByRole("link", { name: "Ask for a quote" })).toHaveAttribute("href", "/en/contact?product=gba");
    // [VERIFY] items stay hidden behind siteFlags
    await expect(page.getByText("5 to 10 times")).toHaveCount(0);
    await expect(page.getByText("minimum purchase")).toHaveCount(0);
  });

  test("uses TODO placeholders for the screens that don't exist yet", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByText("TODO: GBA CMS screenshot")).toBeVisible();
    await expect(page.getByText("TODO: GBA individual report screenshot")).toBeVisible();
    await expect(page.getByText("TODO: Balloon Game screenshot")).toBeVisible();
  });

  test("Reports: three tabs, each with its own text; arrows and clicks switch", async ({ page }) => {
    await page.goto(PATH);
    const tabs = page.getByRole("tablist", { name: "The right report for every decision." });
    await expect(tabs.getByRole("tab")).toHaveText(["Individual report", "Batch report", "Interactive dashboard"]);
    await expect(tabs.getByRole("tab", { name: "Individual report" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("Export as PDF or share a live link.")).toBeVisible();

    await tabs.getByRole("tab", { name: "Individual report" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.getByRole("tab", { name: "Batch report" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("Download the whole batch as one PDF.")).toBeVisible();
    await expect(page.getByText("Export as PDF or share a live link.")).toBeHidden();

    await tabs.getByRole("tab", { name: "Interactive dashboard" }).click();
    await expect(page.getByText("Share it with a link.")).toBeVisible();
    await expect(page.getByText("TODO: GBA interactive report screenshot")).toBeVisible();
  });

  test("FAQ: answers open and close, and the page carries FAQPage structured data", async ({ page }) => {
    await page.goto(PATH);
    const faq = page.locator("#faq");
    const question = faq.getByText("Do candidates need to install anything?");
    await question.click();
    await expect(faq.getByText("No. The assessment runs in a mobile or desktop browser.")).toBeVisible();
    await question.click();
    await expect(faq.getByText("No. The assessment runs in a mobile or desktop browser.")).toBeHidden();

    const json = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(json ?? "{}");
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity.map((q: { name: string }) => q.name)).toContain("Can we try it first?");
    // the minimum-order question is hidden with its flag
    expect(data.mainEntity).toHaveLength(6);
  });

  test("the tall-report scroll is a paused-on-hover CSS animation (not a script)", async ({ page }) => {
    await page.goto(PATH);
    // No report screenshot exists yet, so build the markup the component renders for one. It goes
    // on <body>, outside React's tree, so hydration can't replace it.
    const running = await page.evaluate(() => {
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div id="probe" class="report-scroll fixed top-24 left-4 z-50 h-[var(--report-view)] w-[300px] overflow-hidden bg-white [--report-view:300px]">
           <div class="report-scroll-image" style="height:1000px"></div></div>`,
      );
      const style = getComputedStyle(document.querySelector("#probe .report-scroll-image")!);
      return { name: style.animationName, duration: style.animationDuration, state: style.animationPlayState };
    });
    expect(running).toEqual({ name: "report-scroll", duration: "20s", state: "running" });

    await page.locator("#probe").hover();
    const paused = await page.evaluate(() => getComputedStyle(document.querySelector("#probe .report-scroll-image")!).animationPlayState);
    expect(paused).toBe("paused");
  });

  test("with reduced motion the report doesn't animate", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(PATH);
    const name = await page.evaluate(() => {
      document.body.insertAdjacentHTML("beforeend", `<div class="report-scroll"><div id="probe" class="report-scroll-image"></div></div>`);
      return getComputedStyle(document.getElementById("probe")!).animationName;
    });
    expect(name).toBe("none");
    await context.close();
  });

  test("without JavaScript, every section, every report tab and every FAQ answer is in the HTML", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(PATH);
    for (const id of sections) await expect(page.locator(`section#${id}`), id).toHaveCount(1);
    const html = await page.content();
    expect(html).toContain("For the hiring manager making a yes-or-no call.");
    expect(html).toContain("For HR running an MT intake");
    expect(html).toContain("For hiring committees and talent reviews.");
    expect(html).toContain("Every session starts with device checks");
    // nothing is held back at opacity 0 before the script runs
    await expect(page.locator("[data-reveal='pending']")).toHaveCount(0);
    await context.close();
  });

  test("Indonesian has no GBA page yet, so it sends the visitor to English", async ({ page }) => {
    await page.goto("/id/solutions/game-based-assessment");
    await expect(page).toHaveURL(/\/en\/solutions\/game-based-assessment$/);
  });
});

test.describe("Game-Based Assessment page on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("doesn't scroll sideways, and the header keeps the trial button", async ({ page }) => {
    await page.goto(PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
    await expect(page.getByRole("banner").getByRole("link", { name: "Request a free trial" })).toBeVisible();
  });
});
