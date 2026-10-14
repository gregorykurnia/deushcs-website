import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";

// next-intl's navigation needs the Next router; a plain anchor is enough for markup tests.
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href}`} {...props} />
  ),
  usePathname: () => "/solutions/enhance",
}));

const { LanguageSwitch } = await import("@/components/site/LanguageSwitch");

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

describe("LanguageSwitch", () => {
  it("links both languages on the same page when both exist", () => {
    const html = render(<LanguageSwitch available={["en", "id"]} />);
    expect(html).toContain('href="/en/solutions/enhance"');
    expect(html).toContain('href="/id/solutions/enhance"');
    expect(html).toMatch(/aria-current="true"[^>]*>EN</);
  });

  it("renders a language the page doesn't exist in as disabled, not as a link", () => {
    const html = render(<LanguageSwitch available={["en"]} />);
    expect(html).not.toContain('href="/id/');
    expect(html).toMatch(/<span role="link" aria-disabled="true"[^>]*>ID<\/span>/);
    expect(html).toContain("Bahasa Indonesia (not available for this page yet)");
  });
});
