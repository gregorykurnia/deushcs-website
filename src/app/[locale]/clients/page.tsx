import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LogoGroups } from "@/components/blocks/LogoWall";
import { IndustryTicker } from "@/components/blocks/StatReadout";
import { StoryCard, StoryGrid } from "@/components/blocks/StoryCard";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/pills";
import { Reveal } from "@/components/ui/reveal";
import { Section, type Surface } from "@/components/ui/section";
import { HeadingLines, SectionHeader } from "@/components/ui/section-header";
import { clientsEn } from "@/content/en/clients";
import { siteFlags } from "@/content/flags";
import { loadPage } from "@/content/load-page";
import { getPageContent } from "@/content/registry";
import type { ClientsContent, SectionIntro } from "@/content/types";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// The Clients hub (WEBSITE-PLAN.md §5.8, DESIGN-GUIDE.md §7.20 and §7.21): the company-wide "40+ brands",
// the logo wall (hidden until the owner approves logos, Q8), the industries, one card per client story
// and the closer. Everything visible comes from src/content/en/clients.ts. It is English only, so an
// Indonesian address redirects here (loadPage).

const PATH = "/clients";

export async function generateMetadata({ params }: PageProps<"/[locale]/clients">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this page redirects in the page itself; its metadata falls back to English
  const content: ClientsContent = getPageContent("clients", locale) ?? clientsEn;
  return pageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: getPageContent("clients", locale) ? locale : "en",
    path: PATH,
  });
}

/** The hero: section label, headline and lede, on the same glow as About. No sky window. */
function ClientsHero({ hero }: { hero: ClientsContent["hero"] }) {
  return (
    <section
      aria-labelledby="clients-hero-title"
      className="relative isolate overflow-x-clip -mt-[84px] pt-[156px] pb-[var(--section-y)] max-[479px]:-mt-[68px] max-[479px]:pt-[140px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-340px] left-1/2 -z-10 h-[1100px] w-[1700px] -translate-x-1/2 bg-[image:var(--grad-hero-glow)]"
      />
      <Container className="text-center">
        <SectionLabel className="mb-6">{hero.eyebrow}</SectionLabel>
        <h1 id="clients-hero-title" className="mx-auto max-w-[11em] text-display text-balance text-ink">
          <HeadingLines lines={hero.title} />
        </h1>
        <p className="mx-auto mt-7 max-w-[34em] text-lede text-balance text-slate">{hero.lede}</p>
      </Container>
    </section>
  );
}

/** A section with its centred header; `id` is the in-page anchor and names the region. */
function ClientsSection({
  id,
  intro,
  surface,
  children,
}: {
  id: string;
  intro: SectionIntro;
  surface: Surface;
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

export default async function ClientsPage({ params }: PageProps<"/[locale]/clients">) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { content: c, available } = loadPage("clients", locale);

  // The logo wall shows only once logos are approved (Q8). Sections alternate after the White hero,
  // so the wall, when it shows, takes the first Cloud band and pushes the rest along by one.
  const wallOn = siteFlags[c.logoWall.flag] && c.logoWall.groups.length > 0;
  const industriesSurface: Surface = wallOn ? "white" : "cloud";
  const storiesSurface: Surface = wallOn ? "cloud" : "white";

  return (
    <>
      <Header cta="demo" available={available} />
      <main>
        {/* 1. Hero: the company-wide number */}
        <ClientsHero hero={c.hero} />

        {/* 2. Logo wall: approved logos only, grouped by company, behind showLogoWall (Q8) */}
        {wallOn && (
          <Section id="logos" surface="cloud">
            <Reveal>
              <LogoGroups groups={c.logoWall.groups} />
            </Reveal>
          </Section>
        )}

        {/* 3. Industries: one at a time on a loop, as on Home (F81) */}
        <ClientsSection id="industries" intro={c.industries} surface={industriesSurface}>
          <Reveal>
            <IndustryTicker items={c.industries.items} />
          </Reveal>
        </ClientsSection>

        {/* 4. Client stories: one card per story. Calvin's card waits behind publishCalvin (Q11). */}
        <ClientsSection id="stories" intro={c.stories} surface={storiesSurface}>
          <Reveal>
            <StoryGrid>
              {c.stories.cards.map((card) => (
                <StoryCard
                  key={card.slug}
                  product={card.product}
                  client={card.client}
                  result={card.result}
                  href={`/clients/${card.slug}`}
                  note={card.note}
                />
              ))}
            </StoryGrid>
          </Reveal>
        </ClientsSection>

        {/* 5. Closer: the demo button and the WhatsApp button come from the closing panel */}
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
