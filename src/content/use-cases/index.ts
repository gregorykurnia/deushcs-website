import { campusRecruitmentEn } from "../en/use-cases/campus-recruitment-assessment";
import { managementTraineeEn } from "../en/use-cases/management-trainee-assessment";
import { performanceAppraisalEn } from "../en/use-cases/performance-appraisal-and-pay";
import { talentMappingEn } from "../en/use-cases/talent-mapping";
import { campusRecruitmentId } from "../id/use-cases/campus-recruitment-assessment";
import { managementTraineeId } from "../id/use-cases/management-trainee-assessment";
import { performanceAppraisalId } from "../id/use-cases/performance-appraisal-and-pay";
import { talentMappingId } from "../id/use-cases/talent-mapping";
import { siteFlags } from "../flags";
import { locales, type Locale } from "@/i18n/routing";
import type { UseCaseContent } from "../types";

// Which use-case page exists in which language (SEO/geo-implementation-plan.md §S8). A page is a content
// file; adding one means importing it into `modulesForFlags` below. While `showUseCases` is off no page
// is registered, so every `/solutions/<slug>` of this kind is a 404, and the sitemap, llms.txt and the
// Open Graph images leave the pages out.

/** The use-case pages of each language, in the order the footer and llms.txt list them. */
export type UseCaseModules = Partial<Record<Locale, readonly UseCaseContent[]>>;

export type UseCaseResolution =
  | { kind: "ok"; locale: Locale }
  /** The page is only in another language: this slug, that locale. */
  | { kind: "redirect"; locale: Locale; slug: string }
  | { kind: "notFound" };

export function createUseCaseRegistry(source: UseCaseModules) {
  function inLocale(locale: Locale): readonly UseCaseContent[] {
    return source[locale] ?? [];
  }

  /** The page at `/solutions/<slug>` in `locale`, or null. */
  function getUseCase(slug: string, locale: Locale): UseCaseContent | null {
    return inLocale(locale).find((useCase) => useCase.slug === slug) ?? null;
  }

  /** Locales that have this page, in `locales` order (English first). */
  function localesOfUseCase(slug: string): Locale[] {
    return locales.filter((locale) => getUseCase(slug, locale) !== null);
  }

  /** Every slug with content, once each. */
  function listUseCaseSlugs(): string[] {
    return [...new Set(locales.flatMap((locale) => inLocale(locale).map((useCase) => useCase.slug)))];
  }

  /** What a route should do when `slug` is visited in `locale`. */
  function resolveUseCase(slug: string, locale: Locale): UseCaseResolution {
    const available = localesOfUseCase(slug);
    if (available.length === 0) return { kind: "notFound" };
    if (available.includes(locale)) return { kind: "ok", locale };
    return { kind: "redirect", locale: available[0], slug };
  }

  return { getUseCase, localesOfUseCase, listUseCaseSlugs, resolveUseCase, inLocale };
}

/** The Indonesian pages (Task G4.3), in the same order as the English ones, registered only while
 *  `showIndonesianLeadPages` is on (§S12). */
export const useCasesId: readonly UseCaseContent[] = [
  managementTraineeId,
  campusRecruitmentId,
  talentMappingId,
  performanceAppraisalId,
];

/** The pages `flags` allows: none while `showUseCases` is off, and the Indonesian ones only while
 *  `showIndonesianLeadPages` is on too. */
export function modulesForFlags(
  flags: { showUseCases: boolean; showIndonesianLeadPages?: boolean },
  indonesian: readonly UseCaseContent[] = useCasesId,
): UseCaseModules {
  return {
    en: flags.showUseCases ? [managementTraineeEn, campusRecruitmentEn, talentMappingEn, performanceAppraisalEn] : [],
    id: flags.showUseCases && flags.showIndonesianLeadPages ? indonesian : [],
  };
}

export const {
  getUseCase,
  localesOfUseCase,
  listUseCaseSlugs,
  resolveUseCase,
  inLocale: listUseCases,
} = createUseCaseRegistry(modulesForFlags(siteFlags));
