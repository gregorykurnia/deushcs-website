import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { routing } from "@/i18n/routing";
import { Styleguide } from "./Styleguide";

// /styleguide: every component, for the owner's sign-off against the mockup (Task 0.10).
// Never indexed. Shown in development, on previews, and on production until launch; once the
// site is indexable (SITE_INDEXABLE=true, Task 7.5) production returns 404 here.
export const metadata: Metadata = {
  title: "Styleguide | DEUS Human Capital Services",
  robots: { index: false, follow: false },
};

function styleguideHidden() {
  return process.env.VERCEL_ENV === "production" && process.env.SITE_INDEXABLE === "true";
}

export default async function StyleguidePage({
  params,
  searchParams,
}: PageProps<"/[locale]/styleguide">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  if (styleguideHidden()) notFound();
  const t = await getTranslations("Scaffold");

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* The long-text toggle reads ?long=1, so the sheet renders per request. */}
        <Suspense fallback={<p className="py-40 text-center text-slate">{t("title")}</p>}>
          <Styleguide searchParams={searchParams} />
        </Suspense>
      </main>
      <ClosingPanel />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
