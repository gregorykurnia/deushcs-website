import { expect, test } from "@playwright/test";
import { siteFlags } from "@/content/flags";

// Task 3.3: the Game-Based Assessment page, which since R2 (F10) also holds the four modules that
// were the DEUS Discover and Next Chapter pages (their tests moved here). Round 4 cut The problem,
// Reports, How it works, Pricing and Behind the results, and the price. Section copy is checked in
// the unit tests; here: what a visitor and a crawler get from the built page, how the sticky module
// tabs behave (F40: one module at a time), and the redirects from the old routes.

const PATH = "/en/solutions/game-based-assessment";
const modules = ["personality", "cognitive", "neuro", "simulation"];
type Page = import("@playwright/test").Page;
const moduleTabs = (page: Page) => page.getByRole("tablist", { name: "Game-Based Assessment modules" });
/** Opens a module's tab; only Personality shows before a click. Retried, in case the click lands
 *  before the page has hydrated. */
const openModule = (page: Page, name: "Personality" | "Cognitive" | "Neuroscience" | "Simulation") =>
  expect(async () => {
    const tab = moduleTabs(page).getByRole("tab", { name, exact: true });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true", { timeout: 1000 });
  }).toPass();
const sections = ["principles", "modules", ...modules, "use-cases", "faq"];
/** The sections round 4 cut (§S6), with the anchors that opened them. */
const removed = ["problem", "reports", "how-it-works", "pricing", "behind-results", "platform", "science", "impact"];
test.describe("Game-Based Assessment page", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders the hero, every section and the closer, with the title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Game-Based Assessment: Talent Assessment for Hiring | DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("heading", { level: 1, name: "Game-based assessment for better hiring." })).toBeVisible();
    for (const id of sections) {
      await expect(page.locator(`section#${id}`), id).toHaveCount(1);
      await expect(page.locator(`section#${id} h2`), id).toHaveCount(1);
    }
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

  test("Personality · DEUS Discover: the story, the three measures and the customization panels", async ({ page }) => {
    await page.goto(PATH);
    const personality = page.locator("#personality");
    await expect(personality.getByRole("heading", { level: 2, name: "DEUS Discover: Personality Test" })).toBeVisible();
    await expect(personality.getByText("Know your candidates before the interview.", { exact: true })).toBeVisible();
    await expect(personality.getByText("Module 1 of 4")).toBeVisible();
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
    await openModule(page, "Cognitive");
    const cognitive = page.locator("#cognitive");
    await expect(cognitive.locator("li:has(b)")).toHaveCount(7);
    await expect(cognitive.getByText("Objective Shooter", { exact: true })).toBeVisible();
    await expect(cognitive.getByText("Processing speed and precision", { exact: true })).toBeVisible();
    await expect(cognitive.getByText("Cognitive agility", { exact: true })).toBeVisible();
    await openModule(page, "Neuroscience");
    const neuro = page.locator("#neuro");
    await expect(neuro.locator("li:has(b)")).toHaveCount(6);
    await expect(neuro.getByText("Faces Game", { exact: true })).toBeVisible();
    await expect(
      neuro.getByText("Emotional intelligence, empathy and emotion recognition", { exact: true }),
    ).toBeVisible();
  });

  test("each module is titled with its name over a sub-line, without the science lines (F64–F67, D8)", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#personality").getByText(/Big Five \(OCEAN\)/)).toBeVisible();
    for (const [name, id, title, subtitle] of [
      ["Cognitive", "cognitive", "Cognitive Assessment", "Measure cognitive skills through seven interactive games."],
      ["Neuroscience", "neuro", "Neuroscience Assessment", "See how candidates really behave, not only what they say."],
      ["Simulation", "simulation", "Simulation Assessment", "Test business problem-solving skills against the clock."],
    ] as const) {
      await openModule(page, name);
      const section = page.locator(`#${id}`);
      await expect(section.getByRole("heading", { level: 2, name: title })).toBeVisible();
      await expect(section.getByText(subtitle, { exact: true })).toBeVisible();
    }
    await expect(page.getByText(/grounded in classical frameworks|adapts behavioral tasks/)).toHaveCount(0);
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
      "/en/solutions/talent-mapping",
      "/en/solutions/talent-mapping",
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
    await expect(top.getByRole("heading", { level: 2, name: "A smarter assessment for better hiring results." })).toBeVisible();
    await expect(top.getByText(/^Game-based assessment measures how candidates think and behave through short games instead of a questionnaire\..*high-volume hiring and talent decisions\.$/)).toBeVisible();
    for (const pillar of ["Real behavior signals", "Scientifically grounded", "Enterprise-ready"]) {
      await expect(top.getByRole("heading", { level: 3, name: pillar })).toBeVisible();
    }
    // no section label over the title
    await expect(top.getByText("What's different", { exact: true })).toHaveCount(0);
    const firstText = await top.evaluate((el) => (el.textContent ?? "").trim());
    expect(firstText.startsWith("A smarter assessment")).toBe(true);
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

  test("the games lists are valid lists: every item sits in a ul, none inside another item", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#cognitive li > li, #neuro li > li, #simulation li > li")).toHaveCount(0);
    await expect(page.locator("#cognitive ul").first().locator("> li")).toHaveCount(7);
  });

  test("every game and simulation has its screenshot", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#cognitive [data-placeholder]")).toHaveCount(0);
    await expect(page.locator("#neuro [data-placeholder]")).toHaveCount(0);
    await expect(page.locator("#simulation [data-placeholder]")).toHaveCount(0);
    await openModule(page, "Neuroscience");
    await expect(page.locator("#neuro").getByRole("img", { name: /The Keypress Game/ })).toBeVisible();
    await expect(page.locator("#neuro").getByRole("img", { name: /The Balloon Game/ })).toBeVisible();
    await expect(page.locator("#neuro").getByRole("img", { name: /^The Tower Game/ })).toBeVisible();
    await openModule(page, "Cognitive");
    await expect(page.locator("#cognitive").getByRole("img", { name: /^Objective Shooter/ })).toBeVisible();
    await openModule(page, "Simulation");
    await expect(page.locator('#simulation img[src*="gba-simulation.png"]')).toBeVisible();
    await expect(page.locator('#simulation img[src*="gba-simulation-event-operations"]')).toBeVisible();
  });

  test("every game module has its two columns: what is missed, and what you get instead", async ({ page }) => {
    await page.goto(PATH);
    for (const [id, tab, miss] of [
      ["cognitive", "Cognitive", "What traditional tests miss"],
      ["neuro", "Neuroscience", "What interviews miss"],
      ["simulation", "Simulation", "What case interviews miss"],
    ] as const) {
      await openModule(page, tab);
      const section = page.locator(`#${id}`);
      await expect(section.getByRole("heading", { level: 3, name: miss })).toBeVisible();
      await expect(section.getByRole("heading", { level: 3, name: "What you get instead" })).toBeVisible();
      if (id === "neuro") await expect(section.getByText("Behavioral data from what people actually do.")).toBeVisible();
    }
  });

  test("Simulation has two scenario cards and the four things it assesses", async ({ page }) => {
    await page.goto(PATH);
    await openModule(page, "Simulation");
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
    // F25: a two-column list with thin dividers, not a row of pills
    const list = simulation.getByRole("listitem").filter({ hasText: "Written synthesis" }).locator("xpath=..");
    await expect(list.getByRole("listitem")).toHaveCount(4);
    const [left, right] = await Promise.all(
      ["Analytical thinking", "Financial and business acumen"].map((t) => list.getByText(t, { exact: true }).boundingBox()),
    );
    expect(Math.round(left!.y)).toBe(Math.round(right!.y));
    await expect(list.getByText("Written synthesis", { exact: true })).toHaveCSS("border-bottom-style", "solid");
    await expect(list.getByText("Written synthesis", { exact: true })).not.toHaveCSS("border-radius", "999px");
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
    expect(data.mainEntity).toHaveLength(11);
  });

  test("without JavaScript, every section, every module and every FAQ answer is in the HTML", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(PATH);
    for (const id of sections) await expect(page.locator(`section#${id}`), id).toHaveCount(1);
    const html = await page.content();
    expect(html).toContain("Every session starts with device checks");
    expect(html).toContain("The Tower Game: cake layers");
    expect(html).toContain("Business Operations");
    expect(html).toContain('href="#simulation"'); // the "Next module" link at the end of Neuroscience
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

test.describe("GBA module tabs (F40)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  const tab = (page: Page, name: string) => moduleTabs(page).getByRole("tab", { name, exact: true });
  const sectionTop = (page: Page, id: string) =>
    page.evaluate((target) => document.getElementById(target)!.getBoundingClientRect().top + window.scrollY, id);
  /** The pill's bottom edge and the top of a module's section label (the line above its heading). */
  const labelUnderPill = (page: Page, id: string) =>
    page.evaluate(
      (id) => [
        document.querySelector("[role=tablist][aria-label='Game-Based Assessment modules']")!.getBoundingClientRect().bottom,
        document.getElementById(`${id}-title`)!.parentElement!.firstElementChild!.getBoundingClientRect().top,
      ],
      id,
    );
  /** Waits out the smooth scroll: the label ends up just under the pill (within 60px). */
  const expectLabelClear = (page: Page, id: string) =>
    expect
      .poll(async () => {
        const [pillBottom, labelTop] = await labelUnderPill(page, id);
        return labelTop > pillBottom && labelTop < pillBottom + 60;
      })
      .toBe(true);

  test("is a pill of four tabs with Personality open, and only one module shows", async ({ page }) => {
    await page.goto(PATH);
    await expect(moduleTabs(page).getByRole("tab")).toHaveText(["Personality", "Cognitive", "Neuroscience", "Simulation"]);
    await expect(tab(page, "Personality")).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#personality")).toBeVisible();
    for (const id of ["cognitive", "neuro", "simulation"]) await expect(page.locator(`#${id}`)).toBeHidden();
  });

  test("sticks under the header while the module is on screen, and lets go after it", async ({ page }) => {
    await page.goto(PATH);
    for (const [id, name] of [
      ["personality", "Personality"],
      ["simulation", "Simulation"],
    ] as const) {
      await tab(page, name).click();
      await page.evaluate((y) => window.scrollTo(0, y), (await sectionTop(page, id)) + 450);
      const box = await moduleTabs(page).boundingBox();
      // 84px header, then the band's 12px of air
      expect(box!.y).toBeGreaterThanOrEqual(90);
      expect(box!.y).toBeLessThanOrEqual(100);
    }
    await page.evaluate((y) => window.scrollTo(0, y), (await sectionTop(page, "use-cases")) + 200);
    await expect(moduleTabs(page)).not.toBeInViewport();
  });

  test("a switch near the top keeps the page still; a switch from deep in a module brings the new one's label under the pill", async ({ page }) => {
    await page.goto(PATH);
    await page.evaluate((y) => window.scrollTo(0, y), (await sectionTop(page, "modules")) - 100);
    const before = await page.evaluate(() => window.scrollY);
    await tab(page, "Cognitive").click();
    await expect(page.locator("#cognitive")).toBeVisible();
    expect(await page.evaluate(() => window.scrollY)).toBe(before);
    await expect(page).toHaveURL(/#cognitive$/);

    await tab(page, "Personality").click();
    await page.evaluate((y) => window.scrollTo(0, y), (await sectionTop(page, "personality")) + 1400);
    await tab(page, "Simulation").click();
    await expect(page.locator("#simulation")).toBeVisible();
    await expectLabelClear(page, "simulation");
  });

  test("arrow keys move between the tabs", async ({ page }) => {
    await page.goto(PATH);
    // retried, in case the key lands before the page has hydrated
    await expect(async () => {
      await tab(page, "Personality").focus();
      await page.keyboard.press("ArrowRight");
      await expect(tab(page, "Cognitive")).toHaveAttribute("aria-selected", "true", { timeout: 1000 });
    }).toPass();
    await expect(tab(page, "Cognitive")).toBeFocused();
    await expect(page.locator("#cognitive")).toBeVisible();
  });

  test("each module but the last ends with a link that opens the next one", async ({ page }) => {
    await page.goto(PATH);
    for (const [link, id, name] of [
      ["Next module: Cognitive", "cognitive", "Cognitive"],
      ["Next module: Neuroscience", "neuro", "Neuroscience"],
      ["Next module: Simulation", "simulation", "Simulation"],
    ] as const) {
      await page.getByRole("link", { name: link }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(tab(page, name)).toHaveAttribute("aria-selected", "true");
      await expectLabelClear(page, id);
    }
    await expect(page.locator("#simulation").getByRole("link", { name: /^Next module/ })).toHaveCount(0);
  });

  test("the arrow beside the pill opens the next module, and wraps from Simulation to Personality (F68)", async ({ page }) => {
    await page.goto(PATH);
    for (const [arrow, name] of [
      ["Next module: Cognitive", "Cognitive"],
      ["Next module: Neuroscience", "Neuroscience"],
      ["Next module: Simulation", "Simulation"],
      ["Next module: Personality", "Personality"],
    ] as const) {
      // retried, in case the first click lands before the page has hydrated
      await expect(async () => {
        await page.getByRole("button", { name: arrow }).click();
        await expect(tab(page, name)).toHaveAttribute("aria-selected", "true", { timeout: 1000 });
      }).toPass();
    }
    await expect(page).toHaveURL(/#personality$/);
    // keyboard: the arrow comes after the tabs, and Enter works it
    await page.getByRole("button", { name: "Next module: Cognitive" }).focus();
    await page.keyboard.press("Enter");
    await expect(tab(page, "Cognitive")).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("button", { name: "Next module: Neuroscience" })).toBeFocused();
    // sitting at the pill's right, on the same line
    const [pill, arrowBox] = await Promise.all([
      moduleTabs(page).boundingBox(),
      page.getByRole("button", { name: "Next module: Neuroscience" }).boundingBox(),
    ]);
    expect(arrowBox!.x).toBeGreaterThan(pill!.x + pill!.width);
    expect(Math.abs(arrowBox!.y - pill!.y)).toBeLessThanOrEqual(1);
    // a circle as tall as the pill
    expect(Math.abs(arrowBox!.height - pill!.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(arrowBox!.width - arrowBox!.height)).toBeLessThanOrEqual(1);
  });

  for (const [hash, name] of [
    ["#neuro", "Neuroscience"],
    ["#simulation", "Simulation"],
  ] as const) {
    test(`arriving with ${hash} opens that tab, with its label clear of the header and the pill`, async ({ page }) => {
      await page.goto(PATH + hash);
      await expect(tab(page, name)).toHaveAttribute("aria-selected", "true");
      await expectLabelClear(page, hash.slice(1));
    });
  }

  test("a menu link to a module opens its tab while on the page, and Back returns to the one before", async ({ page }) => {
    await page.goto(PATH + "#cognitive");
    await expect(tab(page, "Cognitive")).toHaveAttribute("aria-selected", "true");
    const header = page.getByRole("banner");
    await header.getByRole("button", { name: "Solutions" }).click();
    await header.getByRole("link", { name: /^Simulation/ }).click();
    await expect(page).toHaveURL(/#simulation$/);
    await expect(tab(page, "Simulation")).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#simulation-title")).toBeInViewport();
    await page.goBack();
    await expect(tab(page, "Cognitive")).toHaveAttribute("aria-selected", "true");
  });

  test("without JavaScript, Personality shows and the other modules are in the HTML", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(PATH);
    await expect(page.locator("#personality")).toBeVisible();
    for (const id of ["cognitive", "neuro", "simulation"]) await expect(page.locator(`section#${id}`)).toHaveCount(1);
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

  test("the module tabs fit the screen, and stick under the 68px header", async ({ page }) => {
    await page.goto(PATH + "#neuro");
    const nav = moduleTabs(page);
    await expect(nav.getByRole("tab")).toHaveCount(4);
    const box = await nav.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390);
    await expect(nav.getByRole("tab", { name: "Neuroscience" })).toHaveAttribute("aria-selected", "true");
    await expect.poll(() => page.evaluate(() => document.getElementById("neuro-title")!.getBoundingClientRect().top)).toBeLessThan(400);
    const [navBox, headingTop] = await page.evaluate(() => {
      const rect = document.querySelector("[role=tablist][aria-label='Game-Based Assessment modules']")!.getBoundingClientRect();
      return [{ top: rect.top, bottom: rect.bottom }, document.getElementById("neuro-title")!.getBoundingClientRect().top];
    });
    // right under the header, with the band's 12px of air: no gap for content to show through
    expect(navBox.top).toBeGreaterThanOrEqual(68 + 12 - 1);
    expect(navBox.top).toBeLessThanOrEqual(68 + 12 + 1);
    expect(headingTop).toBeGreaterThan(navBox.bottom);
  });

  test("the pill is wider than the screen, so it slides the selected tab into view", async ({ page }) => {
    await page.goto(PATH + "#simulation");
    const nav = moduleTabs(page);
    const link = nav.getByRole("tab", { name: "Simulation" });
    await expect(link).toHaveAttribute("aria-selected", "true");
    await expect
      .poll(async () => {
        const [l, n] = await Promise.all([link.boundingBox(), nav.boundingBox()]);
        return l!.x >= n!.x && l!.x + l!.width <= n!.x + n!.width;
      })
      .toBe(true);
  });

  test("a sideways swipe on a module moves to the next or previous one, but not on a game row (F68)", async ({ page }) => {
    await page.goto(PATH + "#cognitive");
    await expect(moduleTabs(page).getByRole("tab", { name: "Cognitive" })).toHaveAttribute("aria-selected", "true");
    /** A one-finger swipe from (x0, y) to (x1, y), starting on `selector`. */
    const swipe = (selector: string, x0: number, x1: number) =>
      page.evaluate(
        ([selector, x0, x1]) => {
          const el = document.querySelector(selector as string)!;
          const y = 300;
          const at = (x: number) => new Touch({ identifier: 1, target: el, clientX: x as number, clientY: y });
          el.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [at(x0 as number)], changedTouches: [at(x0 as number)] }));
          el.dispatchEvent(new TouchEvent("touchend", { bubbles: true, touches: [], changedTouches: [at(x1 as number)] }));
        },
        [selector, x0, x1],
      );
    const selected = (name: string) =>
      expect(moduleTabs(page).getByRole("tab", { name, exact: true })).toHaveAttribute("aria-selected", "true");
    // a swipe on the game row scrolls the row, not the modules
    await swipe("#cognitive ul li", 300, 60);
    await page.waitForTimeout(300);
    await selected("Cognitive");
    await swipe("#cognitive-title", 320, 80);
    await selected("Neuroscience");
    await swipe("#neuro-title", 80, 320);
    await selected("Cognitive");
    // a short or mostly vertical move is not a swipe
    await swipe("#cognitive-title", 200, 170);
    await page.waitForTimeout(300);
    await selected("Cognitive");
  });

  test("a module's games are one sideways-swipe row, and only the row scrolls (F40)", async ({ page }) => {
    await page.goto(PATH + "#cognitive");
    const row = page.locator("#cognitive ul").first();
    await expect(row).toBeVisible();
    const [scrollWidth, clientWidth] = await row.evaluate((el) => [el.scrollWidth, el.clientWidth]);
    expect(scrollWidth).toBeGreaterThan(clientWidth * 3);
    const [first, second] = await Promise.all([row.locator("> li").nth(0).boundingBox(), row.locator("> li").nth(1).boundingBox()]);
    expect(Math.round(first!.y)).toBe(Math.round(second!.y));
    // the next tile peeks in at the right edge
    expect(second!.x).toBeLessThan(390);
    await expect(row).toHaveAttribute("tabindex", "0");
    await expect(row).toHaveAttribute("aria-label", "Cognitive Assessment");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
  });
});
