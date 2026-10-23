import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/guides/GuideArticle";
import { BreadcrumbJsonLd } from "@/components/site/BreadcrumbJsonLd";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { JsonLd } from "@/components/ui/json-ld";
import { getGuide, listGuideSlugs, relatedGuides, resolveGuide } from "@/content/guides";
import { loadGuide } from "@/content/guides/load-guide";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { guideArticleJsonLd, pageUrl } from "@/lib/structured-data";

// The shared guide page (SEO/geo-implementation-plan.md §S9, DESIGN-GUIDE.md §7.31). Every guide is a content
// file registered in src/content/guides/index.ts; this route renders whichever one the slug names, in the
// visitor's language, and redirects to the language it exists in. An unpublished guide, or any guide while
// `showGuides` is off, isn't registered, so its slug is a 404 (`loadGuide` calls `notFound()`).

export function generateStaticParams() {
  const slugs = listGuideSlugs();
  // Cache Components needs at least one param. With every guide held (showGuides off) that is one
  // unregistered slug: it prerenders as a 404, and the proxy sends any visit to it to the real 404.
  if (slugs.length === 0) return [{ locale: routing.defaultLocale, slug: "no-guides" }];
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/guides/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this guide redirects in the page itself; its metadata falls back to where it lives
  const resolution = resolveGuide(slug, locale);
  if (resolution.kind === "notFound") notFound();
  const target = resolution.kind === "ok" ? locale : resolution.locale;
  const guide = getGuide(slug, target)!;
  return pageMetadata({
    title: guide.meta.title,
    description: guide.meta.description,
    locale: target,
    path: `/guides/${slug}`,
  });
}

export default async function GuideRoute({ params }: PageProps<"/[locale]/guides/[slug]">) {
  const { locale: requested, slug } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { guide, available } = loadGuide(slug, locale);
  const t = await getTranslations({ locale, namespace: "Guides" });
  const path = `/guides/${guide.slug}`;

  return (
    <>
      {/* "call" is Enhance's button; every other product asks for a trial */}
      <Header cta={guide.whatsapp === "enhance" ? "call" : "trial"} ctaHref={guide.contactHref} available={available} />
      <main>
        <GuideArticle guide={guide} related={relatedGuides(guide, locale)} />
      </main>
      <Footer available={available} />
      <WhatsAppButton context={guide.whatsapp} />
      <BreadcrumbJsonLd
        locale={locale}
        trail={[
          { name: t("breadcrumb"), path: "/guides" },
          { name: guide.breadcrumb, path },
        ]}
      />
      <JsonLd
        data={guideArticleJsonLd({
          headline: guide.header.title,
          // the answer, not the meta description: every value must be visible on the page
          description: guide.header.answer,
          url: pageUrl(locale, path),
          locale,
          productPath: guide.product.path,
          datePublished: guide.dates.published,
          dateModified: guide.dates.updated,
        })}
      />
    </>
  );
}
