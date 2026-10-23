import type { MetadataRoute } from "next";
import type { Locale } from "@/i18n/routing";

// The sitemap's list of URLs (Task 7.1b), kept apart from `src/app/sitemap.ts` so tests can feed it
// registries built from other flags. English only while Phase 6 is on hold; Task 6.4 adds the
// language alternates here.

export type SitemapSource = {
  /** Locale-less route of every page, with the locales its content exists in. */
  pages: ReadonlyArray<{ path: string; locales: readonly Locale[] }>;
  /** Slugs of the stories that exist in English: held stories and old-slug aliases are not in it. */
  storySlugs: readonly string[];
};

/** The English path of a locale-less page path: Home (`/`) sits at the locale root, `/en`. */
export function englishPath(path: string): string {
  return path === "/" ? "/en" : `/en${path}`;
}

/** Paths (with the locale) of every public English page, matching each page's canonical URL. */
export function sitemapPaths({ pages, storySlugs }: SitemapSource): string[] {
  const pagePaths = pages
    .filter(({ locales }) => locales.includes("en"))
    .map(({ path }) => englishPath(path));
  return [...pagePaths, ...storySlugs.map((slug) => englishPath(`/clients/${slug}`))];
}

export function sitemapEntries(source: SitemapSource, origin: URL): MetadataRoute.Sitemap {
  return sitemapPaths(source).map((path) => ({ url: new URL(path, origin).toString() }));
}
