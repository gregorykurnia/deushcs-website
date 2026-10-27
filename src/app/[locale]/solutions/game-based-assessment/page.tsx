import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PlayCard } from "@/components/blocks/DataCards";
import { DownloadOffer } from "@/components/blocks/DownloadOffer";
import { GameGrid, GameTile } from "@/components/blocks/GameTile";
import { MissGain } from "@/components/blocks/MissGain";
import { ModuleTabs } from "@/components/blocks/ModuleTabs";
import { ProductHero } from "@/components/blocks/ProductHero";
import { ProductStage } from "@/components/blocks/ProductStage";
import { StatReadout } from "@/components/blocks/StatReadout";
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
import { Placeholder } from "@/components/ui/placeholder";
import { Tag } from "@/components/ui/pills";
import { Reveal } from "@/components/ui/reveal";
import { Rich } from "@/components/ui/rich";
import { Section, type Surface } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TextLink } from "@/components/ui/text-link";
import { gbaEn } from "@/content/en/game-based-assessment";
import { siteFlags } from "@/content/flags";
import { gameImages, gameMissing, images, missingScreens } from "@/content/images";
import { getPageContent, localesFor } from "@/content/registry";
import { getUseCase } from "@/content/use-cases";
import { loadPage } from "@/content/load-page";
import type { GameRow, Heading, SectionIntro } from "@/content/types";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { faqPageJsonLd, softwareApplicationJsonLd } from "@/lib/structured-data";
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
    locales: localesFor("gba"),
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
  intro: Omit<SectionIntro, "eyebrow"> & { eyebrow?: string };
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

        {/* 3. The modules (F40): the suite's header, then the four modules as tabs, one showing at a
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

        {/* 4. Use cases: Cloud after the White modules */}
        <GbaSection id="use-cases" intro={c.useCases.intro} surface="cloud">
          <Reveal>
            <WhyPanel
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
          featureList: [personality, cognitive, neuro, simulation].map((m) => headingText(m.intro.title)),
        })}
      />
    </>
  );
}
