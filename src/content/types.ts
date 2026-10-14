import type { Locale } from "@/i18n/routing";

// Shapes for the typed page content modules in src/content/{en,id}/. Each module is a faithful
// copy of its reviewed Markdown file in content/, with `> Note:` lines dropped and [VERIFY]
// items wired to `siteFlags` (src/content/flags.ts).

/** SEO title and description, from the top of each content file. */
export type PageMeta = {
  title: string;
  description: string;
};

/** A heading. The content files split display headings into lines with ` / `. */
export type Heading = string | readonly string[];

/** A button or link: label plus a locale-less internal path or a full external URL. */
export type Cta = {
  label: string;
  href: string;
};

/** Eyebrow pill, heading and optional lede: the shape of `SectionHeader`. */
export type SectionIntro = {
  eyebrow: string;
  title: Heading;
  lede?: string;
};

/** A titled item in a list, grid or numbered journey. */
export type Item = {
  title: string;
  body: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

/** A page's own closing panel. Anything left out falls back to the global one in messages. */
export type ClosingContent = {
  label?: string;
  title?: Heading;
  lede?: string;
  cta?: Cta;
};

/** Every page has at least its metadata. */
export type PageContentBase = {
  meta: PageMeta;
};

/**
 * One entry per page. Each page's content task (1.1, 2.1, …) replaces `PageContentBase` with
 * that page's full type, built from the blocks above.
 */
export type PageContentMap = {
  home: PageContentBase;
  solutions: PageContentBase;
  gba: PageContentBase;
  discover: PageContentBase;
  nextChapter: PageContentBase;
  enhance: PageContentBase;
  science: PageContentBase;
  clients: PageContentBase;
  about: PageContentBase;
  contact: PageContentBase;
  privacy: PageContentBase;
};

export type PageKey = keyof PageContentMap;
export type PageContent<K extends PageKey> = PageContentMap[K];

/** The content modules that exist, per page and locale. A missing entry means "not written yet". */
export type ContentModules = {
  [K in PageKey]?: Partial<Record<Locale, PageContent<K>>>;
};
