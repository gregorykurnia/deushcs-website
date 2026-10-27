import { afterEach, describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";
import { enhanceEn } from "@/content/en/enhance";
import { gbaEn } from "@/content/en/game-based-assessment";
import { homeAnswerPassage, homeEn } from "@/content/en/home";
import {
  aboutPageJsonLd,
  breadcrumbListJsonLd,
  contactPageJsonLd,
  faqPageJsonLd,
  guideArticleJsonLd,
  KNOWS_ABOUT,
  organizationId,
  organizationJsonLd,
  pageUrl,
  serializeJsonLd,
  softwareApplicationId,
  softwareApplicationJsonLd,
  storyArticleJsonLd,
  webPageJsonLd,
  websiteId,
  websiteJsonLd,
} from "@/lib/structured-data";

afterEach(() => vi.unstubAllEnvs());

/** Every string value in the data that is a URL, however deep. */
function urlsIn(value: unknown): string[] {
  if (typeof value === "string") return /^https?:\/\//.test(value) || value.startsWith("/") ? [value] : [];
  if (Array.isArray(value)) return value.flatMap(urlsIn);
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, v]) => (key === "@context" ? [] : urlsIn(v)));
  }
  return [];
}

describe("pageUrl", () => {
  it("is absolute, built from NEXT_PUBLIC_SITE_URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    expect(pageUrl("en")).toBe("https://deushcs.com/en");
    expect(pageUrl("en", "/")).toBe("https://deushcs.com/en");
    expect(pageUrl("en", "/solutions/enhance")).toBe("https://deushcs.com/en/solutions/enhance");
  });
});

describe("@id links", () => {
  it("gives the company and the site one stable id each, at the site root", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    expect(organizationId()).toBe("https://deushcs.com/#organization");
    expect(websiteId()).toBe("https://deushcs.com/#website");
    expect(softwareApplicationId("en", "/solutions/enhance")).toBe("https://deushcs.com/en/solutions/enhance#software");
  });

  it("points every publisher, author and main entity at the organization's @id", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const ref = { "@id": "https://deushcs.com/#organization" };
    expect(organizationJsonLd({ description: "d" })["@id"]).toBe(ref["@id"]);
    expect(websiteJsonLd().publisher).toEqual(ref);
    expect(softwareApplicationJsonLd({ name: "n", locale: "en", path: "/solutions/enhance" }).publisher).toEqual(ref);
    const story = storyArticleJsonLd({ headline: "h", description: "d", url: "u", product: "p" });
    expect(story.publisher).toEqual(ref);
    expect(story.author).toEqual(ref);
    expect(aboutPageJsonLd({ name: "n", url: "u" }).mainEntity).toEqual(ref);
    expect(contactPageJsonLd({ name: "n", url: "u" }).about).toEqual(ref);
  });

  it("follows the site URL, so a preview never points at the live domain", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.vercel.app");
    expect(websiteJsonLd().publisher).toEqual({ "@id": "https://preview.example.vercel.app/#organization" });
  });
});

describe("websiteJsonLd", () => {
  it("names the site, points at the root and is published by the organization", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    expect(websiteJsonLd()).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://deushcs.com/#website",
      name: "DEUS Human Capital Services",
      alternateName: "DEUS HCS",
      url: "https://deushcs.com/",
      publisher: { "@id": "https://deushcs.com/#organization" },
    });
  });
});

describe("organizationJsonLd", () => {
  it("carries the fixed fields, with an absolute logo and a WhatsApp contact point", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const org = organizationJsonLd({ description: "d" });
    expect(org).toMatchObject({
      "@type": "Organization",
      name: "DEUS Human Capital Services",
      alternateName: "DEUS HCS",
      legalName: "PT Investama Persada Kurnia",
      url: "https://deushcs.com/",
      logo: "https://deushcs.com/assets/deus-logo.png",
      email: "admin@deushcs.com",
      contactPoint: { "@type": "ContactPoint", telephone: "+6282312121660" },
    });
    expect(urlsIn(org).every((u) => u.startsWith("https://deushcs.com/"))).toBe(true);
  });

  it("describes the company with Home's answer passage, founded in 2022 and serving Indonesia", () => {
    const org = organizationJsonLd({ description: homeAnswerPassage });
    expect(org.description).toBe(homeAnswerPassage);
    // the passage is on the page, at the end of "Why DEUS exists" (§S1: every value visible)
    expect(homeEn.why.paragraphs).toContain(homeAnswerPassage);
    expect(org.foundingDate).toBe("2022");
    expect(homeEn.why.paragraphs.join(" ")).toContain("in 2022");
    expect(org.areaServed).toEqual({ "@type": "Country", name: "Indonesia" });
    expect(homeEn.logos.lede).toContain("across Indonesia");
  });

  it("strips bold markers from the description", () => {
    expect(organizationJsonLd({ description: "**DEUS** measures" }).description).toBe("DEUS measures");
  });

  it("lists the topics the company knows about", () => {
    expect(organizationJsonLd({ description: "d" }).knowsAbout).toEqual([...KNOWS_ABOUT]);
    // every topic is named on Home: in its copy or in the footer line every page shows
    const homeText = `${JSON.stringify(homeEn)} ${messages.Footer.about}`.toLowerCase();
    for (const topic of KNOWS_ABOUT) expect(homeText).toContain(topic.toLowerCase());
  });

  it("adds a postal address only when one is passed (siteFlags.showAddress)", () => {
    expect(organizationJsonLd({ description: "d" })).not.toHaveProperty("address");
    expect(organizationJsonLd({ description: "d", address: "Jl. Contoh 1, Jakarta" }).address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "Jl. Contoh 1, Jakarta",
      addressCountry: "ID",
    });
  });

  it("leaves sameAs out until the owner sends profile URLs", () => {
    expect(organizationJsonLd({ description: "d" })).not.toHaveProperty("sameAs");
    expect(organizationJsonLd({ description: "d", sameAs: [] })).not.toHaveProperty("sameAs");
    expect(
      organizationJsonLd({ description: "d", sameAs: ["https://www.linkedin.com/company/deus"] }),
    ).toHaveProperty("sameAs", ["https://www.linkedin.com/company/deus"]);
  });

  it("follows the site URL, so a preview never points at the live domain", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example.vercel.app");
    expect(organizationJsonLd({ description: "d" }).logo).toBe("https://preview.example.vercel.app/assets/deus-logo.png");
  });
});

describe("softwareApplicationJsonLd", () => {
  it("describes a product page, with an @id on its page URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const data = softwareApplicationJsonLd({
      name: "DEUS Enhance",
      description: "**DEUS Enhance** connects",
      locale: "en",
      path: "/solutions/enhance",
    });
    expect(data).toMatchObject({
      "@type": "SoftwareApplication",
      "@id": "https://deushcs.com/en/solutions/enhance#software",
      name: "DEUS Enhance",
      description: "DEUS Enhance connects",
      url: "https://deushcs.com/en/solutions/enhance",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
    });
    expect(data).not.toHaveProperty("offers");
    expect(data).not.toHaveProperty("featureList");
    expect(data).not.toHaveProperty("applicationSubCategory");
  });

  it("leaves the description out when the page has no line for it", () => {
    expect(softwareApplicationJsonLd({ name: "n", locale: "en", path: "/x" })).not.toHaveProperty("description");
  });

  it("GBA: the four module titles, the Assessment subcategory, and no offers while the page shows no price (round 4)", () => {
    const featureList = gbaEn.modules.cards.map((card) => card.title);
    const data = softwareApplicationJsonLd({
      name: "Game-Based Assessment",
      locale: "en",
      path: "/solutions/game-based-assessment",
      applicationSubCategory: "Assessment",
      featureList,
    });
    expect(data.featureList).toEqual([
      "DEUS Discover: Personality Test",
      "Cognitive Assessment",
      "Neuroscience Assessment",
      "Simulation Assessment",
    ]);
    expect(data.applicationSubCategory).toBe("Assessment");
    expect(data).not.toHaveProperty("offers");
  });

  it("Enhance: the three solution card titles, and no offers", () => {
    const data = softwareApplicationJsonLd({
      name: "DEUS Enhance",
      locale: "en",
      path: "/solutions/enhance",
      featureList: enhanceEn.solution.cards.map((card) => card.title),
    });
    expect(data.featureList).toEqual(["Set KPIs and track them", "Review and calibrate", "Turn results into pay"]);
    expect(data).not.toHaveProperty("offers");
  });
});

describe("aboutPageJsonLd and contactPageJsonLd", () => {
  it("name the page by its heading, joined when it's split over lines", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const about = aboutPageJsonLd({ name: ["One.", "Two."], description: "So we **build**.", url: pageUrl("en", "/about") });
    expect(about).toEqual({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "One. Two.",
      description: "So we build.",
      url: "https://deushcs.com/en/about",
      isPartOf: { "@id": "https://deushcs.com/#website" },
      mainEntity: { "@id": "https://deushcs.com/#organization" },
    });
    const contact = contactPageJsonLd({ name: "Let's talk.", url: pageUrl("en", "/contact") });
    expect(contact).toMatchObject({ "@type": "ContactPage", name: "Let's talk.", url: "https://deushcs.com/en/contact" });
    expect(contact).not.toHaveProperty("description");
  });
});

describe("storyArticleJsonLd", () => {
  it("is an Article about the product, written and published by the organization", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const url = pageUrl("en", "/clients/national-telecom-group");
    expect(
      storyArticleJsonLd({ headline: ["Hiring", "at scale."], description: "A **national** group", url, product: "Game-Based Assessment" }),
    ).toEqual({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Hiring at scale.",
      description: "A national group",
      url,
      mainEntityOfPage: url,
      about: { "@type": "SoftwareApplication", name: "Game-Based Assessment" },
      author: { "@id": "https://deushcs.com/#organization" },
      publisher: { "@id": "https://deushcs.com/#organization" },
    });
  });
});

describe("webPageJsonLd (use-case pages)", () => {
  it("is a WebPage about the product's own SoftwareApplication, in the website, published by the organization", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const url = pageUrl("en", "/solutions/management-trainee-assessment");
    const data = webPageJsonLd({
      name: "Management Trainee assessment",
      description: "DEUS runs **Management Trainee** assessments.",
      url,
      locale: "en",
      productPath: "/solutions/game-based-assessment",
    });
    expect(data).toEqual({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Management Trainee assessment",
      description: "DEUS runs Management Trainee assessments.",
      url,
      isPartOf: { "@id": "https://deushcs.com/#website" },
      about: { "@id": "https://deushcs.com/en/solutions/game-based-assessment#software" },
      publisher: { "@id": "https://deushcs.com/#organization" },
    });
    // `about` is the id the product page itself carries
    expect(data.about["@id"]).toBe(softwareApplicationId("en", "/solutions/game-based-assessment"));
  });
});

describe("guideArticleJsonLd", () => {
  it("is an Article about the product's own SoftwareApplication, dated, written and published by the organization", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const url = pageUrl("en", "/guides/what-is-game-based-assessment");
    const data = guideArticleJsonLd({
      headline: "What is game-based assessment?",
      description: "Game-based assessment **measures** how a candidate behaves.",
      url,
      locale: "en",
      productPath: "/solutions/game-based-assessment",
      datePublished: "2026-10-23",
      dateModified: "2026-10-24",
    });
    expect(data).toEqual({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "What is game-based assessment?",
      description: "Game-based assessment measures how a candidate behaves.",
      url,
      mainEntityOfPage: url,
      datePublished: "2026-10-23",
      dateModified: "2026-10-24",
      isPartOf: { "@id": "https://deushcs.com/#website" },
      about: { "@id": "https://deushcs.com/en/solutions/game-based-assessment#software" },
      author: { "@id": "https://deushcs.com/#organization" },
      publisher: { "@id": "https://deushcs.com/#organization" },
    });
    expect(data.about["@id"]).toBe(softwareApplicationId("en", "/solutions/game-based-assessment"));
  });
});

describe("faqPageJsonLd", () => {
  it("turns each item into a Question with a plain-text answer", () => {
    expect(faqPageJsonLd([{ question: "Q?", answer: "**Yes.** It runs." }]).mainEntity).toEqual([
      { "@type": "Question", name: "Q?", acceptedAnswer: { "@type": "Answer", text: "Yes. It runs." } },
    ]);
  });

  it("GBA: carries 'What reports do we get?' right after 'How quickly do we get results?' (R2, round 4)", () => {
    const names = faqPageJsonLd(gbaEn.faq.items).mainEntity.map((question) => question.name);
    expect(names).toContain("What reports do we get?");
    expect(names[names.indexOf("How quickly do we get results?") + 1]).toBe("What reports do we get?");
  });
});

describe("breadcrumbListJsonLd", () => {
  it("starts at Home, numbers each step and ends with the page", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://deushcs.com");
    const data = breadcrumbListJsonLd({
      locale: "en",
      homeName: "Home",
      trail: [
        { name: "Solutions", path: "/solutions" },
        { name: "DEUS Enhance", path: "/solutions/enhance" },
      ],
    });
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://deushcs.com/en" },
      { "@type": "ListItem", position: 2, name: "Solutions", item: "https://deushcs.com/en/solutions" },
      { "@type": "ListItem", position: 3, name: "DEUS Enhance", item: "https://deushcs.com/en/solutions/enhance" },
    ]);
  });
});

describe("serializeJsonLd", () => {
  it("round-trips every builder's output as JSON", () => {
    for (const data of [websiteJsonLd(), organizationJsonLd({ description: "d" })]) {
      expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
    }
  });
});
