import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { InfoTiles } from "@/components/blocks/InfoTiles";
import { NumberedSteps } from "@/components/blocks/NumberedSteps";
import { WhyPanel } from "@/components/blocks/WhyPanel";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Container } from "@/components/ui/container";
import { LabelPill } from "@/components/ui/pills";
import { Reveal } from "@/components/ui/reveal";
import { Section, type Surface } from "@/components/ui/section";
import { HeadingLines, SectionHeader } from "@/components/ui/section-header";
import { scienceEn } from "@/content/en/science";
import { loadPage } from "@/content/load-page";
import { getPageContent } from "@/content/registry";
import type { ScienceContent, SectionIntro } from "@/content/types";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// The Science page (WEBSITE-PLAN.md §5.7): the credibility page HR heads and psychologists read
// before a purchase. Text only, so the hero has no sky window, as About's has none. Everything
// visible comes from src/content/en/science.ts.

const PATH = "/science";

export async function generateMetadata({ params }: PageProps<"/[locale]/science">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this page redirects in the page itself; its metadata falls back to English
  const content: ScienceContent = getPageContent("science", locale) ?? scienceEn;
  return pageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: getPageContent("science", locale) ? locale : "en",
    path: PATH,
  });
}

/** The hero: label pill, headline and lede, on the same glow as About. */
function ScienceHero({ hero }: { hero: SectionIntro }) {
  return (
    <section
      aria-labelledby="science-hero-title"
      className="relative isolate overflow-x-clip -mt-[84px] pt-[156px] pb-[var(--section-y)] max-[479px]:-mt-[68px] max-[479px]:pt-[140px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-340px] left-1/2 -z-10 h-[1100px] w-[1700px] -translate-x-1/2 bg-[image:var(--grad-hero-glow)]"
      />
      <Container className="text-center">
        <LabelPill className="mb-6">{hero.eyebrow}</LabelPill>
        <h1 id="science-hero-title" className="mx-auto max-w-[14em] text-display text-balance text-ink">
          <HeadingLines lines={hero.title} />
        </h1>
        {hero.lede && <p className="mx-auto mt-7 max-w-[36em] text-lede text-balance text-slate">{hero.lede}</p>}
      </Container>
    </section>
  );
}

/** A section with its centred header; `id` is the in-page anchor and names the region. */
function ScienceSection({
  id,
  intro,
  surface = "white",
  children,
}: {
  id: string;
  intro: SectionIntro;
  surface?: Surface;
  children?: ReactNode;
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

export default async function SciencePage({ params }: PageProps<"/[locale]/science">) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { content: c, available } = loadPage("science", locale);

  return (
    <>
      <Header cta="demo" available={available} />
      <main>
        {/* 1. Hero */}
        <ScienceHero hero={c.hero} />

        {/* 2. Frameworks: four plain tiles, one per framework */}
        <ScienceSection id="frameworks" intro={c.frameworks.intro} surface="cloud">
          <Reveal>
            <InfoTiles items={c.frameworks.items} columns={2} />
          </Reveal>
        </ScienceSection>

        {/* 3. How an assessment is built: the four phases, in order */}
        <ScienceSection id="process" intro={c.process.intro}>
          <Reveal>
            <NumberedSteps steps={c.process.steps} />
          </Reveal>
        </ScienceSection>

        {/* 4. Validated: the lede is the whole section until the owner confirms any figures */}
        <ScienceSection id="validated" intro={c.validated} surface="cloud" />

        {/* 5. Normed on the Indonesian population. The market claim waits behind its flag. */}
        <ScienceSection id="normed" intro={c.normed.intro}>
          <Reveal>
            <div className="mx-auto max-w-[40em] space-y-5 text-center text-body text-slate">
              {c.normed.marketClaim && <p>{c.normed.marketClaim}</p>}
              <p>{c.normed.body}</p>
            </div>
          </Reveal>
        </ScienceSection>

        {/* 6. Fair and secure: three benefits, each with its icon */}
        <ScienceSection id="fair" intro={c.fair.intro} surface="cloud">
          <Reveal>
            <WhyPanel items={c.fair.items} surface="cloud" columns={3} />
          </Reveal>
        </ScienceSection>

        {/* 7. Academic partnership: hidden until the owner confirms the co-branding (siteFlags) */}
        {c.partnership && (
          <ScienceSection id="partnership" intro={c.partnership.intro}>
            <Reveal>
              <div className="mx-auto max-w-[40em] text-center text-body text-slate">
                <p>{c.partnership.body}</p>
              </div>
            </Reveal>
          </ScienceSection>
        )}

        {/* 8. Closer */}
        <ClosingPanel
          label={c.closing.label}
          title={c.closing.title}
          lede={c.closing.lede}
          ctaLabel={c.closing.cta?.label}
          ctaHref={c.closing.cta?.href}
        />
      </main>
      <Footer available={available} />
      <WhatsAppButton />
    </>
  );
}
