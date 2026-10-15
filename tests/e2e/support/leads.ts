import { randomBytes, randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import type { Page } from "@playwright/test";
import { getDb } from "@/db/client";
import { leads } from "@/db/schema";

// Helpers for the specs that send a real lead (Task 1.9). The built site and these helpers both
// use the Neon `test` database (playwright.config.ts loads `.env.test`), and every row a run
// creates has an email on `e2e.invalid`, so cleanup can't touch anything else.

const run = randomUUID();
const DOMAIN = "e2e.invalid";

/** An address no real person has, unique to this run and label. */
export const e2eEmail = (label: string) => `${label}.${run}@${DOMAIN}`;

/**
 * Gives the page its own visitor IP, so the rate limit (5 leads per IP in 10 minutes) never
 * carries over between tests or runs. The form's request goes through the browser, so the
 * header reaches the server action like a proxy's would.
 */
export async function useOwnIp(page: Page) {
  const ip = `2001:db8::${randomBytes(6).toString("hex").match(/.{4}/g)!.join(":")}`;
  await page.setExtraHTTPHeaders({ "x-forwarded-for": ip });
}

export async function leadsFor(email: string) {
  return getDb().select().from(leads).where(eq(leads.email, email));
}

/** Removes the rows a test made, so the `test` database doesn't fill up. */
export async function deleteLeadsFor(email: string) {
  await getDb().delete(leads).where(eq(leads.email, email));
}
