import type { FaqItem } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/links";
import { SITE_NAME, siteUrl } from "@/lib/metadata";

// schema.org JSON-LD for pages. FAQ answers carry `**bold**` markers in the content files
// (rendered by <Rich>); the structured data wants plain text. Every URL in it is absolute and built
// from siteUrl() (Task 7.1), so it follows NEXT_PUBLIC_SITE_URL to the live domain. Every value must
// also be visible on the page that carries it (SEO/geo-implementation-plan.md §S1), so the callers pass
// their page's own copy in. Stable `@id`s tie the pages into one company record: the Organization (on
// Home) is `<site>/#organization`, and everything DEUS publishes points at it.

const ALTERNATE_NAME = "DEUS HCS";
const LEGAL_NAME = "PT Investama Persada Kurnia";
const LOGO_PATH = "/assets/deus-logo.png";
/** The year DEUS started, as Home says ("We started DEUS in 2022"). */
const FOUNDING_YEAR = "2022";

/** Content strings carry `**bold**` markers (rendered by <Rich>); structured data wants plain text. */
function plainText(text: string | readonly string[]): string {
  return (typeof text === "string" ? text : text.join(" ")).replace(/\*\*(.+?)\*\*/g, "$1");
}

/** `{ description }` in plain text, or nothing when the page has no such line. */
function descriptionOf(text: string | undefined) {
  return text ? { description: plainText(text) } : {};
}

/**
 * Topics the company works in, for `Organization.knowsAbout`. Only the ones Home names word for word
 * (a unit test checks). §S1 also lists psychometric assessment, personality assessment, performance
 * appraisal and talent mapping: add each once Home's copy names it.
 */
export const KNOWS_ABOUT: readonly string[] = ["Game-based assessment", "Cognitive assessment", "Performance management"];

/** The company's official profile pages (LinkedIn and so on), for `Organization.sameAs`. Only URLs the owner has sent; none yet. */
export const SAME_AS_PROFILES: readonly string[] = [];

/** An absolute URL on the site: `pageUrl("en", "/about")` → `https://deushcs.com/en/about`. Home is `pageUrl("en")`. */
export function pageUrl(locale: Locale, path = ""): string {
  return new URL(`/${locale}${path === "/" ? "" : path}`, siteUrl()).toString();
}

/** The Organization's `@id`: `https://deushcs.com/#organization`. */
export function organizationId(): string {
  return new URL("/#organization", siteUrl()).toString();
}

/** The WebSite's `@id`: `https://deushcs.com/#website`. */
export function websiteId(): string {
  return new URL("/#website", siteUrl()).toString();
}

/** A product's `@id`: its page URL with `#software`, e.g. `https://deushcs.com/en/solutions/enhance#software`. */
export function softwareApplicationId(locale: Locale, path: string): string {
  return `${pageUrl(locale, path)}#software`;
}

/** A reference to the company record, for `publisher`, `author` and `mainEntity`. */
function organizationRef() {
  return { "@id": organizationId() };
}

/** WebSite structured data (https://schema.org/WebSite): the site's name, for the name in search results. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(),
    name: SITE_NAME,
    alternateName: ALTERNATE_NAME,
    url: new URL("/", siteUrl()).toString(),
    publisher: organizationRef(),
  };
}

/**
 * Organization structured data (https://schema.org/Organization) for Home. `description` is Home's own
 * copy. `address` is passed only while `siteFlags.showAddress` is on; `sameAs` is left out while it's empty.
 */
export function organizationJsonLd({
  description,
  address,
  sameAs = SAME_AS_PROFILES,
}: {
  description: string;
  address?: string;
  sameAs?: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(),
    name: SITE_NAME,
    alternateName: ALTERNATE_NAME,
    legalName: LEGAL_NAME,
    description: plainText(description),
    url: new URL("/", siteUrl()).toString(),
    logo: new URL(LOGO_PATH, siteUrl()).toString(),
    email: CONTACT_EMAIL,
    foundingDate: FOUNDING_YEAR,
    areaServed: { "@type": "Country", name: "Indonesia" },
    knowsAbout: [...KNOWS_ABOUT],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${WHATSAPP_NUMBER}`,
      email: CONTACT_EMAIL,
      availableLanguage: ["English", "Indonesian"],
    },
    ...(address ? { address: { "@type": "PostalAddress", streetAddress: address, addressCountry: "ID" } } : {}),
    ...(sameAs.length > 0 ? { sameAs: [...sameAs] } : {}),
  };
}

/** AboutPage structured data (https://schema.org/AboutPage): the page is about the company record. */
export function aboutPageJsonLd({
  name,
  description,
  url,
}: {
  /** The page's H1; a heading split over lines is joined. */
  name: string | readonly string[];
  description?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: plainText(name),
    ...descriptionOf(description),
    url,
    isPartOf: { "@id": websiteId() },
    mainEntity: organizationRef(),
  };
}

/** ContactPage structured data (https://schema.org/ContactPage). */
export function contactPageJsonLd({
  name,
  description,
  url,
}: {
  /** The page's H1; a heading split over lines is joined. */
  name: string | readonly string[];
  description?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: plainText(name),
    ...descriptionOf(description),
    url,
    isPartOf: { "@id": websiteId() },
    about: organizationRef(),
  };
}

/**
 * WebPage structured data (https://schema.org/WebPage) for a use-case page (§S1): the page is about the
 * product it recommends, so `about` points at that product page's `SoftwareApplication` `@id` (the GBA and
 * Enhance pages carry it). `name` is the page's H1 and `description` its answer passage, both on the page.
 */
export function webPageJsonLd({
  name,
  description,
  url,
  locale,
  productPath,
}: {
  /** The page's H1; a heading split over lines is joined. */
  name: string | readonly string[];
  description: string;
  url: string;
  locale: Locale;
  /** The product page's path without the locale, e.g. `/solutions/game-based-assessment`. */
  productPath: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: plainText(name),
    description: plainText(description),
    url,
    isPartOf: { "@id": websiteId() },
    about: { "@id": softwareApplicationId(locale, productPath) },
    publisher: organizationRef(),
  };
}

/**
 * Article structured data (https://schema.org/Article) for a client story. `headline` and `description`
 * are the story's own heading and lede, which already follow the client's naming switch; `product` is
 * the product tag the story shows.
 */
export function storyArticleJsonLd({
  headline,
  description,
  url,
  product,
}: {
  headline: string | readonly string[];
  description: string;
  url: string;
  product: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: plainText(headline),
    description: plainText(description),
    url,
    mainEntityOfPage: url,
    about: { "@type": "SoftwareApplication", name: product },
    author: organizationRef(),
    publisher: organizationRef(),
  };
}

/**
 * Article structured data (https://schema.org/Article) for a guide (§S1). `headline` is the guide's H1,
 * `description` its answer and `dateModified` the "Last updated" date, all on the page. The guide is about
 * the product it recommends (that product page's `SoftwareApplication` `@id`), and the company is both
 * author and publisher until the owner names a person.
 */
export function guideArticleJsonLd({
  headline,
  description,
  url,
  locale,
  productPath,
  datePublished,
  dateModified,
}: {
  headline: string | readonly string[];
  description: string;
  url: string;
  locale: Locale;
  /** The product page's path without the locale, e.g. `/solutions/game-based-assessment`. */
  productPath: string;
  /** ISO dates, `2026-10-23`. */
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: plainText(headline),
    description: plainText(description),
    url,
    mainEntityOfPage: url,
    datePublished,
    dateModified,
    isPartOf: { "@id": websiteId() },
    about: { "@id": softwareApplicationId(locale, productPath) },
    author: organizationRef(),
    publisher: organizationRef(),
  };
}

/**
 * BreadcrumbList structured data (https://schema.org/BreadcrumbList) for a page below Home. Home is the
 * first item; `trail` is the rest, ending with the page itself.
 */
export function breadcrumbListJsonLd({
  locale,
  homeName,
  trail,
}: {
  locale: Locale;
  homeName: string;
  trail: readonly { name: string; path: string }[];
}) {
  const items = [{ name: homeName, path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: pageUrl(locale, item.path),
    })),
  };
}

/** FAQPage structured data (https://schema.org/FAQPage) for a list of questions and answers. */
export function faqPageJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: plainText(item.answer) },
    })),
  };
}

/**
 * SoftwareApplication structured data (https://schema.org/SoftwareApplication) for a DEUS product page,
 * published by the company record. `featureList` holds names the page shows; `lowPrice` is set only when
 * the page shows a "starting from" price (in IDR), and becomes an AggregateOffer.
 */
export function softwareApplicationJsonLd({
  name,
  description,
  locale,
  path,
  featureList,
  applicationSubCategory,
  lowPrice,
}: {
  name: string;
  description?: string;
  locale: Locale;
  /** The page's path without the locale, e.g. `/solutions/enhance`. */
  path: string;
  featureList?: readonly string[];
  applicationSubCategory?: string;
  lowPrice?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": softwareApplicationId(locale, path),
    name,
    ...descriptionOf(description),
    url: pageUrl(locale, path),
    applicationCategory: "BusinessApplication",
    ...(applicationSubCategory ? { applicationSubCategory } : {}),
    operatingSystem: "Web",
    ...(featureList?.length ? { featureList: [...featureList] } : {}),
    ...(lowPrice !== undefined
      ? { offers: { "@type": "AggregateOffer", priceCurrency: "IDR", lowPrice } }
      : {}),
    publisher: organizationRef(),
  };
}

/** The JSON for a `<script type="application/ld+json">`. `<` is escaped so copy can never close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
