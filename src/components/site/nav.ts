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
  key: "gba" | "personality" | "cognitive" | "neuroscience" | "simulation" | "enhance" | "potentia";
  href: string;
  external?: boolean;
};

export type SolutionColumn = {
  /** The product that leads the column. */
  lead: SolutionItem;
  /** Its parts, listed under it behind a thin left rule. */
  parts?: readonly SolutionItem[];
  /** A card below the parts: not part of the product above it. */
  card?: SolutionItem;
};

const gbaHref = "/solutions/game-based-assessment";

/** Mega menu columns (F1 + F10): products lead, no group headings. */
export const solutionColumns: readonly SolutionColumn[] = [
  {
    lead: { key: "gba", href: gbaHref },
    parts: [
      { key: "personality", href: `${gbaHref}#personality` },
      { key: "cognitive", href: `${gbaHref}#cognitive` },
      { key: "neuroscience", href: `${gbaHref}#neuro` },
      { key: "simulation", href: `${gbaHref}#simulation` },
    ],
    card: { key: "potentia", href: potentiaHref(), external: true },
  },
  { lead: { key: "enhance", href: "/solutions/enhance" } },
];

/** Footer "Solutions" column: the three products (F10). */
export const footerSolutions: readonly {
  key: "gba" | "enhance" | "potentia";
  href: string;
  external?: boolean;
}[] = [
  { key: "gba", href: gbaHref },
  { key: "enhance", href: "/solutions/enhance" },
  { key: "potentia", href: potentiaHref(), external: true },
];

export const solutionsHref = "/solutions";
export const contactHref = "/contact";

/** Which header item is "current" for a locale-less pathname such as `/solutions/enhance`. */
export function activeSection(pathname: string): SectionKey | null {
  const first = pathname.split("/")[1] ?? "";
  const keys: readonly SectionKey[] = ["solutions", "clients", "science", "about", "contact"];
  return (keys as readonly string[]).includes(first) ? (first as SectionKey) : null;
}
