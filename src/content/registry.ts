import { locales, type Locale } from "@/i18n/routing";
import { discoverEn } from "./en/discover";
import { gbaEn } from "./en/game-based-assessment";
import { nextChapterEn } from "./en/next-chapter";
import { scienceEn } from "./en/science";
import type { ContentModules, PageContent, PageKey } from "./types";

// Which page content exists in which language. Page tasks register their modules in `modules`
// below (e.g. `enhance: { en: enhanceEn }` in Task 1.1, `id: enhanceId` in Phase 6).

/** Locale-less route of every page, used to redirect a missing locale to one that exists. */
export const pagePaths: Record<PageKey, string> = {
  home: "/",
  solutions: "/solutions",
  gba: "/solutions/game-based-assessment",
  discover: "/solutions/discover",
  nextChapter: "/solutions/next-chapter",
  enhance: "/solutions/enhance",
  science: "/science",
  clients: "/clients",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
};

const modules: ContentModules = {
  gba: { en: gbaEn },
  discover: { en: discoverEn },
  nextChapter: { en: nextChapterEn },
  science: { en: scienceEn },
};

export type PageResolution =
  | { kind: "ok"; locale: Locale }
  | { kind: "redirect"; locale: Locale; path: string }
  | { kind: "notFound" };

export function createRegistry(source: ContentModules) {
  function getPageContent<K extends PageKey>(page: K, locale: Locale): PageContent<K> | null {
    return (source[page] as Partial<Record<Locale, PageContent<K>>> | undefined)?.[locale] ?? null;
  }

  /** Locales that have this page, in `locales` order (English first). */
  function localesFor(page: PageKey): Locale[] {
    return locales.filter((locale) => getPageContent(page, locale) !== null);
  }

  /** What a route should do when `page` is visited in `locale`. */
  function resolvePage(page: PageKey, locale: Locale): PageResolution {
    const available = localesFor(page);
    if (available.length === 0) return { kind: "notFound" };
    if (available.includes(locale)) return { kind: "ok", locale };
    return { kind: "redirect", locale: available[0], path: pagePaths[page] };
  }

  return { getPageContent, localesFor, resolvePage };
}

export const { getPageContent, localesFor, resolvePage } = createRegistry(modules);
