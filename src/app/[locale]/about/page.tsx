import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/site/BreadcrumbJsonLd";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { AboutValues } from "@/components/about/AboutValues";
import { Leadership } from "@/components/about/Leadership";
import { MissionStatement } from "@/components/about/MissionStatement";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { siteFlags } from "@/content/flags";
import { aboutEn } from "@/content/en/about";
import { loadPage } from "@/content/load-page";
import { getPageContent } from "@/content/registry";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// About (content/en/about.md, WEBSITE-PLAN.md §5.9), in the order of about.md. Surfaces alternate
// (DESIGN-GUIDE.md §6.1): hero White → story Cloud → mission, with the vision under it, White (D14)
// → the 6 I's Cloud → timeline White → leadership Cloud (only while `showLeadership` is on, Q10) →
// the closing panel. Recognition was cut in R13a (D2): the timeline holds its facts.

const PATH = "/about";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  // a locale without this page redirects in the page itself; its metadata falls back to English
  const content = getPageContent("about", locale) ?? aboutEn;
  const metadata = pageMetadata({
    title: null,
    description: content.meta.description,
    locale: getPageContent("about", locale) ? locale : "en",
    path: PATH,
  });
  // about.md's SEO title already carries the brand, so it is the whole title (Task 2.1).
  return {
    ...metadata,
    title: { absolute: content.meta.title },
    openGraph: { ...metadata.openGraph, title: content.meta.title },
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "Header" });
  const { content: c, available } = loadPage("about", locale);
  const showLeadership = siteFlags[c.leadership.flag];

  return (
    <>
      <Header available={available} />
      <main className="flex-1">
        <AboutHero hero={c.hero} />
        <AboutStory section={c.story} />
        <MissionStatement section={c.mission} />
        <AboutValues section={c.values} />
        <AboutTimeline section={c.timeline} />
        {showLeadership && <Leadership section={c.leadership} />}
      </main>
      <ClosingPanel />
      <Footer available={available} />
      <WhatsAppButton />
      <BreadcrumbJsonLd locale={locale} trail={[{ name: nav("nav.about"), path: PATH }]} />
    </>
  );
}
