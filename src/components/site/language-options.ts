import { locales, type Locale } from "@/i18n/routing";

export type LanguageOption = { locale: Locale; current: boolean; available: boolean };

/** Fixed EN / ID order on every locale (DESIGN-GUIDE.md §7.4). A language the page
 *  doesn't exist in yet is listed but unavailable, so the switch never links to a 404. */
export function languageOptions(
  current: Locale,
  available: readonly Locale[],
): LanguageOption[] {
  return locales.map((locale) => ({
    locale,
    current: locale === current,
    available: locale === current || available.includes(locale),
  }));
}
