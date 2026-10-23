import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { UseCaseContent } from "../types";
import { getUseCase, resolveUseCase, localesOfUseCase } from "./index";

/**
 * For the use-case route: the page in `locale`, plus the locales it exists in (for the language switch).
 * An unknown slug, or any slug while `showUseCases` is off, is a 404; a page that exists only in another
 * language redirects to it (`/id/solutions/<slug>` goes to the English page until the Indonesian one exists).
 */
export function loadUseCase(slug: string, locale: Locale): { useCase: UseCaseContent; available: Locale[] } {
  const resolution = resolveUseCase(slug, locale);
  if (resolution.kind === "notFound") notFound();
  if (resolution.kind === "redirect") {
    redirect({ href: `/solutions/${resolution.slug}`, locale: resolution.locale });
  }
  return { useCase: getUseCase(slug, locale)!, available: localesOfUseCase(slug) };
}
