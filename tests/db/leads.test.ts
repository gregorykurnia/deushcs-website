import { randomUUID } from "node:crypto";
import { eq, like } from "drizzle-orm";
import { afterAll, describe, expect, it } from "vitest";
import { getDb } from "@/db/client";
import { leads, type NewLead } from "@/db/schema";

// Runs only against the Neon `test` branch, via `.env.test` (`npm test`).
// Skipped until Task 0.1 creates that file.
const hasDb = Boolean(process.env.DATABASE_URL_POOLED);

// Every row this file inserts uses this email domain, so cleanup can't touch
// anything else.
const run = randomUUID();
const testEmail = (label: string) => `${label}.${run}@leads-test.invalid`;

function sampleLead(overrides: Partial<NewLead> = {}): NewLead {
  return {
    locale: "en",
    sourcePage: "/en/contact",
    formType: "contact",
    name: "Test Person",
    company: "Test Company",
    email: testEmail("lead"),
    consentAt: new Date(),
    ipHash: "test-ip-hash",
    ...overrides,
  };
}

function pgErrorCode(error: unknown): string | undefined {
  const e = error as { code?: string; cause?: { code?: string } };
  return e.cause?.code ?? e.code;
}

describe.skipIf(!hasDb)("leads table", () => {
  afterAll(async () => {
    await getDb()
      .delete(leads)
      .where(like(leads.email, `%.${run}@leads-test.invalid`));
  });

  it("inserts and reads back a lead on the test branch", async () => {
    const db = getDb();
    const extra = { sites: "3", trackingToday: "spreadsheet", nextCycle: "Q1" };
    const [inserted] = await db
      .insert(leads)
      .values(
        sampleLead({
          email: testEmail("readback"),
          formType: "enhance",
          productInterest: "enhance",
          extra,
          utmSource: "linkedin",
        }),
      )
      .returning();

    const [row] = await db.select().from(leads).where(eq(leads.id, inserted.id));

    expect(row.email).toBe(testEmail("readback"));
    expect(row.formType).toBe("enhance");
    expect(row.extra).toEqual(extra);
    expect(row.utmSource).toBe("linkedin");
    expect(row.status).toBe("new");
    expect(row.createdAt).toBeInstanceOf(Date);
    expect(row.role).toBeNull();
  });

  it("defaults extra to an empty object", async () => {
    const [row] = await getDb()
      .insert(leads)
      .values(sampleLead({ email: testEmail("defaults") }))
      .returning();

    expect(row.extra).toEqual({});
  });

  it("rejects form_type 'other' (check constraint)", async () => {
    const error = await getDb()
      .insert(leads)
      .values(
        sampleLead({
          email: testEmail("bad-form-type"),
          formType: "other" as NewLead["formType"],
        }),
      )
      .then(
        () => undefined,
        (e: unknown) => e,
      );

    expect(pgErrorCode(error)).toBe("23514");
  });

  it("rejects status 'archived' (check constraint)", async () => {
    const error = await getDb()
      .insert(leads)
      .values(
        sampleLead({
          email: testEmail("bad-status"),
          status: "archived" as NewLead["status"],
        }),
      )
      .then(
        () => undefined,
        (e: unknown) => e,
      );

    expect(pgErrorCode(error)).toBe("23514");
  });
});
