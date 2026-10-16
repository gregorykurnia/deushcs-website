import { FileDown, Files, Link2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PlayCard, ResultCard } from "@/components/blocks/DataCards";
import { GameGrid, GameTile } from "@/components/blocks/GameTile";
import { InfoTiles } from "@/components/blocks/InfoTiles";
import { LinkCard } from "@/components/blocks/LinkCard";
import { MissGain } from "@/components/blocks/MissGain";
import { ModuleNav } from "@/components/blocks/ModuleNav";
import { NumberedSteps } from "@/components/blocks/NumberedSteps";
import { ProductHero } from "@/components/blocks/ProductHero";
import { ProductStage, ScrollingReport } from "@/components/blocks/ProductStage";
import { StatReadout } from "@/components/blocks/StatReadout";
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
import { Rich } from "@/components/ui/rich";
import { Section, type Surface } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { TextLink } from "@/components/ui/text-link";
import { gbaEn } from "@/content/en/game-based-assessment";
import { gameImages, gameMissing, images, missingScreens } from "@/content/images";
import { getPageContent } from "@/content/registry";
import { loadPage } from "@/content/load-page";
import type { GameRow, Heading, SectionIntro } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { formatIDR } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { faqPageJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

// Game-Based Assessment: the page sales links most (WEBSITE-PLAN.md §5.3). Since R2 (F10) it also
// holds the four modules, one section each under a sticky pill sub-nav: Personality (the former DEUS
// Discover page) and Cognitive, Neuroscience and Simulation (the former Next Chapter page), whose
// routes redirect here (next.config.ts). Sections sit on White and Cloud in turn; the closer is the
// sky panel. Everything visible comes from src/content/en/game-based-assessment.ts; the game screens
// come from src/content/images.ts, and a game without one shows its TODO tile (DESIGN-GUIDE.md §14.3).

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

/** A section with its centred header; `id` is the in-page anchor and names the region. A module
 *  section (`anchored`) scrolls so its label pill lands just under the header and the sub-nav
 *  (84px + 79px + 12px of air; the header is 68px below 480px), whichever top padding it has. */
function GbaSection({
  id,
  intro,
  surface = "white",
  tight,
  anchored,
  className,
  children,
}: {
  id: string;
  intro: SectionIntro;
  surface?: Surface;
  tight?: boolean;
  anchored?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Section
      id={id}
      surface={surface}
      tight={tight}
      aria-labelledby={`${id}-title`}
      className={cn(
        anchored && "[--module-top:175px] max-[479px]:[--module-top:159px]",
        anchored &&
          (tight
            ? "scroll-mt-[calc(var(--module-top)-var(--section-y-tight))]"
            : "scroll-mt-[calc(var(--module-top)-var(--section-y))]"),
        className,
      )}
    >
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

  const { personality, cognitive, neuro, simulation } = c.modules;

  /** The screen of a game or scenario: the screenshot on disk, or the TODO caption in its place.
   *  A name in neither map would be a blank tile, so the build fails instead. */
  const screenOf = (name: string, alt?: string) => {
    const asset = gameImages[name];
    if (asset) return { image: { ...asset, alt: alt ?? "" } };
    const missing = gameMissing[name as keyof typeof gameMissing];
    if (!missing) throw new Error(`GBA: no screen or TODO caption for "${name}" (src/content/images.ts)`);
    return { placeholder: missingScreens[missing][locale] };
  };

  const gameList = (games: readonly GameRow[]) => (
    <Reveal>
      <GameGrid variant="list">
        {games.map((game) => (
          <GameTile key={game.name} size="list" title={game.name} caption={game.measures} {...screenOf(game.name, game.alt)} />
        ))}
      </GameGrid>
    </Reveal>
  );

  // The personality reports: the report is on disk; profile suitability is a TODO until its
  // screenshot arrives (guide §14.3).
  const personalityReports = [
    { image: images.discoverReport },
    { placeholder: missingScreens.discoverProfileSuitability[locale] },
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

        {/* 4. The modules: the suite's header, then one section per module. The header has no bottom
            padding, so it leads straight into the sub-nav and the first module, on the same White. The
            sub-nav sticks while the four are on screen, and lets go after the last. */}
        <div>
          <GbaSection id="modules" intro={c.modules.intro} tight className="pb-0" />
          <ModuleNav className="mt-8" items={c.modules.nav} label={c.modules.navLabel} />

          {/* 4a. Personality · DEUS Discover. Until the real story scene and report crop arrive (F19),
              the story screen stands alone. */}
          <GbaSection id={personality.id} intro={personality.intro} anchored tight>
            <Reveal className="grid items-center gap-10 desk:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] desk:gap-14">
              <div>
                <h3 className="text-h3-panel text-ink">{personality.story.title}</h3>
                <div className="mt-5 space-y-5 text-body text-slate">
                  {personality.story.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <ProductStage image={{ ...images.gbaStory, alt: personality.story.alt }} />
            </Reveal>
            <Reveal className="mt-16 desk:mt-20">
              <h3 className="text-center text-title-sm text-ink">{personality.measures.title}</h3>
              <StatReadout stats={personality.measures.stats} className="mt-6" />
              <p className="mx-auto mt-8 max-w-[40em] text-center text-lede-sm text-balance text-slate desk:mt-10">
                <Rich text={personality.measures.lede} />
              </p>
            </Reveal>
            <Reveal className="mt-16 desk:mt-20">
              <h3 className="mx-auto max-w-[24em] text-center text-h3-panel text-balance text-ink">
                {personality.customization.title}
              </h3>
              <WhyPanel items={personality.customization.items} columns={3} className="mt-8 desk:mt-10" />
            </Reveal>
          </GbaSection>

          {/* 4b. Cognitive */}
          <GbaSection id={cognitive.id} intro={cognitive.intro} surface="cloud" anchored>
            {gameList(cognitive.games)}
            <MissGain className="mt-12 desk:mt-16" missGain={cognitive.missGain} surface="cloud" />
          </GbaSection>

          {/* 4c. Neuroscience */}
          <GbaSection id={neuro.id} intro={neuro.intro} anchored>
            {gameList(neuro.games)}
            <MissGain className="mt-12 desk:mt-16" missGain={neuro.missGain} />
          </GbaSection>

          {/* 4d. Simulation */}
          <GbaSection id={simulation.id} intro={simulation.intro} surface="cloud" anchored>
            <ul className="grid gap-5 desk:grid-cols-2">
              {simulation.scenarios.map((scenario, i) => {
                const { image, placeholder } = screenOf(scenario.name);
                return (
                  <Reveal
                    as="li"
                    index={i}
                    key={scenario.name}
                    className="flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-soft"
                  >
                    {image ? (
                      <div className="relative h-[200px] overflow-hidden bg-[image:var(--grad-thumb)]">
                        <Image
                          src={image.src}
                          width={image.width}
                          height={image.height}
                          alt={image.alt}
                          sizes="(max-width: 900px) 90vw, 560px"
                          className="absolute top-6 left-6 w-[88%] max-w-none rounded-md shadow-float"
                        />
                      </div>
                    ) : (
                      <Placeholder caption={placeholder} className="h-[200px] min-h-0 rounded-none" />
                    )}
                    <div className="flex flex-1 flex-col p-6 desk:p-8">
                      <Tag className="self-start">{scenario.label}</Tag>
                      <h3 className="mt-4 text-h3 text-ink">{scenario.name}</h3>
                      <p className="mt-2.5 text-card text-slate">{scenario.body}</p>
                      <p className="mt-auto border-t border-line pt-4 text-card font-medium text-ink">
                        {scenario.measures}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
            <Reveal className="mt-12 text-center desk:mt-14">
              <h3 className="text-title-sm text-ink">{simulation.assesses.title}</h3>
              <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
                {simulation.assesses.points.map((point) => (
                  <li key={point}>
                    <Tag>{point}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
            <MissGain className="mt-12 desk:mt-16" missGain={simulation.missGain} surface="cloud" />
          </GbaSection>
        </div>

        {/* 5. Use cases */}
        <GbaSection id="use-cases" intro={c.useCases.intro}>
          <Reveal>
            <WhyPanel items={c.useCases.items} columns={3} />
          </Reveal>
        </GbaSection>

        {/* 6. How it works */}
        <GbaSection id="how-it-works" intro={c.howItWorks.intro} surface="cloud">
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
          {/* the personality module's two reports, side by side */}
          <Reveal className="mt-16 desk:mt-20">
            <h3 className="text-center text-h3-panel text-ink">{c.reports.personality.title}</h3>
          </Reveal>
          <ul className="mt-8 grid gap-6 desk:mt-10 desk:grid-cols-2">
            {c.reports.personality.items.map((item, i) => {
              const screen = personalityReports[i];
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
                  <h4 className="mt-7 text-h3-panel text-ink">{item.title}</h4>
                  <p className="mt-2.5 text-body-sm text-slate">{item.body}</p>
                </Reveal>
              );
            })}
          </ul>
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
