import { describe, expect, it } from "vitest";
import { contactEn } from "@/content/en/contact";
import { enhanceEn } from "@/content/en/enhance";
import { siteFlags } from "@/content/flags";
import { localesFor, resolvePage } from "@/content/registry";

describe("English page content (Task 1.1)", () => {
  it("serves Enhance and Contact in English only, until Phase 6", () => {
    expect(localesFor("enhance")).toEqual(["en"]);
    expect(localesFor("contact")).toEqual(["en"]);
    expect(resolvePage("enhance", "id")).toEqual({
      kind: "redirect",
      locale: "en",
      path: "/solutions/enhance",
    });
  });

  it("shows the answered FAQ items, G1.6's buyer questions included, and holds back the VERIFY ones", () => {
    expect(enhanceEn.faq.items.map((item) => item.question)).toEqual([
      "What is DEUS Enhance and who is it for?",
      "Do we have to replace our HRIS or payroll system?",
      "Can we use our own KPIs and competencies?",
      "We don't have a proper KPI framework yet. Is that a problem?",
      "Does it work if we have several plants or branches?",
      "How does Enhance connect performance to pay?",
      "How do we get started?",
      "What support do we get after go-live?",
      "How does calibration work in Enhance?",
      "Can Enhance replace our appraisal spreadsheets?",
      "What does talent mapping in Enhance show?",
    ]);
  });

  it("keeps Better together hidden while showBetterTogether is off", () => {
    expect(siteFlags.showBetterTogether).toBe(false);
    expect(enhanceEn.betterTogether).toBeNull();
  });

  it("stores the select values the lead schema expects (extra.sites is '2-5')", () => {
    expect(enhanceEn.nextStep.form.choices.sites.map((choice) => choice.value)).toEqual([
      "1",
      "2-5",
      "6-plus",
    ]);
  });

  it("leaves the site name to pageMetadata, so the Enhance SEO title has no suffix", () => {
    expect(enhanceEn.meta.title).toBe("DEUS Enhance: Performance Appraisal and KPI Platform");
  });

  it("sends the Potentia link with the UTM tags", () => {
    expect(contactEn.potentia.cta.href).toBe(
      "https://deuspotentia.com/?utm_source=deushcs.com&utm_medium=referral",
    );
  });

  it("leaves no Markdown notes or [VERIFY] placeholders in the copy", () => {
    expect(JSON.stringify([enhanceEn, contactEn])).not.toMatch(/VERIFY|Note:/);
  });

  it("leaves the office address and business hours out until the owner confirms them", () => {
    expect(JSON.stringify(contactEn)).not.toMatch(/Office|Hours|Address/);
  });
});
