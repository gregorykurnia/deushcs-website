import type { MetadataRoute } from "next";
import { localesFor, pagePaths } from "@/content/registry";
import { storiesIn } from "@/content/stories";
import { listUseCases } from "@/content/use-cases";
import type { PageKey } from "@/content/types";
import { siteUrl } from "@/lib/metadata";
import { sitemapEntries } from "@/lib/sitemap";

// Every public English page, as an absolute URL. Left out on purpose: `/styleguide`, routes that only
// redirect (`movedPages` in next.config.ts, the old Telkom slug), held stories and use cases (not
// registered while their flags are off) and `/id/...` (Phase 6). `robots.ts` names this file once the site is indexable.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.keys(pagePaths) as PageKey[]).map((key) => ({
    path: pagePaths[key],
    locales: localesFor(key),
  }));
  const storySlugs = storiesIn("en").map((story) => story.slug);
  const useCaseSlugs = listUseCases("en").map((useCase) => useCase.slug);
  return sitemapEntries({ pages, storySlugs, useCaseSlugs }, siteUrl());
}
