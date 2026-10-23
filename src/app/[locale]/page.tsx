import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { HireToReward } from "@/components/home/HireToReward";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeProof } from "@/components/home/HomeProof";
import { HomeSolutions } from "@/components/home/HomeSolutions";
import { WhyDeus } from "@/components/home/WhyDeus";
import { WhyWeExist } from "@/components/home/WhyWeExist";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { JsonLd } from "@/components/ui/json-ld";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { loadPage } from "@/content/load-page";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";

// Home (content/en/home.md, WEBSITE-PLAN.md §5.1), in the order of home.md. Surfaces alternate
// (DESIGN-GUIDE.md §6.1): hero and proof row White → Why DEUS exists Cloud → From hire to reward
// White → Solutions Cloud → Why DEUS White → the closing panel. Recognition was cut in R13a (D2),
// the GBA, Enhance and Potentia spotlights in R14a (D1).

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const { content } = loadPage("home", locale);
  const metadata = pageMetadata({ title: null, description: content.meta.description, locale });
  // home.md's SEO title already carries the brand, so it is the whole title (Task 2.1).
  return {
    ...metadata,
    title: { absolute: content.meta.title },
    openGraph: { ...metadata.openGraph, title: content.meta.title },
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const { content, available } = loadPage("home", locale);

  return (
    <>
      <Header available={available} />
      <main className="flex-1">
        <HomeHero hero={content.hero} />
        <HomeProof logos={content.logos} />
        <WhyWeExist section={content.why} />
        <HireToReward section={content.hireToReward} locale={locale} />
        <HomeSolutions section={content.solutions} />
        <WhyDeus section={content.whyDeus} />
      </main>
      <ClosingPanel />
      <Footer available={available} />
      <WhatsAppButton />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
    </>
  );
}
