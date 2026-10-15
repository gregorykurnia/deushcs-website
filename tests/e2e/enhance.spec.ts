import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Task 1.6: the Enhance page. Copy and the content shape are checked in the unit tests; here:
// what a visitor and a crawler get from the built page. The form's sending is LeadForm's
// (tests/leads, Task 1.4); here it only has to be on the page with its Enhance fields.

const PATH = "/en/solutions/enhance";
const sections = ["problem", "urgency", "solution", "reward", "systems", "support", "outcome", "fit", "next-step", "faq"];

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
    // Q19 isn't confirmed, so "Better together" stays out
    await expect(page.locator("section#better-together")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 2, name: /Make performance visible/ })).toBeVisible();
  });

  test("the header, hero and closer book the call on this page; the WhatsApp button is Enhance's", async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole("banner").getByRole("link", { name: "Book a 30-minute call" })).toHaveAttribute(
      "href",
      "#next-step",
    );
    const hero = page.locator("section[aria-labelledby='hero-title']");
    await expect(hero.getByRole("link", { name: "Book a 30-minute call" })).toHaveAttribute("href", "#next-step");
    await expect(hero.getByRole("link", { name: "See how it works" })).toHaveAttribute("href", "#solution");
    await expect(page.locator("section[aria-labelledby='closing-title']").getByRole("link", { name: "Book a 30-minute call" })).toHaveAttribute(
      "href",
      "#next-step",
    );
    await expect(page.getByRole("link", { name: "Chat with us on WhatsApp" })).toHaveAttribute(
      "href",
      /text=Halo%20DEUS%2C%20saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20DEUS%20Enhance/,
    );
  });

  test("the hero CTA scrolls to the form", async ({ page }) => {
    await page.goto(PATH);
    await page.locator("section[aria-labelledby='hero-title']").getByRole("link", { name: "Book a 30-minute call" }).click();
    await expect(page).toHaveURL(/\/en\/solutions\/enhance#next-step$/);
    await expect(page.getByRole("heading", { name: "Book your 30-minute appraisal review" })).toBeInViewport();
  });

  test("the problem grid has five problems and a teaser that jumps to the solution", async ({ page }) => {
    await page.goto(PATH);
    const problem = page.locator("#problem");
    await expect(problem.getByRole("heading", { level: 3 })).toHaveCount(5);
    await expect(problem.getByRole("link", { name: /See how Enhance closes every gap/ })).toHaveAttribute("href", "#solution");
  });

  test("the solution steps sync with their screens, with TODOs for the overview", async ({ page }) => {
    await page.goto(PATH);
    const solution = page.locator("#solution");
    await expect(solution.getByRole("heading", { name: "Set the framework" })).toBeVisible();
    // the stage's screens sit in an aria-hidden layer (ScrollSyncedScreen), so match the alt directly
    await expect(solution.locator('img[alt="DEUS Enhance calibration matrix"]').first()).toBeAttached();
    await expect(solution.getByText("TODO: Enhance product overview screenshot").first()).toBeAttached();
    await expect(solution.getByRole("heading", { name: "Turn results into decisions" })).toBeVisible();
  });

  test("From rating to reward shows the reward grouping screen and TODOs for the other three", async ({ page }) => {
    await page.goto(PATH);
    const reward = page.locator("#reward");
    await expect(reward.getByRole("img", { name: "DEUS Enhance reward grouping" })).toBeVisible();
    for (const todo of ["bonus cycle setup", "bonus participants setup", "salary increase dashboard"]) {
      await expect(reward.getByText(`TODO: Enhance ${todo} screenshot`)).toBeVisible();
    }
  });

  test("the support journey ends on the 'now' node", async ({ page }) => {
    await page.goto(PATH);
    const journey = page.getByRole("list", { name: "DEUS provides more than software." });
    await expect(journey.getByRole("listitem")).toHaveCount(5);
    await expect(journey.getByRole("listitem").last()).toContainText("Ongoing assistance");
  });

  test("the form has the Enhance fields and the talk-first links", async ({ page }) => {
    await page.goto(PATH);
    const form = page.locator("#next-step form");
    await expect(form.locator("input[name='formType']")).toHaveValue("enhance");
    for (const legend of ["Your role", "Number of employees", "Number of sites or plants"]) {
      await expect(form.getByRole("radiogroup", { name: new RegExp(legend) })).toBeVisible();
    }
    await expect(form.getByRole("button", { name: "Request my review" })).toBeVisible();
    const next = page.locator("#next-step");
    await expect(next.getByRole("link", { name: "admin@deushcs.com" })).toHaveAttribute(
      "href",
      /^mailto:admin@deushcs\.com\?subject=Inquiry%20about%20DEUS%20Enhance&body=Dear%20DEUS%20Admin/,
    );
    await expect(next.getByRole("link", { name: /Chat on WhatsApp/ })).toHaveAttribute("href", /wa\.me\/6282312121660/);
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
      publisher: { name: "PT Investama Persada Kurnia" },
    });
    expect(app.url).toMatch(/\/en\/solutions\/enhance$/);
    expect(data.find((d) => d["@type"] === "FAQPage").mainEntity).toHaveLength(7);
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
});

test.describe("Enhance page without JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });

  test("every section, the form and the FAQ answers are in the HTML", async ({ page }) => {
    await page.goto(PATH);
    for (const id of sections) await expect(page.locator(`section#${id}`), id).toHaveCount(1);
    await expect(page.locator("#next-step form")).toHaveCount(1);
    const html = await page.content();
    expect(html).toContain("Talent mapping");
    expect(html).toContain("So when an employee asks");
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
