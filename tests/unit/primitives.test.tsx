import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";

// next-intl's navigation needs the Next router; a plain anchor is enough for markup tests.
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href === "/" ? "" : href}`} {...props} />
  ),
}));

const { Button } = await import("@/components/ui/button");
const { Reveal } = await import("@/components/ui/reveal");
const { SectionHeader } = await import("@/components/ui/section-header");
const { TextLink } = await import("@/components/ui/text-link");
const { Placeholder } = await import("@/components/ui/placeholder");

function render(node: React.ReactNode, locale = "en") {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

describe("Reveal", () => {
  it("renders content visible without JavaScript (no hidden state in the HTML)", () => {
    const html = render(<Reveal index={2}>Step one</Reveal>);
    expect(html).toContain("Step one");
    expect(html).not.toContain("data-reveal");
    expect(html).not.toContain("opacity");
  });
});

describe("Button", () => {
  it("is busy and disabled while pending, so one click makes one submission", () => {
    const html = render(<Button type="submit" busy>Sending…</Button>);
    expect(html).toMatch(/aria-busy="true"/);
    expect(html).toMatch(/disabled=""/);
    expect(html).toContain("animate-spin");
  });

  it("defaults to type=button", () => {
    expect(render(<Button>Request a demo</Button>)).toContain('type="button"');
  });
});

describe("SectionHeader", () => {
  it("renders two-line headlines as block lines with no accents", () => {
    const html = render(
      <SectionHeader label="Let's talk" title={["Ready to transform", "with DEUS?"]} />,
    );
    // a space between the lines keeps the heading's text readable ("transform with")
    expect(html).toContain('<span class="block">Ready to transform</span> <span class="block">with DEUS?</span>');
    expect(html).toContain("<h2");
    expect(html).not.toMatch(/<(b|strong|em|i)>/);
  });

  it("puts the label in small capitals between two lines, with no pill fill (F4)", () => {
    const html = render(<SectionHeader label="Let's talk" title="Ready to transform with DEUS?" />);
    const label = html.match(/<span class="([^"]*)">Let&#x27;s talk<\/span>/);
    expect(label).not.toBeNull();
    const classes = label![1].split(" ");
    // .section-label draws the two lines (globals.css)
    expect(classes).toEqual(expect.arrayContaining(["section-label", "text-eyebrow", "uppercase", "text-azure-ink"]));
    expect(classes).not.toContain("rounded-pill");
    expect(classes.some((c) => /^bg-/.test(c))).toBe(false);
  });
});

describe("TextLink", () => {
  it("opens external links in a new tab and says so to screen readers", () => {
    const html = render(<TextLink href="https://deuspotentia.com/">Visit Potentia</TextLink>);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener"');
    expect(html).toContain("(opens in a new tab)");
  });

  it("routes internal links through the locale-aware Link", () => {
    expect(render(<TextLink href="/solutions/enhance">See DEUS Enhance</TextLink>)).toContain(
      'href="/en/solutions/enhance"',
    );
  });
});

describe("Placeholder", () => {
  it("shows the TODO caption on a sky tile", () => {
    const html = render(<Placeholder caption="TODO: Calibration matrix screenshot" />);
    expect(html).toContain("TODO: Calibration matrix screenshot");
    expect(html).toContain("--grad-thumb");
    expect(html).toContain("data-placeholder");
  });
});
