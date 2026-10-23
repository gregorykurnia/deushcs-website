import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { ogImagePath } from "./og";

// Page metadata base (Task 0.12). Every page builds its `metadata` or `generateMetadata` with
// `pageMetadata()`, so the title pattern, canonical URL and `noindex` rule live in one place.

export const SITE_NAME = "DEUS Human Capital Services";
const LOCAL_URL = "http://localhost:3000";

/** The site's origin, from NEXT_PUBLIC_SITE_URL (the Vercel URL until the domain moves, Task 7.5). */
export function siteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  try {
    return new URL(raw || LOCAL_URL);
  } catch {
    return new URL(LOCAL_URL);
  }
}

/** Search engines may index the site only once SITE_INDEXABLE is exactly "true" (Task 7.5). */
export function isIndexable(): boolean {
  return process.env.SITE_INDEXABLE === "true";
}

/** What `robots` the site sends: nothing special once indexable, `noindex, nofollow` before. */
export function robotsMeta(): Metadata["robots"] {
  return isIndexable() ? undefined : { index: false, follow: false };
}

/** `Enhance` → `Enhance | DEUS Human Capital Services`. The Home page passes `null` for the bare name. */
export function pageTitle(page: string | null): string {
  return page ? `${page} | ${SITE_NAME}` : SITE_NAME;
}

export function pageMetadata({
  title,
  description,
  locale,
  path = "",
}: {
  /** The page's own title, without the site name; `null` for Home. */
  title: string | null;
  description: string;
  locale: Locale;
  /** Path without the locale, "/enhance"; empty for Home. */
  path?: string;
}): Metadata {
  const url = `/${locale}${path === "/" ? "" : path}`;
  const fullTitle = pageTitle(title);
  // The page's Open Graph image (Task 7.2), drawn by src/app/og/[name]/route.tsx.
  const image = { url: ogImagePath(path), width: 1200, height: 630, alt: fullTitle };
  return {
    title: { absolute: fullTitle },
    description,
    // Resolved against metadataBase (the locale layout). Per-locale alternates (hreflang) come in Task 6.4.
    alternates: { canonical: url },
    robots: robotsMeta(),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      locale: locale === "id" ? "id_ID" : "en_US",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
