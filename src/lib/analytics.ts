import { track as sendEvent } from "@vercel/analytics";
import { POTENTIA_ORIGIN } from "@/lib/links";

// Custom events for Vercel Web Analytics (WEBSITE-PLAN.md §8.4). A prop says which thing was
// clicked, never who clicked: no names, emails, messages or other form answers. The one form
// answer that goes in is the product a form was about, on `form_submit`. `whatsapp_click` also
// carries `from`, the host name of the site that started the visit (`src/lib/visit-source.ts`), and
// `download` carries `offer`, the download a sent download form asked for (§S11).
export type AnalyticsEvent =
  | "cta_click"
  | "whatsapp_click"
  | "email_click"
  | "form_submit"
  | "download"
  | "language_switch"
  | "outbound_click";

export type AnalyticsProps = Record<string, string>;

/** Sends one event, with the path of the page it happened on. Does nothing on the server. */
export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  sendEvent(event, { ...props, page: window.location.pathname });
}

const POTENTIA_HOST = new URL(POTENTIA_ORIGIN).hostname;

/**
 * The events a click on a link counts as. `cta` is the link's `data-cta`, which marks a call to
 * action. The href decides the rest: email, WhatsApp (wa.me) or a link to deuspotentia.com. A link
 * can count as both a call to action and one of those. `from` is the site that started the visit, so
 * WhatsApp enquiries count by source (§S10); without one, the visit counts as `direct`.
 */
export function linkEvents(
  href: string,
  cta?: string | null,
  from?: string | null,
): [AnalyticsEvent, AnalyticsProps][] {
  const events: [AnalyticsEvent, AnalyticsProps][] = [];
  if (cta) events.push(["cta_click", { cta }]);
  if (href.startsWith("mailto:")) events.push(["email_click", {}]);
  // Relative links have no host, so they never match.
  const host = /^https?:\/\//.test(href) ? new URL(href).hostname : "";
  if (host === "wa.me") events.push(["whatsapp_click", { from: from || "direct" }]);
  if (host === POTENTIA_HOST || host.endsWith(`.${POTENTIA_HOST}`)) events.push(["outbound_click", {}]);
  return events;
}
