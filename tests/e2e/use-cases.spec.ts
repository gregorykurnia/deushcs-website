import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { siteFlags } from "@/content/flags";

// Task G2.2: the shared use-case page (SEO/geo-implementation-plan.md §S8), on the one page that is built so
// far: Management Trainee assessment. Its copy and registry are in tests/unit/use-case-registry.test.ts;
// here, what a visitor and a crawler get from the built page. G2.3 adds the other three pages to `pages`.

const pages = [
  {
    slug: "management-trainee-assessment",
    title: "Management Trainee Assessment: Game-Based MT Recruitment | DEUS Human Capital Services",
    h1: "Management Trainee assessment",
    breadcrumb: "Management Trainee assessment",
    firstQuestion: "How many Management Trainee candidates can you assess at once?",
    faqCount: 5,
    productPath: "/en/solutions/game-based-assessment",
    cta: { label: "Request a free trial", href: "/en/contact?product=gba" },
    moduleLinks: ["#cognitive", "#neuro", "#simulation"],
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
      // the answer passage sits under the H1, and the one call to action asks for the trial
      await expect(page.locator("#hero-title ~ p")).toContainText("DEUS runs Management Trainee assessments");
      const cta = page.getByRole("main").locator("[data-cta='hero-primary']");
      await expect(cta).toHaveText(useCase.cta.label);
      await expect(cta).toHaveAttribute("href", useCase.cta.href);
      for (const id of sections) {
        await expect(page.locator(`section#${id}`), id).toHaveCount(1);
        await expect(page.locator(`section#${id} h2`), id).toHaveCount(1);
      }
      await expect(page.getByRole("heading", { level: 2, name: "A big MT intake leaves very little time to choose well." })).toBeVisible();
      await expect(page.locator("#problem li")).toHaveCount(4);
      await expect(page.locator("#runs ol > li")).toHaveCount(4);
      // the closing panel is the Telkom story's approved one
      await expect(page.getByRole("heading", { level: 2, name: "Running an MT or campus drive?" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Request a demo" })).toHaveAttribute("href", "/en/contact?product=gba");
    });

    test("opens an Open Graph image that exists, saying the page's H1", async ({ page, request }) => {
      await page.goto(PATH);
      const image = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(image).toMatch(new RegExp(`/og/solutions-${useCase.slug}\\.png$`));
      const response = await request.get(new URL(image!).pathname);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toMatch(/image\/png/);
    });

    test("each module card links to its section on the product page", async ({ page, request }) => {
      await page.goto(PATH);
      const links = page.locator("#how li a");
      await expect(links).toHaveCount(useCase.moduleLinks.length);
      for (const [i, anchor] of useCase.moduleLinks.entries()) {
        const href = await links.nth(i).getAttribute("href");
        expect(href).toBe(`${useCase.productPath}${anchor}`);
        expect((await request.get(href!.split("#")[0])).status()).toBe(200);
      }
    });

    test("proof is the 40+ brands line over Home's logo wall, with no story link while stories are off", async ({ page }) => {
      await page.goto(PATH);
      await expect(page.getByText("Trusted by 40+ brands across Indonesia.")).toBeVisible();
      if (siteFlags.showLogoWall) {
        const wall = page.locator("ul").filter({ has: page.getByRole("link", { name: "See all 40+" }) });
        await expect(wall.getByRole("img")).toHaveCount(11);
        await expect(wall.getByRole("link", { name: "See all 40+" })).toHaveAttribute("href", "/en/clients");
      } else {
        await expect(page.locator(".industry-ticker")).toHaveCount(1);
      }
      // while stories show, the Telkom story's card (anonymised) is the link; while they're off, none
      const storyLink = page.getByRole("main").getByRole("link", { name: /Read the story/ });
      if (siteFlags.showStories) await expect(storyLink).toHaveAttribute("href", "/en/clients/national-telecom-group");
      else await expect(storyLink).toHaveCount(0);
    });

    test("shows the download offer nowhere while showSampleReport is off", async ({ page }) => {
      test.skip(siteFlags.showSampleReport, "the offer is on: it shows after the proof");
      await page.goto(PATH);
      await expect(page.locator("[data-download-offer]")).toHaveCount(0);
    });

    test("the FAQ opens, and the page carries WebPage, FAQPage and BreadcrumbList data that match what it shows", async ({ page }) => {
      await page.goto(PATH);
      const faq = page.locator("#faq");
      await faq.getByText(useCase.firstQuestion).click();
      await expect(faq.getByText(/A national telecom group used DEUS to assess more than 1,000/).first()).toBeVisible();
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
      const llms = await (await request.get("/llms.txt")).text();
      expect(llms).toMatch(new RegExp(`## Use cases\\n\\n- \\[[^\\]]+\\]\\([^)]*${PATH}\\): \\S`));
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
    for (const { slug } of pages) {
      const response = await page.goto(`/en/solutions/${slug}`);
      expect(response?.status()).toBe(404);
      expect(await (await request.get("/sitemap.xml")).text()).not.toContain(slug);
      expect(await (await request.get("/llms.txt")).text()).not.toContain(slug);
    }
  });
});
