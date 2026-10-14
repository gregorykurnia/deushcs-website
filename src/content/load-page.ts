import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPageContent, localesFor, resolvePage } from "./registry";
import type { PageContent, PageKey } from "./types";

/**
 * For page routes: the page's content in `locale`, plus the locales it exists in (for the
 * language switch). A page with no content at all is a 404; a page missing in `locale`
 * redirects to the first locale that has it.
 */
export function loadPage<K extends PageKey>(
  page: K,
  locale: Locale,
): { content: PageContent<K>; available: Locale[] } {
  const resolution = resolvePage(page, locale);
  if (resolution.kind === "notFound") notFound();
  if (resolution.kind === "redirect") {
    redirect({ href: resolution.path, locale: resolution.locale });
  }
  return { content: getPageContent(page, locale)!, available: localesFor(page) };
}
