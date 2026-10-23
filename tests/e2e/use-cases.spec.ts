import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { siteFlags } from "@/content/flags";

// Tasks G2.2 and G2.3: the shared use-case page (SEO/geo-implementation-plan.md §S8), for the four pages of the
// table. Their copy and registry are in tests/unit/use-case-registry.test.ts; here, what a visitor and a crawler
// get from the built page. Each page's own wording is in `pages`; every test below runs once per page.

const gba = "/en/solutions/game-based-assessment";
const contactGba = "/en/contact?product=gba";

const pages = [
  {
    slug: "management-trainee-assessment",
    title: "Management Trainee Assessment: Game-Based MT Recruitment | DEUS Human Capital Services",
    h1: "Management Trainee assessment",
    breadcrumb: "Management Trainee assessment",
    passage: "DEUS runs Management Trainee assessments",
    problemTitle: "A big MT intake leaves very little time to choose well.",
    firstQuestion: "How many Management Trainee candidates can you assess at once?",
    firstAnswer: "A national telecom group used DEUS to assess more than 1,000",
    faqCount: 5,
    productPath: gba,
    cta: { label: "Request a free trial", href: contactGba },
    closing: { title: "Running an MT or campus drive?", cta: { label: "Request a demo", href: contactGba } },
    moduleLinks: ["#cognitive", "#neuro", "#simulation"],
    note: null,
    proofLink: { name: /Read the story/, href: "/en/clients/national-telecom-group" },
    offer: true,
  },
  {
    slug: "campus-recruitment-assessment",
    title: "Campus Recruitment Assessment: Graduate Screening at Volume | DEUS Human Capital Services",
    h1: "Campus recruitment assessment",
    breadcrumb: "Campus recruitment assessment",
    passage: "DEUS runs campus recruitment assessments",
    problemTitle: "Hundreds of graduates, and CVs that look alike.",
    firstQuestion: "Which assessment works best for campus recruitment?",
    firstAnswer: "Personality and Cognitive together.",
    faqCount: 4,
    productPath: gba,
    cta: { label: "Request a free trial", href: contactGba },
    closing: { title: "Running an MT or campus drive?", cta: { label: "Request a demo", href: contactGba } },
    moduleLinks: ["#personality", "#cognitive"],
    note: { name: "Management Trainee assessment", href: "/en/solutions/management-trainee-assessment" },
    proofLink: { name: "Read client stories", href: "/en/clients" },
    offer: true,
  },
  {
    slug: "talent-mapping",
    title: "Talent Mapping and Competency Mapping with Game-Based Assessment | DEUS Human Capital Services",
    h1: "Talent mapping and internal promotions",
    breadcrumb: "Talent mapping and internal promotions",
    passage: "DEUS helps companies in Indonesia map the talent",
    problemTitle: "An internal move deserves the same evidence as an outside hire.",
    firstQuestion: "Can we use game-based assessment for existing employees, not only candidates?",
    firstAnswer: "Yes. The same assessments work for hiring",
    faqCount: 4,
    productPath: gba,
    cta: { label: "Request a free trial", href: contactGba },
    closing: {
      title: "The best way to understand it is to play it.",
      cta: { label: "Request a free trial", href: contactGba },
    },
    moduleLinks: ["#personality", "#cognitive", "#neuro"],
    note: null,
    proofLink: { name: "Read client stories", href: "/en/clients" },
    offer: true,
  },
  {
    slug: "performance-appraisal-and-pay",
    title: "Linking Performance Appraisal to Pay: KPI Appraisal Platform | DEUS Human Capital Services",
    h1: "Linking performance appraisal to pay",
    breadcrumb: "Linking performance appraisal to pay",
    passage: "DEUS Enhance links performance appraisal to pay",
    problemTitle: "Ratings in one spreadsheet, bonuses in another.",
    firstQuestion: "How does Enhance link performance appraisal to pay?",
    firstAnswer: "It feeds calibrated appraisal results straight into bonus",
    faqCount: 5,
    productPath: "/en/solutions/enhance",
    cta: { label: "Book a 30-minute call", href: "/en/solutions/enhance#book-a-call" },
    closing: {
      title: "Make performance visible. Make decisions clearer.",
      cta: { label: "Book a 30-minute call", href: "/en/solutions/enhance#book-a-call" },
    },
    moduleLinks: [],
    note: { name: "See DEUS Enhance", href: "/en/solutions/enhance" },
    proofLink: { name: "Read client stories", href: "/en/clients" },
    offer: false,
  },
];

const sections = ["problem", "how", "runs", "faq"];

for (const useCase of pages) {
  const PATH = `/en/solutions/${useCase.slug}`;

  test.describe(`Use-case page: ${useCase.slug}`, () => {
    test.skip(!siteFlags.showUseCases, "showUseCases is off: the page is a 404, see below");
    test.use({ viewport: { width: 1280, height: 800 } });

    test("renders the hero, every section and the closer, with the title, canonical and noindex", async ({ page }) => {
      const response = await page.goto(PATH);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(useCase.title);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${PATH}$`));
      await expect(page.getByRole("heading", { level: 1, name: useCase.h1 })).toBeVisible();
      // the answer passage sits under the H1, and the one call to action is the hero's
      await expect(page.locator("#hero-title ~ p")).toContainText(useCase.passage);
      const cta = page.getByRole("main").locator("[data-cta='hero-primary']");
      await expect(cta).toHaveText(useCase.cta.label);
      await expect(cta).toHaveAttribute("href", useCase.cta.href);
      for (const id of sections) {
        await expect(page.locator(`section#${id}`), id).toHaveCount(1);
        await expect(page.locator(`section#${id} h2`), id).toHaveCount(1);
      }
      await expect(page.getByRole("heading", { level: 2, name: useCase.problemTitle })).toBeVisible();
      await expect(page.locator("#problem li")).toHaveCount(4);
      await expect(page.locator("#runs ol > li")).toHaveCount(4);
      // the closing panel is a region named by its heading, with its own button
      const closing = page.getByRole("region", { name: useCase.closing.title });
      await expect(closing).toBeVisible();
      await expect(closing.getByRole("link", { name: useCase.closing.cta.label })).toHaveAttribute("href", useCase.closing.cta.href);
    });

    test("opens an Open Graph image that exists, saying the page's H1", async ({ page, request }) => {
      await page.goto(PATH);
      const image = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(image).toMatch(new RegExp(`/og/solutions-${useCase.slug}\\.png$`));
      const response = await request.get(new URL(image!).pathname);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toMatch(/image\/png/);
    });

    test("each module card links to its section on the product page, and the line under the cards links on", async ({ page, request }) => {
      await page.goto(PATH);
      const links = page.locator("#how li a");
      await expect(links).toHaveCount(useCase.moduleLinks.length);
      for (const [i, anchor] of useCase.moduleLinks.entries()) {
        const href = await links.nth(i).getAttribute("href");
        expect(href).toBe(`${useCase.productPath}${anchor}`);
        expect((await request.get(href!.split("#")[0])).status()).toBe(200);
      }
      if (useCase.note) {
        await expect(page.locator("#how").getByRole("link", { name: useCase.note.name, exact: true })).toHaveAttribute("href", useCase.note.href);
        expect((await request.get(useCase.note.href)).status()).toBe(200);
      }
    });

    test("proof is the 40+ brands line over Home's logo wall, with the story link only while stories are on", async ({ page }) => {
      await page.goto(PATH);
      await expect(page.getByText("Trusted by 40+ brands across Indonesia.")).toBeVisible();
      if (siteFlags.showLogoWall) {
        const wall = page.locator("ul").filter({ has: page.getByRole("link", { name: "See all 40+" }) });
        await expect(wall.getByRole("img")).toHaveCount(11);
        await expect(wall.getByRole("link", { name: "See all 40+" })).toHaveAttribute("href", "/en/clients");
      } else {
        await expect(page.locator(".industry-ticker")).toHaveCount(1);
      }
      // while stories show, the page's own story card, or else the "Read client stories" link; while they're off, neither
      const main = page.getByRole("main");
      if (siteFlags.showStories) await expect(main.getByRole("link", { name: useCase.proofLink.name })).toHaveAttribute("href", useCase.proofLink.href);
      else await expect(main.getByRole("link", { name: /Read (the story|client stories)/ })).toHaveCount(0);
    });

    test("the download offer shows only on the GBA pages that offer it, and only while showSampleReport is on", async ({ page }) => {
      await page.goto(PATH);
      await expect(page.locator("[data-download-offer]")).toHaveCount(useCase.offer && siteFlags.showSampleReport ? 1 : 0);
    });

    test("the FAQ opens, and the page carries WebPage, FAQPage and BreadcrumbList data that match what it shows", async ({ page }) => {
      await page.goto(PATH);
      const faq = page.locator("#faq");
      await faq.getByText(useCase.firstQuestion).click();
      await expect(faq.getByText(useCase.firstAnswer).first()).toBeVisible();
      const data = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) => scripts.map((s) => JSON.parse(s.textContent ?? "{}")));
      const byType = (type: string) => data.find((d) => d["@type"] === type);

      const webPage = byType("WebPage");
      expect(webPage).toMatchObject({
        name: useCase.h1,
        url: expect.stringMatching(new RegExp(`${PATH}$`)),
        isPartOf: { "@id": expect.stringMatching(/\/#website$/) },
        about: { "@id": expect.stringMatching(new RegExp(`${useCase.productPath}#software$`)) },
        publisher: { "@id": expect.stringMatching(/\/#organization$/) },
      });
      // every value is on the page: the description is the answer passage
      await expect(page.locator("#hero-title ~ p")).toHaveText(webPage.description);

      const faqPage = byType("FAQPage");
      expect(faqPage.mainEntity).toHaveLength(useCase.faqCount);
      expect(faqPage.mainEntity[0].name).toBe(useCase.firstQuestion);
      for (const { name } of faqPage.mainEntity) await expect(faq.getByText(name, { exact: true })).toHaveCount(1);

      const crumbs = byType("BreadcrumbList").itemListElement.map((item: { name: string; item: string }) => [
        item.name,
        new URL(item.item).pathname,
      ]);
      expect(crumbs).toEqual([
        ["Home", "/en"],
        ["Solutions", "/en/solutions"],
        [useCase.breadcrumb, PATH],
      ]);
    });

    test("is in the sitemap and in llms.txt, under Use cases", async ({ request }) => {
      const sitemap = await (await request.get("/sitemap.xml")).text();
      expect(sitemap).toContain(`${PATH}</loc>`);
      // the Use cases section, from its heading to the next one: this page's line is somewhere in it, not only first
      const llms = await (await request.get("/llms.txt")).text();
      const useCasesSection = llms.split("## Use cases")[1]?.split(/\n## /)[0] ?? "";
      expect(useCasesSection).toMatch(new RegExp(`^- \\[[^\\]]+\\]\\([^)]*${PATH}\\): \\S`, "m"));
    });

    test("has no serious or critical accessibility issues", async ({ page }) => {
      await page.goto(PATH);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
    });

    test("Indonesian has no page yet, so it sends the visitor to English", async ({ page }) => {
      await page.goto(`/id/solutions/${useCase.slug}`);
      await expect(page).toHaveURL(new RegExp(`${PATH}$`));
    });

    test.describe("on a phone", () => {
      test.use({ viewport: { width: 390, height: 844 } });

      test("nothing overflows sideways", async ({ page }) => {
        await page.goto(PATH);
        await expect(page.getByRole("heading", { level: 1, name: useCase.h1 })).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
      });
    });
  });
}

test.describe("A slug that is no use case", () => {
  for (const path of ["/en/solutions/no-such-page", "/id/solutions/no-such-page"]) {
    test(`${path} is a 404`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
    });
  }

  test("the product pages keep their own routes", async ({ request }) => {
    for (const path of ["/en/solutions/enhance", "/en/solutions/game-based-assessment", "/en/solutions"]) {
      expect((await request.get(path)).status(), path).toBe(200);
    }
  });
});

test.describe("While showUseCases is off", () => {
  test.skip(siteFlags.showUseCases, "showUseCases is on");

  test("every use-case page is a 404 and the sitemap and llms.txt don't list it", async ({ page, request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const llms = await (await request.get("/llms.txt")).text();
    expect(llms).not.toContain("## Use cases");
    for (const { slug } of pages) {
      for (const locale of ["en", "id"]) {
        const response = await page.goto(`/${locale}/solutions/${slug}`);
        expect(response?.status(), `/${locale}/solutions/${slug}`).toBe(404);
      }
      expect(sitemap).not.toContain(slug);
      expect(llms).not.toContain(slug);
    }
  });

  test("no page links to a use case: footer, GBA cards, Solutions, Enhance", async ({ page }) => {
    for (const path of [gba, "/en/solutions", "/en/solutions/enhance", "/en"]) {
      await page.goto(path);
      for (const { slug } of pages) {
        await expect(page.locator(`a[href*="/solutions/${slug}"]`), `${path} → ${slug}`).toHaveCount(0);
      }
    }
    await expect(page.getByRole("contentinfo").getByText("Use cases", { exact: true })).toHaveCount(0);
  });
});
