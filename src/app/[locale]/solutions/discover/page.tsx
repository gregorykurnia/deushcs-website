import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PlayCard, ResultCard } from "@/components/blocks/DataCards";
import { ProductHero } from "@/components/blocks/ProductHero";
import { ScrollingReport } from "@/components/blocks/ProductStage";
import { StatReadout } from "@/components/blocks/StatReadout";
import { WhyPanel } from "@/components/blocks/WhyPanel";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { LabelPill, Tag } from "@/components/ui/pills";
import { Reveal } from "@/components/ui/reveal";
import { Rich } from "@/components/ui/rich";
import { Section, type Surface } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TextLink } from "@/components/ui/text-link";
import { discoverEn } from "@/content/en/discover";
import { images, missingScreens } from "@/content/images";
import { loadPage } from "@/content/load-page";
import { getPageContent } from "@/content/registry";
import type { SectionIntro } from "@/content/types";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// DEUS Discover, the personality module (WEBSITE-PLAN.md §5.4). Nine sections in the rhythm of the
// Game-Based Assessment page, which it links to. Everything visible comes from
// src/content/en/discover.ts; the screens come from src/content/images.ts.

const PATH = "/solutions/discover";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/solutions/discover">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this page redirects in the page itself; its metadata falls back to English
  const content = getPageContent("discover", locale) ?? discoverEn;
  return pageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: getPageContent("discover", locale) ? locale : "en",
    path: PATH,
  });
}

/** A section with its centred header; `id` is the in-page anchor and names the region. */
function DiscoverSection({
  id,
  intro,
  surface = "white",
  children,
}: {
  id: string;
  intro: SectionIntro;
  surface?: Surface;
  children: ReactNode;
}) {
  return (
    <Section id={id} surface={surface} aria-labelledby={`${id}-title`}>
      <Reveal>
        <SectionHeader id={`${id}-title`} label={intro.eyebrow} title={intro.title} lede={intro.lede} />
      </Reveal>
      {children}
    </Section>
  );
}

/** A section whose copy has an eyebrow but no headline: the label pill names the region instead. */
function EyebrowSection({
  id,
  label,
  surface = "white",
  children,
}: {
  id: string;
  label: string;
  surface?: Surface;
  children: ReactNode;
}) {
  return (
    <Section id={id} surface={surface} aria-labelledby={`${id}-label`}>
      <Reveal className="mb-[var(--head-gap)] text-center">
        <LabelPill id={`${id}-label`}>{label}</LabelPill>
      </Reveal>
      {children}
    </Section>
  );
}

export default async function DiscoverPage({ params }: PageProps<"/[locale]/solutions/discover">) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { content: c, available } = loadPage("discover", locale);

  // The reports, in the order of the content. The personality report is on disk; the profile
  // suitability report is a TODO until the owner sends its screenshot (guide §14.3).
  const reportScreens = [
    { image: images.discoverReport },
    { placeholder: missingScreens.discoverProfileSuitability[locale] },
  ];

  return (
    <>
      <Header cta="trial" ctaHref={c.hero.ctas[0]?.href} available={available} />
      <main>
        {/* 1. Hero */}
        <ProductHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} ctas={c.hero.ctas}>
          <div className="relative mx-auto grid max-w-[420px] gap-5 desk:max-w-[880px] desk:grid-cols-[1.5fr_1fr] desk:items-start desk:gap-8">
            <PlayCard
              image={{ ...images.gbaStory, alt: c.hero.window.story.alt }}
              title={c.hero.window.story.title}
              meta={c.hero.window.story.meta}
              sizes="(max-width: 900px) 90vw, 520px"
            />
            <ResultCard className="desk:mt-40" {...c.hero.window.result} />
          </div>
        </ProductHero>

        {/* 2. What it measures */}
        <EyebrowSection id="measures" label={c.measures.eyebrow} surface="cloud">
          <Reveal>
            <StatReadout stats={c.measures.stats} surface="tiles" />
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-10 max-w-[40em] text-center text-lede-sm text-balance text-slate desk:mt-14">
              <Rich text={c.measures.lede} />
            </p>
          </Reveal>
        </EyebrowSection>

        {/* 3. How it works */}
        <DiscoverSection id="how" intro={c.how.intro}>
          <Reveal>
            <div className="mx-auto max-w-[40em] space-y-5 text-center text-body text-slate">
              {c.how.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </DiscoverSection>

        {/* 4. Four differentiators */}
        <EyebrowSection id="why" label={c.why.eyebrow} surface="cloud">
          <Reveal>
            <WhyPanel items={c.why.items} surface="cloud" />
          </Reveal>
        </EyebrowSection>

        {/* 5. Your competencies, your language */}
        <DiscoverSection id="customization" intro={c.customization.intro}>
          <Reveal>
            <WhyPanel items={c.customization.items} columns={3} />
          </Reveal>
        </DiscoverSection>

        {/* 6. Reports: the personality report and the profile suitability report, side by side */}
        <DiscoverSection id="reports" intro={c.reports.intro} surface="cloud">
          <ul className="grid gap-6 desk:grid-cols-2">
            {c.reports.items.map((item, i) => {
              const screen = reportScreens[i];
              return (
                <Reveal
                  as="li"
                  index={i}
                  key={item.title}
                  className="flex flex-col rounded-lg border border-line bg-white p-6 desk:p-8"
                >
                  <ScrollingReport
                    image={screen?.image ? { ...screen.image, alt: item.alt } : undefined}
                    placeholder={screen?.placeholder}
                  />
                  <h3 className="mt-7 text-h3-panel text-ink">{item.title}</h3>
                  <p className="mt-2.5 text-body-sm text-slate">{item.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </DiscoverSection>

        {/* 7. Beyond recruitment */}
        <DiscoverSection id="beyond" intro={c.beyond.intro}>
          <Reveal>
            <ul className="flex flex-wrap justify-center gap-2.5">
              {c.beyond.points.map((point) => (
                <li key={point}>
                  <Tag>{point}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        </DiscoverSection>

        {/* 8. Part of the suite */}
        <DiscoverSection id="suite" intro={c.suite.intro} surface="cloud">
          <Reveal className="text-center">
            <TextLink href={c.suite.cta.href}>{c.suite.cta.label.replace(/\s*→$/, "")}</TextLink>
          </Reveal>
        </DiscoverSection>

        {/* 9. Closer */}
        <ClosingPanel
          label={c.closing.label}
          title={c.closing.title}
          lede={c.closing.lede}
          ctaLabel={c.closing.cta?.label}
          ctaHref={c.closing.cta?.href}
          whatsapp="assessment"
        />
      </main>
      <Footer />
      <WhatsAppButton context="assessment" />
    </>
  );
}
