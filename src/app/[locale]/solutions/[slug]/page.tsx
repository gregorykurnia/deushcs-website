import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/site/BreadcrumbJsonLd";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { JsonLd } from "@/components/ui/json-ld";
import { UseCasePage } from "@/components/use-cases/UseCasePage";
import { homeEn } from "@/content/en/home";
import { getPageContent } from "@/content/registry";
import { getUseCase, listUseCaseSlugs, resolveUseCase } from "@/content/use-cases";
import { loadUseCase } from "@/content/use-cases/load-use-case";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { pageUrl, webPageJsonLd } from "@/lib/structured-data";

// The shared use-case page (SEO/geo-implementation-plan.md §S8, DESIGN-GUIDE.md §7.30). Every page is a
// content file registered in src/content/use-cases/index.ts; this route renders whichever one the slug
// names, in the visitor's language, and redirects to the language it exists in. `/solutions/enhance` and
// `/solutions/game-based-assessment` have routes of their own, which win over this one. While
// `showUseCases` is off nothing is registered, so every slug here is a 404 (`loadUseCase` calls `notFound()`).

export function generateStaticParams() {
  const slugs = listUseCaseSlugs();
  // Cache Components needs at least one param. With every page held (showUseCases off) that is one
  // unregistered slug: it prerenders as a 404, and the proxy sends any visit to it to the real 404.
  if (slugs.length === 0) return [{ locale: routing.defaultLocale, slug: "no-use-cases" }];
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/solutions/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this page redirects in the page itself; its metadata falls back to where it lives
  const resolution = resolveUseCase(slug, locale);
  if (resolution.kind === "notFound") notFound();
  const target = resolution.kind === "ok" ? locale : resolution.locale;
  const useCase = getUseCase(slug, target)!;
  return pageMetadata({
    title: useCase.meta.title,
    description: useCase.meta.description,
    locale: target,
    path: `/solutions/${slug}`,
  });
}

export default async function UseCaseRoute({ params }: PageProps<"/[locale]/solutions/[slug]">) {
  const { locale: requested, slug } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { useCase, available } = loadUseCase(slug, locale);
  const nav = await getTranslations({ locale, namespace: "Header" });
  const home = getPageContent("home", locale) ?? homeEn;
  const path = `/solutions/${useCase.slug}`;

  return (
    <>
      {/* "call" is Enhance's button; every other product asks for a trial */}
      <Header
        cta={useCase.whatsapp === "enhance" ? "call" : "trial"}
        ctaHref={useCase.hero.cta.href}
        available={available}
      />
      <main>
        <UseCasePage useCase={useCase} logos={home.logos} />
      </main>
      <Footer available={available} />
      <WhatsAppButton context={useCase.whatsapp} />
      <BreadcrumbJsonLd
        locale={locale}
        trail={[
          { name: nav("nav.solutions"), path: "/solutions" },
          { name: useCase.breadcrumb, path },
        ]}
      />
      <JsonLd
        data={webPageJsonLd({
          name: useCase.hero.title,
          // the answer passage, not the meta description: every value must be visible on the page
          description: useCase.hero.passage,
          url: pageUrl(locale, path),
          locale,
          productPath: useCase.product.path,
        })}
      />
    </>
  );
}
