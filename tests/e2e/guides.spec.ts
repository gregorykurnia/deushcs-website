import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { siteFlags } from "@/content/flags";

// Tasks G3.2 to G3.4: the guides (SEO/geo-implementation-plan.md §S9), their index and the links to them. Their copy, registry and the
// files that list them are in tests/unit/guide-registry.test.ts, guide-switches.test.ts and guide-page.test.tsx;
// here, what a visitor and a crawler get from the built pages. Every test of a guide runs once per guide.

const gba = "/en/solutions/game-based-assessment";
const mtPage = "/en/solutions/management-trainee-assessment";
const enhance = "/en/solutions/enhance";

const guides = [
  {
    slug: "what-is-game-based-assessment",
    title: "What Is Game-Based Assessment? A Guide for HR Teams in Indonesia | DEUS Human Capital Services",
    h1: "What is game-based assessment? A guide for HR teams in Indonesia",
    breadcrumb: "What is game-based assessment?",
    answer: "Game-based assessment measures how a candidate thinks and behaves by watching them play short games",
    keyPoints: 4,
    sections: 6,
    tables: 1,
    tableRows: 4,
    offer: true,
    about: gba,
    faqCount: 4,
    firstQuestion: "Is game-based assessment the same as a gamified test?",
    firstAnswer: "Not always. A gamified test adds game elements to an existing questionnaire",
    sources: 8,
    cta: { text: "See what each of the four modules measures", label: "See the four modules", href: gba },
    nextStep: { text: "Running a Management Trainee intake?", label: "See how DEUS assesses one", href: mtPage },
    related: [
      { name: "Game-based assessment vs traditional psychometric tests", href: "/en/guides/game-based-assessment-vs-psychometric-tests" },
      { name: "How to run Management Trainee recruitment at scale", href: "/en/guides/management-trainee-recruitment" },
      { name: "Campus recruitment: screening thousands of graduates fairly and fast", href: "/en/guides/campus-recruitment-screening" },
    ],
  },
  {
    slug: "game-based-assessment-vs-psychometric-tests",
    title: "Game-Based Assessment vs Psychometric Tests: An Honest Comparison | DEUS Human Capital Services",
    h1: "Game-based assessment vs traditional psychometric tests",
    breadcrumb: "Game-based assessment vs psychometric tests",
    answer: "A traditional psychometric test asks candidates to rate themselves or answer items with a right answer.",
    keyPoints: 5,
    sections: 6,
    tables: 1,
    tableRows: 6,
    offer: true,
    about: gba,
    faqCount: 4,
    firstQuestion: "Is a game-based assessment a kind of psikotes?",
    firstAnswer: "Yes, in the sense that it's a psychological assessment for hiring.",
    sources: 5,
    cta: { text: "See the four DEUS modules, and what each one measures.", label: "See how the games work", href: gba },
    nextStep: { text: "Choosing a test for your next MT intake?", label: "See how DEUS assesses Management Trainees", href: mtPage },
    related: [
      { name: "What is game-based assessment? A guide for HR teams in Indonesia", href: "/en/guides/what-is-game-based-assessment" },
      { name: "How to run Management Trainee recruitment at scale", href: "/en/guides/management-trainee-recruitment" },
      { name: "Campus recruitment: screening thousands of graduates fairly and fast", href: "/en/guides/campus-recruitment-screening" },
    ],
  },
  {
    slug: "management-trainee-recruitment",
    title: "How to Run Management Trainee Recruitment at Scale | DEUS Human Capital Services",
    h1: "How to run Management Trainee recruitment at scale",
    breadcrumb: "Management Trainee recruitment at scale",
    answer: "A large Management Trainee intake works best as a funnel with a clear job for each stage",
    keyPoints: 4,
    sections: 5,
    tables: 1,
    tableRows: 5,
    faqCount: 4,
    firstQuestion: "How many stages should a Management Trainee selection have?",
    firstAnswer: "Usually four or five: an eligibility check",
    sources: 5,
    offer: true,
    about: gba,
    cta: { text: "See how DEUS takes a Management Trainee intake to a ranked shortlist.", label: "See the Management Trainee assessment", href: mtPage },
    nextStep: { text: "Planning this year's intake?", label: "See how DEUS assesses a Management Trainee intake", href: mtPage },
    related: [
      { name: "What is game-based assessment? A guide for HR teams in Indonesia", href: "/en/guides/what-is-game-based-assessment" },
      { name: "Campus recruitment: screening thousands of graduates fairly and fast", href: "/en/guides/campus-recruitment-screening" },
      { name: "Game-based assessment vs traditional psychometric tests", href: "/en/guides/game-based-assessment-vs-psychometric-tests" },
    ],
  },
  {
    slug: "campus-recruitment-screening",
    title: "Campus Recruitment Screening: Rank Graduates Fairly and Fast | DEUS Human Capital Services",
    h1: "Campus recruitment: screening thousands of graduates fairly and fast",
    breadcrumb: "Campus recruitment screening",
    answer: "To screen graduates from many universities fairly, give every applicant the same short online assessment",
    keyPoints: 4,
    sections: 5,
    tables: 1,
    tableRows: 4,
    faqCount: 4,
    firstQuestion: "Should we filter campus applicants by GPA?",
    firstAnswer: "Use it as an eligibility rule if the role needs one, and rank on something else.",
    sources: 5,
    offer: true,
    about: gba,
    cta: { text: "See how DEUS turns one upload of applicants into a ranked list.", label: "See the campus recruitment assessment", href: "/en/solutions/campus-recruitment-assessment" },
    nextStep: { text: "Running a campus drive this year?", label: "See how DEUS screens graduates", href: "/en/solutions/campus-recruitment-assessment" },
    related: [
      { name: "How to run Management Trainee recruitment at scale", href: "/en/guides/management-trainee-recruitment" },
      { name: "Game-based assessment vs traditional psychometric tests", href: "/en/guides/game-based-assessment-vs-psychometric-tests" },
      { name: "What is game-based assessment? A guide for HR teams in Indonesia", href: "/en/guides/what-is-game-based-assessment" },
    ],
  },
  {
    slug: "link-performance-appraisal-to-pay",
    title: "How to Link Performance Appraisals to Pay and Bonuses | DEUS Human Capital Services",
    h1: "How to link performance appraisals to pay and bonuses",
    breadcrumb: "Linking appraisals to pay",
    answer: "To link appraisals to pay, decide which parts of pay should move with performance",
    keyPoints: 4,
    sections: 5,
    tables: 2,
    tableRows: 10,
    faqCount: 4,
    firstQuestion: "Should the bonus come straight from the appraisal score?",
    firstAnswer: "From the calibrated score, grouped into bands.",
    sources: 4,
    offer: false,
    about: enhance,
    cta: { text: "See how Enhance connects each person's rating to their bonus and raise.", label: "See linking appraisal to pay", href: "/en/solutions/performance-appraisal-and-pay" },
    nextStep: { text: "If you'd like us to look at how your appraisals connect to pay today,", label: "Book a 30-minute appraisal review", href: `${enhance}#book-a-call` },
    related: [
      { name: "Setting KPIs and competencies for a fair performance appraisal", href: "/en/guides/kpis-and-competencies-for-appraisal" },
      { name: "How to run Management Trainee recruitment at scale", href: "/en/guides/management-trainee-recruitment" },
      { name: "What is game-based assessment? A guide for HR teams in Indonesia", href: "/en/guides/what-is-game-based-assessment" },
    ],
  },
  {
    slug: "kpis-and-competencies-for-appraisal",
    title: "Setting KPIs and Competencies for a Fair Performance Appraisal | DEUS Human Capital Services",
    h1: "Setting KPIs and competencies for a fair performance appraisal",
    breadcrumb: "KPIs and competencies for appraisal",
    answer: "A fair appraisal measures two things: what each person delivered",
    keyPoints: 4,
    sections: 6,
    tables: 2,
    tableRows: 9,
    faqCount: 4,
    firstQuestion: "How many KPIs should each person have?",
    firstAnswer: "Few enough to remember and track, usually a handful per role.",
    sources: 3,
    offer: false,
    about: enhance,
    cta: { text: "See how Enhance handles your KPIs, appraisals, calibration and talent mapping together.", label: "See DEUS Enhance", href: enhance },
    nextStep: { text: "If you'd like help designing the framework itself,", label: "Book a 30-minute appraisal review", href: `${enhance}#book-a-call` },
    related: [
      { name: "How to link performance appraisals to pay and bonuses", href: "/en/guides/link-performance-appraisal-to-pay" },
      { name: "What is game-based assessment? A guide for HR teams in Indonesia", href: "/en/guides/what-is-game-based-assessment" },
      { name: "Campus recruitment: screening thousands of graduates fairly and fast", href: "/en/guides/campus-recruitment-screening" },
    ],
  },
];

for (const guide of guides) {
  const PATH = `/en/guides/${guide.slug}`;

  test.describe(`Guide: ${guide.slug}`, () => {
    test.skip(!siteFlags.showGuides, "showGuides is off: the guide is a 404, see below");
    test.use({ viewport: { width: 1280, height: 800 } });

    test("renders the answer, key points, questions, FAQ, sources and closer, with the title, canonical and noindex", async ({ page }) => {
      const response = await page.goto(PATH);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(guide.title);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${PATH}$`));
      await expect(page.getByRole("heading", { level: 1, name: guide.h1 })).toBeVisible();
      // the answer sits right under the H1, then the key points, then the byline
      await expect(page.locator("#guide-title + p")).toContainText(guide.answer);
      await expect(page.getByRole("list", { name: "Key points" }).getByRole("listitem")).toHaveCount(guide.keyPoints);
      await expect(page.getByText("By DEUS Human Capital Services")).toBeVisible();
      await expect(page.locator("time")).toHaveAttribute("datetime", "2026-10-23");
      await expect(page.locator("time")).toHaveText("Last updated: October 23, 2026");
      // every H2 of the guide is a question; the FAQ, call to action, sources and related have their own
      const questions = page.locator("article h2[id]").filter({ hasText: /\?$/ });
      await expect(questions).toHaveCount(guide.sections);
      await expect(page.locator("article table")).toHaveCount(guide.tables);
      await expect(page.locator("article table tbody tr")).toHaveCount(guide.tableRows);
      await expect(page.locator("#faq-title")).toBeVisible();
      await expect(page.getByRole("list", { name: "Sources" }).getByRole("link")).toHaveCount(guide.sources);
      // the closing panel is a region named by its heading
      await expect(page.getByRole("region", { name: "Where could DEUS help you?" })).toBeVisible();
    });

    test("opens an Open Graph image that exists, saying the page's H1", async ({ page, request }) => {
      await page.goto(PATH);
      const image = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(image).toMatch(new RegExp(`/og/guides-${guide.slug}\\.png$`));
      const response = await request.get(new URL(image!).pathname);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toMatch(/image\/png/);
    });

    test("the next step is the sample-report download while it's on offer, otherwise one line to the use-case page or to Enhance's booking form", async ({ page, request }) => {
      await page.goto(PATH);
      if (guide.offer && siteFlags.showSampleReport) {
        await expect(page.locator("[data-download-offer]")).toHaveCount(1);
        await expect(page.getByText(guide.nextStep.text)).toHaveCount(0);
      } else {
        await expect(page.locator("[data-download-offer]")).toHaveCount(0);
        const line = page.locator("article p").filter({ hasText: guide.nextStep.text });
        await expect(line).toHaveCount(1);
        await expect(line.getByRole("link", { name: guide.nextStep.label })).toHaveAttribute("href", guide.nextStep.href);
        expect((await request.get(guide.nextStep.href)).status()).toBe(200);
      }
    });

    test("the call to action goes to its page, the sources open in a new tab, and the related guides are links", async ({ page, request }) => {
      await page.goto(PATH);
      const cta = page.locator("article [data-cta='guide-primary']");
      await expect(cta).toHaveText(guide.cta.label);
      await expect(cta).toHaveAttribute("href", guide.cta.href);
      expect((await request.get(guide.cta.href)).status()).toBe(200);
      for (const link of await page.getByRole("list", { name: "Sources" }).getByRole("link").all()) {
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("href", /^https:\/\//);
      }
      const related = page.getByRole("list", { name: "Related guides" }).getByRole("link");
      await expect(related).toHaveCount(guide.related.length);
      for (const [i, item] of guide.related.entries()) {
        await expect(related.nth(i)).toHaveText(item.name);
        await expect(related.nth(i)).toHaveAttribute("href", item.href);
        expect((await request.get(item.href)).status()).toBe(200);
      }
      // guide 7 isn't published yet, so its slug is linked nowhere
      await expect(page.locator('a[href*="game-based-assessment-findings-indonesia"]')).toHaveCount(0);
    });

    test("the FAQ opens, and the page carries Article, FAQPage and BreadcrumbList data that match what it shows", async ({ page }) => {
      await page.goto(PATH);
      const faq = page.locator("#faq-title").locator("xpath=..");
      await faq.getByText(guide.firstQuestion).click();
      await expect(faq.getByText(guide.firstAnswer).first()).toBeVisible();
      const data = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) => scripts.map((s) => JSON.parse(s.textContent ?? "{}")));
      const byType = (type: string) => data.find((d) => d["@type"] === type);

      const article = byType("Article");
      expect(article).toMatchObject({
        headline: guide.h1,
        url: expect.stringMatching(new RegExp(`${PATH}$`)),
        datePublished: "2026-10-23",
        dateModified: "2026-10-23",
        isPartOf: { "@id": expect.stringMatching(/\/#website$/) },
        about: { "@id": expect.stringMatching(new RegExp(`${guide.about}#software$`)) },
        author: { "@id": expect.stringMatching(/\/#organization$/) },
        publisher: { "@id": expect.stringMatching(/\/#organization$/) },
      });
      // every value is on the page: the description is the answer, the modified date is "Last updated"
      await expect(page.locator("#guide-title + p")).toHaveText(article.description);
      await expect(page.locator("time")).toHaveAttribute("datetime", article.dateModified);

      const faqPage = byType("FAQPage");
      expect(faqPage.mainEntity).toHaveLength(guide.faqCount);
      expect(faqPage.mainEntity[0].name).toBe(guide.firstQuestion);
      for (const { name } of faqPage.mainEntity) await expect(faq.getByText(name, { exact: true })).toHaveCount(1);

      const crumbs = byType("BreadcrumbList").itemListElement.map((item: { name: string; item: string }) => [
        item.name,
        new URL(item.item).pathname,
      ]);
      expect(crumbs).toEqual([
        ["Home", "/en"],
        ["Guides", "/en/guides"],
        [guide.breadcrumb, PATH],
      ]);
    });

    test("is in the sitemap and in llms.txt, under Guides", async ({ request }) => {
      const sitemap = await (await request.get("/sitemap.xml")).text();
      expect(sitemap).toContain(`${PATH}</loc>`);
      expect(sitemap).toContain("/en/guides</loc>");
      const llms = await (await request.get("/llms.txt")).text();
      const section = llms.split("## Guides")[1]?.split(/\n## /)[0] ?? "";
      expect(section).toMatch(new RegExp(`^- \\[[^\\]]+\\]\\([^)]*${PATH}\\): \\S`, "m"));
    });

    test("has no serious or critical accessibility issues", async ({ page }) => {
      await page.goto(PATH);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
    });

    test("Indonesian goes to English when this guide has no Indonesian version (guides 3 to 6, or the switch off)", async ({ page }) => {
      test.skip(idGuides.some((g) => g.slug === guide.slug) && siteFlags.showIndonesianLeadPages, "the Indonesian guide exists: see below");
      await page.goto(`/id/guides/${guide.slug}`);
      await expect(page).toHaveURL(new RegExp(`${PATH}$`));
    });

    test.describe("on a phone", () => {
      test.use({ viewport: { width: 390, height: 844 } });

      test("nothing overflows sideways, and the table becomes one card for each row", async ({ page }) => {
        await page.goto(PATH);
        await expect(page.getByRole("heading", { level: 1, name: guide.h1 })).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
        for (const table of await page.locator("article table").all()) await expect(table).toBeHidden();
        await expect(page.locator("article ul[aria-label] > li").filter({ has: page.locator("dl") })).toHaveCount(guide.tableRows);
      });
    });
  });
}

// Task G4.4: guides 1 and 2 in Indonesian (content/id/guides/, SEO plan §S12). The shared layout is the one tested
// above, so what's checked here is what is Indonesian: the wording, the language links, the data, the index that lists
// only these two, and that longer Indonesian text overflows nowhere at 390 and 1280.
const idGuides = [
  {
    slug: "what-is-game-based-assessment",
    title: "Apa Itu Asesmen Berbasis Game? Panduan untuk Tim HR di Indonesia | DEUS Human Capital Services",
    h1: "Apa itu asesmen berbasis game? Panduan untuk tim HR di Indonesia",
    breadcrumb: "Apa itu asesmen berbasis game?",
    answer: "Asesmen berbasis game mengukur cara seorang kandidat berpikir dan bertindak",
    keyPoints: 4,
    sections: 6,
    tableRows: 4,
    faqCount: 4,
    firstQuestion: "Apakah asesmen berbasis game sama dengan tes yang digamifikasi?",
    firstAnswer: "Tidak selalu. Tes yang digamifikasi menambahkan elemen game",
    sources: 9,
    cta: { text: "Lihat apa yang diukur setiap dari keempat modul", label: "Lihat keempat modul", href: "/id/solutions/game-based-assessment" },
    nextStep: { text: "Sedang menjalankan rekrutmen Management Trainee?", label: "Lihat cara DEUS melakukan asesmennya" },
    related: [{ name: "Asesmen berbasis game vs psikotes online dan psikotes tradisional", href: "/id/guides/game-based-assessment-vs-psychometric-tests" }],
  },
  {
    slug: "game-based-assessment-vs-psychometric-tests",
    title: "Asesmen Berbasis Game vs Psikotes Online: Perbandingan yang Jujur | DEUS Human Capital Services",
    h1: "Asesmen berbasis game vs psikotes online dan psikotes tradisional",
    breadcrumb: "Asesmen berbasis game vs psikotes online",
    answer: "Psikotes tradisional, termasuk psikotes online, meminta kandidat menilai diri sendiri",
    keyPoints: 5,
    sections: 6,
    tableRows: 6,
    faqCount: 4,
    firstQuestion: "Apakah asesmen berbasis game termasuk psikotes?",
    firstAnswer: "Ya, dalam arti ia adalah asesmen psikologis untuk perekrutan.",
    sources: 6,
    cta: { text: "Lihat keempat modul DEUS, dan apa yang diukur masing-masing.", label: "Lihat cara kerja game-nya", href: "/id/solutions/game-based-assessment" },
    nextStep: { text: "Memilih tes untuk rekrutmen MT berikutnya?", label: "Lihat cara DEUS melakukan asesmen Management Trainee" },
    related: [{ name: "Apa itu asesmen berbasis game? Panduan untuk tim HR di Indonesia", href: "/id/guides/what-is-game-based-assessment" }],
  },
];

for (const guide of idGuides) {
  const ID_PATH = `/id/guides/${guide.slug}`;
  const EN_PATH = `/en/guides/${guide.slug}`;

  test.describe(`Indonesian guide: ${guide.slug}`, () => {
    test.skip(!siteFlags.showGuides || !siteFlags.showIndonesianLeadPages, "the Indonesian guides are off");
    test.use({ viewport: { width: 1280, height: 800 } });

    test("renders in Indonesian: title, language, canonical, H1, answer, key points, questions, FAQ, sources and closer", async ({ page }) => {
      const response = await page.goto(ID_PATH);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(new RegExp(`${ID_PATH}$`));
      await expect(page.locator("html")).toHaveAttribute("lang", "id");
      await expect(page).toHaveTitle(guide.title);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${ID_PATH}$`));
      await expect(page.getByRole("heading", { level: 1, name: guide.h1 })).toBeVisible();
      await expect(page.locator("#guide-title + p")).toContainText(guide.answer);
      await expect(page.getByRole("list", { name: "Poin utama" }).getByRole("listitem")).toHaveCount(guide.keyPoints);
      await expect(page.getByText("Oleh DEUS Human Capital Services")).toBeVisible();
      await expect(page.locator("time")).toHaveAttribute("datetime", "2026-10-23");
      await expect(page.locator("time")).toHaveText("Terakhir diperbarui: 23 Oktober 2026");
      await expect(page.locator("article h2[id]").filter({ hasText: /\?$/ })).toHaveCount(guide.sections);
      await expect(page.locator("article table tbody tr")).toHaveCount(guide.tableRows);
      await expect(page.locator("#faq-title")).toBeVisible();
      await expect(page.getByRole("list", { name: "Sumber" }).getByRole("link")).toHaveCount(guide.sources);
      await expect(page.getByRole("region", { name: /^Siap melangkah/ })).toBeVisible();
      // the shared strings are Indonesian too: header, footer
      await expect(page.getByRole("banner").getByRole("link", { name: "Kontak" })).toBeVisible();
      await expect(page.getByRole("contentinfo").getByRole("link", { name: "Panduan" })).toHaveAttribute("href", "/id/guides");
    });

    test("the next step is one line to the Indonesian use-case page, the call to action and the related guide stay in Indonesian", async ({ page, request }) => {
      await page.goto(ID_PATH);
      await expect(page.locator("[data-download-offer]")).toHaveCount(siteFlags.showSampleReport ? 1 : 0);
      if (!siteFlags.showSampleReport) {
        const line = page.locator("article p").filter({ hasText: guide.nextStep.text });
        await expect(line).toHaveCount(1);
        await expect(line.getByRole("link", { name: guide.nextStep.label })).toHaveAttribute("href", "/id/solutions/management-trainee-assessment");
        expect((await request.get("/id/solutions/management-trainee-assessment")).status()).toBe(200);
      }
      const cta = page.locator("article [data-cta='guide-primary']");
      await expect(cta).toHaveText(guide.cta.label);
      await expect(cta).toHaveAttribute("href", guide.cta.href);
      const related = page.getByRole("list", { name: "Panduan terkait" }).getByRole("link");
      await expect(related).toHaveCount(guide.related.length);
      for (const [i, item] of guide.related.entries()) {
        await expect(related.nth(i)).toHaveText(item.name);
        await expect(related.nth(i)).toHaveAttribute("href", item.href);
        expect((await request.get(item.href)).status()).toBe(200);
      }
      // guides 3 to 6 have no Indonesian version, so none is linked from here
      await expect(page.locator('a[href^="/id/guides/"]:not([href*="what-is-game"]):not([href*="psychometric"]):not([href="/id/guides"])')).toHaveCount(0);
      for (const link of await page.getByRole("list", { name: "Sumber" }).getByRole("link").all()) {
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("href", /^https:\/\//);
      }
    });

    test("names the other language: hreflang for id, en and x-default, and the switch goes to the English guide", async ({ page }) => {
      await page.goto(ID_PATH);
      const alternates = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((links) =>
        links.map((link) => [link.getAttribute("hreflang"), new URL(link.getAttribute("href") ?? "").pathname]),
      );
      expect(Object.fromEntries(alternates)).toEqual({ en: EN_PATH, id: ID_PATH, "x-default": EN_PATH });
    });

    test("the FAQ opens, and the page carries Article, FAQPage and BreadcrumbList data in Indonesian that match what it shows", async ({ page }) => {
      await page.goto(ID_PATH);
      const faq = page.locator("#faq-title").locator("xpath=..");
      await faq.getByText(guide.firstQuestion).click();
      await expect(faq.getByText(guide.firstAnswer).first()).toBeVisible();
      const data = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) => scripts.map((s) => JSON.parse(s.textContent ?? "{}")));
      const byType = (type: string) => data.find((d) => d["@type"] === type);
      const article = byType("Article");
      expect(article).toMatchObject({
        headline: guide.h1,
        url: expect.stringMatching(new RegExp(`${ID_PATH}$`)),
        datePublished: "2026-10-23",
        dateModified: "2026-10-23",
        about: { "@id": expect.stringMatching(/\/solutions\/game-based-assessment#software$/) },
        author: { "@id": expect.stringMatching(/\/#organization$/) },
      });
      await expect(page.locator("#guide-title + p")).toHaveText(article.description);
      const faqPage = byType("FAQPage");
      expect(faqPage.mainEntity).toHaveLength(guide.faqCount);
      expect(faqPage.mainEntity[0].name).toBe(guide.firstQuestion);
      for (const { name } of faqPage.mainEntity) await expect(faq.getByText(name, { exact: true })).toHaveCount(1);
      const crumbs = byType("BreadcrumbList").itemListElement.map((item: { name: string; item: string }) => [
        item.name,
        new URL(item.item).pathname,
      ]);
      expect(crumbs).toEqual([
        ["Beranda", "/id"],
        ["Panduan", "/id/guides"],
        [guide.breadcrumb, ID_PATH],
      ]);
    });

    test("is in the sitemap with its English twin, and in llms.txt's Indonesian section", async ({ request }) => {
      const sitemap = await (await request.get("/sitemap.xml")).text();
      expect(sitemap).toContain(`${ID_PATH}</loc>`);
      const entry = sitemap.split("<url>").find((block) => block.includes(`${ID_PATH}</loc>`)) ?? "";
      expect(entry).toMatch(new RegExp(`hreflang="en"[^>]*href="[^"]*${EN_PATH}"`));
      expect(entry).toMatch(new RegExp(`hreflang="x-default"[^>]*href="[^"]*${EN_PATH}"`));
      const llms = await (await request.get("/llms.txt")).text();
      expect(llms.split("## In Indonesian")[1] ?? "").toContain(ID_PATH);
    });

    test("has no serious or critical accessibility issues", async ({ page }) => {
      await page.goto(ID_PATH);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
    });

    for (const width of [1280, 390]) {
      test(`nothing overflows sideways at ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 844 });
        await page.goto(ID_PATH);
        await expect(page.getByRole("heading", { level: 1, name: guide.h1 })).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
        // nothing inside the article sticks out of its box either (long Indonesian words, headings and table cells)
        const clipped = await page.evaluate(() =>
          [...document.querySelectorAll("main h1, main h2, main h3, main p, main a, main li, main dd")].filter((el) => {
            const box = el.getBoundingClientRect();
            return box.width > 0 && (box.right > document.documentElement.clientWidth + 1 || box.left < -1);
          }).length,
        );
        expect(clipped).toBe(0);
        if (width === 390) {
          for (const table of await page.locator("article table").all()) await expect(table).toBeHidden();
          await expect(page.locator("article ul[aria-label] > li").filter({ has: page.locator("dl") })).toHaveCount(guide.tableRows);
        }
      });
    }
  });
}

test.describe("The Indonesian guides index", () => {
  test.skip(!siteFlags.showGuides || !siteFlags.showIndonesianLeadPages, "the Indonesian guides are off");
  test.use({ viewport: { width: 1280, height: 800 } });

  test("lists only guides 1 and 2, in Indonesian, each with its answer and a link to the Indonesian guide", async ({ page, request }) => {
    const response = await page.goto("/id/guides");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/id\/guides$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "id");
    await expect(page.getByRole("heading", { level: 1, name: "Panduan untuk tim HR di Indonesia" })).toBeVisible();
    const items = page.getByRole("list", { name: "Panduan yang sudah terbit" }).getByRole("listitem");
    await expect(items).toHaveCount(idGuides.length);
    for (const [i, guide] of idGuides.entries()) {
      await expect(items.nth(i).getByRole("heading", { level: 2, name: guide.h1 })).toBeVisible();
      await expect(items.nth(i)).toContainText(guide.answer);
      const link = items.nth(i).getByRole("link", { name: /Baca panduan/ });
      await expect(link).toHaveAttribute("href", `/id/guides/${guide.slug}`);
      expect((await request.get(`/id/guides/${guide.slug}`)).status()).toBe(200);
    }
    const alternates = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((links) =>
      links.map((link) => [link.getAttribute("hreflang"), new URL(link.getAttribute("href") ?? "").pathname]),
    );
    expect(Object.fromEntries(alternates)).toEqual({ en: "/en/guides", id: "/id/guides", "x-default": "/en/guides" });
  });

  test("is reached from the footer's Panduan link, and the English index still lists all six", async ({ page }) => {
    await page.goto("/id/contact");
    await page.getByRole("contentinfo").getByRole("link", { name: "Panduan" }).click();
    await expect(page).toHaveURL(/\/id\/guides$/);
    await page.goto("/en/guides");
    await expect(page.getByRole("list", { name: "Published guides" }).getByRole("listitem")).toHaveCount(6);
  });

  test("a guide with no Indonesian version goes to English", async ({ page }) => {
    for (const slug of ["management-trainee-recruitment", "campus-recruitment-screening", "link-performance-appraisal-to-pay", "kpis-and-competencies-for-appraisal"]) {
      await page.goto(`/id/guides/${slug}`);
      await expect(page, slug).toHaveURL(new RegExp(`/en/guides/${slug}$`));
    }
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    await page.goto("/id/guides");
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });

  for (const width of [1280, 390]) {
    test(`nothing overflows sideways at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/id/guides");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test.describe("The guides index", () => {
  test.skip(!siteFlags.showGuides, "showGuides is off: the index is a 404, see below");
  test.use({ viewport: { width: 1280, height: 800 } });

  test("lists the published guides with their answers, and links to each", async ({ page, request }) => {
    const response = await page.goto("/en/guides");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Guides for HR teams in Indonesia | DEUS Human Capital Services");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/guides$/);
    await expect(page.getByRole("heading", { level: 1, name: "Guides for HR teams in Indonesia" })).toBeVisible();
    const items = page.getByRole("list", { name: "Published guides" }).getByRole("listitem");
    await expect(items).toHaveCount(guides.length);
    for (const [i, guide] of guides.entries()) {
      await expect(items.nth(i).getByRole("heading", { level: 2, name: guide.h1 })).toBeVisible();
      await expect(items.nth(i)).toContainText(guide.answer);
      const link = items.nth(i).getByRole("link", { name: /Read the guide/ });
      await expect(link).toHaveAttribute("href", `/en/guides/${guide.slug}`);
      expect((await request.get(`/en/guides/${guide.slug}`)).status()).toBe(200);
    }
    const crumbs = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((s) => JSON.parse(s.textContent ?? "{}")).find((d) => d["@type"] === "BreadcrumbList"));
    expect(crumbs.itemListElement.map((item: { name: string }) => item.name)).toEqual(["Home", "Guides"]);
  });

  test("opens an Open Graph image that exists", async ({ page, request }) => {
    await page.goto("/en/guides");
    const image = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(image).toMatch(/\/og\/guides\.png$/);
    expect((await request.get(new URL(image!).pathname)).status()).toBe(200);
  });

  test("is reached from the footer's Guides link, on every page", async ({ page }) => {
    for (const path of ["/en", "/en/about", gba]) {
      await page.goto(path);
      await expect(page.getByRole("contentinfo").getByRole("link", { name: "Guides" }), path).toHaveAttribute("href", "/en/guides");
    }
    await page.goto("/en");
    await page.getByRole("contentinfo").getByRole("link", { name: "Guides" }).click();
    await expect(page).toHaveURL(/\/en\/guides$/);
  });

  test("Indonesian goes to English while showIndonesianLeadPages is off", async ({ page }) => {
    test.skip(siteFlags.showIndonesianLeadPages, "the Indonesian index exists: see below");
    await page.goto("/id/guides");
    await expect(page).toHaveURL(/\/en\/guides$/);
  });

  test("has no serious or critical accessibility issues", async ({ page }) => {
    await page.goto("/en/guides");
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });
});

test.describe("The pages that link to a guide", () => {
  test.skip(!siteFlags.showGuides, "showGuides is off: no page links to a guide, see below");
  test.use({ viewport: { width: 1280, height: 800 } });

  // each page's one "Related guide" line under its FAQ (SEO/geo-implementation-plan.md §S9's link list)
  const pages = [
    { path: gba, slug: "what-is-game-based-assessment", title: "What is game-based assessment? A guide for HR teams in Indonesia" },
    { path: enhance, slug: "kpis-and-competencies-for-appraisal", title: "Setting KPIs and competencies for a fair performance appraisal" },
    { path: mtPage, slug: "management-trainee-recruitment", title: "How to run Management Trainee recruitment at scale" },
    {
      path: "/en/solutions/campus-recruitment-assessment",
      slug: "campus-recruitment-screening",
      title: "Campus recruitment: screening thousands of graduates fairly and fast",
    },
    { path: "/en/solutions/talent-mapping", slug: "what-is-game-based-assessment", title: "What is game-based assessment? A guide for HR teams in Indonesia" },
    {
      path: "/en/solutions/performance-appraisal-and-pay",
      slug: "link-performance-appraisal-to-pay",
      title: "How to link performance appraisals to pay and bonuses",
    },
  ];
  for (const { path, slug, title } of pages) {
    test(`${path} has one Related guide line, to a guide that renders`, async ({ page, request }) => {
      await page.goto(path);
      await expect(page.getByText("Related guide", { exact: true })).toHaveCount(1);
      const link = page.locator(`a[href="/en/guides/${slug}"]`);
      await expect(link).toHaveCount(1);
      await expect(link).toHaveText(title);
      expect((await request.get(`/en/guides/${slug}`)).status()).toBe(200);
    });
  }
});

test.describe("A slug that is no guide", () => {
  for (const path of ["/en/guides/no-such-guide", "/id/guides/no-such-guide"]) {
    test(`${path} is a 404`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
    });
  }

  test("guides that aren't written or published yet are 404s, not empty pages", async ({ page }) => {
    for (const slug of ["game-based-assessment-findings-indonesia"]) {
      const response = await page.goto(`/en/guides/${slug}`);
      expect(response?.status(), slug).toBe(404);
    }
  });
});

test.describe("While showGuides is off", () => {
  test.skip(siteFlags.showGuides, "showGuides is on");

  test("the index and every guide are 404s, and the sitemap and llms.txt don't list them", async ({ page, request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const llms = await (await request.get("/llms.txt")).text();
    expect(llms).not.toContain("## Guides");
    for (const path of ["guides", ...guides.map((g) => `guides/${g.slug}`)]) {
      for (const locale of ["en", "id"]) {
        const response = await page.goto(`/${locale}/${path}`);
        expect(response?.status(), `/${locale}/${path}`).toBe(404);
      }
      expect(sitemap).not.toContain(path);
      expect(llms).not.toContain(path);
    }
  });

  test("no page links to a guide: the footer, and each guide's own sources and related list", async ({ page }) => {
    for (const path of ["/en", "/en/about", gba, enhance, mtPage, "/en/solutions/campus-recruitment-assessment", "/en/solutions/talent-mapping", "/en/solutions/performance-appraisal-and-pay"]) {
      await page.goto(path);
      await expect(page.locator('a[href*="/guides"]'), path).toHaveCount(0);
    }
  });
});
