import { mkdirSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";

// Task 2.4: the About page. Copy and the content shape are checked in the unit tests; here: what a
// visitor and a crawler get from the built page.

const PATH = "/en/about";

const MISSION = "Delivering evidence-based solutions that help organizations understand, develop, and optimize the best potential of every individual.";
const VISION = "Empowering organizations to achieve sustainable growth through human capital development.";

/** How many lines an element's text is set in: its height over its line height. */
const lineCount = (el: Locator) =>
  el.evaluate((node) => Math.round(node.getBoundingClientRect().height / parseFloat(getComputedStyle(node).lineHeight)));

type Rect = { x: number; y: number; width: number; height: number; fontSize: number };

/** The boxes of every element the locator matches, read in one go: reading them one at a time
 * lets a late font or image move the page between two reads and shifts one against the other. */
const rects = (el: Locator) =>
  el.evaluateAll((nodes): Rect[] =>
    nodes.map((node) => {
      const r = node.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height, fontSize: parseFloat(getComputedStyle(node).fontSize) };
    }),
  );

/** Opens About and waits for the fonts, so line counts and boxes are the final ones. */
async function openAbout(page: Page) {
  await page.goto(PATH);
  await page.evaluate(() => document.fonts.ready);
}

const timeline = (page: Page) => page.getByRole("list", { name: "Our history" });

test.describe("About", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("renders the headline, title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("About DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(
      page.getByRole("heading", { level: 1, name: "We believe people are a company's most important asset." }),
    ).toBeVisible();
  });

  test("the sections come in about.md's order, with leadership hidden (Q10)", async ({ page }) => {
    await page.goto(PATH);
    const headings = page.getByRole("main").locator("h1, h2");
    await expect(headings).toHaveText([
      "We believe people are a company's most important asset.",
      "It started with a game.",
      "Our mission",
      "Our vision",
      "Six values, one letter.",
      "2022 to today.",
    ]);
    await expect(page.getByText("Leadership", { exact: true })).toHaveCount(0);
    await expect(page.getByText("Gregory Amadeus Kurnia")).toHaveCount(0);
  });

  // D4, F125, F126: one section, two equal halves. Neither sentence is a heading.
  test("mission and vision are two equal halves side by side, label and sentence alike, no big heading (D4)", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("section[aria-labelledby='vision-mission-label']")).toHaveCount(0);
    const section = page.locator("section[aria-labelledby='mission-title vision-title']");
    await expect(section).toHaveCount(1);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(["Our mission", "Our vision"]);
    await expect(section.getByText(MISSION)).toBeVisible();
    await expect(section.getByText(VISION)).toBeVisible();
    await expect(page.getByRole("main").getByText(/^Delivering evidence-based solutions/)).toHaveCount(1);
    await expect(page.getByRole("heading", { name: /^Delivering evidence-based/ })).toHaveCount(0);
    await expect(section.getByRole("tab")).toHaveCount(0);

    await page.evaluate(() => document.fonts.ready);
    const halves = await rects(section.locator("h2").locator("xpath=.."));
    expect(halves).toHaveLength(2);
    const [a, b] = halves;
    expect(Math.abs(a.width - b.width), "equal widths").toBeLessThanOrEqual(1);
    expect(b.x).toBeGreaterThan(a.x + a.width - 1); // side by side
    const [label1, label2] = await rects(section.locator("h2"));
    const [text1, text2] = await rects(section.locator("p"));
    expect(Math.abs(a.y - b.y), "same top").toBeLessThanOrEqual(1);
    expect(text1.fontSize).toBe(text2.fontSize);
    expect(text1.fontSize).toBeLessThanOrEqual(20); // the lede size, not a heading
    expect(Math.abs(label1.y - label2.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(text1.y - text2.y)).toBeLessThanOrEqual(1);
    const colours = await section.locator("p").evaluateAll((ps) => ps.map((p) => getComputedStyle(p).color));
    expect(colours[0]).toBe(colours[1]);
  });

  test("the 6 I's are a plain list of six, no panels (F90)", async ({ page }) => {
    await page.goto(PATH);
    const values = page.locator("section[aria-labelledby='values-title']");
    await expect(values.getByRole("heading", { level: 3 })).toHaveText([
      "Innovative",
      "Inspiring",
      "Invested in our clients",
      "Inclusive",
      "Insightful",
      "Improvement oriented",
    ]);
    // no card boxes: each value sits on the section's own background
    const backgrounds = await values
      .locator("li")
      .evaluateAll((items) => items.map((li) => getComputedStyle(li).backgroundColor));
    expect(backgrounds).toEqual(Array(6).fill("rgba(0, 0, 0, 0)"));
  });

  test("the timeline runs 2022 to 2026 and 2026 is the current step", async ({ page }) => {
    await page.goto(PATH);
    const timeline = page.getByRole("list", { name: "Our history" });
    const years = timeline.locator(":scope > li");
    await expect(years).toHaveCount(5);
    await expect(years.first()).toContainText("2022");
    await expect(years.first()).toContainText("The beginning");
    await expect(years.last()).toContainText("2026");
    await expect(years.last()).toContainText("Wider coverage");
    await expect(years.last()).toContainText("(current step)");
    await expect(timeline.getByText("(current step)")).toHaveCount(1);
  });

  test("the journey's dots are alike, no ember, and fill in one after another as it comes into view (F91)", async ({ page }) => {
    await page.goto(PATH);
    const dots = page.locator("section[aria-labelledby='timeline-title'] .timeline-dot");
    await expect(dots).toHaveCount(5);
    const fills = () => dots.evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor));
    // below the fold: empty, waiting (once the page's script has run)
    await expect.poll(fills).toEqual(Array(5).fill("rgb(255, 255, 255)"));
    await dots.first().scrollIntoViewIfNeeded();
    await expect.poll(fills).toEqual(Array(5).fill("rgb(37, 99, 235)"));
  });

  test("recognition is cut (F92, D2); the timeline keeps its facts and the page has no Agate", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator("section[aria-labelledby='recognition-label']")).toHaveCount(0);
    const timeline = page.locator("section[aria-labelledby='timeline-title']");
    await expect(timeline.getByText(/Startup Studio/).first()).toBeVisible();
    await expect(timeline.getByText(/Innovfest/).first()).toBeVisible();
    await expect(page.getByRole("main").getByText("Agate")).toHaveCount(0);
  });

  test("the legal entity is not on the page (F30; it stays in the footer and the privacy policy), and the closing panel follows", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole("main").getByText("PT Investama Persada Kurnia")).toHaveCount(0);
    await expect(page.getByRole("main").getByText("[Address")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Request a demo" }).last()).toHaveAttribute("href", "/en/contact");
  });

  test("the language switch shows Bahasa Indonesia disabled, since About is English only", async ({ page }) => {
    await page.goto(PATH);
    const lang = page.getByRole("navigation", { name: "Language", exact: true });
    await expect(lang.getByRole("link", { name: "Bahasa Indonesia (not available for this page yet)" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    await page.goto(PATH);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });
});

// F124, D8: the headline takes two lines from 1024px, up to four on a phone, wording unchanged.
test.describe("About's headline lines", () => {
  for (const [width, most] of [[1024, 2], [1100, 2], [1180, 2], [1280, 2], [1440, 2], [390, 4]] as const) {
    test(`the headline takes ${most === 2 ? "two lines" : "at most four lines"} at ${width}px (F124)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await openAbout(page);
      const h1 = page.getByRole("heading", { level: 1, name: "We believe people are a company's most important asset." });
      const lines = await lineCount(h1);
      if (most === 2) expect(lines).toBe(2);
      else expect(lines).toBeLessThanOrEqual(most);
    });
  }
});

// F127: "Our history" holds at every width. Five columns from 1100px (`lap:`, where each is at least
// 187px wide); below that, down to a phone, the stacked rail. Checked on both sides of the switch.
test.describe("Our history at every width", () => {
  for (const width of [901, 1024, 1099, 1100, 1180, 1280, 1440, 390]) {
    const columns = width >= 1100;
    test(`${width}px: ${columns ? "five columns" : "the stacked rail"}, nothing cut off or overlapping (F127)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await openAbout(page);
      const items = timeline(page).locator(":scope > li");
      await expect(items).toHaveCount(5);
      const boxes = await rects(items);

      if (columns) {
        // one row: same top, left to right, no overlap, and no column narrower than 187px
        for (let i = 0; i < 5; i++) {
          expect(Math.abs(boxes[i].y - boxes[0].y), `column ${i} top`).toBeLessThanOrEqual(1);
          expect(boxes[i].width, `column ${i} width`).toBeGreaterThanOrEqual(186);
          if (i > 0) expect(boxes[i].x, `column ${i} starts after column ${i - 1}`).toBeGreaterThanOrEqual(boxes[i - 1].x + boxes[i - 1].width);
        }
      } else {
        // one column: same left, top to bottom, no overlap
        for (let i = 1; i < 5; i++) {
          expect(Math.abs(boxes[i].x - boxes[0].x), `entry ${i} left`).toBeLessThanOrEqual(1);
          expect(boxes[i].y, `entry ${i} sits below entry ${i - 1}`).toBeGreaterThanOrEqual(boxes[i - 1].y + boxes[i - 1].height);
        }
      }

      // no text runs out of its box, and the page doesn't scroll sideways
      const clipped = await items.evaluateAll((lis) =>
        lis.flatMap((li) => [...li.querySelectorAll("p")].filter((p) => p.scrollWidth > p.clientWidth + 1).map((p) => p.textContent)),
      );
      expect(clipped).toEqual([]);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);

      // the nodes sit on the track (columns) or the rail (stack): all dots alike in size
      const dots = await page.locator("section[aria-labelledby='timeline-title'] .timeline-dot").evaluateAll((els) =>
        els.map((el) => {
          const r = el.getBoundingClientRect();
          return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2), w: Math.round(r.width) };
        }),
      );
      expect(new Set(dots.map((d) => d.w))).toEqual(new Set([18]));
      expect(new Set(dots.map((d) => (columns ? d.y : d.x))).size, "dots in one line").toBe(1);
    });
  }
});

// A6: screenshots at the five widths and a phone, for the design review (saved to
// screenshots/a6/, which git ignores): the headline, the two halves and the timeline.
test.describe("A6: screenshots for the design review", () => {
  for (const width of [901, 1024, 1100, 1180, 1280, 390]) {
    test(`About at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await openAbout(page);
      mkdirSync("screenshots/a6", { recursive: true });
      await page.screenshot({ path: `screenshots/a6/about-hero-${width}.png` });
      // the fixed header and WhatsApp button would sit in the middle of the full-page captures below
      await page.evaluate(() =>
        document.querySelectorAll<HTMLElement>("*").forEach((el) => {
          if (/fixed|sticky/.test(getComputedStyle(el).position)) el.style.visibility = "hidden";
        }),
      );
      for (const [name, selector] of [
        ["mission", "section[aria-labelledby='mission-title vision-title']"],
        ["timeline", "section[aria-labelledby='timeline-title']"],
      ] as const) {
        const section = page.locator(selector);
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(2800); // the entrance fade and the dots filling in, one after another
        const r = await section.boundingBox();
        const top = await page.evaluate(() => window.scrollY);
        await page.screenshot({
          path: `screenshots/a6/about-${name}-${width}.png`,
          fullPage: true,
          clip: { x: 0, y: r!.y + top, width, height: r!.height },
        });
      }
    });
  }
});

test.describe("About on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("nothing scrolls sideways, and the timeline is a vertical list of five", async ({ page }) => {
    await page.goto(PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(page.getByRole("list", { name: "Our history" }).locator(":scope > li")).toHaveCount(5);
  });
});

test.describe("About with reduced motion", () => {
  test.use({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });

  test("the journey's dots are all filled from the start", async ({ page }) => {
    await page.goto(PATH);
    const dots = page.locator("section[aria-labelledby='timeline-title'] .timeline-dot");
    await expect(dots).toHaveCount(5);
    const fills = await dots.evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor));
    expect(fills).toEqual(Array(5).fill("rgb(37, 99, 235)"));
  });
});
