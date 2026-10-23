import messages from "../../messages/en.json";
import { listGuides } from "@/content/guides";
import { pagePaths, getPageContent } from "@/content/registry";
import { storiesIn } from "@/content/stories";
import { listUseCases } from "@/content/use-cases";
import type { Heading, PageKey } from "@/content/types";

// Open Graph images (Task 7.2, DESIGN-GUIDE §7.28). Which images exist and what each says: the page's
// H1. `pageMetadata` points every page at `/og/<name>.png`, and `src/app/og/[name]/route.tsx` draws it.
// Only these names exist, so nobody can make the site print arbitrary text. English only while Phase 6
// is on hold.

const MAX_TITLE_LENGTH = 120;

/** `/solutions/enhance` → `solutions-enhance`; Home (`""` or `/`) → `home`. */
export function ogName(path: string): string {
  return path.replace(/^\/+|\/+$/g, "").replace(/\//g, "-") || "home";
}

/** The image's URL path for a page path, resolved against `metadataBase`. */
export function ogImagePath(path: string): string {
  return `/og/${ogName(path)}.png`;
}

function headingText(heading: Heading): string {
  return typeof heading === "string" ? heading : heading.join(" ");
}

/** Three lines at 56px hold about this many characters; longer titles are cut at a word. */
export function clampTitle(title: string): string {
  const text = title.trim().replace(/\s+/g, " ");
  if (text.length <= MAX_TITLE_LENGTH) return text;
  return `${text.slice(0, MAX_TITLE_LENGTH).replace(/\s+\S*$/, "")}…`;
}

/** 64px by default; a long title drops to 56px (§7.28). */
export function ogTitleSize(title: string): 64 | 56 {
  return title.length > 60 ? 56 : 64;
}

/** The H1 of a page, as the OG image says it. Privacy has a plain title; the others a hero. */
function pageTitleFor(key: PageKey): string | null {
  if (key === "privacy") return getPageContent("privacy", "en")?.title ?? null;
  const content = getPageContent(key, "en");
  return content && "hero" in content ? headingText(content.hero.title) : null;
}

/** Image name → title, for every public English page, use case, guide and story (held ones aren't registered, so aren't here). */
export function ogTitles(): Record<string, string> {
  const titles: Record<string, string> = {};
  for (const key of Object.keys(pagePaths) as PageKey[]) {
    const title = pageTitleFor(key);
    if (title) titles[ogName(pagePaths[key])] = clampTitle(title);
  }
  for (const useCase of listUseCases("en")) {
    titles[ogName(`/solutions/${useCase.slug}`)] = clampTitle(headingText(useCase.hero.title));
  }
  const guides = listGuides("en");
  if (guides.length > 0) titles[ogName("/guides")] = clampTitle(messages.Guides.indexTitle);
  for (const guide of guides) {
    titles[ogName(`/guides/${guide.slug}`)] = clampTitle(guide.header.title);
  }
  for (const story of storiesIn("en")) {
    titles[ogName(`/clients/${story.slug}`)] = clampTitle(story.meta.title);
  }
  return titles;
}
