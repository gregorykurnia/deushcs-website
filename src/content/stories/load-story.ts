import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { StoryContent } from "../types";
import { getStory, resolveStory, storyLocales } from "./index";

/**
 * For the story route: the story in `locale`, plus the locales it exists in (for the language switch).
 * An unknown or held story is a 404; a story that exists only in another language, or under its old
 * slug, redirects to where it lives.
 */
export function loadStory(slug: string, locale: Locale): { story: StoryContent; available: Locale[] } {
  const resolution = resolveStory(slug, locale);
  if (resolution.kind === "notFound") notFound();
  if (resolution.kind === "redirect") {
    redirect({ href: `/clients/${resolution.slug}`, locale: resolution.locale });
  }
  return { story: getStory(slug, locale)!, available: storyLocales(slug) };
}
