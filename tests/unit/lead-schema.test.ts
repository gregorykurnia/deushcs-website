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
  productChoices,
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
  // no longer offered since R2, but still a valid stored value, so older leads keep reading correctly
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

  it("keeps where the visit started in extra, on both forms (§S10)", () => {
    const visit = { landingPage: "/solutions/game-based-assessment", referrer: "chatgpt.com" };
    const contactLead = parseLead(form({ ...contact, ...visit, coverage: "300" }));
    expect(contactLead.ok && contactLead.lead.extra).toEqual({ coverage: "300", ...visit });
    const enhanceLead = parseLead(form({ ...contact, ...visit, formType: "enhance", sites: "1" }));
    expect(enhanceLead.ok && enhanceLead.lead.extra).toEqual({ sites: "1", ...visit });
  });

  it("stores a referrer as a lower-case host name", () => {
    const result = parseLead(form({ ...contact, referrer: " WWW.Google.com " }));
    expect(result.ok && result.lead.extra).toEqual({ referrer: "www.google.com" });
  });

  it("drops a bad first page or referrer without failing the lead (§S10)", () => {
    for (const [landingPage, referrer] of [
      ["https://evil.example/x", "https://chatgpt.com/c/123"],
      ["//evil.example", "chat gpt"],
      ["/has space", "a@b.com"],
      [`/${"x".repeat(300)}`, `${"a".repeat(250)}.com`],
      ["", ""],
      ["/ok\nBcc: x", "evil.com\nBcc: x"],
      // Phase L review: no query string, fragment or email address in the first page
      ["/contact?email=jane@example.com", ""],
      ["/contact#jane", ""],
      ["/jane@example.com", ""],
      ["/jane%40example.com", ""],
      ["/bad%E0%A4%A", ""],
    ]) {
      const result = parseLead(form({ ...contact, landingPage, referrer }));
      expect(result.ok, `${landingPage} ${referrer}`).toBe(true);
      expect(result.ok && result.lead.extra).toEqual({});
    }
  });

  it("parses a download lead: a GBA contact lead with extra.offer, no role or size needed (§S11)", () => {
    const result = parseLead(form({ ...contact, productInterest: "gba", offer: "gba-sample-report" }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.lead).toMatchObject({ formType: "contact", productInterest: "gba", role: null, size: null, whatsapp: null, message: null });
    expect(result.lead.extra).toEqual({ offer: "gba-sample-report" });
  });

  it("drops an offer the site doesn't make, and keeps the lead (§S11)", () => {
    for (const offer of ["", "other-report", "toString", "__proto__", "gba-sample-report\nBcc: x"]) {
      const result = parseLead(form({ ...contact, offer }));
      expect(result.ok, offer).toBe(true);
      expect(result.ok && result.lead.extra, offer).toEqual({});
    }
    const enhance = parseLead(form({ ...contact, formType: "enhance", offer: "gba-sample-report" }));
    expect(enhance.ok && enhance.lead.extra).toEqual({});
  });

  it("rejects an unknown form type as a server error", () => {
    expect(parseLead(form({ ...contact, formType: "newsletter" }))).toEqual({
      ok: false,
      formError: "ContactForm.errors.server",
    });
  });

  it("accepts a phone number of 8 to 15 digits with spaces, +, dashes and brackets (F80)", () => {
    for (const whatsapp of ["+62 823-1212-1660", "(021) 5555 1234", "08123456789", "+1 (415) 555-0132", "12345678"]) {
      const result = parseLead(form({ ...contact, whatsapp }));
      expect(result.ok && result.lead.whatsapp).toBe(whatsapp);
    }
  });

  it("rejects a phone number with letters, too few or too many digits, with the phone message (F80)", () => {
    for (const whatsapp of ["call me", "0812-abc-4567", "1234567", "1234567890123456", "+", "62+823 1212 1660", "123 4567 x89"]) {
      expect(parseLead(form({ ...contact, whatsapp }))).toEqual({
        ok: false,
        fieldErrors: { whatsapp: "ContactForm.errors.whatsapp" },
      });
    }
  });

  it("checks the phone on the Enhance form too, and a blank one stays null (F80)", () => {
    const enhance = { ...contact, formType: "enhance" };
    expect(parseLead(form({ ...enhance, whatsapp: "hello" })).ok).toBe(false);
    const blank = parseLead(form({ ...enhance, whatsapp: "   " }));
    expect(blank.ok && blank.lead.whatsapp).toBeNull();
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
    expect(Object.keys(messages.ContactForm.productInterest)).toEqual([...productChoices]);
    expect(Object.keys(messages.ContactForm.size)).toEqual([...companySizes]);
  });

  it("only returns error keys that exist in messages", () => {
    const errors: Record<string, string> = messages.ContactForm.errors;
    for (const key of leadErrorKeys) {
      expect(errors[key.replace("ContactForm.errors.", "")]).toBeTruthy();
    }
  });
});
