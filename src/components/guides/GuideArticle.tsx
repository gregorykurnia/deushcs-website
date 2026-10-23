import { useFormatter, useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { DownloadOffer } from "@/components/blocks/DownloadOffer";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionLabel } from "@/components/ui/pills";
import { Rich } from "@/components/ui/rich";
import { TextLink } from "@/components/ui/text-link";
import { siteFlags } from "@/content/flags";
import type { GuideBlock, GuideContent } from "@/content/types";
import { getUseCase } from "@/content/use-cases";
import { Link } from "@/i18n/navigation";
import { faqPageJsonLd } from "@/lib/structured-data";

// The one shared layout of every guide (SEO/geo-implementation-plan.md §S9, DESIGN-GUIDE.md §7.31): one
// left-aligned article in the 720px reading column, as on the privacy page, with article-size H2s that
// are the questions the guide answers. After the closing panel nothing else. A guide is a content file;
// nothing here knows which guide it is showing. Tables and the download offer may be wider than the
// column where the screen has room (a 960px frame, as the offer's card already is).

/** Wider than the 720px column by 120px on each side, once the viewport has room for it. */
const BREAKOUT = "min-[1200px]:-mx-[120px]";

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          <Rich text={block.text} />
        </p>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className={`grid gap-2 pl-6 marker:text-slate-2 ${block.ordered ? "list-decimal" : "list-disc"}`}>
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <Rich text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "table": {
      const keys = block.columns.map((_, i) => `c${i}`);
      return (
        <DataTable
          caption={block.caption}
          captionHidden
          mobile="cards"
          className={`my-2 ${BREAKOUT}`}
          columns={block.columns.map((label, i) => ({ key: keys[i], label }))}
          rows={block.rows.map((row) => Object.fromEntries(row.map((cell, i) => [keys[i], cell])))}
        />
      );
    }
  }
}

/** A sub-section of the article that is not one of the guide's own questions: FAQ, sources, the call to action, related guides. */
function Part({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} className="mt-14 desk:mt-16">
      {children}
    </section>
  );
}

export function GuideArticle({
  guide: g,
  related,
}: {
  guide: GuideContent;
  /** The guides listed under "Related guides": the registered ones, in the guide's order. */
  related: readonly GuideContent[];
}) {
  const t = useTranslations("Guides");
  const format = useFormatter();
  const locale = useLocale();
  const { nextStep } = g;
  // the offer replaces the line while it is on offer; a link to a use-case page that isn't registered leaves out
  const showOffer = nextStep.offer && siteFlags.showSampleReport;
  const showLine = !showOffer && (!nextStep.useCase || getUseCase(nextStep.useCase, locale === "id" ? "id" : "en") !== null);
  const updated = format.dateTime(new Date(`${g.dates.updated}T00:00:00Z`), { dateStyle: "long", timeZone: "UTC" });

  return (
    <>
      <article aria-labelledby="guide-title" className="py-[var(--section-y)]">
        <Container size="article">
          <header>
            <SectionLabel>{g.header.eyebrow}</SectionLabel>
            <h1 id="guide-title" className="mt-5 text-h2 text-balance text-ink">
              {g.header.title}
            </h1>
            {/* the answer: self-contained, so a search or AI tool can quote it as it stands */}
            <p className="mt-6 text-lede text-slate">{g.header.answer}</p>

            <div className="mt-10 rounded-lg bg-cloud p-7 desk:p-8">
              <h2 id="key-points-title" className="text-h3-panel text-ink">
                {t("keyPoints")}
              </h2>
              <ul aria-labelledby="key-points-title" className="mt-4 grid list-disc gap-2.5 pl-6 text-body-sm text-slate marker:text-slate-2">
                {g.header.keyPoints.map((point) => (
                  <li key={point} className="pl-1">
                    <Rich text={point} />
                  </li>
                ))}
              </ul>
            </div>
          </header>

          {/* one step for readers who aren't ready to talk */}
          {showOffer && <DownloadOffer className={`mt-8 ${BREAKOUT}`} />}
          {showLine && (
            <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-line px-6 py-5 text-body-sm text-slate">
              <span>{nextStep.text}</span>
              <TextLink href={nextStep.link.href} data-cta="guide-next-step">
                {nextStep.link.label}
              </TextLink>
            </p>
          )}

          <p className="mt-8 text-label text-slate">
            {t("by", { author: g.author })} · <time dateTime={g.dates.updated}>{t("lastUpdated", { date: updated })}</time>
          </p>

          {g.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id} className="mt-14 desk:mt-16">
              <h2 id={section.id} className="scroll-mt-28 text-h2-article text-balance text-ink">
                {section.title}
              </h2>
              <div className="mt-5 grid gap-4 text-body text-slate">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}

          <Part id="faq">
            <SectionLabel>{g.faq.eyebrow}</SectionLabel>
            <h2 id="faq-title" className="mt-5 scroll-mt-28 text-h2-article text-balance text-ink">
              {g.faq.title}
            </h2>
            <Accordion items={g.faq.items} className="mt-8" />
            <JsonLd data={faqPageJsonLd(g.faq.items)} />
          </Part>

          <Part id="cta">
            <div className="rounded-lg bg-cloud p-7 desk:p-10">
              <p id="cta-title" className="text-lede font-semibold text-ink">
                {g.cta.text}
              </p>
              {/* a label too long for the card wraps on a phone, rather than running past the edge; short ones stay on one line */}
              <Button asChild className="mt-6 h-auto min-h-13 max-w-full whitespace-normal py-3.5 text-center" data-cta="guide-primary">
                <Link href={g.cta.link.href}>{g.cta.link.label}</Link>
              </Button>
            </div>
          </Part>

          <Part id="sources">
            <h2 id="sources-title" className="scroll-mt-28 text-h2-article text-ink">
              {t("sources")}
            </h2>
            <ul aria-labelledby="sources-title" className="mt-5 grid gap-3 text-body-sm text-slate">
              {g.sources.map((source) => (
                <li key={source.href}>
                  <TextLink href={source.href} variant="inline">
                    {source.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </Part>

          {related.length > 0 && (
            <Part id="related">
              <h2 id="related-title" className="scroll-mt-28 text-h2-article text-ink">
                {t("relatedGuides")}
              </h2>
              <ul aria-labelledby="related-title" className="mt-5 grid gap-3">
                {related.map((guide) => (
                  <li key={guide.slug}>
                    <TextLink href={`/guides/${guide.slug}`}>{guide.header.title}</TextLink>
                  </li>
                ))}
              </ul>
            </Part>
          )}
        </Container>
      </article>

      <ClosingPanel
        label={g.closing.label}
        title={g.closing.title}
        lede={g.closing.lede}
        ctaLabel={g.closing.cta?.label}
        ctaHref={g.closing.cta?.href ?? g.contactHref}
        whatsapp={g.whatsapp}
      />
    </>
  );
}
