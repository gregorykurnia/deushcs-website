import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PlayCard } from "@/components/blocks/DataCards";
import { GameGrid, GameTile } from "@/components/blocks/GameTile";
import { MissGain } from "@/components/blocks/MissGain";
import { ModuleChipsCard } from "@/components/blocks/ModuleChipsCard";
import { ModuleNav } from "@/components/blocks/ModuleNav";
import { ProductHero } from "@/components/blocks/ProductHero";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { DataTable } from "@/components/ui/data-table";
import { Placeholder } from "@/components/ui/placeholder";
import { Tag } from "@/components/ui/pills";
import { Reveal } from "@/components/ui/reveal";
import { Section, type Surface } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { nextChapterEn } from "@/content/en/next-chapter";
import { images, missingScreens, nextChapterImages, nextChapterMissing } from "@/content/images";
import { loadPage } from "@/content/load-page";
import { getPageContent } from "@/content/registry";
import type { GameRow, SectionIntro } from "@/content/types";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// Next Chapter: the cognitive, neuroscience and simulation modules (WEBSITE-PLAN.md §5.5).
// Hero, three module sections under a sticky pill sub-nav, the use-case table and the closer.
// Everything visible comes from src/content/en/next-chapter.ts; the screens come from
// src/content/images.ts, and a game without one shows its TODO tile (DESIGN-GUIDE.md §14.3).

const PATH = "/solutions/next-chapter";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/solutions/next-chapter">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this page redirects in the page itself; its metadata falls back to English
  const content = getPageContent("nextChapter", locale) ?? nextChapterEn;
  return pageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: getPageContent("nextChapter", locale) ? locale : "en",
    path: PATH,
  });
}

/** A section with its centred header; `id` is the in-page anchor and names the region. A module
 *  section scrolls to just under the header and the sub-nav (84px + 79px + 12px of air). */
function NextChapterSection({
  id,
  intro,
  surface = "white",
  tight,
  anchored,
  children,
}: {
  id: string;
  intro: SectionIntro;
  surface?: Surface;
  tight?: boolean;
  anchored?: boolean;
  children: ReactNode;
}) {
  return (
    <Section
      id={id}
      surface={surface}
      tight={tight}
      aria-labelledby={`${id}-title`}
      className={anchored ? "scroll-mt-[calc(175px-var(--section-y))]" : undefined}
    >
      <Reveal>
        <SectionHeader id={`${id}-title`} label={intro.eyebrow} title={intro.title} lede={intro.lede} />
      </Reveal>
      {children}
    </Section>
  );
}

export default async function NextChapterPage({ params }: PageProps<"/[locale]/solutions/next-chapter">) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { content: c, available } = loadPage("nextChapter", locale);

  /** The screen of a game: the screenshot on disk, or the TODO caption in its place. */
  const screenOf = (game: GameRow) => {
    const asset = nextChapterImages[game.name];
    if (asset) return { image: { ...asset, alt: game.alt ?? "" } };
    const missing = nextChapterMissing[game.name as keyof typeof nextChapterMissing];
    return { placeholder: missing ? missingScreens[missing][locale] : "" };
  };

  const gameList = (games: readonly GameRow[]) => (
    <Reveal>
      <GameGrid variant="list">
        {games.map((game) => (
          <GameTile key={game.name} size="list" title={game.name} caption={game.measures} {...screenOf(game)} />
        ))}
      </GameGrid>
    </Reveal>
  );

  return (
    <>
      <Header cta="trial" ctaHref={c.hero.ctas[0]?.href} available={available} />
      <main>
        {/* 1. Hero */}
        <ProductHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} ctas={c.hero.ctas}>
          <div className="relative mx-auto grid max-w-[420px] gap-5 desk:max-w-[880px] desk:grid-cols-[1.5fr_1fr] desk:items-start desk:gap-8">
            <PlayCard
              image={{ ...images.gbaSpeed, alt: c.hero.window.game.alt }}
              title={c.hero.window.game.title}
              meta={c.hero.window.game.meta}
              sizes="(max-width: 900px) 90vw, 520px"
            />
            <ModuleChipsCard className="desk:mt-24" chips={c.moduleChips} label={c.moduleNavLabel} />
          </div>
        </ProductHero>

        {/* The sub-nav sticks while the three modules are on screen, and lets go after the last */}
        <div>
          <ModuleNav className="mt-8" items={c.moduleChips} label={c.moduleNavLabel} />

          {/* 2. Cognitive */}
          <NextChapterSection id={c.cognitive.id} intro={c.cognitive.intro} anchored tight>
            {gameList(c.cognitive.games)}
            <MissGain className="mt-12 desk:mt-16" missGain={c.cognitive.missGain} />
          </NextChapterSection>

          {/* 3. Neuroscience */}
          <NextChapterSection id={c.neuro.id} intro={c.neuro.intro} surface="cloud" anchored>
            {gameList(c.neuro.games)}
            <MissGain className="mt-12 desk:mt-16" missGain={c.neuro.missGain} surface="cloud" />
          </NextChapterSection>

          {/* 4. Simulation */}
          <NextChapterSection id={c.simulation.id} intro={c.simulation.intro} anchored>
            <ul className="grid gap-5 desk:grid-cols-2">
              {c.simulation.scenarios.map((scenario, i) => (
                <Reveal
                  as="li"
                  index={i}
                  key={scenario.name}
                  className="flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-soft"
                >
                  <Placeholder
                    caption={missingScreens[nextChapterMissing[scenario.name as keyof typeof nextChapterMissing]][locale]}
                    className="h-[200px] min-h-0 rounded-none"
                  />
                  <div className="flex flex-1 flex-col p-6 desk:p-8">
                    <Tag className="self-start">{scenario.label}</Tag>
                    <h3 className="mt-4 text-h3 text-ink">{scenario.name}</h3>
                    <p className="mt-2.5 text-card text-slate">{scenario.body}</p>
                    <p className="mt-auto border-t border-line pt-4 text-card font-medium text-ink">
                      {scenario.measures}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-12 text-center desk:mt-14">
              <h3 className="text-title-sm text-ink">{c.simulation.assesses.title}</h3>
              <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
                {c.simulation.assesses.points.map((point) => (
                  <li key={point}>
                    <Tag>{point}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
            <MissGain className="mt-12 desk:mt-16" missGain={c.simulation.missGain} />
          </NextChapterSection>
        </div>

        {/* 5. Which module for which use case: the table's mobile layout is stacked cards */}
        <NextChapterSection id="choosing" intro={c.choosing.intro} surface="cloud">
          <Reveal>
            <DataTable
              caption={c.choosing.caption}
              captionHidden
              mobile="cards"
              columns={[
                { key: "useCase", label: c.choosing.columns.useCase },
                { key: "modules", label: c.choosing.columns.modules },
              ]}
              rows={c.choosing.rows}
            />
          </Reveal>
        </NextChapterSection>

        {/* 6. Closer */}
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
