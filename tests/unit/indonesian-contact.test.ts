import { describe, expect, it } from "vitest";
import { contactEn } from "@/content/en/contact";
import { contactId } from "@/content/id/contact";
import { createRegistry, getPageContent, localesFor, resolvePage } from "@/content/registry";
import enMessages from "../../messages/en.json";
import idMessages from "../../messages/id.json";

// Task G4.1: Contact in Indonesian, and the `showIndonesianLeadPages` switch the registry obeys (SEO plan §S12).

const source = { contact: { en: contactEn, id: contactId } };
const on = createRegistry(source, () => true);
const off = createRegistry(source, () => false);

describe("Indonesian Contact and the showIndonesianLeadPages switch", () => {
  it("serves /id/contact in Indonesian while the switch is on", () => {
    expect(on.resolvePage("contact", "id")).toEqual({ kind: "ok", locale: "id" });
    expect(on.localesFor("contact")).toEqual(["en", "id"]);
    expect(on.getPageContent("contact", "id")).toBe(contactId);
  });

  it("sends /id/contact to /en/contact while the switch is off, and drops its Indonesian version", () => {
    expect(off.resolvePage("contact", "id")).toEqual({ kind: "redirect", locale: "en", path: "/contact" });
    expect(off.localesFor("contact")).toEqual(["en"]);
    expect(off.getPageContent("contact", "id")).toBeNull();
  });

  it("leaves English alone whatever the switch says", () => {
    expect(off.resolvePage("contact", "en")).toEqual({ kind: "ok", locale: "en" });
  });

  it("registers Contact in both languages in the site registry (the switch is on)", () => {
    expect(localesFor("contact")).toEqual(["en", "id"]);
    expect(resolvePage("contact", "id")).toEqual({ kind: "ok", locale: "id" });
    expect(getPageContent("contact", "id")).toBe(contactId);
  });
});

describe("Indonesian Contact copy", () => {
  const strings = (value: unknown): string[] =>
    typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];

  it("has the same shape as the English page", () => {
    const shape = (value: unknown): unknown =>
      value && typeof value === "object"
        ? Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, shape(inner)]))
        : typeof value;
    expect(shape(contactId)).toEqual(shape(contactEn));
  });

  it("has no English string left, apart from names and contact details", () => {
    const same = strings(contactId).filter((text) => strings(contactEn).includes(text));
    const names = same.filter((text) => !text.startsWith("https://"));
    expect(names.sort()).toEqual(["+62 823-1212-1660", "Email", "WhatsApp", "admin@deushcs.com"]);
  });

  it("uses Anda, never kamu", () => {
    expect(strings(contactId).join(" ")).toMatch(/\bAnda\b/);
    expect(strings(contactId).join(" ")).not.toMatch(/\bkamu\b/i);
  });
});

describe("shared strings in messages/id.json", () => {
  const namespaces = ["Common", "Header", "LanguageSwitch", "Footer", "Closing", "WhatsAppButton", "ContactForm", "DownloadOffer"] as const;
  const flat = (value: unknown, prefix = ""): [string, string][] =>
    typeof value === "string"
      ? [[prefix, value]]
      : Object.entries(value as object).flatMap(([key, inner]) => flat(inner, prefix ? `${prefix}.${key}` : key));

  // names, brands and numbers that read the same in both languages
  const sameInBoth = new Set([
    "Header.wordmark",
    "Header.solutionsMenu.items.gba.title",
    "Header.solutionsMenu.items.enhance.title",
    "Header.solutionsMenu.items.potentia.title",
    "Header.mobileMenu.title",
    "LanguageSwitch.short.en",
    "LanguageSwitch.short.id",
    "LanguageSwitch.name.en",
    "LanguageSwitch.name.id",
    "Footer.label",
    "Footer.company",
    "Footer.whatsapp",
    "Footer.email",
    "Footer.potentia",
    "Footer.legal",
    "Footer.legalEntity",
    "Footer.copyright",
    "Footer.products.gba",
    "Footer.products.enhance",
    "Footer.products.potentia",
    "ContactForm.productInterest.gba",
    "ContactForm.productInterest.enhance",
    "ContactForm.size.100-499",
  ]);

  for (const namespace of namespaces) {
    it(`${namespace}: every English key exists in Indonesian, and is translated`, () => {
      const english = Object.fromEntries(flat({ [namespace]: enMessages[namespace] }));
      const indonesian = Object.fromEntries(flat({ [namespace]: idMessages[namespace] }));
      expect(Object.keys(indonesian).sort()).toEqual(Object.keys(english).sort());
      const untranslated = Object.keys(english).filter((key) => english[key] === indonesian[key] && !sameInBoth.has(key));
      expect(untranslated).toEqual([]);
    });
  }

  it("keeps the placeholders the code fills in", () => {
    expect(idMessages.LanguageSwitch.unavailable).toContain("{language}");
    expect(idMessages.ContactForm.success.bodyWithReplyTime).toContain("{replyTime}");
  });

  it("keeps the closing title's line break marker", () => {
    expect(idMessages.Closing.title).toContain(" / ");
  });
});
