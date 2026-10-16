import { expect, test } from "@playwright/test";

// Task 3.3: the Game-Based Assessment page, which since R2 (F10) also holds the four modules that
// were the DEUS Discover and Next Chapter pages (their tests moved here). Section copy is checked in
// the unit tests; here: what a visitor and a crawler get from the built page, how the sticky module
// sub-nav behaves, and the redirects from the old routes.

const PATH = "/en/solutions/game-based-assessment";
const modules = ["personality", "cognitive", "neuro", "simulation"];
const sections = [
  "problem",
  "principles",
  "modules",
  ...modules,
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

  test("the client stories link is one line to the clients hub, with no story card (F18)", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole("link", { name: "Read client stories" })).toHaveAttribute("href", "/en/clients");
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

  test("the hero buttons and the science link go where the content says, and nothing links to the old pages", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section[aria-labelledby='hero-title']");
    await expect(hero.getByRole("link", { name: "Request a free trial" })).toHaveAttribute("href", "/en/contact?product=gba");
    await expect(hero.getByRole("link", { name: "Book a demo" })).toHaveAttribute("href", "/en/contact?product=gba");
    await expect(page.locator("#science").getByRole("link", { name: "Read about our science" })).toHaveAttribute("href", "/en/science");
    await expect(page.locator('a[href*="/solutions/discover"], a[href*="/solutions/next-chapter"]')).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Next Chapter");
  });

  test("Personality · DEUS Discover: the story, the three measures and the customization panels", async ({ page }) => {
    await page.goto(PATH);
    const personality = page.locator("#personality");
    await expect(personality.getByRole("heading", { level: 2, name: "Know your candidates before the interview." })).toBeVisible();
    await expect(personality.getByText("Module 1 · Personality · DEUS Discover")).toBeVisible();
    await expect(
      personality.getByRole("heading", { level: 3, name: "A questionnaire asks people who they are. A story shows you." }),
    ).toBeVisible();
    await expect(personality.getByRole("img", { name: /A DEUS Discover story scene/ })).toBeVisible();
    await expect(personality.locator("dd")).toHaveText(["32", "24", "Custom"]);
    await expect(personality.locator("dt")).toHaveText([
      "personality subtraits",
      "competency traits",
      "competencies from your own framework",
    ]);
    await expect(personality.getByRole("heading", { level: 3, name: "Mapped to each role" })).toBeVisible();
    // Discover's "Beyond hiring", "Why Discover" and "Better together" sections were dropped (F10, F22)
    await expect(page.getByText("plan employee development")).toHaveCount(0);
    await expect(page.getByText("Better together")).toHaveCount(0);
  });

  test("Cognitive and Neuroscience list 7 and 6 games, each with what it measures", async ({ page }) => {
    await page.goto(PATH);
    const cognitive = page.locator("#cognitive");
    await expect(cognitive.locator("li:has(b)")).toHaveCount(7);
    await expect(cognitive.getByText("Objective Shooter", { exact: true })).toBeVisible();
    await expect(cognitive.getByText("Processing speed and precision", { exact: true })).toBeVisible();
    await expect(cognitive.getByText("Cognitive agility", { exact: true })).toBeVisible();
    const neuro = page.locator("#neuro");
    await expect(neuro.locator("li:has(b)")).toHaveCount(6);
    await expect(neuro.getByText("Faces Game", { exact: true })).toBeVisible();
    await expect(
      neuro.getByText("Emotional intelligence, empathy and emotion recognition", { exact: true }),
    ).toBeVisible();
  });

  test("the games lists are valid lists: every item sits in a ul, none inside another item", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#cognitive li > li, #neuro li > li, #simulation li > li")).toHaveCount(0);
    await expect(page.locator("#cognitive ul").first().locator("> li")).toHaveCount(7);
  });

  test("the Keypress Game has its screenshot; every other game and both simulations show a TODO tile", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#neuro").getByRole("img", { name: /The Keypress Game/ })).toBeVisible();
    await expect(page.locator("#cognitive [data-placeholder]")).toHaveCount(7);
    await expect(page.locator("#neuro [data-placeholder]")).toHaveCount(5);
    await expect(page.locator("#simulation [data-placeholder]")).toHaveCount(2);
    await expect(page.getByText("TODO: Objective Shooter screenshot")).toBeVisible();
    await expect(page.getByText("TODO: Event Operations simulation screenshot")).toBeVisible();
  });

  test("every game module has its two columns: what is missed, and what you get instead", async ({ page }) => {
    await page.goto(PATH);
    for (const [id, miss] of [
      ["cognitive", "What traditional tests miss"],
      ["neuro", "What interviews miss"],
      ["simulation", "What case interviews miss"],
    ] as const) {
      const section = page.locator(`#${id}`);
      await expect(section.getByRole("heading", { level: 3, name: miss })).toBeVisible();
      await expect(section.getByRole("heading", { level: 3, name: "What you get instead" })).toBeVisible();
    }
    await expect(page.locator("#neuro").getByText("Behavioral data from what people actually do.")).toBeVisible();
  });

  test("Simulation has two scenario cards and the four things it assesses", async ({ page }) => {
    await page.goto(PATH);
    const simulation = page.locator("#simulation");
    await expect(simulation.getByRole("heading", { level: 3, name: "Business Operations" })).toBeVisible();
    await expect(simulation.getByRole("heading", { level: 3, name: "Event Operations" })).toBeVisible();
    await expect(simulation.getByText("Game 1", { exact: true })).toBeVisible();
    await expect(simulation.getByText("Measures prioritization, resource allocation and decision speed.")).toBeVisible();
    for (const point of [
      "Analytical thinking",
      "Financial and business acumen",
      "Diagnostic information gathering",
      "Written synthesis",
    ]) {
      await expect(simulation.getByText(point, { exact: true })).toBeVisible();
    }
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

  test("Reports: the personality report is the screenshot, and the profile report shows its TODO", async ({ page }) => {
    await page.goto(PATH);
    const reports = page.locator("#reports");
    await expect(reports.getByRole("heading", { level: 3, name: "Two views: the person, and the fit." })).toBeVisible();
    await expect(reports.getByRole("img", { name: /individual report for one candidate/ })).toBeAttached();
    await expect(page.getByText("TODO: Discover individual profile suitability screenshot")).toBeVisible();
    await expect(reports.getByRole("heading", { name: "Individual profile suitability" })).toBeVisible();
  });

  test("the personality report scrolls only while on screen, and focus pauses it", async ({ page }) => {
    await page.goto(PATH);
    const window_ = page.locator("#reports [data-report-scroll]");
    await expect(window_).toHaveCount(1);
    const image = window_.locator(".report-scroll-image");
    const style = () => image.evaluate((el) => [getComputedStyle(el).animationName, getComputedStyle(el).animationPlayState]);
    expect(await style()).toEqual(["report-scroll", "paused"]); // below the fold
    await window_.scrollIntoViewIfNeeded();
    await expect(window_).toHaveAttribute("data-playing", "true");
    expect(await style()).toEqual(["report-scroll", "running"]);
    // keyboard and touch visitors stop it by focusing the window (WCAG 2.2.2)
    await window_.focus();
    expect(await style()).toEqual(["report-scroll", "paused"]);
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

  test("the tall-report scroll is a CSS animation that runs only on screen and pauses on hover or focus", async ({ page }) => {
    await page.goto(PATH);
    // No report screenshot exists yet, so build the markup the component renders for one. It goes
    // on <body>, outside React's tree, so hydration can't replace it. `data-playing` is what
    // ReportScrollWindow sets while the window is on screen (the personality report test covers the real one).
    const state = () =>
      page.evaluate(() => getComputedStyle(document.querySelector("#probe .report-scroll-image")!).animationPlayState);
    const style = await page.evaluate(() => {
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div id="probe" tabindex="0" class="report-scroll fixed top-24 left-4 z-50 h-[var(--report-view)] w-[300px] overflow-hidden bg-white [--report-view:300px]">
           <div class="report-scroll-image" style="height:1000px"></div></div>`,
      );
      const style = getComputedStyle(document.querySelector("#probe .report-scroll-image")!);
      return { name: style.animationName, duration: style.animationDuration, state: style.animationPlayState };
    });
    // off screen (or before the script runs) it holds still at the top
    expect(style).toEqual({ name: "report-scroll", duration: "20s", state: "paused" });

    await page.evaluate(() => document.querySelector("#probe")!.setAttribute("data-playing", ""));
    expect(await state()).toBe("running");

    await page.locator("#probe").hover();
    expect(await state()).toBe("paused");
    await page.mouse.move(1200, 10);
    expect(await state()).toBe("running");

    // the keyboard (and a tap) pauses it by focusing the window
    await page.locator("#probe").focus();
    expect(await state()).toBe("paused");
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
    expect(html).toContain("Individual profile suitability");
    expect(html).toContain("TODO: Tower Game screenshot");
    expect(html).toContain("Business Operations");
    expect(html).toContain('href="#simulation"');
    // nothing is held back at opacity 0 before the script runs
    await expect(page.locator("[data-reveal='pending']")).toHaveCount(0);
    await context.close();
  });

  test("Indonesian has no GBA page yet, so it sends the visitor to English", async ({ page }) => {
    await page.goto("/id/solutions/game-based-assessment");
    await expect(page).toHaveURL(/\/en\/solutions\/game-based-assessment$/);
  });
});

test.describe("The old Discover and Next Chapter routes (R2)", () => {
  for (const [from, hash] of [
    ["/en/solutions/discover", "#personality"],
    ["/en/solutions/next-chapter", "#cognitive"],
    ["/id/solutions/discover", "#personality"],
    ["/solutions/next-chapter", "#cognitive"],
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

test.describe("GBA module sub-nav", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  const nav = (page: import("@playwright/test").Page) => page.getByRole("navigation", { name: "Game-Based Assessment modules" });
  const sectionTop = (page: import("@playwright/test").Page, id: string) =>
    page.evaluate((target) => document.getElementById(target)!.getBoundingClientRect().top + window.scrollY, id);

  test("is a pill of four links, none current at the top of the page", async ({ page }) => {
    await page.goto(PATH);
    await expect(nav(page).getByRole("link")).toHaveText(["Personality", "Cognitive", "Neuroscience", "Simulation"]);
    await expect(nav(page).locator("[aria-current]")).toHaveCount(0);
  });

  test("sticks under the header while a module is on screen, and marks that module current", async ({ page }) => {
    await page.goto(PATH);
    for (const [id, name] of [
      ["personality", "Personality"],
      ["cognitive", "Cognitive"],
      ["neuro", "Neuroscience"],
      ["simulation", "Simulation"],
    ] as const) {
      await page.evaluate((y) => window.scrollTo(0, y), (await sectionTop(page, id)) + 450);
      await expect(nav(page).getByRole("link", { name })).toHaveAttribute("aria-current", "location");
      await expect(nav(page).locator("[aria-current]")).toHaveCount(1);
      const box = await nav(page).boundingBox();
      // 84px header, then the band's 12px of air
      expect(box!.y).toBeGreaterThanOrEqual(90);
      expect(box!.y).toBeLessThanOrEqual(100);
    }
  });

  test("lets go after the last module: nothing is current and the pill scrolls away", async ({ page }) => {
    await page.goto(PATH);
    await page.evaluate((y) => window.scrollTo(0, y), (await sectionTop(page, "use-cases")) + 200);
    await expect(nav(page).locator("[aria-current]")).toHaveCount(0);
    await expect(nav(page)).not.toBeInViewport();
  });

  for (const [name, id] of [
    ["Personality", "personality"],
    ["Simulation", "simulation"],
  ] as const) {
    // Personality is a tight section (less top padding), so it needs its own scroll margin.
    test(`a click on ${name} jumps to the module, with its label pill clear of the header and the pill`, async ({ page }) => {
      await page.goto(PATH);
      await nav(page).getByRole("link", { name }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(nav(page).getByRole("link", { name })).toHaveAttribute("aria-current", "location");
      const [navBottom, labelTop] = await page.evaluate(
        (id) => [
          document.querySelector("nav[aria-label='Game-Based Assessment modules']")!.getBoundingClientRect().bottom,
          // the section header's first line is the label pill, above the heading
          document.getElementById(`${id}-title`)!.parentElement!.firstElementChild!.getBoundingClientRect().top,
        ],
        id,
      );
      expect(labelTop).toBeGreaterThan(navBottom);
      expect(labelTop).toBeLessThan(navBottom + 60);
    });
  }

  test("is reachable by keyboard, and Enter on a link jumps", async ({ page }) => {
    await page.goto(PATH);
    await nav(page).getByRole("link", { name: "Neuroscience" }).focus();
    await expect(nav(page).getByRole("link", { name: "Neuroscience" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#neuro$/);
  });

  test("without JavaScript, the links still jump", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(PATH);
    await nav(page).getByRole("link", { name: "Neuroscience" }).click();
    await expect(page).toHaveURL(/#neuro$/);
    await context.close();
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

  test("the module sub-nav fits the screen, and sticks under the 68px header", async ({ page }) => {
    await page.goto(PATH);
    const nav = page.getByRole("navigation", { name: "Game-Based Assessment modules" });
    await expect(nav.getByRole("link")).toHaveCount(4);
    const box = await nav.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390);
    await nav.getByRole("link", { name: "Neuroscience" }).click();
    await expect(page).toHaveURL(/#neuro$/);
    const [navBox, headingTop] = await page.evaluate(() => {
      const rect = document.querySelector("nav[aria-label='Game-Based Assessment modules']")!.getBoundingClientRect();
      return [{ top: rect.top, bottom: rect.bottom }, document.getElementById("neuro-title")!.getBoundingClientRect().top];
    });
    // right under the header, with the band's 12px of air: no gap for content to show through
    expect(navBox.top).toBeGreaterThanOrEqual(68 + 12 - 1);
    expect(navBox.top).toBeLessThanOrEqual(68 + 12 + 1);
    expect(headingTop).toBeGreaterThan(navBox.bottom);
  });

  test("the pill is wider than the screen, so it slides the current module's link into view", async ({ page }) => {
    await page.goto(PATH);
    const nav = page.getByRole("navigation", { name: "Game-Based Assessment modules" });
    await page.locator("#simulation").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 300));
    const link = nav.getByRole("link", { name: "Simulation" });
    await expect(link).toHaveAttribute("aria-current", "location");
    await expect
      .poll(async () => {
        const [l, n] = await Promise.all([link.boundingBox(), nav.boundingBox()]);
        return l!.x >= n!.x && l!.x + l!.width <= n!.x + n!.width;
      })
      .toBe(true);
  });
});
