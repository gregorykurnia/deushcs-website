import type { ReactNode } from "react";
import { LabelPill } from "@/components/ui/pills";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.27, extrapolated. The 404 and error pages: a centred closing-gradient panel
// in a 960px frame (radius 36), with 64px of White above and below. Label pill → H1 at the
// closing scale → lede (kept in the panel's top 60%, where slate passes) → buttons.
// No illustration, no orbit rings, no ember.
export function StatusPanel({
  label,
  title,
  lede,
  actions,
  headingAs: Heading = "h1",
  className,
}: {
  label: string;
  title: string;
  lede: string;
  /** Primary then secondary button. */
  actions: ReactNode;
  /** h2 when shown inside another page (the styleguide). */
  headingAs?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("px-6 py-16 max-[479px]:px-3", className)}>
      <div className="mx-auto max-w-[960px] rounded-xl bg-[image:var(--grad-closing)] px-6 py-16 text-center desk:px-12 desk:py-24">
        <LabelPill onSky className="mb-5">
          {label}
        </LabelPill>
        <Heading className="mx-auto max-w-[12em] text-closing text-balance text-ink">{title}</Heading>
        <p className="mx-auto mt-[22px] max-w-[32em] text-lede-sm text-balance text-slate">{lede}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 desk:flex-row">{actions}</div>
      </div>
    </div>
  );
}
