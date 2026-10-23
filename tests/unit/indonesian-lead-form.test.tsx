import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/id.json";

// Task G4.1: the contact form with the Indonesian messages: labels, the field errors the server sends back
// (browsers block an empty required field first, so an end-to-end test can't reach them) and the thank-you.

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href}`} {...props} />
  ),
  usePathname: () => "/contact",
}));
vi.mock("@/lib/leads/actions", () => ({ submitLead: vi.fn() }));

const { LeadFormView } = await import("@/components/forms/LeadForm");

const context = { locale: "id", sourcePage: "/contact", utm: { utm_source: "", utm_medium: "", utm_campaign: "" } };
const view = (state: ComponentProps<typeof LeadFormView>["state"]) =>
  renderToStaticMarkup(
    <NextIntlClientProvider locale="id" messages={messages}>
      <LeadFormView variant="contact" state={state} pending={false} context={context} />
    </NextIntlClientProvider>,
  );

describe("LeadForm in Indonesian", () => {
  it("labels the fields and the button in Indonesian and sends the locale", () => {
    const html = view({ status: "idle", values: {} });
    for (const text of ["Nama lengkap", "Email kantor", "Jabatan Anda", "Anda tertarik pada layanan apa?", "Belum yakin", "Kirim pesan"]) {
      expect(html, text).toContain(text);
    }
    expect(html).toMatch(/<input[^>]*type="hidden"[^>]*name="locale"[^>]*value="id"/);
    expect(html).not.toContain("Send message");
  });

  it("shows the server's field errors in Indonesian", () => {
    const html = view({
      status: "error",
      values: { name: "" },
      fieldErrors: { name: "ContactForm.errors.name", consent: "ContactForm.errors.consent" },
    });
    expect(html).toContain("Silakan isi nama Anda.");
    expect(html).toContain("Silakan centang kotak ini agar kami bisa menghubungi Anda.");
    expect(html).not.toContain("Please");
  });

  it("thanks the visitor in Indonesian", () => {
    const html = view({ status: "success", values: {} } as ComponentProps<typeof LeadFormView>["state"]);
    expect(html).toContain("Terima kasih. Pesan Anda sudah kami terima.");
    expect(html).toContain("Chat dengan kami lewat WhatsApp");
  });
});
