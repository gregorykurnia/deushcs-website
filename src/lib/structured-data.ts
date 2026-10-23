import type { FaqItem } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/links";
import { SITE_NAME, siteUrl } from "@/lib/metadata";

// schema.org JSON-LD for pages. FAQ answers carry `**bold**` markers in the content files
// (rendered by <Rich>); the structured data wants plain text. Every URL in it is absolute and built
// from siteUrl() (Task 7.1), so it follows NEXT_PUBLIC_SITE_URL to the live domain.

const ALTERNATE_NAME = "DEUS HCS";
const LEGAL_NAME = "PT Investama Persada Kurnia";
const LOGO_PATH = "/assets/deus-logo.png";

/** The company's official profile pages (LinkedIn and so on), for `Organization.sameAs`. Only URLs the owner has sent; none yet. */
export const SAME_AS_PROFILES: readonly string[] = [];

/** An absolute URL on the site: `pageUrl("en", "/about")` → `https://deushcs.com/en/about`. Home is `pageUrl("en")`. */
export function pageUrl(locale: Locale, path = ""): string {
  return new URL(`/${locale}${path === "/" ? "" : path}`, siteUrl()).toString();
}

/** WebSite structured data (https://schema.org/WebSite): the site's name, for the name in search results. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: ALTERNATE_NAME,
    url: new URL("/", siteUrl()).toString(),
  };
}

/** Organization structured data (https://schema.org/Organization) for Home. `sameAs` is left out while it's empty. */
export function organizationJsonLd(sameAs: readonly string[] = SAME_AS_PROFILES) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: ALTERNATE_NAME,
    legalName: LEGAL_NAME,
    url: new URL("/", siteUrl()).toString(),
    logo: new URL(LOGO_PATH, siteUrl()).toString(),
    email: CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${WHATSAPP_NUMBER}`,
      email: CONTACT_EMAIL,
      availableLanguage: ["English", "Indonesian"],
    },
    ...(sameAs.length > 0 ? { sameAs: [...sameAs] } : {}),
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
      acceptedAnswer: { "@type": "Answer", text: item.answer.replace(/\*\*(.+?)\*\*/g, "$1") },
    })),
  };
}

/** SoftwareApplication structured data (https://schema.org/SoftwareApplication) for a DEUS product page. */
export function softwareApplicationJsonLd({
  name,
  description,
  url,
  publisher,
}: {
  name: string;
  description: string;
  url: string;
  /** The legal entity, e.g. PT Investama Persada Kurnia. */
  publisher: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    publisher: { "@type": "Organization", name: publisher, brand: { "@type": "Brand", name: "DEUS" } },
  };
}

/** The JSON for a `<script type="application/ld+json">`. `<` is escaped so copy can never close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
