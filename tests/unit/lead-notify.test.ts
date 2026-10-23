import { describe, expect, it } from "vitest";
import type { Lead } from "@/db/schema";
import { buildLeadEmail, notifyRecipients } from "@/lib/leads/notify";

const lead: Lead = {
  id: "6f1c1d2e-0000-4000-8000-000000000001",
  createdAt: new Date("2026-10-15T03:05:00Z"),
  locale: "en",
  sourcePage: "/en/solutions/enhance",
  formType: "enhance",
  productInterest: "enhance",
  name: "Dewi Lestari",
  company: "PT Contoh\r\nBcc: someone@example.com",
  email: "dewi@example.co.id",
  role: "finance",
  whatsapp: "+62 812 0000 0000",
  size: "2000-plus",
  message: "We run appraisals in March.",
  extra: { sites: "2-5", trackingToday: "spreadsheets", nextCycle: "within-3-months" },
  consentAt: new Date("2026-10-15T03:05:00Z"),
  utmSource: "linkedin",
  utmMedium: null,
  utmCampaign: null,
  ipHash: "a".repeat(64),
  status: "new",
};

describe("lead notification email (Task 1.2)", () => {
  it("uses the subject 'New lead: <form_type> · <company>', on one line", () => {
    expect(buildLeadEmail(lead).subject).toBe(
      "New lead: enhance · PT Contoh Bcc: someone@example.com",
    );
  });

  it("flags a lead the database didn't save", () => {
    expect(buildLeadEmail(lead, { saved: false }).subject).toMatch(/^\[Not saved\] New lead: /);
    expect(buildLeadEmail(lead, { saved: false }).text).toContain("could not be saved");
  });

  it("lists the lead with readable labels, in Jakarta time, without the IP hash", () => {
    const { text } = buildLeadEmail(lead);

    expect(text).toContain("Name: Dewi Lestari");
    expect(text).toContain("Work email: dewi@example.co.id");
    expect(text).toContain("Role: Finance");
    expect(text).toContain("Company size: 2,000+");
    expect(text).toContain("Sites or plants: 2–5");
    expect(text).toContain("Tracks performance today: Spreadsheets");
    expect(text).toContain("Next appraisal cycle: Within 3 months");
    expect(text).toContain("We run appraisals in March.");
    expect(text).toContain("Campaign: linkedin");
    expect(text).toContain("10:05");
    expect(text).not.toContain("a".repeat(64));
    expect(text).not.toContain("WhatsApp: null");
  });

  it("adds the visit's first page and referring site under Page:, each only when it has one (§S10)", () => {
    const withVisit = { ...lead, extra: { ...lead.extra, landingPage: "/solutions/game-based-assessment", referrer: "chatgpt.com" } };
    const lines = buildLeadEmail(withVisit).text.split("\n");
    const page = lines.findIndex((l) => l.startsWith("Page: "));
    expect(lines.slice(page, page + 3)).toEqual([
      "Page: /en/solutions/enhance (en)",
      "First page: /solutions/game-based-assessment",
      "Came from: chatgpt.com",
    ]);

    const text = buildLeadEmail(lead).text;
    expect(text).not.toContain("First page:");
    expect(text).not.toContain("Came from:");
    const onlyReferrer = buildLeadEmail({ ...lead, extra: { referrer: "www.google.com" } }).text;
    expect(onlyReferrer).toContain("Came from: www.google.com");
    expect(onlyReferrer).not.toContain("First page:");
  });

  it("sends to LEAD_NOTIFY_TO, defaulting to admin@deushcs.com (Q15)", () => {
    expect(notifyRecipients(undefined)).toEqual(["admin@deushcs.com"]);
    expect(notifyRecipients("a@deushcs.com, b@deushcs.com")).toEqual([
      "a@deushcs.com",
      "b@deushcs.com",
    ]);
  });
});
