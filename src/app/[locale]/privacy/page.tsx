import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PrivacyArticle } from "@/components/privacy/PrivacyArticle";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { privacyEn } from "@/content/en/privacy";
import { loadPage } from "@/content/load-page";
import { getPageContent } from "@/content/registry";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// Privacy policy (WEBSITE-PLAN.md §5.11, Task 1.8): a draft for the team's counsel to approve.
// One article, no closing panel (guide §7.18). Copy from src/content/en/privacy.ts.

const PATH = "/privacy";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this page redirects in the page itself; its metadata falls back to English
  const content = getPageContent("privacy", locale) ?? privacyEn;
  return pageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: getPageContent("privacy", locale) ? locale : "en",
    path: PATH,
  });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { content, available } = loadPage("privacy", locale);

  return (
    <>
      <Header available={available} />
      <main>
        <PrivacyArticle content={content} />
      </main>
      <Footer available={available} />
      <WhatsAppButton />
    </>
  );
}
