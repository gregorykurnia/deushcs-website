import { expect, test } from "@playwright/test";
import { siteFlags } from "@/content/flags";

// Task 3.3: the Game-Based Assessment page, which since R2 (F10) also holds the four modules that
// were the DEUS Discover and Next Chapter pages (their tests moved here). Round 4 cut The problem,
// Reports, How it works, Pricing and Behind the results, and the price, and turned the four module
// tabs into four cards in one grid (§S2). Section copy is checked in the unit tests; here: what a
// visitor and a crawler get from the built page, how the cards sit and how the anchors land, and
// the redirects from the old routes.

const PATH = "/en/solutions/game-based-assessment";
const modules = ["personality", "cognitive", "neuro", "simulation"];
type Page = import("@playwright/test").Page;
const sections = ["principles", "modules", "use-cases", "faq"];
/** The sections round 4 cut (§S6), with the anchors that opened them. */
const removed = ["problem", "reports", "how-it-works", "pricing", "behind-results", "platform", "science", "impact"];
/** The height limits of the module grid, from its first card's top to its last card's bottom (§S2). */
const GRID_MAX = { desktop: 950, phone: 2400 };
/** The grid's height on the page, in px. */
const gridHeight = (page: Page) =>
  page.evaluate(() => {
    const cards = [...document.querySelectorAll("#modules ul > li")].map((li) => li.getBoundingClientRect());
    return Math.max(...cards.map((r) => r.bottom)) - Math.min(...cards.map((r) => r.top));
  });
test.describe("Game-Based Assessment page", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders the hero, every section and the closer, with the title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Game-Based Assessment: Talent Assessment for Hiring | DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("heading", { level: 1, name: "Game-based assessment for hiring." })).toBeVisible();
    for (const id of sections) {
      await expect(page.locator(`section#${id}`), id).toHaveCount(1);
      await expect(page.locator(`section#${id} h2`), id).toHaveCount(1);
    }
    // the four modules are cards in the suite's section, not sections of their own
    for (const id of modules) await expect(page.locator(`#modules ul > li#${id}`), id).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 2, name: /The best way to understand it\s+is to play it\./ })).toBeVisible();
  });

  test("the client stories link is one line to the clients hub, with no story card (F18)", async ({ page }) => {
    await page.goto(PATH);
    const storiesLink = page.getByRole("link", { name: "Read client stories" });
    if (siteFlags.showStories) await expect(storiesLink).toHaveAttribute("href", "/en/clients");
    else await expect(storiesLink).toHaveCount(0);
    await expect(page.getByText("Client story", { exact: true })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /Read the story/ })).toHaveCount(0);
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

  test("the hero buttons go where the content says, and nothing links to the old pages", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section[aria-labelledby='hero-title']");
    await expect(hero.getByRole("link", { name: "Request a free trial" })).toHaveAttribute("href", "/en/contact?product=gba");
    await expect(hero.getByRole("link", { name: "Book a demo" })).toHaveAttribute("href", "/en/contact?product=gba");
    await expect(
      page.locator('a[href*="/solutions/discover"], a[href*="/solutions/next-chapter"], a[href$="/science"]'),
    ).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Next Chapter");
  });

  test("the use-case cards open their pages, and each link answers 200 (G2.4)", async ({ page }) => {
    test.skip(!siteFlags.showUseCases, "showUseCases is off: the cards are plain");
    await page.goto(PATH);
    const cards = page.locator("#use-cases").getByRole("link");
    const hrefs = await cards.evaluateAll((els) => els.map((el) => el.getAttribute("href")));
    expect(hrefs).toEqual([
      "/en/solutions/campus-recruitment-assessment",
      "/en/solutions/management-trainee-assessment",
      "/en/solutions/talent-mapping",
    ]);
    for (const href of new Set(hrefs)) expect((await page.request.get(href!)).status(), href!).toBe(200);
  });

  test("none of the sections round 4 cut is left, nor their anchors (§S6)", async ({ page }) => {
    await page.goto(PATH);
    for (const id of removed) await expect(page.locator(`#${id}`), id).toHaveCount(0);
  });

  test("the first section after the hero is What's different: its title, the answer passage and three pillars, with no label (§S3)", async ({ page }) => {
    await page.goto(PATH);
    // the hero is main's first section, and the very next one is #principles
    await expect(page.locator("main > section").first()).toHaveAttribute("aria-labelledby", "hero-title");
    await expect(page.locator("main > section").nth(1)).toHaveAttribute("id", "principles");
    const top = page.locator("section#principles");
    await expect(top.getByRole("heading", { level: 2, name: "What makes game-based assessment different." })).toBeVisible();
    await expect(top.getByText(/^Game-based assessment measures how candidates think and behave through short games instead of a questionnaire\..*high-volume hiring and talent decisions\.$/)).toBeVisible();
    for (const pillar of ["Real behavior signals", "Scientifically grounded", "Enterprise-ready"]) {
      await expect(top.getByRole("heading", { level: 3, name: pillar })).toBeVisible();
    }
    // no section label over the title
    await expect(top.getByText("What's different", { exact: true })).toHaveCount(0);
    const firstText = await top.evaluate((el) => (el.textContent ?? "").trim());
    expect(firstText.startsWith("What makes game-based assessment different")).toBe(true);
  });

  test("shows no price: no IDR or Rp on the page, and its SoftwareApplication has no offers (round 4)", async ({ page }) => {
    await page.goto(PATH);
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/\bIDR\b|\bRp\s?\d/);
    const apps = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((s) => JSON.parse(s.textContent ?? "{}")).filter((d) => d["@type"] === "SoftwareApplication"));
    expect(apps).toHaveLength(1);
    expect(apps[0]).not.toHaveProperty("offers");
    // [VERIFY] items stay hidden behind siteFlags
    await expect(page.getByText("5 to 10 times")).toHaveCount(0);
    await expect(page.getByText("minimum purchase")).toHaveCount(0);
  });

  test("the four modules are cards seen at once, two by two, with no tab list (§S2)", async ({ page }) => {
    await page.goto(PATH);
    const grid = page.locator("#modules ul");
    const cards = grid.locator("> li");
    await expect(cards).toHaveCount(4);
    await expect(page.locator("#modules").getByRole("tablist")).toHaveCount(0);
    await expect(page.locator("#modules").getByRole("tab")).toHaveCount(0);
    await expect(cards.locator("h3")).toHaveText([
      "DEUS Discover: Personality Test",
      "Cognitive Assessment",
      "Neuroscience Assessment",
      "Simulation Assessment",
    ]);
    // all four are in the page's flow and visible, none behind a tab or a switch
    for (const id of modules) await expect(page.locator(`#${id}`), id).toBeVisible();
    // each states a bold count, then what it measures, and shows one game screen with alt text
    await expect(page.locator("#personality b")).toHaveText(["32", "24"]);
    await expect(page.locator("#cognitive b")).toHaveText(["7 games:"]);
    await expect(page.locator("#neuro b")).toHaveText(["6 games:"]);
    await expect(page.locator("#simulation b")).toHaveText(["2 scenarios:"]);
    for (const id of modules) {
      await expect(page.locator(`#${id} img`), id).toHaveCount(1);
      await expect(page.locator(`#${id} img`), id).toHaveAttribute("alt", /\S/);
    }
    await expect(page.locator("#modules [data-placeholder]")).toHaveCount(0);
    // two columns, two rows; the cards in a row share a height and a top
    const boxes = await Promise.all(modules.map((id) => page.locator(`#${id}`).boundingBox()));
    const [personality, cognitive, neuro, simulation] = boxes as NonNullable<(typeof boxes)[number]>[];
    expect(Math.round(personality!.y)).toBe(Math.round(cognitive!.y));
    expect(Math.round(neuro!.y)).toBe(Math.round(simulation!.y));
    expect(neuro!.y).toBeGreaterThan(personality!.y + personality!.height);
    expect(cognitive!.x).toBeGreaterThan(personality!.x + personality!.width - 1);
    expect(Math.round(personality!.height)).toBe(Math.round(cognitive!.height));
    expect(Math.round(neuro!.height)).toBe(Math.round(simulation!.height));
    // the screens' strips line up along each row
    const strips = await Promise.all(modules.map((id) => page.locator(`#${id} img`).evaluate((img) => img.parentElement!.getBoundingClientRect().bottom)));
    expect(Math.round(strips[0]!)).toBe(Math.round(strips[1]!));
    expect(Math.round(strips[2]!)).toBe(Math.round(strips[3]!));
    // §S2's limit: both rows fit in about one screen
    expect(await gridHeight(page)).toBeLessThanOrEqual(GRID_MAX.desktop);
  });

  test("the JSON-LD featureList is the four card titles", async ({ page }) => {
    await page.goto(PATH);
    const titles = await page.locator("#modules ul > li h3").allTextContents();
    const apps = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((s) => JSON.parse(s.textContent ?? "{}")).filter((d) => d["@type"] === "SoftwareApplication"));
    expect(apps[0].featureList).toEqual(titles);
  });

  test("shows the Discover story scene", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole("img", { name: /story scene at a town festival/ })).toBeVisible();
  });

  test("FAQ: answers open and close, and the page carries FAQPage structured data", async ({ page }) => {
    await page.goto(PATH);
    const faq = page.locator("#faq");
    const question = faq.getByText("Do candidates need to install anything?");
    await question.click();
    await expect(faq.getByText("No. The assessment runs in a mobile or desktop browser.")).toBeVisible();
    await question.click();
    await expect(faq.getByText("No. The assessment runs in a mobile or desktop browser.")).toBeHidden();

    // the page also carries SoftwareApplication and BreadcrumbList data (Task 7.1)
    const json = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((s) => s.textContent ?? "").find((text) => text.includes('"FAQPage"')));
    const data = JSON.parse(json ?? "{}");
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity.map((q: { name: string }) => q.name)).toContain("Can we try it first?");
    // G1.5's buyer questions are in it too, but not the price ones (round 4)
    const names = data.mainEntity.map((q: { name: string }) => q.name);
    expect(names).toContain("Which modules should we choose?");
    expect(names).not.toContain("How much does a game-based assessment cost?");
    expect(names).not.toContain("Is there a minimum order?");
    expect(names).toContain("What reports do we get?");
    expect(data.mainEntity).toHaveLength(12);
  });

  test("without JavaScript, every section, every module and every FAQ answer is in the HTML", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(PATH);
    for (const id of sections) await expect(page.locator(`section#${id}`), id).toHaveCount(1);
    const html = await page.content();
    expect(html).toContain("Every session starts with device checks");
    for (const id of modules) expect(html).toContain(`id="${id}-title"`);
    expect(html).toContain("Business Operations: a mini case analysis");
    // nothing is held back at opacity 0 before the script runs
    await expect(page.locator("[data-reveal='pending']")).toHaveCount(0);
    await context.close();
  });

  test("Indonesian has no GBA page yet, so it sends the visitor to English", async ({ page }) => {
    await page.goto("/id/solutions/game-based-assessment");
    await expect(page).toHaveURL(/\/en\/solutions\/game-based-assessment$/);
  });
});

test.describe("The old Discover, Next Chapter (R2) and Science (R6, round 4) routes", () => {
  for (const [from, hash] of [
    ["/en/solutions/discover", "#personality"],
    ["/en/solutions/next-chapter", "#cognitive"],
    ["/id/solutions/discover", "#personality"],
    ["/solutions/next-chapter", "#cognitive"],
    ["/en/science", "#principles"],
    ["/id/science", "#principles"],
    ["/science", "#principles"],
  ] as const) {
    test(`${from} redirects permanently to the GBA page's ${hash} section`, async ({ page, request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toMatch(new RegExp(`/solutions/game-based-assessment${hash}$`));
      await page.goto(from);
      await expect(page).toHaveURL(new RegExp(`/en/solutions/game-based-assessment${hash}$`));
    });
  }
});

test.describe("GBA module anchors (round 4 §S2)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  /** Waits out the scroll to the anchor, then returns the header's bottom, the card's top and its title's top. */
  const settled = (page: Page, id: string) =>
    expect
      .poll(async () => {
        const [headerBottom, cardTop, titleTop] = await page.evaluate((id) => {
          const rect = (el: Element | null) => el!.getBoundingClientRect();
          return [rect(document.querySelector("header")).bottom, rect(document.getElementById(id)).top, rect(document.getElementById(`${id}-title`)).top];
        }, id);
        // the card's top is about 12px under the header; its title is below the header, not hidden by it
        return cardTop >= headerBottom && cardTop <= headerBottom + 24 && titleTop > headerBottom;
      })
      .toBe(true);

  for (const id of modules) {
    test(`arriving with #${id} shows that card's title under the header`, async ({ page }) => {
      await page.goto(`${PATH}#${id}`);
      await settled(page, id);
      await expect(page.locator(`#${id}-title`)).toBeInViewport();
    });
  }

  test("a menu link to a module scrolls to its card while on the page, and Back returns", async ({ page }) => {
    await page.goto(PATH);
    const header = page.getByRole("banner");
    await header.getByRole("button", { name: "Solutions" }).click();
    await header.getByRole("link", { name: /^Simulation/ }).click();
    await expect(page).toHaveURL(/#simulation$/);
    await settled(page, "simulation");
    await expect(page.locator("#simulation-title")).toBeInViewport();
    await page.goBack();
    await expect(page).not.toHaveURL(/#simulation$/);
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

  test("the four cards stack in one column, within the height limit and with nothing sideways (§S2)", async ({ page }) => {
    await page.goto(PATH);
    const boxes = await Promise.all(modules.map((id) => page.locator(`#${id}`).boundingBox()));
    for (const box of boxes) expect(box!.x).toBe(boxes[0]!.x);
    for (let i = 1; i < boxes.length; i++) expect(boxes[i]!.y).toBeGreaterThan(boxes[i - 1]!.y + boxes[i - 1]!.height - 1);
    expect(await gridHeight(page)).toBeLessThanOrEqual(GRID_MAX.phone);
    // the strip is 150px tall on a phone
    expect(await page.locator("#cognitive img").evaluate((img) => img.parentElement!.getBoundingClientRect().height)).toBe(150);
  });

  test("arriving with #neuro lands the card under the 68px header", async ({ page }) => {
    await page.goto(PATH + "#neuro");
    await expect
      .poll(async () => {
        const [headerBottom, cardTop, titleTop] = await page.evaluate(() => [
          document.querySelector("header")!.getBoundingClientRect().bottom,
          document.getElementById("neuro")!.getBoundingClientRect().top,
          document.getElementById("neuro-title")!.getBoundingClientRect().top,
        ]);
        return headerBottom <= 69 && cardTop >= headerBottom && cardTop <= headerBottom + 24 && titleTop > headerBottom;
      })
      .toBe(true);
  });
});
