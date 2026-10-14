import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.13. Real-looking product UI built in code. One shell, three shapes.
// Over the sky the card is frosted; on white or cloud it is solid white with a hairline.
const shapes = {
  card: "rounded-float p-5",
  play: "rounded-float p-2",
  result: "rounded-float-sm px-[22px] py-5",
} as const;

const surfaces = {
  frosted: "border-white/95 bg-white/90 backdrop-blur-[16px]",
  solid: "border-line bg-white",
} as const;

export function FloatingCard({
  shape = "card",
  surface,
  className,
  ...props
}: ComponentProps<"div"> & {
  shape?: keyof typeof shapes;
  /** Defaults to frosted, except the result card, which the mockup draws solid. */
  surface?: keyof typeof surfaces;
}) {
  const resolved = surface ?? (shape === "result" ? "solid" : "frosted");
  return (
    <div
      className={cn("border shadow-float", shapes[shape], surfaces[resolved], className)}
      {...props}
    />
  );
}

/** Small key above the title: "Candidate profile". */
export function FloatingCardKey({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-meta font-medium text-slate", className)} {...props} />;
}

/** The card's title, usually the person: "Rina Wulandari". */
export function FloatingCardTitle({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("mt-0.5 text-title-sm text-ink", className)} {...props} />;
}

/** 6px data bar: sky-3 → azure on a sky-1 track; width equals the value.
 *  Pass `label` when the meaning isn't already in visible text ("Rational: 94 out of 100"). */
export function DataBar({
  value,
  max = 100,
  label,
  className,
}: {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("mt-[7px]", className)}>
      <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-[9px] bg-sky-1">
        <i
          className="block h-full rounded-[9px] bg-[image:var(--grad-bar)]"
          style={{ width: `${pct}%` }}
        />
      </div>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
