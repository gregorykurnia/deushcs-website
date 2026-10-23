import type { MetadataRoute } from "next";
import type { Locale } from "@/i18n/routing";
import { languageAlternates, localePath } from "@/lib/metadata";

// The sitemap's list of URLs (Task 7.1b), kept apart from `src/app/sitemap.ts` so tests can feed it
// registries built from other flags. Every English page, and the Indonesian version of a page that has one
// (GEO G4.2, part of Task 6.4): those pages carry their language alternates, so search engines pair them.
// An Indonesian-only page (the held Calvin story) is left out until Phase 6.

export type SitemapSource = {
  /** Locale-less route of every page, with the locales its content exists in. */
  pages: ReadonlyArray<{ path: string; locales: readonly Locale[] }>;
  /** Slugs of the stories that exist in English: held stories and old-slug aliases are not in it. */
  storySlugs: readonly string[];
  /** Slugs of the use-case pages that exist in English: none while `showUseCases` is off. Each is `/solutions/<slug>`. */
  useCaseSlugs?: readonly string[];
  /** Slugs of the published guides that exist in English: none while `showGuides` is off. Each is `/guides/<slug>`, and the `/guides` index is listed with them. */
  guideSlugs?: readonly string[];
  /** The locales a use case, guide, the guides index or a story exists in, by its locale-less path. English only when left out. */
  localesOf?: (path: string) => readonly Locale[];
};

/** The English path of a locale-less page path: Home (`/`) sits at the locale root, `/en`. */
export function englishPath(path: string): string {
  return localePath("en", path);
}

/** Every page the sitemap lists, locale-less, with its languages: English pages, use cases, guides (the index first), then stories. */
export function sitemapPages({
  pages,
  storySlugs,
  useCaseSlugs = [],
  guideSlugs = [],
  localesOf = () => ["en"],
}: SitemapSource): Array<{ path: string; locales: readonly Locale[] }> {
  const others = [
    ...useCaseSlugs.map((slug) => `/solutions/${slug}`),
    // the index exists only while at least one guide does
    ...(guideSlugs.length > 0 ? ["/guides", ...guideSlugs.map((slug) => `/guides/${slug}`)] : []),
    ...storySlugs.map((slug) => `/clients/${slug}`),
  ].map((path) => ({ path, locales: localesOf(path) }));
  return [...pages, ...others].filter(({ locales }) => locales.includes("en"));
}

/** Paths (with the locale) of every public English page, use case, guide and story, matching each page's canonical URL. */
export function sitemapPaths(source: SitemapSource): string[] {
  return sitemapPages(source).map(({ path }) => englishPath(path));
}

/** The sitemap: each English page, then its other languages right after it, all carrying the same alternates. */
export function sitemapEntries(source: SitemapSource, origin: URL): MetadataRoute.Sitemap {
  const absolute = (path: string) => new URL(path, origin).toString();
  return sitemapPages(source).flatMap(({ path, locales }) => {
    const languages = languageAlternates(path, locales);
    if (!languages) return [{ url: absolute(englishPath(path)) }];
    const alternates = {
      languages: Object.fromEntries(Object.entries(languages).map(([lang, href]) => [lang, absolute(href)])),
    };
    return locales.map((locale) => ({ url: absolute(localePath(locale, path)), alternates }));
  });
}
