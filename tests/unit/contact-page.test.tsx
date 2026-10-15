import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";
import { contactEn } from "@/content/en/contact";
import { productInterests } from "@/lib/leads/schema";

// Internal links go through next-intl's navigation, which needs the router; a plain anchor is enough
// for markup tests. The Contact page's own links are external or mailto, so this is only a safety net.
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href}`} {...props} />
  ),
  usePathname: () => "/contact",
}));

const { ContactHero } = await import("@/components/contact/ContactHero");
const { ContactSideColumn } = await import("@/components/contact/ContactSideColumn");
const { productFromParam } = await import("@/lib/leads/schema");

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

describe("productFromParam (the Contact page's ?product= link)", () => {
  it("reads each product the form offers", () => {
    for (const product of productInterests) {
      expect(productFromParam(product)).toBe(product);
    }
  });

  it("ignores unknown, empty and missing values", () => {
    expect(productFromParam("bogus")).toBeUndefined();
    expect(productFromParam("Enhance")).toBeUndefined();
    expect(productFromParam("")).toBeUndefined();
    expect(productFromParam(null)).toBeUndefined();
  });
});

describe("ContactHero", () => {
  it("shows the eyebrow, and the headline as the page's h1", () => {
    const html = render(<ContactHero hero={contactEn.hero} />);
    expect(html).toContain(">Contact<");
    expect(html).toMatch(/<h1[^>]*id="contact-hero-title"[^>]*>Let(?:&#x27;|')s talk about your people\.<\/h1>/);
  });
});

describe("ContactSideColumn", () => {
  const { ways, potentia } = contactEn;

  it("links WhatsApp with the default prefilled message, in a new tab, and shows the number", () => {
    const html = render(<ContactSideColumn ways={ways} potentia={potentia} />);
    expect(html).toContain("+62 823-1212-1660");
    expect(html).toContain(
      'href="https://wa.me/6282312121660?text=Halo%20DEUS%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20DEUS."',
    );
    expect(html).toMatch(/<a[^>]*href="https:\/\/wa\.me\/[^"]*"[^>]*target="_blank"/);
    expect(html).toContain("Chat on WhatsApp");
  });

  it("links email and shows the address", () => {
    const html = render(<ContactSideColumn ways={ways} potentia={potentia} />);
    expect(html).toContain("admin@deushcs.com");
    expect(html).toContain('href="mailto:admin@deushcs.com"');
    expect(html).toContain("Send an email");
  });

  it("sends the Potentia link with its UTM tags, and draws one arrow only", () => {
    const html = render(<ContactSideColumn ways={ways} potentia={potentia} />);
    expect(html).toContain('href="https://deuspotentia.com/?utm_source=deushcs.com&amp;utm_medium=referral"');
    expect(html).toContain("Visit Potentia (in Indonesian)");
    expect(html).not.toContain("↗");
  });

  it("shows no office address when the page passes none, and the content has none to pass", () => {
    const html = render(<ContactSideColumn ways={ways} potentia={potentia} />);
    expect(html).not.toContain("Office");
    expect(contactEn.office).toBeUndefined();
  });

  it("shows the office label and its lines when the page passes them", () => {
    const html = render(
      <ContactSideColumn ways={ways} potentia={potentia} office={{ label: "Office", lines: ["Street 1", "Jakarta"] }} />,
    );
    expect(html).toContain("Office");
    expect(html).toContain("Street 1");
    expect(html).toContain("Jakarta");
  });
});
