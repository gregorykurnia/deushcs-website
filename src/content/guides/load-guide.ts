import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { GuideContent } from "../types";
import { getGuide, localesOfGuide, resolveGuide, resolveGuideIndex, localesWithGuides } from "./index";

/**
 * For the guide route: the guide in `locale`, plus the locales it exists in (for the language switch).
 * An unknown or unpublished slug, or any slug while `showGuides` is off, is a 404; a guide that exists only
 * in another language redirects to it (`/id/guides/<slug>` goes to the English guide until an Indonesian one exists).
 */
export function loadGuide(slug: string, locale: Locale): { guide: GuideContent; available: Locale[] } {
  const resolution = resolveGuide(slug, locale);
  if (resolution.kind === "notFound") notFound();
  if (resolution.kind === "redirect") {
    redirect({ href: `/guides/${resolution.slug}`, locale: resolution.locale });
  }
  return { guide: getGuide(slug, locale)!, available: localesOfGuide(slug) };
}

/** For the index route: the locales with guides, or a 404 / a redirect to the language that has them. */
export function loadGuideIndex(locale: Locale): { available: Locale[] } {
  const resolution = resolveGuideIndex(locale);
  if (resolution.kind === "notFound") notFound();
  if (resolution.kind === "redirect") redirect({ href: "/guides", locale: resolution.locale });
  return { available: localesWithGuides() };
}
