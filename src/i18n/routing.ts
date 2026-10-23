import { defineRouting } from "next-intl/routing";

export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  // `/` always goes to `/en` while Phase 6 is on hold: an Indonesian browser sent to `/id` was bounced
  // back to `/en`, two redirects for one page. Task 6.4 turns detection on with the Indonesian pages.
  localeDetection: false,
});
