import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { HireToReward } from "@/components/home/HireToReward";
import { HomeHero } from "@/components/home/HomeHero";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { loadPage } from "@/content/load-page";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// Home (content/en/home.md, WEBSITE-PLAN.md §5.1). Built in two tasks: 2.2 the hero and
// "From hire to reward"; 2.3 the rest (logos and "Why DEUS exists" go between those two,
// then Solutions with id="solutions", the spotlights, Why DEUS, recognition and Potentia).

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
        <HireToReward section={content.hireToReward} locale={locale} />
      </main>
      <ClosingPanel />
      <Footer available={available} />
      <WhatsAppButton />
    </>
  );
}
