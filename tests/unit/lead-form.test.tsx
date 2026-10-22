import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";
import { enhanceEn } from "@/content/en/enhance";

// next-intl's navigation needs the Next router; a plain anchor is enough for markup tests.
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href}`} {...props} />
  ),
  usePathname: () => "/contact",
}));
// The real action reaches for the database and request headers.
vi.mock("@/lib/leads/actions", () => ({ submitLead: vi.fn() }));

const { LeadForm, LeadFormView } = await import("@/components/forms/LeadForm");

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

const form = enhanceEn.nextStep.form;
const context = { locale: "en", sourcePage: "/contact", utm: { utm_source: "linkedin", utm_medium: "", utm_campaign: "q4" } };
const idle = { status: "idle" as const, values: {} };

/** The opening tag of the form control with this name. */
function control(html: string, name: string) {
  return html.match(new RegExp(`<(?:input|textarea|select)[^>]*name="${name}"[^>]*>`))?.[0];
}

/** The opening tag of the radio with this name and value. */
function radio(html: string, name: string, value: string) {
  return html.match(new RegExp(`<input[^>]*type="radio"[^>]*name="${name}"[^>]*value="${value}"[^>]*>`))?.[0] ?? "";
}

describe("LeadForm, contact variant", () => {
  const html = render(<LeadForm variant="contact" />);

  it("posts the fields the server reads, under the names the server reads", () => {
    for (const name of [
      "name", "email", "company", "role", "whatsapp", "productInterest", "size", "coverage", "message", "consent",
    ]) {
      expect(control(html, name), name).toBeTruthy();
    }
    expect(control(html, "sites")).toBeUndefined();
    expect(html).toMatch(/<input[^>]*name="formType"[^>]*value="contact"/);
  });

  it("carries the page context as hidden fields", () => {
    expect(html).toMatch(/<input[^>]*type="hidden"[^>]*name="locale"[^>]*value="en"/);
    expect(html).toMatch(/<input[^>]*type="hidden"[^>]*name="sourcePage"[^>]*value="\/contact"/);
    for (const name of ["utm_source", "utm_medium", "utm_campaign"]) {
      expect(html).toMatch(new RegExp(`<input[^>]*type="hidden"[^>]*name="${name}"`));
    }
  });

  it("hides the honeypot from people, keyboards and screen readers", () => {
    const tag = control(html, "referral_code");
    expect(tag).toMatch(/tabindex="-1"/i);
    expect(tag).toMatch(/autoComplete="off"/i);
    expect(html).toMatch(/<div aria-hidden="true"[^>]*><input[^>]*name="referral_code"/);
  });

  it("uses the contact copy and a privacy link in the consent label", () => {
    expect(html).toContain("Send message");
    expect(html).toContain("Work email");
    expect(html).toContain("How many candidates or employees would this cover?");
    expect(html).toMatch(/<a [^>]*href="\/en\/privacy"[^>]*target="_blank"[^>]*><span>Privacy policy/);
  });

  it("marks what's required for the browser and what's optional for the visitor", () => {
    for (const name of ["name", "email", "company", "role", "productInterest", "size", "consent"]) {
      expect(control(html, name), name).toMatch(/required=""/);
    }
    for (const name of ["whatsapp", "coverage", "message"]) {
      expect(control(html, name), name).not.toMatch(/required=""/);
    }
    expect(html.match(/\(optional\)/g)).toHaveLength(3);
  });

  it("preselects the product from defaultProduct", () => {
    const picked = render(<LeadForm variant="contact" defaultProduct="enhance" />);
    expect(radio(picked, "productInterest", "enhance")).toMatch(/checked=""/);
    expect(radio(picked, "productInterest", "gba")).not.toMatch(/checked/);
    expect(html).not.toMatch(/type="radio"[^>]*name="productInterest"[^>]*checked=""/);
  });
});

describe("LeadForm, Enhance variant", () => {
  const html = render(<LeadForm variant="enhance" enhance={form} />);

  it("posts the Enhance fields and no contact-only ones", () => {
    for (const name of ["name", "email", "company", "role", "whatsapp", "size", "sites", "tracking", "cycle", "message", "consent"]) {
      expect(control(html, name), name).toBeTruthy();
    }
    expect(control(html, "productInterest")).toBeUndefined();
    expect(control(html, "coverage")).toBeUndefined();
    expect(html).toMatch(/<input[^>]*name="formType"[^>]*value="enhance"/);
  });

  it("offers the choices from the content and the company sizes from messages", () => {
    expect(radio(html, "sites", "6-plus")).toBeTruthy();
    expect(html).toContain("Not formally yet");
    expect(html).toContain("Management / Leadership");
    expect(radio(html, "size", "2000-plus")).toBeTruthy();
    expect(html).toContain(form.fields.employees);
  });

  it("requires role and employees, and leaves the rest optional", () => {
    for (const name of ["name", "email", "company", "role", "size", "consent"]) {
      expect(control(html, name), name).toMatch(/required=""/);
    }
    for (const name of ["whatsapp", "sites", "tracking", "cycle", "message"]) {
      expect(control(html, name), name).not.toMatch(/required=""/);
    }
  });

  it("uses the Enhance button", () => {
    expect(html).toContain(form.submit);
    expect(html).not.toContain("Send message");
  });
});

describe("LeadFormView states", () => {
  const view = (state: ComponentProps<typeof LeadFormView>["state"], extra: { pending?: boolean } = {}) =>
    render(<LeadFormView variant="contact" state={state} pending={false} context={context} {...extra} />);

  it("fills the hidden UTM fields from the URL", () => {
    const html = view(idle);
    expect(html).toMatch(/name="utm_source"[^>]*value="linkedin"/);
    expect(html).toMatch(/name="utm_campaign"[^>]*value="q4"/);
  });

  it("while sending: a busy, disabled button that says Sending… and read-only text fields", () => {
    const html = view(idle, { pending: true });
    expect(html).toMatch(/<button(?=[^>]*aria-busy="true")(?=[^>]*disabled="")[^>]*>[^]*Sending…/);
    expect(control(html, "name")).toMatch(/readOnly=""/);
    expect(html).not.toContain("Send message");
  });

  it("shows each field error under its field, linked to the control", () => {
    const html = view({
      status: "error",
      values: { name: "", email: "ana@" },
      fieldErrors: {
        name: "ContactForm.errors.name",
        email: "ContactForm.errors.email",
        consent: "ContactForm.errors.consent",
      },
    });
    expect(html).toContain("Please enter your name.");
    expect(html).toContain("Please enter a valid work email, like name@company.com.");
    expect(html).toContain("Please tick the box so we can contact you.");
    expect(control(html, "email")).toMatch(/aria-invalid="true"/);
    expect(control(html, "email")).toMatch(/aria-describedby="[^"]+-error"/);
    expect(control(html, "company")).not.toMatch(/aria-invalid="/);
  });

  it("gives the phone field a phone keyboard and shows its error (F80)", () => {
    const html = view({
      status: "error",
      values: { whatsapp: "call me" },
      fieldErrors: { whatsapp: "ContactForm.errors.whatsapp" },
    });
    const phone = control(html, "whatsapp");
    expect(phone).toMatch(/type="tel"/);
    expect(phone).toMatch(/inputMode="tel"/);
    expect(phone).toMatch(/autoComplete="tel"/);
    expect(phone).toMatch(/aria-invalid="true"/);
    expect(html).toContain("Please enter a valid phone number, digits only.");
  });

  it("keeps what the visitor typed when the server sends it back with errors", () => {
    const html = view({
      status: "error",
      values: { name: "Ana", email: "ana@", message: "Hiring 300", productInterest: "gba", consent: "on" },
      fieldErrors: { email: "ContactForm.errors.email" },
    });
    expect(control(html, "name")).toMatch(/value="Ana"/);
    expect(html).toMatch(/<textarea[^>]*name="message"[^>]*>Hiring 300<\/textarea>/);
    expect(radio(html, "productInterest", "gba")).toMatch(/checked=""/);
    expect(control(html, "consent")).toMatch(/checked=""/);
  });

  it("shows the form-level error above the button, and keeps the form", () => {
    const html = view({ status: "error", values: {}, formError: "ContactForm.errors.server" });
    expect(html).toMatch(/role="alert"[^]*Something went wrong on our side/);
    expect(html).toContain("<form");
    expect(html.indexOf("Something went wrong")).toBeLessThan(html.indexOf("Send message"));
  });

  it("on success replaces the form with the thank-you and a WhatsApp link", () => {
    const html = view({ status: "success", values: { productInterest: "gba" } });
    expect(html).not.toContain("<form");
    expect(html).toContain("Thank you. We&#x27;ve got your message.");
    expect(html).toContain("In a hurry?");
    expect(html).toMatch(/<a [^>]*href="https:\/\/wa\.me\/6282312121660\?text=[^"]*"[^>]*>[^]*Chat with us on WhatsApp/);
    expect(html).toContain(encodeURIComponent("asesmen berbasis game"));
  });

  it("the Enhance success uses the Enhance message and the Enhance WhatsApp text", () => {
    const html = render(
      <LeadFormView variant="enhance" enhance={form} state={{ status: "success", values: {} }} pending={false} context={context} />,
    );
    expect(html).toContain(form.success.replace("'", "&#x27;"));
    expect(html).toContain(encodeURIComponent("DEUS Enhance"));
  });
});
