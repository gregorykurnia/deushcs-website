import { locales, type Locale } from "@/i18n/routing";
import { aboutEn } from "./en/about";
import { clientsEn } from "./en/clients";
import { contactEn } from "./en/contact";
import { enhanceEn } from "./en/enhance";
import { gbaEn } from "./en/game-based-assessment";
import { homeEn } from "./en/home";
import { privacyEn } from "./en/privacy";
import { solutionsEn } from "./en/solutions";
import type { ContentModules, PageContent, PageKey } from "./types";

// Which page content exists in which language. Page tasks register their modules in `modules`
// below (e.g. `enhance: { en: enhanceEn }` in Task 1.1, `id: enhanceId` in Phase 6).

/** Locale-less route of every page, used to redirect a missing locale to one that exists. */
export const pagePaths: Record<PageKey, string> = {
  home: "/",
  solutions: "/solutions",
  gba: "/solutions/game-based-assessment",
  enhance: "/solutions/enhance",
  clients: "/clients",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
};

const modules: ContentModules = {
  enhance: { en: enhanceEn },
  contact: { en: contactEn },
  home: { en: homeEn },
  solutions: { en: solutionsEn },
  about: { en: aboutEn },
  gba: { en: gbaEn },
  clients: { en: clientsEn },
  privacy: { en: privacyEn },
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
