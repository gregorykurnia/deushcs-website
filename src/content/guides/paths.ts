import { routing } from "@/i18n/routing";
import { listGuideSlugs } from "./index";

// Same problem as the story and use-case slugs (src/content/stories/paths.ts): with Cache Components a slug
// that isn't prerendered streams its `notFound()` after the 200 has been sent. So the proxy turns an unknown
// `/guides/<slug>` into a path no route matches, and the locale's catch-all answers with the real 404. The
// `/guides` index goes the same way while no guide is registered (`showGuides` off, or none published).

const guidePath = new RegExp(`^/(${routing.locales.join("|")})/guides(?:/([^/]+))?/?$`);

/** Where to rewrite `pathname` so it 404s, or null when it isn't a guides URL or the page exists. */
export function unknownGuideRewrite(pathname: string): string | null {
  const match = guidePath.exec(pathname);
  if (!match) return null;
  const [, locale, slug] = match;
  const slugs = listGuideSlugs();
  if (slug === undefined) return slugs.length > 0 ? null : `/${locale}/guides/index/not-found`;
  const name = decoded(slug);
  return name !== null && slugs.includes(name) ? null : `/${locale}/guides/${slug}/not-found`;
}

/** The slug as written, or null when its escapes are malformed ("%E0%A4%A"), which no guide has. */
function decoded(slug: string): string | null {
  try {
    return decodeURIComponent(slug);
  } catch {
    return null;
  }
}
