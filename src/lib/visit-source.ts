// Where a visit started (SEO/geo-implementation-plan.md §S10). The first page view in a browser tab
// remembers its page, the site that sent the visitor and the page's campaign tags in `sessionStorage`,
// so a lead sent from /contact three pages later still says it came from chatgpt.com to the GBA page.
// No cookie: the record ends when the tab closes. Later pages never overwrite it. If storage is
// blocked, nothing is remembered and the form falls back to the current page's tags, as before.
//
// Only a path and a host name are kept, never a full address or a query string, so nothing a visitor
// typed elsewhere ends up here. The server checks both again (`src/lib/leads/schema.ts`).

import { locales } from "@/i18n/routing";

export const VISIT_KEY = "deus-visit";

export const visitUtmKeys = ["utm_source", "utm_medium", "utm_campaign"] as const;
export type VisitUtmKey = (typeof visitUtmKeys)[number];

export type VisitRecord = {
  /** The first page's path as the form's `sourcePage` stores it: no locale, no query string. */
  landingPage: string;
  /** The referring site's host name, or "" for this site, no referrer or a bad value. */
  referrer: string;
} & Record<VisitUtmKey, string>;

const MAX_PATH = 300;
const MAX_HOST = 253;
const MAX_TAG = 200;

/** A path the server accepts as `sourcePage`: one leading slash, no spaces, up to 300 characters. */
export function isPagePath(value: string): boolean {
  return /^\/(?!\/)\S*$/.test(value) && value.length <= MAX_PATH;
}

/**
 * A first page the lead may carry: a page path with no query string or fragment, and no `@`, even
 * encoded, so a crafted link or post can't put an email address or other answers into the lead.
 */
export function isLandingPath(value: string): boolean {
  if (!isPagePath(value) || /[?#]/.test(value)) return false;
  let decoded: string;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    return false;
  }
  return !/[?#@]/.test(decoded);
}

/** A lower-case host name: letters, digits, dots and hyphens, up to 253 characters. */
export function isHostName(value: string): boolean {
  return value.length <= MAX_HOST && /^[a-z0-9.-]+$/.test(value) && /[a-z0-9]/.test(value);
}

const bareHost = (host: string) => host.replace(/^www\./, "");

/**
 * The host name of `referrer` when it's another website; "" when it's this site (`ownHost`, with or
 * without `www.`), missing, or not a web address.
 */
export function referrerHost(referrer: string, ownHost: string): string {
  let url: URL;
  try {
    url = new URL(referrer);
  } catch {
    return "";
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return "";
  const host = url.hostname.toLowerCase();
  if (!isHostName(host) || bareHost(host) === bareHost(ownHost.toLowerCase())) return "";
  return host;
}

/** `pathname` without its locale prefix (`/en/contact` → `/contact`, `/en` → `/`). */
export function pathWithoutLocale(pathname: string, locales: readonly string[]): string {
  const [, first, ...rest] = pathname.split("/");
  if (!locales.includes(first)) return pathname;
  return `/${rest.join("/")}`;
}

const tag = (value: string | null | undefined) => (value ?? "").replace(/\s+/g, " ").trim().slice(0, MAX_TAG);

/** The record for a first page view, from the page's address and `document.referrer`. */
export function buildVisit(page: {
  pathname: string;
  search: string;
  referrer: string;
  host: string;
  locales: readonly string[];
}): VisitRecord {
  const landingPage = pathWithoutLocale(page.pathname, page.locales);
  const params = new URLSearchParams(page.search);
  return {
    landingPage: isLandingPath(landingPage) ? landingPage : "",
    referrer: referrerHost(page.referrer, page.host),
    utm_source: tag(params.get("utm_source")),
    utm_medium: tag(params.get("utm_medium")),
    utm_campaign: tag(params.get("utm_campaign")),
  };
}

/** A stored record, with any value that isn't what `buildVisit` writes dropped. */
export function parseVisit(raw: string): VisitRecord {
  let data: Record<string, unknown> = {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object") data = parsed as Record<string, unknown>;
  } catch {
    // unreadable: every field empty
  }
  const text = (key: string) => (typeof data[key] === "string" ? (data[key] as string) : "");
  const landingPage = text("landingPage");
  const referrer = text("referrer");
  return {
    landingPage: isLandingPath(landingPage) ? landingPage : "",
    referrer: isHostName(referrer) ? referrer : "",
    utm_source: tag(text("utm_source")),
    utm_medium: tag(text("utm_medium")),
    utm_campaign: tag(text("utm_campaign")),
  };
}

type VisitStorage = Pick<Storage, "getItem" | "setItem">;

/**
 * The visit's record: the one already in `storage`, or `visit` (built lazily) written there now.
 * A record that's there is never replaced, even an unreadable one. Null when storage is blocked.
 */
export function rememberVisit(storage: VisitStorage, visit: () => VisitRecord): VisitRecord | null {
  try {
    const stored = storage.getItem(VISIT_KEY);
    if (stored !== null) return parseVisit(stored);
    const record = visit();
    storage.setItem(VISIT_KEY, JSON.stringify(record));
    return record;
  } catch {
    return null;
  }
}

/**
 * In the browser: this tab's visit record, writing it first if this is the visit's first page.
 * Both `VisitSource` and the form call it, so whichever runs first on the landing page records it.
 * Null on the server or when storage is blocked.
 */
export function currentVisit(): VisitRecord | null {
  if (typeof window === "undefined") return null;
  let storage: Storage;
  try {
    storage = window.sessionStorage;
  } catch {
    return null;
  }
  return rememberVisit(storage, () =>
    buildVisit({
      pathname: window.location.pathname,
      search: window.location.search,
      referrer: document.referrer,
      host: window.location.hostname,
      locales,
    }),
  );
}
