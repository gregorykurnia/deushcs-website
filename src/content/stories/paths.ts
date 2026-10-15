import { routing } from "@/i18n/routing";
import { aliasSlugs, storySlugs } from "./index";

// With Cache Components a story slug that isn't prerendered streams its `notFound()` after the 200 has
// been sent, with Next's plain 404 body. So the proxy turns an unknown slug into a path no route
// matches, and the locale's catch-all answers with the real 404 (status and panel).

const storyPath = new RegExp(`^/(${routing.locales.join("|")})/clients/([^/]+)/?$`);

/** Where to rewrite `pathname` so it 404s, or null when it isn't a story URL or the story exists. */
export function unknownStoryRewrite(pathname: string): string | null {
  const match = storyPath.exec(pathname);
  if (!match) return null;
  const [, locale, slug] = match;
  const known = [...storySlugs(), ...aliasSlugs()];
  const name = decoded(slug);
  return name !== null && known.includes(name) ? null : `/${locale}/clients/${slug}/not-found`;
}

/** The slug as written, or null when its escapes are malformed ("%E0%A4%A"), which no story has. */
function decoded(slug: string): string | null {
  try {
    return decodeURIComponent(slug);
  } catch {
    return null;
  }
}
