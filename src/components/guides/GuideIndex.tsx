import { useTranslations } from "next-intl";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/pills";
import { TextLink } from "@/components/ui/text-link";
import type { GuideContent } from "@/content/types";

// The `/guides` index (SEO/geo-implementation-plan.md §S9, DESIGN-GUIDE.md §7.31): the article's reading
// column, a header, then one row for each published guide with its title, its answer and a link. Only the
// guides the registry holds are listed, so an unpublished one never shows here.

export function GuideIndex({ guides }: { guides: readonly GuideContent[] }) {
  const t = useTranslations("Guides");
  return (
    <>
      <section aria-labelledby="guides-title" className="py-[var(--section-y)]">
        <Container size="article">
          <header>
            <SectionLabel>{t("indexEyebrow")}</SectionLabel>
            <h1 id="guides-title" className="mt-5 text-h2 text-balance text-ink">
              {t("indexTitle")}
            </h1>
            <p className="mt-6 text-lede text-slate">{t("indexLede")}</p>
          </header>

          <ul aria-label={t("listLabel")} className="mt-14 grid gap-5 desk:mt-16">
            {guides.map((guide) => (
              <li key={guide.slug} className="rounded-lg border border-line bg-white p-7 desk:p-10">
                <SectionLabel>{guide.header.eyebrow}</SectionLabel>
                <h2 className="mt-4 text-h2-article text-balance text-ink">{guide.header.title}</h2>
                <p className="mt-4 text-body-sm text-slate">{guide.header.answer}</p>
                <TextLink href={`/guides/${guide.slug}`} className="mt-6">
                  {t("read")}
                  <span className="sr-only">: {guide.header.title}</span>
                </TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <ClosingPanel />
    </>
  );
}
