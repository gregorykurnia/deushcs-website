import { FileDown, Files, Link2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PlayCard, ResultCard } from "@/components/blocks/DataCards";
import { InfoTiles } from "@/components/blocks/InfoTiles";
import { LinkCard } from "@/components/blocks/LinkCard";
import { NumberedSteps } from "@/components/blocks/NumberedSteps";
import { ProductHero } from "@/components/blocks/ProductHero";
import { ProductStage, ScrollingReport } from "@/components/blocks/ProductStage";
import { WhyPanel } from "@/components/blocks/WhyPanel";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { Placeholder } from "@/components/ui/placeholder";
import { Tag } from "@/components/ui/pills";
import { Reveal } from "@/components/ui/reveal";
import { Section, type Surface } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { TextLink } from "@/components/ui/text-link";
import { gbaEn } from "@/content/en/game-based-assessment";
import { images, missingScreens } from "@/content/images";
import { getPageContent } from "@/content/registry";
import { loadPage } from "@/content/load-page";
import type { Heading, SectionIntro } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { formatIDR } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { faqPageJsonLd } from "@/lib/structured-data";

// Game-Based Assessment: the page sales links most (WEBSITE-PLAN.md §5.3). Fifteen sections on
// White and Cloud in turn; the closer is the sky panel. Everything visible comes from
// src/content/en/game-based-assessment.ts. Section 11 is the client story link card, which points at
// the Telkom story (Task 4.2 builds that page; until it reaches `staging` the link 404s).

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
  });
}

const headingText = (heading: Heading) => (typeof heading === "string" ? heading : heading.join(" "));

/** A section with its centred header; `id` is the in-page anchor and names the region. */
function GbaSection({
  id,
  intro,
  surface = "white",
  tight,
  children,
}: {
  id: string;
  intro: SectionIntro;
  surface?: Surface;
  tight?: boolean;
  children: ReactNode;
}) {
  return (
    <Section id={id} surface={surface} tight={tight} aria-labelledby={`${id}-title`}>
      <Reveal>
        <SectionHeader id={`${id}-title`} label={intro.eyebrow} title={intro.title} lede={intro.lede} />
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

  // Module cards: the two screenshots on disk, and TODO tiles for the other two (guide §14.3).
  const moduleScreens = [
    { image: { ...images.gbaStory, alt: c.hero.window.story.alt } },
    { image: { ...images.gbaNumerical, alt: c.hero.window.cognitive.alt } },
    { placeholder: missingScreens.nextChapterBalloonGame[locale] },
    { placeholder: missingScreens.nextChapterBusinessOperations[locale] },
  ];
  const reportScreens = [
    missingScreens.gbaReportIndividual,
    missingScreens.gbaReportBatch,
    missingScreens.gbaReportInteractive,
  ];
  const reportIcons = [FileDown, Files, Link2];

  return (
    <>
      <Header cta="trial" ctaHref={c.hero.ctas[0]?.href} available={available} />
      <main>
        {/* 1. Hero */}
        <ProductHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} ctas={c.hero.ctas}>
          <div className="relative mx-auto grid max-w-[420px] gap-5 desk:max-w-none desk:grid-cols-[1fr_1.5fr_1fr] desk:items-start desk:gap-6">
            <PlayCard
              className="desk:mt-14"
              image={{ ...images.gbaStory, alt: c.hero.window.story.alt }}
              title={c.hero.window.story.title}
              meta={c.hero.window.story.meta}
              sizes="(max-width: 900px) 90vw, 330px"
            />
            <PlayCard
              image={{ ...images.gbaNumerical, alt: c.hero.window.cognitive.alt }}
              title={c.hero.window.cognitive.title}
              meta={c.hero.window.cognitive.meta}
              sizes="(max-width: 900px) 90vw, 480px"
            />
            <ResultCard className="desk:mt-40" {...c.hero.window.result} />
          </div>
        </ProductHero>

        {/* 2. The problem */}
        <GbaSection id="problem" intro={c.problem.intro} surface="cloud">
          <ul className="grid gap-5 desk:grid-cols-2">
            {c.problem.items.map((item, i) => (
              <Reveal as="li" index={i} key={item.title} className="rounded-lg border border-line bg-white p-7 desk:p-10">
                <h3 className="text-h3-panel text-ink">{item.title}</h3>
                <p className="mt-2.5 text-body-sm text-slate">{item.body}</p>
              </Reveal>
            ))}
          </ul>
          {/* the teaser jumps to the next section, as Enhance's does, so its azure label is a link's */}
          <a
            href="#principles"
            className="mt-5 block rounded-lg bg-sky-1 px-7 py-6 text-center text-title text-ink transition-colors duration-150 hover:bg-sky-2 desk:px-10"
          >
            <span className="text-azure-ink">{c.problem.teaser.label}</span> {c.problem.teaser.text}
          </a>
        </GbaSection>

        {/* 3. Three pillars */}
        <GbaSection id="principles" intro={c.principles.intro}>
          <Reveal>
            <WhyPanel items={c.principles.items} columns={3} />
          </Reveal>
        </GbaSection>

        {/* 4. Four modules */}
        <GbaSection id="modules" intro={c.modules.intro} tight>
          <ul className="grid gap-5 min-[600px]:grid-cols-2 desk:grid-cols-4">
            {c.modules.items.map((module, i) => {
              const screen = moduleScreens[i];
              return (
                <Reveal
                  as="li"
                  index={i}
                  key={module.name}
                  className="flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-soft"
                >
                  {screen?.image ? (
                    <Image
                      src={screen.image.src}
                      width={screen.image.width}
                      height={screen.image.height}
                      alt={screen.image.alt}
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 290px"
                      className="h-[170px] w-full object-cover"
                    />
                  ) : (
                    <Placeholder
                      caption={screen?.placeholder ?? ""}
                      className="h-[170px] min-h-0 rounded-none p-3"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <Tag className="self-start">{module.tag}</Tag>
                    <h3 className="mt-4 text-h3 text-ink">{module.name}</h3>
                    <p className="mt-2.5 text-card text-slate">{module.body}</p>
                    <TextLink href={module.cta.href} className="mt-auto pt-5">
                      {module.cta.label.replace(/\s*→$/, "")}
                    </TextLink>
                  </div>
                </Reveal>
              );
            })}
          </ul>
          <Reveal>
            <p className="mx-auto mt-10 max-w-[34em] text-center text-lede-sm text-balance text-slate desk:mt-16">
              {c.modules.note}
            </p>
          </Reveal>
        </GbaSection>

        {/* 5. Use cases */}
        <GbaSection id="use-cases" intro={c.useCases.intro} surface="cloud">
          <Reveal>
            <WhyPanel items={c.useCases.items} columns={3} surface="cloud" />
          </Reveal>
        </GbaSection>

        {/* 6. How it works */}
        <GbaSection id="how-it-works" intro={c.howItWorks.intro}>
          <Reveal>
            <NumberedSteps steps={c.howItWorks.steps} />
          </Reveal>
          <Reveal>
            <ul className="mt-14 flex flex-wrap justify-center gap-2.5 desk:mt-16">
              {c.howItWorks.chips.map((chip) => (
                <li key={chip}>
                  <Tag>{chip}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        </GbaSection>

        {/* 7. The platform behind it */}
        <GbaSection id="platform" intro={c.platform.intro} tight>
          <Reveal className="grid items-stretch gap-10 desk:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] desk:gap-14">
            <ul className="divide-y divide-line border-y border-line">
              {c.platform.items.map((item) => (
                <li key={item.title} className="py-5">
                  <h3 className="text-title-sm text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-card text-slate">{item.body}</p>
                </li>
              ))}
            </ul>
            <ProductStage placeholder={missingScreens.gbaCms[locale]} className="h-full" />
          </Reveal>
        </GbaSection>

        {/* 8. Reports */}
        <GbaSection id="reports" intro={c.reports.intro} surface="cloud">
          <Reveal>
            <SegmentedTabs
              surface="cloud"
              label={headingText(c.reports.intro.title)}
              items={c.reports.tabs.map((tab, i) => {
                const Icon = reportIcons[i] ?? FileDown;
                return {
                  value: `report-${i}`,
                  label: tab.label,
                  content: (
                    <div className="grid items-stretch gap-8 desk:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] desk:gap-10">
                      <div className="flex flex-col justify-center rounded-lg border border-line bg-white p-8 desk:p-10">
                        <p className="text-body text-slate">{tab.body}</p>
                        <p className="mt-6 flex items-start gap-2.5 border-t border-line pt-5 text-ui font-semibold text-ink">
                          <Icon aria-hidden="true" className="mt-[3px] size-[17px] shrink-0 text-azure" strokeWidth={2} />
                          {tab.format}
                        </p>
                      </div>
                      <ScrollingReport placeholder={reportScreens[i]?.[locale]} />
                    </div>
                  ),
                };
              })}
            />
          </Reveal>
        </GbaSection>

        {/* 9. Science, short */}
        <GbaSection id="science" intro={c.science.intro}>
          <Reveal>
            <InfoTiles items={c.science.pillars} columns={4} />
          </Reveal>
          <Reveal className="mt-10 flex justify-center">
            <TextLink href={c.science.link.href}>{c.science.link.label.replace(/\s*→$/, "")}</TextLink>
          </Reveal>
        </GbaSection>

        {/* 10. Business impact */}
        <GbaSection id="impact" intro={c.impact.intro} surface="cloud">
          <Reveal>
            <WhyPanel items={c.impact.items} surface="cloud" />
          </Reveal>
          {c.impact.badHireCost && (
            <Reveal>
              <p className="mx-auto mt-10 max-w-[40em] text-center text-body text-slate desk:mt-16">
                {c.impact.badHireCost}
              </p>
            </Reveal>
          )}
        </GbaSection>

        {/* 11. Client story link card: one row, no heading of its own (DESIGN-GUIDE.md §7.21) */}
        <Container className="pt-14 desk:pt-16">
          <Reveal>
            <LinkCard line={c.clientStory.line} href={c.clientStory.href} />
          </Reveal>
        </Container>

        {/* 12. Pricing */}
        <GbaSection id="pricing" intro={c.pricing.intro}>
          <Reveal className="mx-auto grid max-w-[960px] items-center gap-8 rounded-xl bg-cloud p-8 desk:grid-cols-[auto_1fr] desk:gap-16 desk:p-14">
            <div>
              <p className="text-label font-medium text-slate">{c.pricing.from.label}</p>
              <p className="mt-1 text-stat text-ink tabular-nums">
                {formatIDR(c.pricing.from.amount, locale)}
              </p>
              <p className="mt-2 text-body-sm text-slate">{c.pricing.from.unit}</p>
            </div>
            <div>
              <p className="max-w-[26em] text-lede-sm text-slate">{c.pricing.lede}</p>
              <Button asChild className="mt-8">
                <Link href={c.pricing.cta.href}>{c.pricing.cta.label}</Link>
              </Button>
            </div>
          </Reveal>
        </GbaSection>

        {/* 13. Smooth adoption */}
        <GbaSection id="adoption" intro={c.adoption.intro} surface="cloud">
          <Reveal>
            <InfoTiles items={c.adoption.items} columns={4} check />
          </Reveal>
        </GbaSection>

        {/* 14. FAQ */}
        <GbaSection id="faq" intro={c.faq.intro}>
          <Reveal>
            <Accordion items={c.faq.items} />
          </Reveal>
          <JsonLd data={faqPageJsonLd(c.faq.items)} />
        </GbaSection>

        {/* 15. Closer */}
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
    </>
  );
}
