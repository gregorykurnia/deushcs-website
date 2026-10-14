import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LabelPill } from "./pills";

// DESIGN-GUIDE.md §7.8 and §3.3. Label pill → 20 → H2 → 20 → lede, then 72px
// (48px on mobile) to the content. Centred over grids; left-aligned over article text.

/** A headline whose lines break where the copy says (` / ` in the content files).
 *  Every line renders the same: ink, same weight, no accents. */
export function HeadingLines({ lines }: { lines: string | readonly string[] }) {
  if (typeof lines === "string") return lines;
  // The space between the block lines isn't drawn, but keeps the heading's text readable
  // ("Ready to transform with DEUS?") for screen readers and copy-paste.
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
  lede?: ReactNode;
  as?: "h1" | "h2";
  align?: "center" | "left";
  /** Use the translucent label pill on sky or sky-1 backgrounds. */
  onSky?: boolean;
  id?: string;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  lede,
  as: Heading = "h2",
  align = "center",
  onSky = false,
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
        <LabelPill onSky={onSky} className="mb-5">
          {label}
        </LabelPill>
      )}
      <Heading id={id} className="text-h2 text-balance text-ink">
        <HeadingLines lines={title} />
      </Heading>
      {lede && <p className="mt-5 text-lede-sm text-balance text-slate">{lede}</p>}
    </div>
  );
}
