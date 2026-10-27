import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PlayCard } from "@/components/blocks/DataCards";
import { DownloadOffer } from "@/components/blocks/DownloadOffer";
import { ModuleCard, ModuleGrid } from "@/components/blocks/ModuleCard";
import { ProductHero } from "@/components/blocks/ProductHero";
import { WhyPanel } from "@/components/blocks/WhyPanel";
import { RelatedGuide } from "@/components/guides/RelatedGuide";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/site/BreadcrumbJsonLd";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { Section, type Surface } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TextLink } from "@/components/ui/text-link";
import { gbaEn } from "@/content/en/game-based-assessment";
import { siteFlags } from "@/content/flags";
import { images } from "@/content/images";
import { getPageContent, localesFor } from "@/content/registry";
import { getUseCase } from "@/content/use-cases";
import { loadPage } from "@/content/load-page";
import type { SectionIntro } from "@/content/types";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { faqPageJsonLd, softwareApplicationJsonLd } from "@/lib/structured-data";

// Game-Based Assessment: the page sales links most (WEBSITE-PLAN.md §5.3). It holds the four
// modules, Personality (the former DEUS Discover page) and Cognitive, Neuroscience and Simulation
// (the former Next Chapter page), whose routes redirect here (next.config.ts). Since round 4 the
// modules are four cards in one grid, seen at once, and the page is short: the hero, What's
// different, the suite, three use cases, the FAQ and the closer. Sections sit on White and Cloud in
// turn; the closer is the sky panel. Everything visible comes from
// src/content/en/game-based-assessment.ts; the module screens come from src/content/images.ts.

const PATH = "/solutions/game-based-assessment";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/solutions/game-based-assessment">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this page redirects in the page itself; its metadata falls back to English
  const content = getPageContent("gba", locale) ?? gbaEn;
  return pageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: getPageContent("gba", locale) ? locale : "en",
    path: PATH,
    locales: localesFor("gba"),
  });
}

/** A section with its centred header; `id` is the in-page anchor and names the region. */
function GbaSection({
  id,
  intro,
  surface = "white",
  children,
}: {
  id: string;
  intro: Omit<SectionIntro, "eyebrow"> & { eyebrow?: string };
  surface?: Surface;
  children?: ReactNode;
}) {
  return (
    <Section id={id} surface={surface} aria-labelledby={`${id}-title`}>
      <Reveal>
        <SectionHeader
          id={`${id}-title`}
          label={intro.eyebrow}
          title={intro.title}
          subtitle={intro.subtitle}
          lede={intro.lede}
        />
      </Reveal>
      {children}
    </Section>
  );
}

export default async function GameBasedAssessmentPage({
  params,
}: PageProps<"/[locale]/solutions/game-based-assessment">) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { content: c, available } = loadPage("gba", locale);
  const header = await getTranslations({ locale, namespace: "Header" });
  const productName = header("solutionsMenu.items.gba.title");

  return (
    <>
      <Header cta="trial" ctaHref={c.hero.ctas[0]?.href} available={available} />
      <main>
        {/* 1. Hero */}
        <ProductHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} ctas={c.hero.ctas}>
          {/* the cognitive game leads, the story card and a suitability report under it */}
          <div className="mx-auto grid max-w-[460px] gap-5 desk:max-w-none desk:grid-cols-2 desk:items-center">
            <PlayCard
              className="desk:col-span-2"
              image={{ ...images.gbaNumerical, alt: c.hero.window.cognitive.alt }}
              title={c.hero.window.cognitive.title}
              meta={c.hero.window.cognitive.meta}
              sizes="(max-width: 900px) 90vw, 640px"
            />
            <PlayCard
              image={{ ...images.gbaDiscoverTitle, alt: c.hero.window.story.alt }}
              title={c.hero.window.story.title}
              meta={c.hero.window.story.meta}
              sizes="(max-width: 900px) 90vw, 320px"
            />
            <PlayCard
              image={{ ...images.gbaSuitabilityReport, alt: c.hero.window.suitability.alt }}
              title={c.hero.window.suitability.title}
              sizes="(max-width: 900px) 90vw, 320px"
            />
          </div>
        </ProductHero>

        {/* 2. What's different: right under the hero (round 4 §S3), with no label; the answer
            passage is its lede */}
        <GbaSection id="principles" intro={c.principles.intro} surface="cloud">
          <Reveal>
            <WhyPanel items={c.principles.items} columns={3} surface="cloud" />
          </Reveal>
        </GbaSection>

        {/* 3. The suite (round 4 §S2): the four modules as cards in one grid, seen at once. Each card
            is an `li` carrying its module's anchor. */}
        <GbaSection id="modules" intro={c.modules.intro}>
          <ModuleGrid>
            {c.modules.cards.map((card, i) => (
              <ModuleCard
                key={card.id}
                id={card.id}
                index={i}
                title={card.title}
                body={card.body}
                measures={card.measures}
                screen="whole"
                image={{ ...images[card.screen.image], alt: card.screen.alt }}
              />
            ))}
          </ModuleGrid>
        </GbaSection>

        {/* 4. Use cases: Cloud after the White modules */}
        <GbaSection id="use-cases" intro={c.useCases.intro} surface="cloud">
          <Reveal>
            <WhyPanel
              arrow={false}
              items={c.useCases.items.map(({ useCase, ...item }) =>
                useCase && getUseCase(useCase, "en") ? { ...item, href: `/solutions/${useCase}` } : item,
              )}
              columns={3}
              surface="cloud"
            />
          </Reveal>
        </GbaSection>

        {/* 5. Client stories: one centred line (F18), while there are stories to read */}
        {siteFlags.showStories && (
          <Container className="pt-14 desk:pt-16">
            <Reveal className="flex justify-center">
              <TextLink href={c.clientsLink.href}>{c.clientsLink.label}</TextLink>
            </Reveal>
          </Container>
        )}

        {/* the sample-report download, just before the FAQ (GEO §S11's fallback), while it's on offer */}
        {siteFlags.showSampleReport && (
          <Container className="pt-14 desk:pt-16">
            <Reveal>
              <DownloadOffer />
            </Reveal>
          </Container>
        )}

        {/* 6. FAQ */}
        <GbaSection id="faq" intro={c.faq.intro}>
          <Reveal>
            <Accordion items={c.faq.items} />
          </Reveal>
          <RelatedGuide slug={c.relatedGuide} className="mt-10" />
          <JsonLd data={faqPageJsonLd(c.faq.items)} />
        </GbaSection>

        {/* 7. Closer */}
        <ClosingPanel
          label={c.closing.label}
          title={c.closing.title}
          lede={c.closing.lede}
          ctaLabel={c.closing.cta?.label}
          ctaHref={c.closing.cta?.href}
          whatsapp="assessment"
        />
      </main>
      <Footer available={available} />
      <WhatsAppButton context="assessment" />
      <BreadcrumbJsonLd
        locale={locale}
        trail={[
          { name: header("nav.solutions"), path: "/solutions" },
          { name: productName, path: PATH },
        ]}
      />
      <JsonLd
        data={softwareApplicationJsonLd({
          name: productName,
          // the hero's line, not the meta description: every value must be visible on the page
          description: c.hero.lede,
          locale,
          path: PATH,
          applicationSubCategory: "Assessment",
          // the four module titles, as the page shows them; no price, so no `offers` (round 4)
          featureList: c.modules.cards.map((card) => card.title),
        })}
      />
    </>
  );
}
