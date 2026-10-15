import { telkomStoryEn } from "../en/stories/telkom-group";
import { calvinStoryId } from "../id/stories/calvin-christian-school";
import { siteFlags } from "../flags";
import { locales, type Locale } from "@/i18n/routing";
import type { StoryContent } from "../types";

// Which client story exists in which language (WEBSITE-PLAN.md §5.8). A story is a content file;
// adding one means importing it into `stories` below. A story held for a permission question is
// left out of its list while the flag is off (Calvin, Q11), so it is a 404, never a redirect.

/** The stories of each language, in the order the Clients hub shows them. */
export type StoryModules = Partial<Record<Locale, readonly StoryContent[]>>;

export type StoryResolution =
  | { kind: "ok"; locale: Locale }
  /** The story is in another language, or under its old slug: this slug, this locale. */
  | { kind: "redirect"; locale: Locale; slug: string }
  | { kind: "notFound" };

export function createStoryRegistry(source: StoryModules, aliases: Readonly<Record<string, string>> = {}) {
  function inLocale(locale: Locale): readonly StoryContent[] {
    return source[locale] ?? [];
  }

  /** The story at `/clients/<slug>` in `locale`, or null. */
  function getStory(slug: string, locale: Locale): StoryContent | null {
    return inLocale(locale).find((story) => story.slug === slug) ?? null;
  }

  /** Locales that have this story, in `locales` order (English first). */
  function storyLocales(slug: string): Locale[] {
    return locales.filter((locale) => getStory(slug, locale) !== null);
  }

  /** Every slug with content, once each. */
  function storySlugs(): string[] {
    return [...new Set(locales.flatMap((locale) => inLocale(locale).map((story) => story.slug)))];
  }

  /** Slugs that redirect to a story's current one: the old name of a renamed story. */
  function aliasSlugs(): string[] {
    return Object.keys(aliases).filter((alias) => canonicalSlug(alias) !== alias);
  }

  /** The slug a requested one stands for. An alias only counts while it points to a story that exists. */
  function canonicalSlug(slug: string): string {
    const target = aliases[slug];
    return target && target !== slug && storySlugs().includes(target) ? target : slug;
  }

  /** What a route should do when `slug` is visited in `locale`. */
  function resolveStory(slug: string, locale: Locale): StoryResolution {
    const current = canonicalSlug(slug);
    const available = storyLocales(current);
    if (available.length === 0) return { kind: "notFound" };
    if (available.includes(locale) && current === slug) return { kind: "ok", locale };
    return { kind: "redirect", locale: available.includes(locale) ? locale : available[0], slug: current };
  }

  return { getStory, storyLocales, storySlugs, aliasSlugs, resolveStory, inLocale };
}

const stories: StoryModules = {
  en: [telkomStoryEn],
  id: siteFlags.publishCalvin ? [calvinStoryId] : [],
};

// Q7: the anonymised Telkom story lives at /clients/national-telecom-group. Once `telkomNamed` is on its
// slug is /clients/telkom-group and the old URL redirects there. The reverse is never an alias: while the
// story is anonymised, /clients/telkom-group is a 404, because redirecting it would say who the client is.
const aliases: Record<string, string> = { "national-telecom-group": telkomStoryEn.slug };

export const { getStory, storyLocales, storySlugs, aliasSlugs, resolveStory, inLocale: storiesIn } =
  createStoryRegistry(stories, aliases);
