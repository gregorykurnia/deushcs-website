import type { CSSProperties, ReactNode } from "react";
import { DownloadOffer } from "@/components/blocks/DownloadOffer";
import { PlayCard } from "@/components/blocks/DataCards";
import { NumberedSteps } from "@/components/blocks/NumberedSteps";
import { ProductHero } from "@/components/blocks/ProductHero";
import { RelatedGuide } from "@/components/guides/RelatedGuide";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { UseCaseProof } from "@/components/use-cases/UseCaseProof";
import { Accordion } from "@/components/ui/accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { Section, type Surface } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TextLink } from "@/components/ui/text-link";
import { siteFlags } from "@/content/flags";
import { images } from "@/content/images";
import type { HomeContent, SectionIntro, UseCaseContent } from "@/content/types";
import { faqPageJsonLd } from "@/lib/structured-data";

// The one shared layout of every use-case page (SEO/geo-implementation-plan.md §S8, DESIGN-GUIDE.md §7.30):
// a product hero with the answer passage, the problem, how DEUS does it, how it runs, proof, an optional
// download offer, the FAQ and the closing panel. A page is a content file; nothing here knows which use
// case it is showing. Sections sit on White and Cloud in turn, and the FAQ takes the tight top padding
// because the proof above it is also White.

function UseCaseSection({
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

export function UseCasePage({
  useCase: c,
  logos,
}: {
  useCase: UseCaseContent;
  /** Home's logo wall data, for the proof. */
  logos: HomeContent["logos"];
}) {
  const { hero } = c;
  const single = hero.screens.length === 1;
  // two across for two or four cards, three otherwise (a 3 + 1 row would leave one card alone)
  const howColumns = c.how.items.length === 2 || c.how.items.length === 4 ? 2 : 3;
  return (
    <>
      {/* 1. Hero: the search phrase as the H1, the answer passage as its lede, the call to action */}
      <ProductHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.passage} ctas={[hero.cta]}>
        <div className="mx-auto grid max-w-[460px] gap-5 desk:max-w-none desk:grid-cols-2 desk:items-center">
          {hero.screens.map((screen) => (
            <PlayCard
              key={screen.image}
              image={{ ...images[screen.image], alt: screen.alt }}
              title={screen.title}
              meta={screen.meta}
              // one card fills the panel's width; two share it
              className={single ? "desk:col-span-2" : undefined}
              sizes={single ? "(max-width: 900px) 90vw, 640px" : "(max-width: 900px) 90vw, 320px"}
            />
          ))}
        </div>
      </ProductHero>

      {/* 2. The problem */}
      <UseCaseSection id="problem" intro={c.problem} surface="cloud">
        <ul className="grid gap-5 desk:grid-cols-2">
          {c.problem.items.map((item, i) => (
            <Reveal as="li" index={i} key={item.title} className="rounded-lg border border-line bg-white p-7 desk:p-10">
              <h3 className="text-h3-panel text-ink">{item.title}</h3>
              <p className="mt-2.5 text-body-sm text-slate">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </UseCaseSection>

      {/* 3. How DEUS does it: the modules and why, each linking to its part of the product page */}
      <UseCaseSection id="how" intro={c.how}>
        <ul
          style={{ "--cols": howColumns } as CSSProperties}
          className="grid gap-5 min-[600px]:grid-cols-2 desk:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
        >
          {c.how.items.map((item, i) => (
            <Reveal as="li" index={i} key={item.title} className="flex flex-col items-start rounded-lg bg-cloud p-7 desk:p-8">
              <h3 className="text-h3-panel text-ink">{item.title}</h3>
              <p className="mt-2.5 text-body-sm text-slate">{item.body}</p>
              {item.link && <TextLink href={item.link.href} className="mt-6 text-ui">{item.link.label}</TextLink>}
            </Reveal>
          ))}
        </ul>
        {c.how.note && (
          <p className="mx-auto mt-10 max-w-[640px] text-center text-body-sm text-slate">
            {c.how.note.text}{" "}
            <TextLink href={c.how.note.link.href} className="text-ui">
              {c.how.note.link.label}
            </TextLink>
          </p>
        )}
      </UseCaseSection>

      {/* 4. How it runs */}
      <UseCaseSection id="runs" intro={c.runs} surface="cloud">
        <Reveal>
          <NumberedSteps steps={c.runs.steps} />
        </Reveal>
      </UseCaseSection>

      {/* 5. Proof, and 6. the download offer under it (the GBA pages only, while it's on offer) */}
      <UseCaseProof proof={c.proof} logos={logos}>
        {c.offer && siteFlags.showSampleReport && (
          <Reveal className="mt-14 desk:mt-16">
            <DownloadOffer />
          </Reveal>
        )}
      </UseCaseProof>

      {/* 7. FAQ */}
      <UseCaseSection id="faq" intro={c.faq} tight>
        <Reveal>
          <Accordion items={c.faq.items} />
        </Reveal>
        <RelatedGuide slug={c.relatedGuide} className="mt-10" />
        <JsonLd data={faqPageJsonLd(c.faq.items)} />
      </UseCaseSection>

      {/* 8. Closing panel */}
      <ClosingPanel
        label={c.closing.label}
        title={c.closing.title}
        lede={c.closing.lede}
        ctaLabel={c.closing.cta?.label}
        ctaHref={c.closing.cta?.href}
        whatsapp={c.whatsapp}
      />
    </>
  );
}
