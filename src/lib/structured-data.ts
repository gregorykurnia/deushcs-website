import type { FaqItem } from "@/content/types";

// schema.org JSON-LD for pages. FAQ answers carry `**bold**` markers in the content files
// (rendered by <Rich>); the structured data wants plain text.

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
