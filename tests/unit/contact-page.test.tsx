import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";
import { ContactSide } from "@/components/contact/ContactBlocks";
import { contactEn } from "@/content/en/contact";
import { siteFlags } from "@/content/flags";
import { productFromQuery } from "@/lib/leads/schema";

// Task 1.7: what the Contact page adds to the pieces it reuses: the `?product=` rule and the side
// column. The page's behaviour (form, preselection, no-JS, phone) is in tests/e2e/contact.spec.ts.

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href}`} {...props} />
  ),
}));

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

describe("productFromQuery", () => {
  it("accepts each product the form offers", () => {
    for (const value of ["gba", "enhance", "not-sure"]) {
      expect(productFromQuery(value)).toBe(value);
    }
  });

  it("sends the old module values, from links made before R2, to Game-Based Assessment", () => {
    expect(productFromQuery("discover")).toBe("gba");
    expect(productFromQuery("next-chapter")).toBe("gba");
  });

  it("ignores unknown and missing values", () => {
    expect(productFromQuery("pricing")).toBeUndefined();
    expect(productFromQuery("ENHANCE")).toBeUndefined();
    expect(productFromQuery("")).toBeUndefined();
    expect(productFromQuery(null)).toBeUndefined();
    expect(productFromQuery(undefined)).toBeUndefined();
  });
});

describe("ContactSide", () => {
  const side = (showAddress: boolean, ways = contactEn.ways) =>
    render(<ContactSide ways={ways} potentia={contactEn.potentia} showAddress={showAddress} />);

  it("links WhatsApp with the default message, the email, and Potentia in a new tab", () => {
    const html = side(false);
    expect(html).toContain("+62 823-1212-1660");
    expect(html).toContain('href="https://wa.me/6282312121660?text=Halo%20DEUS%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20DEUS."');
    expect(html).toContain('href="mailto:admin@deushcs.com"');
    expect(html).toContain("Visit Potentia (in Indonesian)");
    expect(html).toMatch(/href="https:\/\/deuspotentia\.com\/\?utm_source=deushcs\.com&amp;utm_medium=referral"[^>]*target="_blank"/);
  });

  it("keeps the office address out while the flag is off, even if the content has one", () => {
    expect(siteFlags.showAddress).toBe(false);
    const ways = { ...contactEn.ways, address: { label: "Office", value: "Jl. Example 1, Jakarta" } };
    expect(side(false, ways)).not.toContain("Jl. Example 1");
    expect(side(true, ways)).toContain("Jl. Example 1, Jakarta");
  });

  it("shows no address card when the flag is on but no address has been supplied", () => {
    expect(side(true)).not.toContain("Office");
  });
});
