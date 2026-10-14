import type { Locale } from "@/i18n/routing";

// Rupiah prices (WEBSITE-PLAN.md §6.5): `Rp69.000` in Indonesian, `IDR 69,000` in English.
// `Intl` puts a non-breaking space after the symbol or code; Indonesian drops it, English
// keeps an ordinary space.

const formatters: Record<Locale, Intl.NumberFormat> = {
  id: new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),
  en: new Intl.NumberFormat("en", {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "code",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),
};

export function formatIDR(amount: number, locale: Locale): string {
  const formatted = formatters[locale].format(amount);
  return locale === "id" ? formatted.replace(/\s/g, "") : formatted.replace(/\s/g, " ");
}
