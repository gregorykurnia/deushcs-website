import type { MetadataRoute } from "next";
import { localesFor, pagePaths } from "@/content/registry";
import { listGuides, localesOfGuide, localesWithGuides } from "@/content/guides";
import { storiesIn, storyLocales } from "@/content/stories";
import { listUseCases, localesOfUseCase } from "@/content/use-cases";
import type { Locale } from "@/i18n/routing";
import type { PageKey } from "@/content/types";
import { siteUrl } from "@/lib/metadata";
import { sitemapEntries } from "@/lib/sitemap";

// Every public English page, as an absolute URL, and the Indonesian version of each that has one, with their
// language alternates (src/lib/sitemap.ts). Left out on purpose: `/styleguide`, routes that only redirect
// (`movedPages` in next.config.ts, the old Telkom slug), held stories and use cases (not registered while their
// flags are off, unpublished guides), Indonesian pages while `showIndonesianLeadPages` is off, and Indonesian-only
// pages (Phase 6). `robots.ts` names this file once the site is indexable.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.keys(pagePaths) as PageKey[]).map((key) => ({
    path: pagePaths[key],
    locales: localesFor(key),
  }));
  const storySlugs = storiesIn("en").map((story) => story.slug);
  const useCaseSlugs = listUseCases("en").map((useCase) => useCase.slug);
  const guideSlugs = listGuides("en").map((guide) => guide.slug);
  return sitemapEntries({ pages, storySlugs, useCaseSlugs, guideSlugs, localesOf }, siteUrl());
}

/** The languages of a use case, guide, the guides index or a story, by its locale-less path. */
function localesOf(path: string): Locale[] {
  const [, section, slug] = path.split("/");
  if (section === "solutions") return localesOfUseCase(slug);
  if (section === "guides") return slug ? localesOfGuide(slug) : localesWithGuides();
  if (section === "clients") return storyLocales(slug);
  return ["en"];
}
