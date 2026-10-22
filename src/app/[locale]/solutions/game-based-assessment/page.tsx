import { ArrowDown, Check, FileDown, Files, Link2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PlayCard, ResultCard } from "@/components/blocks/DataCards";
import { GameGrid, GameTile } from "@/components/blocks/GameTile";
import { MissGain } from "@/components/blocks/MissGain";
import { ModuleTabs } from "@/components/blocks/ModuleTabs";
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
// holds the four modules, one section each, shown one at a time under a sticky pill of tabs (F40):
// Personality (the former DEUS Discover page) and Cognitive, Neuroscience and Simulation (the former
// Next Chapter page), whose routes redirect here (next.config.ts). Sections sit on White and Cloud in turn; the closer is the
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
 *  section (`anchored`) scrolls so its section label lands just under the header and the sub-nav
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

/** A tab's own heading in "Behind the results" (F70): the title its section had, now an H3 under
 *  the tab named by its eyebrow, and its lede if it has one. */
function TabHeading({ intro }: { intro: SectionIntro }) {
  return (
    <div className="text-center">
      <h3 className="mx-auto max-w-[24em] text-h3-panel text-balance text-ink">{headingText(intro.title)}</h3>
      {intro.lede && <p className="mx-auto mt-4 max-w-[40em] text-body text-balance text-slate">{intro.lede}</p>}
    </div>
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

  /** A module's games: three columns on a laptop, a sideways-swipe row on a phone (F40). The row
   *  scrolls, so it takes keyboard focus and is named after its module. */
  const gameList = (games: readonly GameRow[], name: Heading) => (
    <Reveal>
      <GameGrid variant="list" tabIndex={0} aria-label={headingText(name)}>
        {games.map((game) => (
          <GameTile key={game.name} size="list" title={game.name} caption={game.measures} {...screenOf(game.name, game.alt)} />
        ))}
      </GameGrid>
    </Reveal>
  );

  /** A module tab's label, from the sub-nav list. */
  const moduleLabel = (id: string) => c.modules.nav.find((item) => item.id === id)?.label ?? id;

  /** The link at the end of a module to the one after it (F40), so reading all four doesn't mean
   *  scrolling back up to the pill. The last module has none. */
  const nextModule = (id: string) => {
    const next = c.modules.nav[c.modules.nav.findIndex((item) => item.id === id) + 1];
    if (!next) return null;
    return (
      <Reveal className="mt-12 flex justify-center desk:mt-16">
        <TextLink href={`#${next.id}`}>{c.modules.next.replace("{module}", next.label)}</TextLink>
      </Reveal>
    );
  };

  // The reports' screens: on disk, or a TODO until the screenshot arrives (guide §14.3).
  const personalityReports = [
    { image: images.discoverReport },
    { placeholder: missingScreens.discoverProfileSuitability[locale] },
  ];
  const reportScreens = [
    { placeholder: missingScreens.gbaReportIndividual[locale] },
    { image: images.gbaReportBatch },
    { image: images.gbaReportInteractive },
  ];
  const reportIcons = [FileDown, Files, Link2];

  return (
    <>
      <Header cta="trial" ctaHref={c.hero.ctas[0]?.href} available={available} />
      <main>
        {/* 1. Hero */}
        <ProductHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} ctas={c.hero.ctas}>
          {/* the cognitive game leads, the story card and a result under it */}
          <div className="mx-auto grid max-w-[460px] gap-5 desk:max-w-none desk:grid-cols-2 desk:items-center">
            <PlayCard
              className="desk:col-span-2"
              image={{ ...images.gbaNumerical, alt: c.hero.window.cognitive.alt }}
              title={c.hero.window.cognitive.title}
              meta={c.hero.window.cognitive.meta}
              sizes="(max-width: 900px) 90vw, 640px"
            />
            <PlayCard
              image={{ ...images.gbaStory, alt: c.hero.window.story.alt }}
              title={c.hero.window.story.title}
              meta={c.hero.window.story.meta}
              sizes="(max-width: 900px) 90vw, 320px"
            />
            <ResultCard {...c.hero.window.result} />
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

        {/* 4. The modules (F40): the suite's header, then the four modules as tabs, one showing at a
            time. The header has no bottom padding, so it leads straight into the pill and the
            module, all on the same White. The pill sticks while the module is on screen, and lets
            go after it. Each module ends with a link to the next one. */}
        <div>
          <GbaSection id="modules" intro={c.modules.intro} tight className="pb-0" />
          <ModuleTabs
            className="mt-8"
            label={c.modules.navLabel}
            nextLabel={c.modules.next}
            items={[
              {
                id: personality.id,
                label: moduleLabel(personality.id),
                // Personality · DEUS Discover: a real Discover story scene (F19); the report crop is still to come.
                content: (
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
                      <ProductStage image={{ ...images.discoverFestival, alt: personality.story.alt }} />
                    </Reveal>
                    <Reveal className="mt-16 desk:mt-20">
                      <h3 className="text-center text-title-sm text-ink">{personality.measures.title}</h3>
                      <StatReadout stats={personality.measures.stats} className="mt-6" />
                      <p className="mx-auto mt-8 max-w-[40em] text-center text-lede-sm text-balance text-slate desk:mt-10">
                        <Rich text={personality.measures.lede} />
                      </p>
                    </Reveal>
                    {/* F64: the panels' heading is gone; they follow the measures on their own */}
                    <Reveal className="mt-14 desk:mt-16">
                      <WhyPanel items={personality.customization.items} columns={3} />
                    </Reveal>
                    {nextModule(personality.id)}
                  </GbaSection>
                ),
              },
              {
                id: cognitive.id,
                label: moduleLabel(cognitive.id),
                content: (
                  <GbaSection id={cognitive.id} intro={cognitive.intro} anchored tight>
                    {gameList(cognitive.games, cognitive.intro.title)}
                    <MissGain className="mt-12 desk:mt-16" missGain={cognitive.missGain} />
                    {nextModule(cognitive.id)}
                  </GbaSection>
                ),
              },
              {
                id: neuro.id,
                label: moduleLabel(neuro.id),
                content: (
                  <GbaSection id={neuro.id} intro={neuro.intro} anchored tight>
                    {gameList(neuro.games, neuro.intro.title)}
                    <MissGain className="mt-12 desk:mt-16" missGain={neuro.missGain} />
                    {nextModule(neuro.id)}
                  </GbaSection>
                ),
              },
              {
                id: simulation.id,
                label: moduleLabel(simulation.id),
                content: (
                  <GbaSection id={simulation.id} intro={simulation.intro} anchored tight>
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
                    {/* F25: a two-column list with thin dividers (one column on a phone), not pills. The
                        hairlines run the full width, so the columns are split by padding, not a gap. */}
                    <Reveal className="mx-auto mt-12 max-w-[760px] desk:mt-14">
                      <h3 className="text-center text-title-sm text-ink">{simulation.assesses.title}</h3>
                      <ul className="mt-5 grid border-t border-line min-[600px]:grid-cols-2">
                        {simulation.assesses.points.map((point) => (
                          <li
                            key={point}
                            className="border-b border-line py-4 text-body font-semibold text-ink-2 min-[600px]:odd:pr-6 min-[600px]:even:pl-6"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                    <MissGain className="mt-12 desk:mt-16" missGain={simulation.missGain} />
                  </GbaSection>
                ),
              },
            ]}
          />
        </div>

        {/* 5. Use cases: Cloud after the White modules */}
        <GbaSection id="use-cases" intro={c.useCases.intro} surface="cloud">
          <Reveal>
            <WhyPanel items={c.useCases.items} columns={3} surface="cloud" />
          </Reveal>
        </GbaSection>

        {/* 6. Reports */}
        <GbaSection id="reports" intro={c.reports.intro}>
          <Reveal>
            <SegmentedTabs
              label={headingText(c.reports.intro.title)}
              items={[
                ...c.reports.tabs.map((tab, i) => {
                  const Icon = reportIcons[i] ?? FileDown;
                  const screen = reportScreens[i];
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
                        <ScrollingReport
                          image={screen?.image ? { ...screen.image, alt: tab.alt ?? "" } : undefined}
                          placeholder={screen?.placeholder}
                        />
                      </div>
                    ),
                  };
                }),
                // F40: the personality module's two reports are the last tab, side by side
                {
                  value: "report-personality",
                  label: c.reports.personality.label,
                  content: (
                    <>
                      <h3 className="text-center text-h3-panel text-ink">{c.reports.personality.title}</h3>
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
                    </>
                  ),
                },
              ]}
            />
          </Reveal>
        </GbaSection>

        {/* 7. How it works (F70): the four steps, then the free trial and pilot offer that was
            "Getting started", with its button, as a white panel just above Pricing */}
        <GbaSection id="how-it-works" intro={c.howItWorks.intro} surface="cloud">
          <Reveal>
            <NumberedSteps steps={c.howItWorks.steps} />
          </Reveal>
          <Reveal className="mx-auto mt-14 max-w-[960px] rounded-xl bg-white p-8 desk:mt-16 desk:p-12">
            <h3 className="text-center text-h3-panel text-balance text-ink">{c.howItWorks.start.title}</h3>
            <ul className="mt-6 grid gap-x-10 gap-y-4 min-[600px]:grid-cols-2 desk:mt-8">
              {c.howItWorks.start.items.map((item) => (
                <li key={item.title} className="flex items-start gap-2.5">
                  <Check aria-hidden="true" className="mt-[3px] size-[18px] shrink-0 text-azure" strokeWidth={2.4} />
                  <p className="text-card text-slate">
                    <strong className="font-bold text-ink">{item.title}.</strong> {item.body}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center desk:mt-10">
              <Button asChild>
                <Link href={c.howItWorks.start.cta.href}>{c.howItWorks.start.cta.label}</Link>
              </Button>
            </div>
          </Reveal>
        </GbaSection>

        {/* 8. Pricing: as high as it sensibly goes (F70) */}
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

        {/* 9. Behind the results (F70): the platform, the science (F28, the former Science page) and
            before-and-after as three tabs, each holding its former section under its own heading.
            #platform, #science (the /science redirect) and #impact open their tab. */}
        <GbaSection id="behind-results" intro={c.behind.intro} surface="cloud">
          <Reveal>
            <SegmentedTabs
              surface="cloud"
              label={c.behind.intro.eyebrow}
              items={[
                {
                  value: "platform",
                  anchor: "platform",
                  label: c.platform.intro.eyebrow,
                  content: (
                    <>
                      <TabHeading intro={c.platform.intro} />
                      <div className="mt-10 grid items-stretch gap-10 desk:mt-12 desk:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] desk:gap-14">
                        <ul className="divide-y divide-line border-y border-line">
                          {c.platform.items.map((item) => (
                            <li key={item.title} className="py-5">
                              <h3 className="text-title-sm text-ink">{item.title}</h3>
                              <p className="mt-1.5 text-card text-slate">{item.body}</p>
                            </li>
                          ))}
                        </ul>
                        <ProductStage image={{ ...images.gbaCms, alt: c.platform.alt }} className="h-full" />
                      </div>
                    </>
                  ),
                },
                {
                  value: "science",
                  anchor: "science",
                  label: c.science.intro.eyebrow,
                  // the frameworks, each a link down to its module; the four phases; three points;
                  // and the psychologists line with its button
                  content: (
                    <>
                      <TabHeading intro={c.science.intro} />
                      <ul className="mt-10 grid gap-5 desk:mt-12 desk:grid-cols-3">
                        {c.science.frameworks.map((item) => (
                          <li key={item.title}>
                            <a
                              href={item.href}
                              className="group flex h-full flex-col rounded-md border border-line bg-white px-6 py-[22px] transition-colors duration-150 hover:border-azure"
                            >
                              <h3 className="text-title-sm text-ink">{item.title}</h3>
                              <p className="mt-2 text-card text-slate">{item.body}</p>
                              <ArrowDown
                                aria-hidden="true"
                                className="mt-4 size-[18px] text-azure transition-transform duration-150 group-hover:translate-y-0.5"
                                strokeWidth={2}
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-16 desk:mt-20">
                        <h3 className="mx-auto max-w-[24em] text-center text-h3-panel text-balance text-ink">
                          {c.science.process.title}
                        </h3>
                        <p className="mx-auto mt-4 max-w-[40em] text-center text-body text-balance text-slate">
                          {c.science.process.lede}
                        </p>
                        <NumberedSteps steps={c.science.process.steps} className="mt-10 desk:mt-12" />
                      </div>
                      <WhyPanel items={c.science.points} columns={3} surface="cloud" className="mt-16 desk:mt-20" />
                      <div className="mx-auto mt-14 flex max-w-[40em] flex-col items-center text-center desk:mt-16">
                        <p className="text-lede-sm text-balance text-slate">{c.science.closing.text}</p>
                        <Button asChild variant="secondary" className="mt-6">
                          <Link href={c.science.closing.cta.href}>{c.science.closing.cta.label}</Link>
                        </Button>
                      </div>
                    </>
                  ),
                },
                {
                  value: "impact",
                  anchor: "impact",
                  label: c.impact.intro.eyebrow,
                  content: (
                    <>
                      <TabHeading intro={c.impact.intro} />
                      <WhyPanel items={c.impact.items} surface="cloud" className="mt-10 desk:mt-12" />
                      {c.impact.badHireCost && (
                        <p className="mx-auto mt-10 max-w-[40em] text-center text-body text-slate desk:mt-16">
                          {c.impact.badHireCost}
                        </p>
                      )}
                    </>
                  ),
                },
              ]}
            />
          </Reveal>
        </GbaSection>

        {/* 10. Client stories: one centred line (F18) */}
        <Container className="pt-14 desk:pt-16">
          <Reveal className="flex justify-center">
            <TextLink href={c.clientsLink.href}>{c.clientsLink.label}</TextLink>
          </Reveal>
        </Container>

        {/* 11. FAQ */}
        <GbaSection id="faq" intro={c.faq.intro}>
          <Reveal>
            <Accordion items={c.faq.items} />
          </Reveal>
          <JsonLd data={faqPageJsonLd(c.faq.items)} />
        </GbaSection>

        {/* 12. Closer */}
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
