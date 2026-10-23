import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { deleteLeadsFor, e2eEmail, leadsFor, useOwnIp } from "./support/leads";

// Task 1.6: the Enhance page. Copy and the content shape are checked in the unit tests; here:
// what a visitor and a crawler get from the built page. Task 1.9 adds the form sent for real
// (a row in the Neon `test` database), its pending state, the page without script and the
// 390 and 1280 screenshots (saved to screenshots/phase-1/, which git ignores).

const PATH = "/en/solutions/enhance";
const stepTitles = [
  "Set the framework",
  "Track across levels",
  "Review performance",
  "Calibrate results",
  "Talent mapping",
  "Turn results into decisions",
];
const sections = ["problem", "urgency", "solution", "systems", "support", "outcome", "next-step", "faq"];
// The booking form sits in the closing panel since R16b (F79).
const BOOK = "#book-a-call";

test.describe("Enhance page", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders the hero, every section and the closer, with the title and noindex", async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(
      "DEUS Enhance: Performance Appraisal and KPI Platform | DEUS Human Capital Services",
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("heading", { level: 1, name: "From scattered data to better decisions" })).toBeVisible();
    for (const id of sections) {
      await expect(page.locator(`section#${id}`), id).toHaveCount(1);
    }
    // Q19 isn't confirmed, so "Better together" stays out; R16b cut "From rating to reward" and "Is it a fit?"
    for (const id of ["better-together", "reward", "fit"]) await expect(page.locator(`section#${id}`), id).toHaveCount(0);
    await expect(page.locator("a[href='#fit'], a[href='#reward']")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 2, name: /Make performance visible/ })).toBeVisible();
  });

  test("the header and hero book the call in the closer, which holds the form; the WhatsApp button is Enhance's", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole("banner").getByRole("link", { name: "Book a 30-minute call" })).toHaveAttribute(
      "href",
      BOOK,
    );
    const hero = page.locator("section[aria-labelledby='hero-title']");
    await expect(hero.getByRole("link", { name: "Book a 30-minute call" })).toHaveAttribute("href", BOOK);
    await expect(hero.getByRole("link", { name: "See how it works" })).toHaveAttribute("href", "#solution");
    await expect(page.locator("a[href='#next-step']")).toHaveCount(0);
    // F79: the closer's form takes the place of its button; the closing headline stays above it
    const closing = page.locator("section[aria-labelledby='closing-title']");
    await expect(closing.locator(`${BOOK} form`)).toHaveCount(1);
    await expect(closing.getByRole("link", { name: "Book a 30-minute call" })).toHaveCount(0);
    await expect(page.locator("#next-step form")).toHaveCount(0);
    await expect(page.getByText("Prefer to talk first?")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Chat with us on WhatsApp" })).toHaveAttribute(
      "href",
      /text=Halo%20DEUS%2C%20saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20DEUS%20Enhance/,
    );
  });

  test("the hero loops from KPIs to bonus, holds the bonus with reduced motion and KPIs without script (F72)", async ({ browser, page }) => {
    const opacities = (p: Page) =>
      p.locator(".rtp-frame").evaluateAll((frames) => frames.map((f) => Number(getComputedStyle(f).opacity)));
    await page.goto(PATH);
    const loop = page.locator("[data-review-to-pay]");
    await expect(loop.locator("figcaption")).toHaveText("From review to pay decision");
    await expect(loop.locator(".rtp-label")).toHaveText(["KPIs", "Appraisal", "Calibration", "Bonus"]);
    await expect(loop).toHaveAttribute("data-playing", "true");
    // the appraisal screen takes over after one dwell (3.5s)
    await expect.poll(async () => (await opacities(page))[1], { timeout: 6000 }).toBe(1);

    for (const options of [{ reducedMotion: "reduce" as const }, { javaScriptEnabled: false }]) {
      const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, ...options });
      const still = await context.newPage();
      await still.goto(PATH);
      await still.waitForTimeout(500);
      expect(await opacities(still), JSON.stringify(options)).toEqual("reducedMotion" in options ? [0, 0, 0, 1] : [1, 0, 0, 0]);
      await context.close();
    }
  });

  test("the hero CTA scrolls to the form", async ({ page }) => {
    await page.goto(PATH);
    await page.locator("section[aria-labelledby='hero-title']").getByRole("link", { name: "Book a 30-minute call" }).click();
    await expect(page).toHaveURL(/\/en\/solutions\/enhance#book-a-call$/);
    await expect(page.getByRole("heading", { name: "Book your 30-minute appraisal review" })).toBeInViewport();
  });

  test("the problem grid has five problems and a teaser that jumps to the urgency section", async ({ page }) => {
    await page.goto(PATH);
    const problem = page.locator("#problem");
    await expect(problem.getByRole("heading", { level: 3 })).toHaveCount(5);
    await expect(problem.getByRole("link", { name: /What the gap looks like, daily/ })).toHaveAttribute("href", "#urgency");
  });

  // F74, F75: Home's switcher with six steps, the last one on the bonus dashboard
  test("the solution is a six-step switcher; a click picks a step and its screen", async ({ page }) => {
    await page.goto(PATH);
    const solution = page.locator("#solution");
    const tabs = solution.getByRole("tab");
    await expect(tabs).toHaveCount(6);
    for (const [i, title] of stepTitles.entries()) await expect(tabs.nth(i)).toContainText(title);
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
    await expect(solution.getByRole("tabpanel").first().getByRole("img", { name: "DEUS Enhance KPI and competency library" })).toBeVisible();
    const last = solution.getByRole("tab", { name: /Turn results into decisions/ });
    await last.click();
    await expect(last).toHaveAttribute("aria-selected", "true");
    await expect(solution.getByText(/Set up each bonus cycle and who takes part/)).toBeVisible();
    await expect(solution.getByRole("img", { name: "DEUS Enhance bonus dashboard for a bonus cycle" })).toBeVisible();
  });

  test("the support journey has its five stages, ongoing assistance last", async ({ page }) => {
    await page.goto(PATH);
    const journey = page.getByRole("list", { name: "DEUS provides more than software." });
    await expect(journey.getByRole("listitem")).toHaveCount(5);
    await expect(journey.getByRole("listitem").last()).toContainText("Ongoing assistance");
  });

  test("the form has the Enhance fields, with WhatsApp and email beside it in the closer", async ({ page }) => {
    await page.goto(PATH);
    const form = page.locator(`${BOOK} form`);
    await expect(form.locator("input[name='formType']")).toHaveValue("enhance");
    for (const legend of ["Your role", "Number of employees", "Number of sites or plants"]) {
      await expect(form.getByRole("radiogroup", { name: new RegExp(legend) })).toBeVisible();
    }
    await expect(form.getByRole("button", { name: "Request my review" })).toBeVisible();
    const closing = page.locator("section[aria-labelledby='closing-title']");
    await expect(closing.getByRole("link", { name: /admin@deushcs\.com/ })).toHaveAttribute(
      "href",
      /^mailto:admin@deushcs\.com\?subject=Inquiry%20about%20DEUS%20Enhance&body=Dear%20DEUS%20Admin/,
    );
    await expect(closing.getByRole("link", { name: /Chat on WhatsApp/ })).toHaveAttribute("href", /wa\.me\/6282312121660/);
    // "Next step" keeps its heading and two steps, as text
    const next = page.locator("#next-step");
    await expect(next.getByRole("heading", { level: 2, name: "Start where it matters most to you" })).toBeVisible();
    await expect(next.locator("ol > li")).toHaveCount(2);
  });

  test("Next step links to the appraisal-to-pay page, which answers 200 (G2.4)", async ({ page }) => {
    await page.goto(PATH);
    const link = page.locator("#next-step").getByRole("link", { name: "Linking performance appraisal to pay" });
    await expect(link).toHaveAttribute("href", "/en/solutions/performance-appraisal-and-pay");
    expect((await page.request.get("/en/solutions/performance-appraisal-and-pay")).status()).toBe(200);
  });

  test("the FAQ opens, and the page carries FAQPage and SoftwareApplication data", async ({ page }) => {
    await page.goto(PATH);
    const faq = page.locator("#faq");
    await faq.getByText("Do we have to replace our HRIS or payroll system?").click();
    await expect(faq.getByText(/Enhance works alongside your existing HRIS/)).toBeVisible();
    const data = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((s) => JSON.parse(s.textContent ?? "{}")));
    const types = data.map((d) => d["@type"]);
    expect(types).toContain("FAQPage");
    const app = data.find((d) => d["@type"] === "SoftwareApplication");
    expect(app).toMatchObject({
      name: "DEUS Enhance",
      applicationCategory: "BusinessApplication",
      // G1.4: the publisher is a link to the site's Organization node
      publisher: { "@id": expect.stringMatching(/\/#organization$/) },
    });
    expect(app.url).toMatch(/\/en\/solutions\/enhance$/);
    const faqPage = data.find((d) => d["@type"] === "FAQPage");
    expect(faqPage.mainEntity).toHaveLength(11);
    expect(faqPage.mainEntity.map((q: { name: string }) => q.name)).toContain(
      "How does calibration work in Enhance?",
    );
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    await page.goto(PATH);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });

  test("Indonesian has no Enhance page yet, so it sends the visitor to English", async ({ page }) => {
    await page.goto("/id/solutions/enhance");
    await expect(page).toHaveURL(/\/en\/solutions\/enhance$/);
  });

  // The Phase 1 review found the footer's switch still offering Bahasa Indonesia here.
  for (const path of [PATH, "/en/contact", "/en/privacy"]) {
    test(`${path}: neither language switch links to an Indonesian page that doesn't exist yet`, async ({ page }) => {
      await page.goto(path);
      for (const label of ["Language", "Language options in the footer"]) {
        const nav = page.getByRole("navigation", { name: label, exact: true });
        await expect(nav, label).toHaveCount(1);
        await expect(nav.locator("a[href^='/id']"), label).toHaveCount(0);
      }
    });
  }

  test("the problem, solution and support sections number nothing with leading zeros", async ({ page }) => {
    await page.goto(PATH);
    for (const id of ["problem", "solution", "support"]) {
      await expect(page.locator(`#${id}`).getByText(/^0\d$/), id).toHaveCount(0);
    }
  });
});

test.describe("Enhance page without JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });

  test("every section, the form and the FAQ answers are in the HTML", async ({ page }) => {
    await page.goto(PATH);
    for (const id of sections) await expect(page.locator(`section#${id}`), id).toHaveCount(1);
    await expect(page.locator(`${BOOK} form`)).toHaveCount(1);
    const html = await page.content();
    expect(html).toContain("Talent mapping");
    expect(html).toContain("Set up each bonus cycle and who takes part");
    expect(html).toContain("User training, a review after each cycle");
    await expect(page.locator("[data-reveal='pending']")).toHaveCount(0);
  });
});

test.describe("Enhance page on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("doesn't scroll sideways; the problems sit two to a row and the header keeps its button", async ({ page }) => {
    await page.goto(PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
    await expect(page.getByRole("banner").getByRole("link", { name: "Book a 30-minute call" })).toBeAttached();
    const [first, second] = await page.locator("#problem li").evaluateAll((items) =>
      items.slice(0, 2).map((li) => li.getBoundingClientRect().top),
    );
    expect(first).toBe(second);
  });
});

// Fills the Enhance form as a visitor would. Chips are native radios under a label, so a click on
// the label text picks one.
async function fillEnhanceForm(page: Page, email: string) {
  const form = page.locator(`${BOOK} form`);
  await form.getByLabel("Full name").fill("E2E Tester");
  await form.getByLabel("Work email").fill(email);
  await form.getByLabel("Company").fill("PT E2E Test");
  await form.getByText("HR", { exact: true }).click();
  await form.getByText("500–1,999", { exact: true }).click();
  await form.getByText("2–5", { exact: true }).click();
  await form.getByText("Spreadsheets", { exact: true }).click();
  await form.getByText("Within 3 months", { exact: true }).click();
  await form.getByLabel(/Anything else/).fill("Two plants, appraisals every quarter.");
  await form.getByRole("checkbox", { name: /I agree that DEUS may contact me/ }).check();
  return form;
}

test.describe("Enhance form, sent for real", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await useOwnIp(page);
  });

  test("saves a lead in the test database and shows the thank-you", async ({ page }) => {
    const email = e2eEmail("enhance-submit");
    try {
      await page.goto(`${PATH}?utm_source=linkedin&utm_medium=social&utm_campaign=e2e`);
      const form = await fillEnhanceForm(page, email);
      await form.getByRole("button", { name: "Request my review" }).click();

      const next = page.locator(BOOK);
      await expect(next.getByText("Thank you. We'll be in touch shortly to set up your 30-minute call.")).toBeVisible();
      await expect(next.locator("form")).toHaveCount(0);
      await expect(next.getByRole("link", { name: /Chat with us on WhatsApp/ })).toHaveAttribute(
        "href",
        /text=Halo%20DEUS%2C%20saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20DEUS%20Enhance/,
      );

      const rows = await leadsFor(email);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({
        formType: "enhance",
        locale: "en",
        sourcePage: "/solutions/enhance",
        name: "E2E Tester",
        company: "PT E2E Test",
        role: "hr",
        size: "500-1999",
        message: "Two plants, appraisals every quarter.",
        utmSource: "linkedin",
        utmMedium: "social",
        utmCampaign: "e2e",
        status: "new",
      });
      expect(rows[0].extra).toMatchObject({ sites: "2-5" });
      expect(rows[0].consentAt).toBeInstanceOf(Date);
      // the raw address is never stored, only its hash
      expect(rows[0].ipHash).toMatch(/^[0-9a-f]{64}$/);
    } finally {
      await deleteLeadsFor(email);
    }
  });

  // F80: letters never pass the field (the browser's pattern stops them); a too-short number
  // passes the pattern, so the server's message is what the visitor sees, with the form kept.
  test("a phone number that is too short gets the phone message and saves nothing", async ({ page }) => {
    const email = e2eEmail("enhance-phone");
    try {
      await page.goto(PATH);
      const form = await fillEnhanceForm(page, email);
      const phone = form.getByLabel(/WhatsApp/);
      await expect(phone).toHaveAttribute("type", "tel");
      await phone.fill("1234567");
      await form.getByRole("button", { name: "Request my review" }).click();

      await expect(form.getByText("Please enter a valid phone number, digits only.")).toBeVisible();
      await expect(form.getByLabel("Work email")).toHaveValue(email);
      expect(await leadsFor(email)).toHaveLength(0);

      await phone.fill("+62 823-1212-1660");
      await form.getByRole("button", { name: "Request my review" }).click();
      await expect(page.locator(BOOK).getByText(/Thank you/)).toBeVisible();
      expect(await leadsFor(email)).toHaveLength(1);
    } finally {
      await deleteLeadsFor(email);
    }
  });

  test("submit button disables while pending, so a second click makes no second row", async ({ page }) => {
    const email = e2eEmail("enhance-pending");
    // Hold the form's request (a POST with a Next-Action header) until the test lets it through.
    let release!: () => void;
    const gate = new Promise<void>((resolve) => (release = resolve));
    await page.route(
      (url) => url.pathname === PATH,
      async (route) => {
        if (route.request().method() === "POST" && route.request().headers()["next-action"]) await gate;
        await route.continue();
      },
    );
    try {
      await page.goto(PATH);
      const form = await fillEnhanceForm(page, email);
      const submit = form.getByRole("button", { name: "Request my review" });
      await submit.click();

      const sending = form.getByRole("button", { name: "Sending…" });
      await expect(sending).toBeDisabled();
      await expect(sending).toHaveAttribute("aria-busy", "true");
      await sending.click({ force: true });
      await sending.click({ force: true });

      release();
      await expect(page.locator(BOOK).getByText(/Thank you\. We'll be in touch shortly/)).toBeVisible();
      expect(await leadsFor(email)).toHaveLength(1);
    } finally {
      release();
      await deleteLeadsFor(email);
    }
  });

  test("asks for the required fields before anything is sent", async ({ page }) => {
    const email = e2eEmail("enhance-empty");
    try {
      await page.goto(PATH);
      const form = page.locator(`${BOOK} form`);
      await form.getByLabel("Work email").fill(email);
      await form.getByRole("button", { name: "Request my review" }).click();
      // the browser's own validation stops it: still a form, no thank-you, no row
      await expect(form).toBeVisible();
      await expect(form.getByLabel("Full name")).toBeFocused();
      expect(await leadsFor(email)).toHaveLength(0);
    } finally {
      await deleteLeadsFor(email);
    }
  });
});

test.describe("Enhance page without JavaScript, the review's checks", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });

  test("all six steps with their text and the form show, with nothing hidden waiting for script", async ({ page }) => {
    await page.goto(PATH);
    const solution = page.locator("#solution");
    for (const title of stepTitles) {
      await expect(solution.getByRole("tab", { name: new RegExp(title) }), title).toBeVisible();
    }
    for (const body of ["Customize KPIs, competencies", "Visualize where everyone sits", "Connect outcomes to incentives"]) {
      await expect(solution.getByText(new RegExp(body)), body).toBeVisible();
    }
    const form = page.locator(`${BOOK} form`);
    await expect(form).toBeVisible();
    await expect(form.getByRole("button", { name: "Request my review" })).toBeVisible();
    for (const legend of ["Your role", "Number of employees"]) {
      await expect(form.getByRole("radiogroup", { name: new RegExp(legend) })).toBeVisible();
    }
    // nothing starts at opacity 0 for a script to reveal
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll("main section")]
        .filter((el) => getComputedStyle(el).opacity === "0" || getComputedStyle(el).visibility === "hidden")
        .map((el) => el.id),
    );
    expect(hidden).toEqual([]);
  });

  // The Phase 1 review found the form posting nowhere before hydration (a client wrapper around
  // the action), so a visitor without script, or one quicker than the page, lost the lead.
  test("the form sends without script and lands on the thank-you", async ({ page }) => {
    await useOwnIp(page);
    const email = e2eEmail("enhance-nojs");
    try {
      await page.goto(PATH);
      const form = await fillEnhanceForm(page, email);
      await form.getByRole("button", { name: "Request my review" }).click();

      await expect(page).toHaveURL(/#lead-form$/);
      await expect(page.locator("#lead-form").getByRole("heading", { name: /Thank you/ })).toBeVisible();
      await expect(page.locator(`${BOOK} form`)).toHaveCount(0);
      const rows = await leadsFor(email);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({ formType: "enhance", sourcePage: "/solutions/enhance", locale: "en" });
      expect(rows[0].extra).toMatchObject({ sites: "2-5" });
    } finally {
      await deleteLeadsFor(email);
    }
  });
});

test.describe("Enhance page screenshots for the design review", () => {
  // Reduced motion shows everything at rest, so the full-page capture has no half-revealed section.
  test.use({ reducedMotion: "reduce" });
  test.setTimeout(90_000);

  for (const { label, width, height } of [
    { label: "1280", width: 1280, height: 900 },
    { label: "390", width: 390, height: 844 },
  ]) {
    test(`enhance at ${label}px`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto(PATH);
      // lazy images only load once scrolled to
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
          window.scrollTo(0, y);
          await new Promise((done) => setTimeout(done, 80));
        }
        // The solution section's stacked screens include lazy images that may not load until
        // they're active, so wait for the rest, but not for ever.
        await Promise.race([
          Promise.all(
            Array.from(document.images)
              .filter((img) => !img.complete)
              .map((img) => new Promise((done) => ((img.onload = img.onerror = done), undefined))),
          ),
          new Promise((done) => setTimeout(done, 5000)),
        ]);
        await document.fonts.ready;
        window.scrollTo(0, 0);
      });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, "sideways scroll").toBe(0);
      mkdirSync("screenshots/phase-1", { recursive: true });
      await page.screenshot({ path: `screenshots/phase-1/enhance-${label}.png`, fullPage: true });
    });
  }
});
