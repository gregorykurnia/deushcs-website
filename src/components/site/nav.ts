import { potentiaHref } from "@/lib/links";

// Site navigation shared by the header, mega menu and mobile sheet.
// Labels live in messages/*.json under Header.*; this file holds keys and routes only.

export type SectionKey = "solutions" | "clients" | "science" | "about" | "contact";

/** Pill nav after "Solutions", in the order the owner chose (DESIGN-GUIDE.md §7.1). */
export const primaryLinks = [
  { key: "clients", href: "/clients" },
  { key: "science", href: "/science" },
  { key: "about", href: "/about" },
] as const satisfies readonly { key: SectionKey; href: string }[];

export type SolutionItem = {
  key: "gba" | "discover" | "nextChapter" | "enhance" | "potentia";
  href: string;
  external?: boolean;
};

export type SolutionGroup = {
  key: "assess" | "perform" | "families";
  /** Groups with a sub-line under the heading in the mega menu. */
  hasSub: boolean;
  items: readonly SolutionItem[];
};

/** Mega menu groups (content/en/global.md, "Solutions menu"). */
export const solutionGroups: readonly SolutionGroup[] = [
  {
    key: "assess",
    hasSub: true,
    items: [
      { key: "gba", href: "/solutions/game-based-assessment" },
      { key: "discover", href: "/solutions/discover" },
      { key: "nextChapter", href: "/solutions/next-chapter" },
    ],
  },
  {
    key: "perform",
    hasSub: true,
    items: [{ key: "enhance", href: "/solutions/enhance" }],
  },
  {
    key: "families",
    hasSub: false,
    items: [{ key: "potentia", href: potentiaHref(), external: true }],
  },
];

export const solutionsHref = "/solutions";
export const contactHref = "/contact";

/** Which header item is "current" for a locale-less pathname such as `/solutions/enhance`. */
export function activeSection(pathname: string): SectionKey | null {
  const first = pathname.split("/")[1] ?? "";
  const keys: readonly SectionKey[] = ["solutions", "clients", "science", "about", "contact"];
  return (keys as readonly string[]).includes(first) ? (first as SectionKey) : null;
}
