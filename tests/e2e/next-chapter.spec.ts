import { expect, test } from "@playwright/test";

// Task 3.5: the Next Chapter page. Copy and the content shape are checked in the unit tests; here:
// what a visitor and a crawler get from the built page, and how the sticky sub-nav behaves.

const PATH = "/en/solutions/next-chapter";
const modules = ["cognitive", "neuro", "simulation"];
const sections = [...modules, "choosing"];

test.describe("Next Chapter page", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders the hero, every section and the closer, with the title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(
      "Next Chapter: Cognitive, Neuroscience and Business Simulation Assessment | DEUS Human Capital Services",
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(
      page.getByRole("heading", { level: 1, name: "See how people think, not what they've memorized." }),
    ).toBeVisible();
    for (const id of sections) {
      await expect(page.locator(`section#${id}`), id).toHaveCount(1);
      await expect(page.locator(`section#${id} h2`), id).toHaveCount(1);
    }
    await expect(page.getByRole("heading", { level: 2, name: "Seven games. Seven ways of thinking." })).toBeVisible();
    await expect(page.getByText("Play it once,")).toBeVisible();
  });

  test("the header and WhatsApp button are the assessment ones", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole("banner").getByRole("link", { name: "Request a free trial" })).toHaveAttribute(
      "href",
      "/en/contact?product=next-chapter",
    );
    await expect(page.getByRole("link", { name: "Chat with us on WhatsApp" })).toHaveAttribute(
      "href",
      /text=Halo%20DEUS%2C%20saya%20tertarik%20dengan%20asesmen/,
    );
  });

  test("the hero buttons and the closer go where the content says", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section[aria-labelledby='hero-title']");
    await expect(hero.getByRole("link", { name: "Request a free trial" })).toHaveAttribute(
      "href",
      "/en/contact?product=next-chapter",
    );
    await expect(hero.getByRole("link", { name: "Book a demo" })).toHaveAttribute(
      "href",
      "/en/contact?product=next-chapter",
    );
    await expect(page.getByRole("link", { name: "Request a free trial" }).last()).toHaveAttribute(
      "href",
      "/en/contact?product=next-chapter",
    );
  });

  test("the hero card lists the three modules, each a jump to its section", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section[aria-labelledby='hero-title']");
    const links = hero.getByRole("list", { name: "Next Chapter modules" }).getByRole("link");
    await expect(links).toHaveText(["Cognitive7 games", "Neuroscience6 games", "Simulation2 scenarios"]);
    await expect(links).toHaveCount(3);
    await links.nth(1).click();
    await expect(page).toHaveURL(/#neuro$/);
    await expect(page.getByRole("heading", { level: 2, name: /The things people can't easily fake/ })).toBeInViewport();
  });

  test("the hero window shows the Keypress Game screen", async ({ page }) => {
    await page.goto(PATH);
    const hero = page.locator("section[aria-labelledby='hero-title']");
    await expect(hero.getByRole("img", { name: /The Keypress Game/ })).toBeVisible();
    await expect(hero.getByText("Motivation and processing speed")).toBeVisible();
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
    await expect(page.getByText("TODO: Balloon Game screenshot")).toBeVisible();
    await expect(page.getByText("TODO: Event Operations simulation screenshot")).toBeVisible();
  });

  test("every module has its two columns: what is missed, and what you get instead", async ({ page }) => {
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

  test("the use-case table has five rows under its two headings", async ({ page }) => {
    await page.goto(PATH);
    const table = page.locator("#choosing table");
    await expect(table).toBeVisible();
    await expect(table.getByRole("columnheader")).toHaveText(["Use case", "Recommended modules"]);
    await expect(table.getByRole("rowheader")).toHaveCount(5);
    await expect(table.getByRole("row", { name: /Leadership identification/ })).toContainText(
      "Neuro (risk, motivation, EQ), with Personality",
    );
    await expect(page.locator("#choosing ul[aria-label]")).toBeHidden();
  });
});

test.describe("Next Chapter sub-nav", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  const nav = (page: import("@playwright/test").Page) => page.getByRole("navigation", { name: "Next Chapter modules" });
  const sectionTop = (page: import("@playwright/test").Page, id: string) =>
    page.evaluate((target) => document.getElementById(target)!.getBoundingClientRect().top + window.scrollY, id);

  test("is a pill of three links, none current at the top of the page", async ({ page }) => {
    await page.goto(PATH);
    await expect(nav(page).getByRole("link")).toHaveText(["Cognitive", "Neuroscience", "Simulation"]);
    await expect(nav(page).locator("[aria-current]")).toHaveCount(0);
  });

  test("sticks under the header while a module is on screen, and marks that module current", async ({ page }) => {
    await page.goto(PATH);
    for (const [id, name] of [
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
    await page.locator("#choosing").scrollIntoViewIfNeeded();
    await page.evaluate((y) => window.scrollTo(0, y), (await sectionTop(page, "choosing")) + 200);
    await expect(nav(page).locator("[aria-current]")).toHaveCount(0);
    await expect(nav(page)).not.toBeInViewport();
  });

  for (const [name, id] of [
    ["Cognitive", "cognitive"],
    ["Simulation", "simulation"],
  ] as const) {
    // Cognitive is a tight section (less top padding), so it needs its own scroll margin.
    test(`a click on ${name} jumps to the module, with its label pill clear of the header and the pill`, async ({ page }) => {
      await page.goto(PATH);
      await nav(page).getByRole("link", { name }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(nav(page).getByRole("link", { name })).toHaveAttribute("aria-current", "location");
      const [navBottom, labelTop] = await page.evaluate(
        (id) => [
          document.querySelector("nav[aria-label='Next Chapter modules']")!.getBoundingClientRect().bottom,
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
});

test.describe("Next Chapter page without JavaScript", () => {
  test("every section, both nav and table are in the HTML, and links still jump", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(PATH);
    for (const id of sections) await expect(page.locator(`section#${id}`), id).toHaveCount(1);
    const html = await page.content();
    expect(html).toContain("Keypress Game");
    expect(html).toContain("TODO: Tower Game screenshot");
    expect(html).toContain("Business Operations");
    expect(html).toContain("Management Trainee recruitment");
    expect(html).toContain('href="#simulation"');
    // nothing is held back at opacity 0 before the script runs
    await expect(page.locator("[data-reveal='pending']")).toHaveCount(0);
    await page.getByRole("navigation", { name: "Next Chapter modules" }).getByRole("link", { name: "Neuroscience" }).click();
    await expect(page).toHaveURL(/#neuro$/);
    await context.close();
  });
});

test("Indonesian has no Next Chapter page yet, so it sends the visitor to English", async ({ page }) => {
  await page.goto("/id/solutions/next-chapter");
  await expect(page).toHaveURL(/\/en\/solutions\/next-chapter$/);
});

test.describe("Next Chapter page on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("doesn't scroll sideways, and the pill fits the screen", async ({ page }) => {
    await page.goto(PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
    await expect(page.getByRole("banner").getByRole("link", { name: "Request a free trial" })).toBeVisible();
    const nav = page.getByRole("navigation", { name: "Next Chapter modules" });
    await expect(nav.getByRole("link")).toHaveCount(3);
    const box = await nav.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390);
    // all three links show without sliding the pill sideways
    expect(await nav.evaluate((el) => el.scrollWidth - el.clientWidth)).toBe(0);
  });

  test("the use-case table becomes one card per row", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("#choosing table")).toBeHidden();
    const cards = page.locator("#choosing ul[aria-label='Which modules clients usually pick for each use case'] > li");
    await expect(cards).toHaveCount(5);
    await expect(cards.first()).toContainText("Management Trainee recruitment");
    await expect(cards.first()).toContainText("Recommended modules");
    await expect(cards.first()).toContainText("Cognitive + Neuro to shortlist, Simulation for the final round");
  });

  test("the sub-nav sticks under the 68px header and a click clears it", async ({ page }) => {
    await page.goto(PATH);
    const nav = page.getByRole("navigation", { name: "Next Chapter modules" });
    await nav.getByRole("link", { name: "Neuroscience" }).click();
    await expect(page).toHaveURL(/#neuro$/);
    const [navBox, headingTop] = await page.evaluate(() => {
      const rect = document.querySelector("nav[aria-label='Next Chapter modules']")!.getBoundingClientRect();
      return [{ top: rect.top, bottom: rect.bottom }, document.getElementById("neuro-title")!.getBoundingClientRect().top];
    });
    // right under the header, with the band's 12px of air: no gap for content to show through
    expect(navBox.top).toBeGreaterThanOrEqual(68 + 12 - 1);
    expect(navBox.top).toBeLessThanOrEqual(68 + 12 + 1);
    expect(headingTop).toBeGreaterThan(navBox.bottom);
  });
});
