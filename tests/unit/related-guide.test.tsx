import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";

// G3.4 (SEO/geo-implementation-plan.md §S9): the "Related guide" line under the FAQ of the GBA, Enhance and
// use-case pages. It links the registered guide's title, and renders nothing for a guide that isn't registered.

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href}`} {...props} />
  ),
}));

const { RelatedGuide } = await import("@/components/guides/RelatedGuide");

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

describe("RelatedGuide", () => {
  it("shows the label, then the guide's title as a link to the guide", () => {
    const html = render(<RelatedGuide slug="what-is-game-based-assessment" />);
    expect(html).toContain("Related guide</span>");
    expect(html).toContain('href="/en/guides/what-is-game-based-assessment"');
    expect(html).toContain("What is game-based assessment? A guide for HR teams in Indonesia");
  });

  it("renders nothing for a slug that is no registered guide, or for no slug", () => {
    expect(render(<RelatedGuide slug="no-such-guide" />)).toBe("");
    expect(render(<RelatedGuide />)).toBe("");
  });

  it("puts the page's class on the line", () => {
    expect(render(<RelatedGuide slug="kpis-and-competencies-for-appraisal" className="mt-10" />)).toContain("mt-10");
  });
});
