import messages from "../../messages/en.json";
import { homeAnswerPassage } from "@/content/en/home";
import { getPageContent, pagePaths } from "@/content/registry";
import { listGuides } from "@/content/guides";
import { storiesIn } from "@/content/stories";
import { listUseCases } from "@/content/use-cases";
import type { PageKey } from "@/content/types";
import { SITE_NAME, siteUrl } from "@/lib/metadata";
import { englishPath } from "@/lib/sitemap";

// The text of /llms.txt (GEO §S5, Task G1.8): the site's name, Home's answer passage, then each section's
// pages as `- [Title](URL): summary`. The pages are the ones src/app/sitemap.ts lists, and each title and
// summary is that page's own SEO title and description, so the file can't drift from the site.

/** The sections, in the order the file lists them. Their names come from messages/en.json (`Llms`). */
const SECTIONS = ["products", "useCases", "guides", "company"] as const;
type Section = (typeof SECTIONS)[number];

/** The section each page is listed under. A new page key fails the type check until it has one. */
const SECTION_OF: Record<PageKey, Section> = {
  home: "company",
  solutions: "products",
  gba: "products",
  enhance: "products",
  clients: "company",
  about: "company",
  contact: "company",
  privacy: "company",
};

/** Whitespace collapsed, so a summary stays on one line. */
const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();

type Entry = { section: Section; title: string; summary: string; url: string };

/** Every English page the sitemap lists, in the sitemap's order: the pages, the use cases, the guides (the index first), then the client stories. */
function entries(): Entry[] {
  const origin = siteUrl();
  const pages = (Object.keys(pagePaths) as PageKey[]).flatMap((key) => {
    const content = getPageContent(key, "en");
    return content ? [{ section: SECTION_OF[key], path: englishPath(pagePaths[key]), meta: content.meta }] : [];
  });
  const useCases = listUseCases("en").map((useCase) => ({
    section: "useCases" as const,
    path: englishPath(`/solutions/${useCase.slug}`),
    meta: useCase.meta,
  }));
  const guides = listGuides("en");
  const guideEntries = guides.length
    ? [
        { section: "guides" as const, path: englishPath("/guides"), meta: { title: messages.Guides.indexTitle, description: messages.Guides.indexLede } },
        ...guides.map((guide) => ({ section: "guides" as const, path: englishPath(`/guides/${guide.slug}`), meta: guide.meta })),
      ]
    : [];
  const stories = storiesIn("en").map((story) => ({
    section: "company" as const,
    path: englishPath(`/clients/${story.slug}`),
    meta: story.meta,
  }));
  return [...pages, ...useCases, ...guideEntries, ...stories].map(({ section, path, meta }) => ({
    section,
    title: meta.title,
    summary: oneLine(meta.description),
    url: new URL(path, origin).toString(),
  }));
}

/** The text of /llms.txt. A section with no pages is left out. */
export function llmsTxt(): string {
  const all = entries();
  const lines = [`# ${SITE_NAME}`, "", `> ${oneLine(homeAnswerPassage)}`];
  for (const section of SECTIONS) {
    const items = all.filter((entry) => entry.section === section);
    if (!items.length) continue;
    lines.push("", `## ${messages.Llms[section]}`, "", ...items.map(({ title, url, summary }) => `- [${title}](${url}): ${summary}`));
  }
  return `${lines.join("\n")}\n`;
}
