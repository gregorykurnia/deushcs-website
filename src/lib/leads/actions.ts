"use server";

import { headers } from "next/headers";
import { getDb } from "@/db/client";
import { leads, type Lead } from "@/db/schema";
import { sendLeadNotification } from "./notify";
import { clientIpFrom, hashIp, isRateLimited } from "./rate-limit";
import { isHoneypotFilled, parseLead, type LeadFormState } from "./schema";

// The lead pipeline (plan §5): honeypot → validate → rate limit → insert →
// notify. The row is saved before the email, and a failed email never fails
// the submission. If the database is down, the email carries the lead instead.

const serverError: LeadFormState = { status: "error", formError: "ContactForm.errors.server" };

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  // Spam gets the same thank-you as a person, so bots learn nothing.
  if (isHoneypotFilled(formData)) return { status: "success" };

  const parsed = parseLead(formData);
  if (!parsed.ok) {
    return parsed.formError ? serverError : { status: "error", fieldErrors: parsed.fieldErrors };
  }

  const ipHash = hashIp(clientIpFrom(await headers()));
  const limited = await isRateLimited(ipHash).catch((error: unknown) => {
    logError("rate-limit check failed, letting the lead through", error);
    return false;
  });
  if (limited) return serverError;

  let lead: Lead;
  try {
    [lead] = await getDb()
      .insert(leads)
      .values({ ...parsed.lead, ipHash })
      .returning();
  } catch (error) {
    logError("insert failed, emailing the lead instead", error);
    try {
      const unsaved: Lead = {
        ...parsed.lead,
        ipHash: "",
        id: "not saved",
        createdAt: new Date(),
        status: "new",
      };
      await sendLeadNotification(unsaved, { saved: false });
      return { status: "success" };
    } catch (fallbackError) {
      logError("fallback email failed, the lead is lost", fallbackError);
      return serverError;
    }
  }

  try {
    await sendLeadNotification(lead);
  } catch (error) {
    logError(`notification failed for lead ${lead.id}`, error);
  }
  return { status: "success" };
}

/**
 * Logs what went wrong without the visitor's details. Database errors put the
 * query's parameters (name, email, …) in their message, so only the cause's
 * code and message are logged, never the error itself.
 */
function logError(stage: string, error: unknown) {
  const e = error as { name?: string; message?: string; code?: string; cause?: unknown };
  const cause = e?.cause as { name?: string; message?: string; code?: string } | undefined;
  const detail = cause
    ? { name: cause.name, code: cause.code, message: cause.message }
    : { name: e?.name, code: e?.code, message: e?.message };
  console.error(`[leads] ${stage}`, detail);
}
