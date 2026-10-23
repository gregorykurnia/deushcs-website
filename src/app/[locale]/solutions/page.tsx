import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/site/BreadcrumbJsonLd";
import { SolutionGroups } from "@/components/solutions/SolutionGroups";
import { SolutionsHelp } from "@/components/solutions/SolutionsHelp";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { solutionsEn } from "@/content/en/solutions";
import { loadPage } from "@/content/load-page";
import { getPageContent } from "@/content/registry";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// Solutions overview (content/en/solutions.md, WEBSITE-PLAN.md §5.2): a short index of the three
// groups from the mega menu, then "Need a hand?" and the closing panel. Surfaces alternate
// (DESIGN-GUIDE.md §6.1): hero White → Assess Cloud → Perform White → Education Cloud → help White →
// the closing panel.

const PATH = "/solutions";

export async function generateMetadata({ params }: PageProps<"/[locale]/solutions">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  // a locale without this page redirects in the page itself; its metadata falls back to English
  const content = getPageContent("solutions", locale) ?? solutionsEn;
  const metadata = pageMetadata({
    title: null,
    description: content.meta.description,
    locale: getPageContent("solutions", locale) ? locale : "en",
    path: PATH,
  });
  // solutions.md's SEO title already carries the brand, so it is the whole title (Task 2.1).
  return {
    ...metadata,
    title: { absolute: content.meta.title },
    openGraph: { ...metadata.openGraph, title: content.meta.title },
  };
}

export default async function SolutionsPage({ params }: PageProps<"/[locale]/solutions">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "Header" });
  const { content: c, available } = loadPage("solutions", locale);

  return (
    <>
      <Header available={available} />
      <main className="flex-1">
        <SolutionsHero hero={c.hero} />
        <SolutionGroups assess={c.assess} perform={c.perform} education={c.education} />
        <SolutionsHelp section={c.help} />
      </main>
      <ClosingPanel />
      <Footer available={available} />
      <WhatsAppButton />
      <BreadcrumbJsonLd locale={locale} trail={[{ name: nav("nav.solutions"), path: "/solutions" }]} />
    </>
  );
}
