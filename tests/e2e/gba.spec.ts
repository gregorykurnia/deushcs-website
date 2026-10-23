import { expect, test } from "@playwright/test";
import { siteFlags } from "@/content/flags";

// Task 3.3: the Game-Based Assessment page, which since R2 (F10) also holds the four modules that
// were the DEUS Discover and Next Chapter pages, and since R6 (F28) what was the Science page (their
// tests moved here). Section copy is checked in
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
const sections = [
  "problem",
  "principles",
  "modules",
  ...modules,
  "use-cases",
  "reports",
  "how-it-works",
  "pricing",
  "behind-results",
  "faq",
];
const behindTabs = (page: Page) => page.getByRole("tablist", { name: "Behind the results" });
/** Opens a tab of "Behind the results" (F70), retried in case the click lands before hydration. */
const openBehind = (page: Page, name: "Platform" | "Science" | "Before and after") =>
  expect(async () => {
    const tab = behindTabs(page).getByRole("tab", { name, exact: true });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true", { timeout: 1000 });
  }).toPass();

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

  test("each module is titled with its name over a sub-line, and the science lines are in the Science cards (F64–F67, D8)", async ({ page }) => {
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
    await openBehind(page, "Science");
    const science = page.locator("#science");
    await expect(science.getByText(/processing speed, memory, reasoning and attention/)).toBeVisible();
    await expect(science.getByText(/risk-taking, motivation, effort and emotion recognition/)).toBeVisible();
  });

  test("The science: frameworks link down to their modules (opening their tabs), then four phases, three points and a demo button (F28)", async ({ page }) => {
    await page.goto(PATH);
    await openBehind(page, "Science");
    const science = page.locator("#science");
    await expect(science.getByRole("heading", { level: 3, name: "Games, built like serious psychometric assessments." })).toBeVisible();
    for (const [name, hash] of [
      ["Personality: the Big Five", "#personality"],
      ["Thinking: cognitive assessment", "#cognitive"],
      ["Behavior: neuroscience paradigms", "#neuro"],
    ] as const) {
      await expect(science.getByRole("link", { name: new RegExp(name) })).toHaveAttribute("href", hash);
    }
    await expect(science.getByRole("heading", { level: 3, name: "Four phases, before a single candidate plays." })).toBeVisible();
    await expect(science.locator("ol > li")).toHaveCount(4);
    for (const point of ["Validated", "Normed for Indonesia", "Hard to coach"]) {
      await expect(science.getByRole("heading", { level: 3, name: point, exact: true })).toBeVisible();
    }
    await expect(science.getByText(/including your in-house psychologists/)).toBeVisible();
    await expect(science.getByRole("link", { name: "Request a demo" })).toHaveAttribute("href", "/en/contact?product=gba");

    await science.getByRole("link", { name: /Behavior: neuroscience paradigms/ }).click();
    await expect(page).toHaveURL(/#neuro$/);
    await expect(moduleTabs(page).getByRole("tab", { name: "Neuroscience" })).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#neuro-title")).toBeInViewport();
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

  test("the lower sections run Use cases, Reports, How it works, Pricing, Behind the results, FAQ (F70)", async ({ page }) => {
    await page.goto(PATH);
    const ids = await page.locator("main > section[id], main > div > section[id]").evaluateAll((els) => els.map((el) => el.id));
    const lower = ids.slice(ids.indexOf("use-cases"));
    expect(lower).toEqual(["use-cases", "reports", "how-it-works", "pricing", "behind-results", "faq"]);
    // How it works ends with the free trial offer and its button, right above Pricing
    const how = page.locator("#how-it-works");
    await expect(how.locator("ol > li")).toHaveCount(4);
    await expect(how.getByRole("heading", { level: 3, name: "Start small. See the results. Then decide." })).toBeVisible();
    for (const offer of ["Free trial.", "Pilot first.", "No long-term contract.", "Mix and match modules."]) {
      await expect(how.getByText(offer, { exact: true })).toBeVisible();
    }
    await expect(how.getByRole("link", { name: "Request a free trial" })).toHaveAttribute("href", "/en/contact?product=gba");
    await expect(page.locator("#adoption")).toHaveCount(0);
    // the client stories line follows Behind the results, while there are stories
    const link = page.getByRole("link", { name: "Read client stories" });
    if (siteFlags.showStories) expect(await link.evaluate((el) => !!(document.getElementById("behind-results")!.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  });

  test("Behind the results: Platform, Science and Before and after are tabs, one showing at a time (F70)", async ({ page }) => {
    await page.goto(PATH);
    const behind = page.locator("#behind-results");
    await expect(behind.getByRole("heading", { level: 2, name: "The platform and the science behind every score." })).toBeVisible();
    await expect(behindTabs(page).getByRole("tab")).toHaveText(["Platform", "Science", "Before and after"]);
    await expect(behindTabs(page).getByRole("tab", { name: "Platform" })).toHaveAttribute("aria-selected", "true");
    await expect(behind.getByRole("heading", { level: 3, name: /^Running assessments for hundreds of people/ })).toBeVisible();
    await expect(behind.getByRole("heading", { name: "Games, built like serious psychometric assessments." })).toBeHidden();
    await openBehind(page, "Before and after");
    await expect(behind.getByRole("heading", { level: 3, name: "What changes for your team." })).toBeVisible();
    await expect(behind.getByRole("heading", { level: 3, name: "Better hires" })).toBeVisible();
    await expect(behind.getByRole("heading", { name: /^Running assessments/ })).toBeHidden();
  });

  test("arriving with #science opens the Science tab with the pill under the header (F70)", async ({ page }) => {
    await page.goto(`${PATH}#science`);
    await expect(behindTabs(page).getByRole("tab", { name: "Science" })).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#science").getByRole("heading", { level: 3, name: "Games, built like serious psychometric assessments." })).toBeVisible();
    await expect(behindTabs(page)).toBeInViewport();
    const top = await behindTabs(page).evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(84);
    // a later hash change opens its tab too
    await page.evaluate(() => (window.location.hash = "#impact"));
    await expect(behindTabs(page).getByRole("tab", { name: "Before and after" })).toHaveAttribute("aria-selected", "true");
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

  test("shows the Discover story scene, the admin dashboard and the individual report, with no TODO for them", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole("img", { name: /story scene at a town festival/ })).toBeVisible();
    await expect(page.locator("#platform").getByRole("img", { name: /admin dashboard/ })).toBeAttached();
    await expect(page.getByText("TODO: GBA CMS screenshot")).toHaveCount(0);
    await expect(page.locator("#reports").getByRole("img", { name: /^A hiring overview for ten candidates/ })).toBeVisible();
    await expect(page.getByText("TODO: GBA individual report screenshot")).toHaveCount(0);
  });

  test("Reports: the personality reports are the last tab (F40): both reports' screenshots", async ({ page }) => {
    await page.goto(PATH);
    const reports = page.locator("#reports");
    await reports.getByRole("tab", { name: "Personality reports" }).click();
    await expect(reports.getByRole("heading", { level: 3, name: "Two views: the person, and the fit." })).toBeVisible();
    await expect(reports.getByRole("img", { name: /individual report for one candidate/ })).toBeAttached();
    await expect(reports.getByRole("img", { name: /^An individual profile suitability report/ })).toBeVisible();
    await expect(reports.getByRole("heading", { name: "Individual profile suitability" })).toBeVisible();
  });

  test("the personality report scrolls only while on screen, and focus pauses it", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#reports [data-report-scroll]")).toHaveCount(1); // the personality report; the wide screenshots fit their stage
    const window_ = page.locator("#reports [data-report-scroll]").filter({ has: page.locator('img[src*="discover-report"]') });
    await expect(window_).toHaveCount(1);
    const image = window_.locator(".report-scroll-image");
    const style = () => image.evaluate((el) => [getComputedStyle(el).animationName, getComputedStyle(el).animationPlayState]);
    expect(await style()).toEqual(["report-scroll", "paused"]); // below the fold, in a hidden tab
    await page.locator("#reports").getByRole("tab", { name: "Personality reports" }).click();
    await window_.scrollIntoViewIfNeeded();
    await expect(window_).toHaveAttribute("data-playing", "true");
    expect(await style()).toEqual(["report-scroll", "running"]);
    // keyboard and touch visitors stop it by focusing the window (WCAG 2.2.2)
    await window_.focus();
    expect(await style()).toEqual(["report-scroll", "paused"]);
  });

  test("Reports: four tabs, each with its own content; arrows and clicks switch", async ({ page }) => {
    await page.goto(PATH);
    const tabs = page.getByRole("tablist", { name: "The right assessment report for every decision." });
    await expect(tabs.getByRole("tab")).toHaveText(["Individual report", "Batch report", "Interactive dashboard", "Personality reports"]);
    await expect(tabs.getByRole("tab", { name: "Individual report" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("Export as PDF or share a live link.")).toBeVisible();

    await tabs.getByRole("tab", { name: "Individual report" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.getByRole("tab", { name: "Batch report" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("Download the whole batch as one PDF.")).toBeVisible();
    await expect(page.getByText("Export as PDF or share a live link.")).toBeHidden();
    await expect(page.locator("#reports").getByRole("img", { name: /^A batch report/ })).toBeVisible();

    await tabs.getByRole("tab", { name: "Interactive dashboard" }).click();
    await expect(page.getByText("Share it with a link.")).toBeVisible();
    await expect(page.locator("#reports").getByRole("img", { name: /^The interactive dashboard/ })).toBeVisible();
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
    // G1.5's buyer questions are in it too
    expect(data.mainEntity.map((q: { name: string }) => q.name)).toContain("How much does a game-based assessment cost?");
    // the minimum-order question is hidden with its flag
    expect(data.mainEntity).toHaveLength(12);
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

  test("without JavaScript, every section, every module and report tab and every FAQ answer is in the HTML", async ({ browser }) => {
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

test.describe("The old Discover, Next Chapter (R2) and Science (R6) routes", () => {
  for (const [from, hash] of [
    ["/en/solutions/discover", "#personality"],
    ["/en/solutions/next-chapter", "#cognitive"],
    ["/id/solutions/discover", "#personality"],
    ["/solutions/next-chapter", "#cognitive"],
    ["/en/science", "#science"],
    ["/id/science", "#science"],
    ["/science", "#science"],
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
