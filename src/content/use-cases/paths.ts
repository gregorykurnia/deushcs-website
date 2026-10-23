import { routing } from "@/i18n/routing";
import { pagePaths } from "../registry";
import { listUseCaseSlugs } from "./index";

// Same problem as the story slugs (src/content/stories/paths.ts): with Cache Components a slug that isn't
// prerendered streams its `notFound()` after the 200 has been sent. So the proxy turns an unknown
// `/solutions/<slug>` into a path no route matches, and the locale's catch-all answers with the real 404.

const solutionPath = new RegExp(`^/(${routing.locales.join("|")})/solutions/([^/]+)/?$`);

/** The slugs under `/solutions/` that have a route of their own (the product pages). */
const productSlugs = Object.values(pagePaths)
  .filter((path) => path.startsWith("/solutions/"))
  .map((path) => path.slice("/solutions/".length));

/** Where to rewrite `pathname` so it 404s, or null when it isn't a use-case URL or the page exists. */
export function unknownUseCaseRewrite(pathname: string): string | null {
  const match = solutionPath.exec(pathname);
  if (!match) return null;
  const [, locale, slug] = match;
  const name = decoded(slug);
  return name !== null && [...productSlugs, ...listUseCaseSlugs()].includes(name) ? null : `/${locale}/solutions/${slug}/not-found`;
}

/** The slug as written, or null when its escapes are malformed ("%E0%A4%A"), which no page has. */
function decoded(slug: string): string | null {
  try {
    return decodeURIComponent(slug);
  } catch {
    return null;
  }
}
