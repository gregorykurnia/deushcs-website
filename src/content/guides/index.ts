import { gbaVsPsychometricId } from "../id/guides/game-based-assessment-vs-psychometric-tests";
import { whatIsGbaId } from "../id/guides/what-is-game-based-assessment";
import { campusRecruitmentScreeningEn } from "../en/guides/campus-recruitment-screening";
import { gbaVsPsychometricEn } from "../en/guides/game-based-assessment-vs-psychometric-tests";
import { kpisAndCompetenciesForAppraisalEn } from "../en/guides/kpis-and-competencies-for-appraisal";
import { linkPerformanceAppraisalToPayEn } from "../en/guides/link-performance-appraisal-to-pay";
import { managementTraineeRecruitmentEn } from "../en/guides/management-trainee-recruitment";
import { whatIsGbaEn } from "../en/guides/what-is-game-based-assessment";
import { siteFlags } from "../flags";
import { locales, type Locale } from "@/i18n/routing";
import type { GuideContent } from "../types";

// Which guide exists in which language (SEO/geo-implementation-plan.md §S9). A guide is a content file;
// adding one means importing it into `guidesEn` below. A guide with `published: false` is never registered,
// and while `showGuides` is off no guide is, so every `/guides` URL of this kind is a 404, and the index, the
// sitemap, llms.txt, the Open Graph images, the footer link and every "Related guides" list leave them out.

/** The guides of each language, in the order the index, llms.txt and "Related guides" list them. */
export type GuideModules = Partial<Record<Locale, readonly GuideContent[]>>;

export type GuideResolution =
  | { kind: "ok"; locale: Locale }
  /** The guide is only in another language: this slug, that locale. */
  | { kind: "redirect"; locale: Locale; slug: string }
  | { kind: "notFound" };

export type GuideIndexResolution = { kind: "ok" } | { kind: "redirect"; locale: Locale } | { kind: "notFound" };

export function createGuideRegistry(source: GuideModules) {
  /** The published guides of `locale`. An unpublished one is not here, so nothing downstream can list it. */
  function inLocale(locale: Locale): readonly GuideContent[] {
    return (source[locale] ?? []).filter((guide) => guide.published);
  }

  /** The guide at `/guides/<slug>` in `locale`, or null. */
  function getGuide(slug: string, locale: Locale): GuideContent | null {
    return inLocale(locale).find((guide) => guide.slug === slug) ?? null;
  }

  /** Locales that have this guide, in `locales` order (English first). */
  function localesOfGuide(slug: string): Locale[] {
    return locales.filter((locale) => getGuide(slug, locale) !== null);
  }

  /** Locales with at least one guide, so with a `/guides` index. */
  function localesWithGuides(): Locale[] {
    return locales.filter((locale) => inLocale(locale).length > 0);
  }

  /** Every slug with content, once each. */
  function listGuideSlugs(): string[] {
    return [...new Set(locales.flatMap((locale) => inLocale(locale).map((guide) => guide.slug)))];
  }

  /** What a route should do when `slug` is visited in `locale`. */
  function resolveGuide(slug: string, locale: Locale): GuideResolution {
    const available = localesOfGuide(slug);
    if (available.length === 0) return { kind: "notFound" };
    if (available.includes(locale)) return { kind: "ok", locale };
    return { kind: "redirect", locale: available[0], slug };
  }

  /** What the `/guides` index should do in `locale`: show, go to the language that has guides, or 404 when none exist. */
  function resolveGuideIndex(locale: Locale): GuideIndexResolution {
    const available = localesWithGuides();
    if (available.length === 0) return { kind: "notFound" };
    return available.includes(locale) ? { kind: "ok" } : { kind: "redirect", locale: available[0] };
  }

  /** The guides `guide` lists under "Related guides": the registered ones among its `related` slugs, in its order. */
  function relatedGuides(guide: GuideContent, locale: Locale): readonly GuideContent[] {
    return guide.related.flatMap((slug) => {
      const related = slug === guide.slug ? null : getGuide(slug, locale);
      return related ? [related] : [];
    });
  }

  return { getGuide, localesOfGuide, localesWithGuides, listGuideSlugs, resolveGuide, resolveGuideIndex, relatedGuides, inLocale };
}

/** Every English guide written, in the order §S9 numbers them. Each carries its own `published` field. */
export const guidesEn: readonly GuideContent[] = [
  whatIsGbaEn,
  gbaVsPsychometricEn,
  managementTraineeRecruitmentEn,
  campusRecruitmentScreeningEn,
  linkPerformanceAppraisalToPayEn,
  kpisAndCompetenciesForAppraisalEn,
];

/** The Indonesian guides (Task G4.4: guides 1 and 2), registered only while `showIndonesianLeadPages` is on (§S12). */
export const guidesId: readonly GuideContent[] = [whatIsGbaId, gbaVsPsychometricId];

/** The guides `flags` allows: none while `showGuides` is off, otherwise `guides` (the registry then drops the unpublished
 *  ones), and the Indonesian ones only while `showIndonesianLeadPages` is on too. A translation follows its English guide:
 *  holding the English wording (`published: false`) holds the Indonesian version with it. */
export function modulesForFlags(
  flags: { showGuides: boolean; showIndonesianLeadPages?: boolean },
  guides: readonly GuideContent[] = guidesEn,
  indonesian: readonly GuideContent[] = guidesId,
): GuideModules {
  const publishedEn = (slug: string) => guides.some((guide) => guide.slug === slug && guide.published);
  return {
    en: flags.showGuides ? guides : [],
    id: flags.showGuides && flags.showIndonesianLeadPages ? indonesian.filter((guide) => publishedEn(guide.slug)) : [],
  };
}

export const {
  getGuide,
  localesOfGuide,
  localesWithGuides,
  listGuideSlugs,
  resolveGuide,
  resolveGuideIndex,
  relatedGuides,
  inLocale: listGuides,
} = createGuideRegistry(modulesForFlags(siteFlags));
