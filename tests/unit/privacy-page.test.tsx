import { getTableColumns } from "drizzle-orm";
import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";
import { PrivacyArticle } from "@/components/privacy/PrivacyArticle";
import { privacyEn } from "@/content/en/privacy";
import { getPageContent } from "@/content/registry";
import { leads } from "@/db/schema";
import { RATE_LIMIT } from "@/lib/leads/rate-limit";
import { parseLead } from "@/lib/leads/schema";

// Task 1.8: the privacy policy must describe what the code actually stores (UU PDP). Each `leads`
// column, and each field the forms put in `extra`, maps to a phrase the policy must contain. A new
// column fails "covers every column" until it is mapped here and described in the policy.

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href}`} {...props} />
  ),
}));

const text = [
  ...privacyEn.intro,
  ...privacyEn.sections.flatMap((s) => [s.title, ...(s.body ?? []), ...(s.points ?? []), ...(s.after ?? [])]),
].join("\n");

/** Column (database name) → what the policy calls it. */
const columnPhrases: Record<string, string> = {
  id: "records which form you used", // an internal id; covered by "the website also records"
  created_at: "when it arrived",
  locale: "the language of that page",
  source_page: "the page you sent it from",
  form_type: "which form you used",
  product_interest: "The product you're interested in",
  name: "Your name",
  company: "company",
  email: "work email address",
  role: "Your role",
  whatsapp: "WhatsApp number",
  size: "the size of your company",
  message: "Your message",
  extra: "how many candidates or employees it would cover",
  consent_at: "The time you ticked the box",
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_campaign: "utm_campaign",
  ip_hash: "scrambled code made from your IP address",
  status: "new, contacted or closed",
};

/** The keys stored in `extra`: the contact form's coverage, and the Enhance form's three. */
const extraPhrases: Record<string, string> = {
  coverage: "how many candidates or employees it would cover",
  sites: "how many sites or plants you run",
  trackingToday: "how you track performance today",
  nextCycle: "when your next appraisal cycle starts",
};

/** The `extra` keys a fully filled form of each kind stores, as the action would save them. */
function storedExtraKeys() {
  const filled = (fields: Record<string, string>) => {
    const formData = new FormData();
    const base = { locale: "en", sourcePage: "/", name: "Ana", email: "ana@example.com", company: "PT A", consent: "on" };
    for (const [key, value] of Object.entries({ ...base, ...fields })) formData.set(key, value);
    const parsed = parseLead(formData);
    if (!parsed.ok) throw new Error("the sample lead should be valid");
    return Object.keys(parsed.lead.extra ?? {});
  };
  return [
    ...filled({ formType: "contact", productInterest: "gba", coverage: "300" }),
    ...filled({ formType: "enhance", role: "hr", sites: "2-5", tracking: "spreadsheets", cycle: "later" }),
  ];
}

describe("privacy policy content", () => {
  it("is registered for English", () => {
    expect(getPageContent("privacy", "en")).toBe(privacyEn);
  });

  it("covers every column of the leads table", () => {
    const columns = Object.values(getTableColumns(leads)).map((c) => c.name);
    expect(Object.keys(columnPhrases).sort()).toEqual([...columns].sort());
    for (const phrase of Object.values(columnPhrases)) expect(text).toContain(phrase);
  });

  it("covers every form field stored in extra", () => {
    // a new field saved in `extra` fails here until the policy describes it
    expect(Object.keys(extraPhrases).sort()).toEqual(storedExtraKeys().sort());
    for (const phrase of Object.values(extraPhrases)) expect(text).toContain(phrase);
  });

  it("states the rate limit the code enforces", () => {
    expect(text).toContain(`more than ${RATE_LIMIT.max} messages in ${RATE_LIMIT.windowMinutes} minutes`);
  });

  it("names the controller, the law and the contact address", () => {
    expect(text).toContain("PT Investama Persada Kurnia");
    expect(text).toContain("Law No. 27 of 2022");
    expect(text).toContain("admin@deushcs.com");
  });

  it("gives every section a unique anchor", () => {
    const ids = privacyEn.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z]+(-[a-z]+)*$/);
  });
});

describe("PrivacyArticle", () => {
  const html = renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      <PrivacyArticle content={privacyEn} />
    </NextIntlClientProvider>,
  );

  it("renders one H1, an H2 per section with its anchor, and the bold phrases", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html.match(/<h2/g)).toHaveLength(privacyEn.sections.length);
    expect(html).toContain('id="your-rights"');
    expect(html).toContain('<b class="font-bold text-ink">PT Investama Persada Kurnia</b>');
    expect(html).not.toContain("**");
  });

  it("ends with the email and WhatsApp links", () => {
    expect(html).toContain('href="mailto:admin@deushcs.com"');
    expect(html).toContain('href="https://wa.me/6282312121660?text=');
  });
});
