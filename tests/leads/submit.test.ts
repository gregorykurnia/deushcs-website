import { randomBytes, randomUUID } from "node:crypto";
import { eq, like } from "drizzle-orm";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { getDb } from "@/db/client";
import { leads } from "@/db/schema";
import { submitLead as submitWithValues } from "@/lib/leads/actions";
import { sendLeadNotification } from "@/lib/leads/notify";
import { hashIp } from "@/lib/leads/rate-limit";
import { HONEYPOT_FIELD, type LeadFormState } from "@/lib/leads/schema";

/** The action's outcome without the echoed `values`, so the cases below stay exact. */
async function submitLead(prev: LeadFormState, formData: FormData) {
  const outcome = await submitWithValues(prev, formData);
  delete outcome.values;
  return outcome;
}

// The visitor's IP, as the proxy would pass it. Each test sets its own, so the
// rate limit never carries over between tests, test runs or lanes.
let clientIp = "";
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": `${clientIp}, 10.0.0.1` }),
}));
vi.mock("@/lib/leads/notify", () => ({ sendLeadNotification: vi.fn(async () => {}) }));

// Runs against the Neon `test` database via `.env.test` (`npm test`). The
// validation tests return before any query, so they also run without it.
const hasDb = Boolean(process.env.DATABASE_URL_POOLED);

// Every row this file inserts uses this email domain, so cleanup can't touch
// anything else.
const run = randomUUID();
const testEmail = (label: string) => `${label}.${run}@leads-test.invalid`;
const idle: LeadFormState = { status: "idle" };

function freshIp() {
  return `2001:db8::${randomBytes(6).toString("hex").match(/.{4}/g)!.join(":")}`;
}

function contactForm(overrides: Record<string, string | null> = {}) {
  const fields: Record<string, string | null> = {
    formType: "contact",
    locale: "en",
    sourcePage: "/en/contact",
    name: "Test Person",
    email: testEmail("contact"),
    company: "PT Test Company",
    role: "HR Manager",
    productInterest: "gba",
    size: "500-1999",
    message: "We're hiring 300 Management Trainees in March.",
    consent: "on",
    [HONEYPOT_FIELD]: "",
    ...overrides,
  };
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value !== null) formData.set(key, value);
  }
  return formData;
}

function enhanceForm(overrides: Record<string, string | null> = {}) {
  return contactForm({
    formType: "enhance",
    sourcePage: "/en/solutions/enhance",
    email: testEmail("enhance"),
    role: "finance",
    productInterest: null,
    size: "2000-plus",
    sites: "2-5",
    tracking: "spreadsheets",
    cycle: "within-3-months",
    message: null,
    utm_source: "linkedin",
    utm_medium: "social",
    ...overrides,
  });
}

async function rowsFor(email: string) {
  return getDb().select().from(leads).where(eq(leads.email, email));
}

beforeEach(() => {
  clientIp = freshIp();
  vi.mocked(sendLeadNotification).mockClear();
});

describe("submitLead: validation (Task 1.2)", () => {
  it("rejects an invalid email", async () => {
    const state = await submitLead(idle, contactForm({ email: "not-an-email" }));

    expect(state.status).toBe("error");
    expect(state.fieldErrors?.email).toBe("ContactForm.errors.email");
    expect(sendLeadNotification).not.toHaveBeenCalled();
  });

  it("requires consent", async () => {
    const state = await submitLead(idle, contactForm({ consent: null }));

    expect(state.status).toBe("error");
    expect(state.fieldErrors?.consent).toBe("ContactForm.errors.consent");
  });
});

describe.skipIf(!hasDb)("submitLead: saving (Task 1.2)", () => {
  afterAll(async () => {
    await getDb()
      .delete(leads)
      .where(like(leads.email, `%.${run}@leads-test.invalid`));
  });

  it("honeypot filled", async () => {
    const email = testEmail("honeypot");
    const state = await submitLead(
      idle,
      contactForm({ email, [HONEYPOT_FIELD]: "https://spam.example" }),
    );

    expect(state).toEqual({ status: "success" });
    expect(await rowsFor(email)).toHaveLength(0);
    expect(sendLeadNotification).not.toHaveBeenCalled();
  });

  it("sixth submission from one ip in 10 minutes", async () => {
    const email = testEmail("rate-limit");
    for (let i = 0; i < 5; i++) {
      expect(await submitLead(idle, contactForm({ email }))).toEqual({ status: "success" });
    }

    const sixth = await submitLead(idle, contactForm({ email }));

    expect(sixth.status).toBe("error");
    expect(sixth.formError).toBe("ContactForm.errors.server");
    const rows = await rowsFor(email);
    expect(rows).toHaveLength(5);
    expect(rows.every((row) => row.ipHash === hashIp(clientIp))).toBe(true);
  });

  it("saves an Enhance lead", async () => {
    const email = testEmail("enhance-saved");
    const before = Date.now();
    const state = await submitLead(idle, enhanceForm({ email }));

    expect(state).toEqual({ status: "success" });
    const [row] = await rowsFor(email);
    expect(row).toMatchObject({
      formType: "enhance",
      productInterest: "enhance",
      locale: "en",
      sourcePage: "/en/solutions/enhance",
      name: "Test Person",
      company: "PT Test Company",
      role: "finance",
      size: "2000-plus",
      message: null,
      utmSource: "linkedin",
      utmMedium: "social",
      utmCampaign: null,
      status: "new",
    });
    expect(row.extra).toEqual({
      sites: "2-5",
      trackingToday: "spreadsheets",
      nextCycle: "within-3-months",
    });
    expect(row.consentAt.getTime()).toBeGreaterThanOrEqual(before - 1000);
    expect(row.ipHash).toBe(hashIp(clientIp));
    expect(row.ipHash).not.toContain(clientIp);
    expect(sendLeadNotification).toHaveBeenCalledWith(expect.objectContaining({ id: row.id }));
  });

  it("keeps the lead when notification fails", async () => {
    const email = testEmail("notify-fails");
    vi.mocked(sendLeadNotification).mockRejectedValueOnce(new Error("Resend is down"));
    const log = vi.spyOn(console, "error").mockImplementation(() => {});

    const state = await submitLead(idle, contactForm({ email }));

    expect(state).toEqual({ status: "success" });
    expect(await rowsFor(email)).toHaveLength(1);
    expect(log).toHaveBeenCalled();
    log.mockRestore();
  });
});
