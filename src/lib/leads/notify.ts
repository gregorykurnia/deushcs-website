import { Resend } from "resend";
import { enhanceEn } from "@/content/en/enhance";
import type { Lead } from "@/db/schema";
import messages from "../../../messages/en.json";

// The email to the sales inbox for each new lead. It goes to DEUS staff, not
// visitors, so it's always in English and plain text (nothing a visitor typed
// is ever rendered as HTML).

const FROM = "DEUS website <leads@notify.deushcs.com>";
const DEFAULT_RECIPIENT = "admin@deushcs.com"; // Q15
const SEND_TIMEOUT_MS = 8000;

/** `LEAD_NOTIFY_TO` as a list (comma-separated), or admin@deushcs.com. */
export function notifyRecipients(value = process.env.LEAD_NOTIFY_TO): string[] {
  const list = (value ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  return list.length ? list : [DEFAULT_RECIPIENT];
}

const { choices } = enhanceEn.nextStep.form;
const labelOf = (options: readonly { value: string; label: string }[], value: unknown) =>
  options.find((o) => o.value === value)?.label ?? String(value);
const productLabels: Record<string, string> = messages.ContactForm.productInterest;
const sizeLabels: Record<string, string> = messages.ContactForm.size;

const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();

const jakartaTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  dateStyle: "medium",
  timeStyle: "short",
});

type NotifyOptions = { saved?: boolean };

export function buildLeadEmail(lead: Lead, { saved = true }: NotifyOptions = {}) {
  const subject = `${saved ? "" : "[Not saved] "}New lead: ${lead.formType} · ${oneLine(lead.company)}`;
  const extra = lead.extra as Record<string, unknown>;
  const enhance = lead.formType === "enhance";

  const rows: [string, unknown][] = [
    ["Name", lead.name],
    ["Work email", lead.email],
    ["Company", lead.company],
    ["Role", enhance && lead.role ? labelOf(choices.role, lead.role) : lead.role],
    ["WhatsApp", lead.whatsapp],
    ["Interested in", lead.productInterest && (productLabels[lead.productInterest] ?? lead.productInterest)],
    ["Company size", lead.size && (sizeLabels[lead.size] ?? lead.size)],
    ["Candidates or employees covered", extra.coverage],
    ["Sites or plants", extra.sites && labelOf(choices.sites, extra.sites)],
    ["Tracks performance today", extra.trackingToday && labelOf(choices.tracking, extra.trackingToday)],
    ["Next appraisal cycle", extra.nextCycle && labelOf(choices.cycle, extra.nextCycle)],
  ];
  const campaign = [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ");

  const text = [
    saved
      ? `A new ${lead.formType} lead came in through the website.`
      : `A new ${lead.formType} lead came in, but it could not be saved to the database. This email is the only copy: please keep it.`,
    "",
    ...rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${oneLine(String(value))}`),
    ...(lead.message ? ["", "Message:", lead.message] : []),
    "",
    `Page: ${lead.sourcePage} (${lead.locale})`,
    // where the visit started (§S10), saved in `extra`
    ...(typeof extra.landingPage === "string" && extra.landingPage ? [`First page: ${oneLine(extra.landingPage)}`] : []),
    ...(typeof extra.referrer === "string" && extra.referrer ? [`Came from: ${oneLine(extra.referrer)}`] : []),
    ...(campaign ? [`Campaign: ${campaign}`] : []),
    `Received: ${jakartaTime.format(lead.createdAt)} WIB`,
    ...(saved ? [`Lead id: ${lead.id}`] : []),
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");

  return { subject, text };
}

/** Emails the lead to the sales inbox. Throws on any failure; the caller logs it and carries on. */
export async function sendLeadNotification(lead: Lead, options: NotifyOptions = {}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const { subject, text } = buildLeadEmail(lead, options);
  const send = new Resend(apiKey).emails.send(
    { from: FROM, to: notifyRecipients(), replyTo: lead.email, subject, text },
    options.saved === false ? undefined : { idempotencyKey: `lead-${lead.id}` },
  );
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("Resend timed out")), SEND_TIMEOUT_MS);
  });
  try {
    const { error } = await Promise.race([send, timeout]);
    if (error) throw new Error(`Resend ${error.name}: ${error.message}`);
  } finally {
    clearTimeout(timer);
  }
}
