import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { QuoteCard, QuoteGrid } from "@/components/blocks/QuoteCard";
import { StatReadout } from "@/components/blocks/StatReadout";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/pills";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { HeadingLines } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import type { SectionIntro, StoryContent, StoryQuote } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// The one shared layout of every client story (DESIGN-GUIDE.md §7.21, WEBSITE-PLAN.md §5.8): header,
// at a glance, challenge / what we did / results in the 720px article column, the quotes, an optional
// photo and the closing panel. A story is a content file; this component never knows which client or
// why something is left out (no quotes, no photo, no results section).

/** One part of the article: section label left-aligned, then the 34px H2, then the paragraphs. */
function ArticlePart({ id, intro, paragraphs }: { id: string; intro: SectionIntro; paragraphs: readonly string[] }) {
  return (
    <section aria-labelledby={`${id}-title`} className="mt-16 first:mt-0">
      <Reveal>
        <SectionLabel className="mb-5">{intro.eyebrow}</SectionLabel>
        <h2 id={`${id}-title`} className="text-h2-article text-balance text-ink">
          <HeadingLines lines={intro.title} />
        </h2>
        <div className="mt-5 grid gap-5 text-body text-slate">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Quote({ item, locale, variant }: { item: StoryQuote; locale: Locale; variant?: "main" | "participant" }) {
  return <QuoteCard {...item} translationLang={locale} variant={variant} surface="white" />;
}

export async function StoryPage({ story, locale }: { story: StoryContent; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "ClientStory" });
  const { words, photo } = story;
  const hasWords = words.featured.length > 0 || (words.participants?.quotes.length ?? 0) > 0;

  return (
    <>
      {/* 1. Header and 2. At a glance */}
      <section aria-labelledby="story-title" className="pt-16 desk:pt-20">
        <Container className="text-center">
          <SectionLabel className="mb-6">{story.header.eyebrow}</SectionLabel>
          {/* closing scale, so the closing H2's 12em cap; the lede at the 34em measure (§3.3) */}
          <h1 id="story-title" className="mx-auto max-w-[12em] text-closing text-balance text-ink">
            <HeadingLines lines={story.header.title} />
          </h1>
          <p className="mx-auto mt-6 max-w-[34em] text-lede text-balance text-slate">{story.header.lede}</p>
        </Container>
        <Container className="mt-[72px] max-desk:mt-12">
          <section aria-labelledby="story-glance">
            <h2 id="story-glance" className="sr-only">
              {t("glance")}
            </h2>
            <StatReadout stats={story.glance.stats} />
            {story.glance.footnote && (
              <p className="mt-4 text-center text-label text-slate">{story.glance.footnote}</p>
            )}
          </section>
        </Container>
      </section>

      {/* 3. The article: challenge, what we did, results */}
      <Section surface="white" tight contained={false}>
        <Container size="article">
          <ArticlePart id="challenge" intro={story.challenge} paragraphs={story.challenge.paragraphs} />
          <ArticlePart id="did" intro={story.did} paragraphs={story.did.paragraphs} />
          {story.results && <ArticlePart id="results" intro={story.results} paragraphs={story.results.paragraphs} />}
        </Container>
      </Section>

      {/* 4. In their words */}
      {hasWords && (
        <Section surface="cloud" aria-labelledby="words-title">
          <Reveal className="mb-[var(--head-gap)] text-center">
            {/* the label is the section's heading; the participants' label is the h3 under it */}
            <h2 id="words-title">
              <SectionLabel>{words.eyebrow}</SectionLabel>
            </h2>
          </Reveal>
          {words.featured.length > 0 && (
            <div className="grid gap-5">
              {words.featured.map((quote) => (
                <Reveal key={quote.quote}>
                  <Quote item={quote} locale={locale} variant="main" />
                </Reveal>
              ))}
            </div>
          )}
          {words.participants && words.participants.quotes.length > 0 && (
            <div className={words.featured.length > 0 ? "mt-14" : undefined}>
              <Reveal>
                <h3 className="mb-6 text-title text-ink">{words.participants.label}</h3>
              </Reveal>
              <QuoteGrid>
                {words.participants.quotes.map((quote, i) => (
                  <Reveal as="li" index={i} key={quote.quote}>
                    <Quote item={quote} locale={locale} />
                  </Reveal>
                ))}
              </QuoteGrid>
            </div>
          )}
        </Section>
      )}

      {/* 5. Photo (optional) */}
      {photo && (
        <Section surface="white" aria-label={photo.caption}>
          <Reveal>
            <figure>
              {photo.image ? (
                <Image
                  src={photo.image.src}
                  width={photo.image.width}
                  height={photo.image.height}
                  alt={photo.alt}
                  sizes="(max-width: 1200px) 100vw, 1104px"
                  className="h-auto w-full rounded-lg"
                />
              ) : (
                <Placeholder caption={photo.placeholder ?? ""} className="min-h-[320px] rounded-lg desk:min-h-[480px]" />
              )}
              <figcaption className="mt-3 text-[15px] text-slate">{photo.caption}</figcaption>
            </figure>
          </Reveal>
        </Section>
      )}

      {/* 6. Closing panel with the story's own next step */}
      <ClosingPanel
        label={story.closing.label}
        title={story.closing.title}
        lede={story.closing.lede}
        ctaLabel={story.closing.cta?.label}
        ctaHref={story.closing.cta?.href}
        secondary={story.closing.secondary}
        whatsapp={story.whatsapp}
        className={photo || hasWords ? undefined : "mt-[var(--section-y)]"}
      />
    </>
  );
}
