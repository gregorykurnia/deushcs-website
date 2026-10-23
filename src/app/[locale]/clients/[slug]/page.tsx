import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/site/Footer";
import { BreadcrumbJsonLd } from "@/components/site/BreadcrumbJsonLd";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { StoryPage } from "@/components/stories/StoryPage";
import { aliasSlugs, getStory, resolveStory, storySlugs } from "@/content/stories";
import { loadStory } from "@/content/stories/load-story";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// The shared client-story page (WEBSITE-PLAN.md §5.8, DESIGN-GUIDE.md §7.21). Every story is a content
// file registered in src/content/stories/index.ts; this route renders whichever one the slug names, in
// the visitor's language, and redirects to the language or slug it exists in. Held stories (Q7, Q11) are
// not registered, so their slugs are 404s (`loadStory` calls `notFound()` for any slug it doesn't know).

export function generateStaticParams() {
  const slugs = [...storySlugs(), ...aliasSlugs()];
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/clients/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this story, or an old slug, redirects in the page itself; its metadata falls back to where it lives
  const resolution = resolveStory(slug, locale);
  if (resolution.kind === "notFound") notFound();
  const target = resolution.kind === "ok" ? { locale, slug } : { locale: resolution.locale, slug: resolution.slug };
  const story = getStory(target.slug, target.locale)!;
  return pageMetadata({
    title: story.meta.title,
    description: story.meta.description,
    locale: target.locale,
    path: `/clients/${target.slug}`,
  });
}

export default async function ClientStoryPage({ params }: PageProps<"/[locale]/clients/[slug]">) {
  const { locale: requested, slug } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { story, available } = loadStory(slug, locale);
  const nav = await getTranslations({ locale, namespace: "Header" });

  return (
    <>
      <Header available={available} />
      <main>
        <StoryPage story={story} locale={locale} />
      </main>
      <Footer available={available} />
      <WhatsAppButton context={story.whatsapp} />
      <BreadcrumbJsonLd
        locale={locale}
        trail={[
          { name: nav("nav.clients"), path: "/clients" },
          { name: story.client, path: `/clients/${story.slug}` },
        ]}
      />
    </>
  );
}
