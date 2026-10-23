import { z } from "zod";
import type { Lead } from "@/db/schema";
import { defaultLocale, locales, type Locale } from "@/i18n/routing";
import { isHostName, isPagePath } from "@/lib/visit-source";

// Validation for the two lead forms: the contact form (`global.md` "Contact
// form") and the Enhance form (ENHANCE-PAGE-SPEC.md §11). The server only
// requires what has an error message in messages `ContactForm.errors`. Other
// required fields (the Enhance role and size) are marked `required` in the form
// itself: a lead that arrives without them is still worth keeping.

/** Stored `product_interest` values. `discover` and `next-chapter` are no longer offered (F10, task
 *  R2), but stay valid so leads already stored with them still read correctly (no migration). */
export const productInterests = ["discover", "next-chapter", "gba", "enhance", "not-sure"] as const;
export type ProductInterest = (typeof productInterests)[number];

/** The choices the contact form offers, in order. Labels: messages `ContactForm.productInterest`. */
export const productChoices = ["gba", "enhance", "not-sure"] as const satisfies readonly ProductInterest[];
export type ProductChoice = (typeof productChoices)[number];

/** The product in the contact page's `?product=`, or nothing for a missing or unknown value. The old
 *  module values, from links made before R2, choose Game-Based Assessment, which holds them now. */
export function productFromQuery(value: string | null | undefined): ProductChoice | undefined {
  if (value === "discover" || value === "next-chapter") return "gba";
  return value && (productChoices as readonly string[]).includes(value) ? (value as ProductChoice) : undefined;
}

/** Stored `size` values, for both forms. Labels: messages `ContactForm.size`. */
export const companySizes = ["under-100", "100-499", "500-1999", "2000-plus"] as const;

/** Enhance-only choices. Labels: `enhanceEn.nextStep.form.choices`. */
export const enhanceRoles = ["hr", "finance", "operations", "leadership", "other"] as const;
export const enhanceSites = ["1", "2-5", "6-plus"] as const;
export const enhanceTracking = ["spreadsheets", "hris-module", "other-software", "not-formally"] as const;
export const enhanceCycles = ["within-3-months", "3-6-months", "later"] as const;

/** The hidden field bots fill and people never see. Any value means spam. */
export const HONEYPOT_FIELD = "referral_code";

/** Every field name the forms post, so `LeadForm` and the server agree. */
export const leadFields = [
  "name",
  "email",
  "company",
  "role",
  "whatsapp",
  "productInterest",
  "size",
  "coverage",
  "message",
  "consent",
  "sites",
  "tracking",
  "cycle",
] as const;
export type LeadField = (typeof leadFields)[number];

/** Hidden fields `LeadForm` fills from the page, its URL and the visit's first page (`VisitSource`). */
export const leadContextFields = [
  "formType",
  "locale",
  "sourcePage",
  "landingPage",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;

export const leadErrorKeys = [
  "ContactForm.errors.name",
  "ContactForm.errors.email",
  "ContactForm.errors.company",
  "ContactForm.errors.whatsapp",
  "ContactForm.errors.productInterest",
  "ContactForm.errors.consent",
  "ContactForm.errors.server",
] as const;
/** A full messages key, so the form can show it with `useTranslations()`. */
export type LeadMessageKey = (typeof leadErrorKeys)[number];

/** What the visitor typed, sent back with every result so an error never empties the form. */
export type LeadFormValues = Partial<Record<LeadField, string>>;

export type LeadFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Partial<Record<LeadField, LeadMessageKey>>;
  formError?: LeadMessageKey;
  values?: LeadFormValues;
};

export const initialLeadFormState: LeadFormState = { status: "idle" };

/** The columns a submission fills. The action adds `ip_hash`; the database adds the rest. */
export type LeadValues = Omit<Lead, "id" | "createdAt" | "status" | "ipHash">;

export type ParsedLead =
  | { ok: true; lead: LeadValues }
  | { ok: false; fieldErrors?: LeadFormState["fieldErrors"]; formError?: LeadMessageKey };

// --- Field schemas ---------------------------------------------------------

const MAX_LINE = 200;
const MAX_MESSAGE = 5000;

/** One line of text: whitespace collapsed, so a crafted post can't smuggle newlines into the email. */
const line = z.string().transform((v) => v.replace(/\s+/g, " ").trim());

const requiredLine = (error: LeadMessageKey) =>
  line.pipe(z.string().min(1, { error }).max(MAX_LINE, { error }));

/** Optional text is capped rather than rejected, so an over-long answer never loses the lead. */
const optionalLine = line.transform((v) => v.slice(0, MAX_LINE) || null);
/** The phone field (F80): blank is fine; otherwise only digits, spaces, `+`, `-` and brackets, with
 *  8 to 15 digits (the E.164 range). It rejects instead of capping, because a number with letters
 *  in it is a typo the visitor can fix, and a lead we can't call back is no use. */
const PHONE_CHARS = /^\+?[\d\s\-()]+$/;
export function isValidPhone(value: string): boolean {
  if (!PHONE_CHARS.test(value)) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= 8 && digits <= 15;
}
const optionalPhone = line.pipe(
  z
    .string()
    .refine((v) => v === "" || isValidPhone(v), { error: "ContactForm.errors.whatsapp" })
    .transform((v) => v || null),
);
const optionalText = z.string().transform((v) => v.trim().slice(0, MAX_MESSAGE) || null);

/** A select answer the form never offered is dropped, not an error. */
function optionalChoice<const T extends readonly string[]>(values: T) {
  return z
    .string()
    .transform((v): T[number] | null => ((values as readonly string[]).includes(v) ? v : null));
}

const email = z
  .string()
  .trim()
  .pipe(z.email({ error: "ContactForm.errors.email" }).max(254, { error: "ContactForm.errors.email" }));

const consent = z.enum(["on", "true", "yes", "1"], { error: "ContactForm.errors.consent" });

// Hidden fields. Bad values here are tampering or a bug, never the visitor's
// fault, so they fall back instead of failing the submission.
const locale = z
  .string()
  .transform((v): Locale => ((locales as readonly string[]).includes(v) ? (v as Locale) : defaultLocale));
const sourcePage = z.string().transform((v) => (isPagePath(v) ? v : "/"));
// Where the visit started (§S10). Stored in `extra`, so a bad value is dropped rather than replaced.
const landingPage = z.string().transform((v) => (isPagePath(v) ? v : null));
const referrer = z.string().transform((v) => {
  const host = v.trim().toLowerCase();
  return isHostName(host) ? host : null;
});

const shared = {
  locale,
  sourcePage,
  landingPage,
  referrer,
  name: requiredLine("ContactForm.errors.name"),
  email,
  company: requiredLine("ContactForm.errors.company"),
  whatsapp: optionalPhone,
  size: optionalChoice(companySizes),
  message: optionalText,
  consent,
  utm_source: optionalLine,
  utm_medium: optionalLine,
  utm_campaign: optionalLine,
};

export const contactLeadSchema = z.object({
  ...shared,
  role: optionalLine,
  productInterest: z.enum(productInterests, { error: "ContactForm.errors.productInterest" }),
  coverage: optionalLine,
});

export const enhanceLeadSchema = z.object({
  ...shared,
  role: optionalChoice(enhanceRoles),
  sites: optionalChoice(enhanceSites),
  tracking: optionalChoice(enhanceTracking),
  cycle: optionalChoice(enhanceCycles),
});

// --- Parsing ---------------------------------------------------------------

/** FormData as plain strings: a missing field (or a file) reads as "". */
function readForm(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const key of [...leadFields, ...leadContextFields]) {
    const value = formData.get(key);
    values[key] = typeof value === "string" ? value : "";
  }
  return values;
}

/**
 * The visible fields as posted. React clears an uncontrolled form once its action finishes,
 * success or not, and without script the page is rendered afresh; either way the fields
 * start again from these (`defaultValue`).
 */
export function formValues(formData: FormData): LeadFormValues {
  const values: LeadFormValues = {};
  for (const field of leadFields) {
    const value = formData.get(field);
    if (typeof value === "string") values[field] = value;
  }
  return values;
}

/** True when the honeypot holds anything: the submission is spam. */
export function isHoneypotFilled(formData: FormData): boolean {
  const value = formData.get(HONEYPOT_FIELD);
  return typeof value === "string" ? value.trim() !== "" : value !== null;
}

function fieldErrorsFrom(error: z.ZodError): LeadFormState["fieldErrors"] {
  const fieldErrors: NonNullable<LeadFormState["fieldErrors"]> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as LeadField;
    fieldErrors[field] ??= issue.message as LeadMessageKey;
  }
  return fieldErrors;
}

/** Validates a submission and maps it to `leads` columns. */
export function parseLead(formData: FormData): ParsedLead {
  const values = readForm(formData);
  const consentAt = new Date();

  if (values.formType === "contact") {
    const result = contactLeadSchema.safeParse(values);
    if (!result.success) return { ok: false, fieldErrors: fieldErrorsFrom(result.error) };
    const { coverage, ...v } = result.data;
    const extra: Record<string, string> = {};
    if (coverage) extra.coverage = coverage;
    return {
      ok: true,
      lead: {
        ...common(v, consentAt),
        formType: "contact",
        productInterest: v.productInterest,
        role: v.role,
        extra: { ...extra, ...visitExtra(v) },
      },
    };
  }

  if (values.formType === "enhance") {
    const result = enhanceLeadSchema.safeParse(values);
    if (!result.success) return { ok: false, fieldErrors: fieldErrorsFrom(result.error) };
    const v = result.data;
    const extra: Record<string, string> = {};
    if (v.sites) extra.sites = v.sites;
    if (v.tracking) extra.trackingToday = v.tracking;
    if (v.cycle) extra.nextCycle = v.cycle;
    return {
      ok: true,
      lead: {
        ...common(v, consentAt),
        formType: "enhance",
        productInterest: "enhance",
        role: v.role,
        extra: { ...extra, ...visitExtra(v) },
      },
    };
  }

  return { ok: false, formError: "ContactForm.errors.server" };
}

/** The visit's first page and referring site, for `extra`, each only when it has a value. */
function visitExtra(v: { landingPage: string | null; referrer: string | null }): Record<string, string> {
  const extra: Record<string, string> = {};
  if (v.landingPage) extra.landingPage = v.landingPage;
  if (v.referrer) extra.referrer = v.referrer;
  return extra;
}

function common(
  v: z.infer<z.ZodObject<typeof shared>>,
  consentAt: Date,
): Omit<LeadValues, "formType" | "productInterest" | "role" | "extra"> {
  return {
    locale: v.locale,
    sourcePage: v.sourcePage,
    name: v.name,
    email: v.email,
    company: v.company,
    whatsapp: v.whatsapp,
    size: v.size,
    message: v.message,
    consentAt,
    utmSource: v.utm_source,
    utmMedium: v.utm_medium,
    utmCampaign: v.utm_campaign,
  };
}
