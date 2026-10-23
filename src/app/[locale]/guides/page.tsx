import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { GuideIndex } from "@/components/guides/GuideIndex";
import { BreadcrumbJsonLd } from "@/components/site/BreadcrumbJsonLd";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { listGuides, resolveGuideIndex } from "@/content/guides";
import { loadGuideIndex } from "@/content/guides/load-guide";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// The guides index (SEO/geo-implementation-plan.md §S9): the published guides with their answers. While
// none is registered (`showGuides` off, or none published) the proxy and `loadGuideIndex` make it a 404;
// in a language without guides it redirects to the language that has them.

const PATH = "/guides";

export async function generateMetadata({ params }: PageProps<"/[locale]/guides">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const resolution = resolveGuideIndex(locale);
  if (resolution.kind === "notFound") notFound();
  const target = resolution.kind === "ok" ? locale : resolution.locale;
  const t = await getTranslations({ locale: target, namespace: "Guides" });
  return pageMetadata({ title: t("indexTitle"), description: t("indexLede"), locale: target, path: PATH });
}

export default async function GuidesPage({ params }: PageProps<"/[locale]/guides">) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { available } = loadGuideIndex(locale);
  const t = await getTranslations({ locale, namespace: "Guides" });

  return (
    <>
      <Header cta="trial" ctaHref="/contact?product=gba" available={available} />
      <main>
        <GuideIndex guides={listGuides(locale)} />
      </main>
      <Footer available={available} />
      <WhatsAppButton context="assessment" />
      <BreadcrumbJsonLd locale={locale} trail={[{ name: t("breadcrumb"), path: PATH }]} />
    </>
  );
}
