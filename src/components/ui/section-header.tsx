import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./pills";

// DESIGN-GUIDE.md §7.8 and §3.3. Section label → 20 → H2 → 20 → lede, then 72px
// (48px on mobile) to the content. Centred over grids; left-aligned over article text. A section
// whose H2 is a product's name (the GBA modules, F64–F67) has a smaller sub-line under it, 12 below.

/** A headline whose lines break where the copy says (` / ` in the content files).
 *  Every line renders the same: ink, same weight, no accents. */
export function HeadingLines({ lines }: { lines: string | readonly string[] }) {
  if (typeof lines === "string") return lines;
  // The space between the block lines isn't drawn, but keeps the heading's text readable
  // ("Where could DEUS help you?") for screen readers and copy-paste.
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="block">{line}</span>
    </Fragment>
  ));
}

type SectionHeaderProps = {
  label?: string;
  title: string | readonly string[];
  /** A smaller line right under the title (24px, ink-2), before the lede. */
  subtitle?: string;
  lede?: ReactNode;
  as?: "h1" | "h2";
  align?: "center" | "left";
  id?: string;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  subtitle,
  lede,
  as: Heading = "h2",
  align = "center",
  id,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-[var(--head-gap)] max-w-head",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {label && (
        <SectionLabel className="mb-5">
          {label}
        </SectionLabel>
      )}
      <Heading id={id} className="text-h2 text-balance text-ink">
        <HeadingLines lines={title} />
      </Heading>
      {subtitle && <p className="mt-3 text-h3 font-semibold text-balance text-ink-2">{subtitle}</p>}
      {lede && <p className="mt-5 text-lede-sm text-balance text-slate">{lede}</p>}
    </div>
  );
}
