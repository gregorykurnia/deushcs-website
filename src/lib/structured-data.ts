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

/** The JSON for a `<script type="application/ld+json">`. `<` is escaped so copy can never close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
