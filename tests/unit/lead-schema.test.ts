import { describe, expect, it } from "vitest";
import { enhanceEn } from "@/content/en/enhance";
import {
  companySizes,
  enhanceCycles,
  enhanceRoles,
  enhanceSites,
  enhanceTracking,
  leadErrorKeys,
  parseLead,
  productInterests,
} from "@/lib/leads/schema";
import messages from "../../messages/en.json";

function form(fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) formData.set(key, value);
  return formData;
}

const contact = {
  formType: "contact",
  locale: "en",
  sourcePage: "/en/contact",
  name: "  Dewi   Lestari ",
  email: " dewi@example.co.id ",
  company: "PT Contoh",
  productInterest: "discover",
  consent: "on",
};

describe("lead form schema (Task 1.2)", () => {
  it("parses a contact lead, trimming text and leaving blanks empty", () => {
    const result = parseLead(form({ ...contact, role: "", message: "  Hello\nthere  " }));

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.lead).toMatchObject({
      formType: "contact",
      locale: "en",
      sourcePage: "/en/contact",
      name: "Dewi Lestari",
      email: "dewi@example.co.id",
      company: "PT Contoh",
      productInterest: "discover",
      role: null,
      whatsapp: null,
      size: null,
      message: "Hello\nthere",
      extra: {},
      utmSource: null,
    });
    expect(result.lead.consentAt).toBeInstanceOf(Date);
  });

  it("reports every missing required contact field with its message key", () => {
    const result = parseLead(form({ formType: "contact", locale: "en", sourcePage: "/en/contact" }));

    expect(result).toEqual({
      ok: false,
      fieldErrors: {
        name: "ContactForm.errors.name",
        email: "ContactForm.errors.email",
        company: "ContactForm.errors.company",
        productInterest: "ContactForm.errors.productInterest",
        consent: "ContactForm.errors.consent",
      },
    });
  });

  it("drops a choice the form never offered instead of rejecting the lead", () => {
    const result = parseLead(
      form({ ...contact, formType: "enhance", size: "huge", sites: "99", role: "ceo" }),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.lead.size).toBeNull();
    expect(result.lead.role).toBeNull();
    expect(result.lead.extra).toEqual({});
  });

  it("always stores Enhance leads as product interest 'enhance'", () => {
    const result = parseLead(form({ ...contact, formType: "enhance", productInterest: "gba" }));

    expect(result.ok && result.lead.productInterest).toBe("enhance");
  });

  it("keeps coverage from the contact form in extra", () => {
    const result = parseLead(form({ ...contact, coverage: "About 300 candidates" }));

    expect(result.ok && result.lead.extra).toEqual({ coverage: "About 300 candidates" });
  });

  it("falls back to safe values for tampered hidden fields", () => {
    const result = parseLead(
      form({ ...contact, locale: "fr", sourcePage: "https://evil.example/x" }),
    );

    expect(result.ok && result.lead.locale).toBe("en");
    expect(result.ok && result.lead.sourcePage).toBe("/");
  });

  it("rejects an unknown form type as a server error", () => {
    expect(parseLead(form({ ...contact, formType: "newsletter" }))).toEqual({
      ok: false,
      formError: "ContactForm.errors.server",
    });
  });

  it("caps long optional text instead of losing the lead", () => {
    const result = parseLead(form({ ...contact, message: "x".repeat(6000) }));

    expect(result.ok && result.lead.message?.length).toBe(5000);
  });
});

describe("lead schema matches the copy (Task 1.2)", () => {
  it("offers the same Enhance choices the page shows", () => {
    const values = (choices: readonly { value: string }[]) => choices.map((c) => c.value);
    const { choices } = enhanceEn.nextStep.form;

    expect(values(choices.role)).toEqual([...enhanceRoles]);
    expect(values(choices.sites)).toEqual([...enhanceSites]);
    expect(values(choices.tracking)).toEqual([...enhanceTracking]);
    expect(values(choices.cycle)).toEqual([...enhanceCycles]);
  });

  it("offers the same product and size choices as messages ContactForm", () => {
    expect(Object.keys(messages.ContactForm.productInterest)).toEqual([...productInterests]);
    expect(Object.keys(messages.ContactForm.size)).toEqual([...companySizes]);
  });

  it("only returns error keys that exist in messages", () => {
    const errors: Record<string, string> = messages.ContactForm.errors;
    for (const key of leadErrorKeys) {
      expect(errors[key.replace("ContactForm.errors.", "")]).toBeTruthy();
    }
  });
});
