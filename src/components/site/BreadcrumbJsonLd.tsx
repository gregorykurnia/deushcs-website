import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/ui/json-ld";
import type { Locale } from "@/i18n/routing";
import { breadcrumbListJsonLd } from "@/lib/structured-data";

/** The BreadcrumbList for a page below Home: Home, then `trail` (names and locale-less paths), ending with the page. */
export async function BreadcrumbJsonLd({
  locale,
  trail,
}: {
  locale: Locale;
  trail: readonly { name: string; path: string }[];
}) {
  const common = await getTranslations({ locale, namespace: "Common" });
  return <JsonLd data={breadcrumbListJsonLd({ locale, homeName: common("home"), trail })} />;
}
