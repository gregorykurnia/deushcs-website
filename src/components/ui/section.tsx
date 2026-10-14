import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

// DESIGN-GUIDE.md §4.2 and §6. 144px top and bottom (88px on mobile).
// White is the default; Cloud alternates; the sky wash is for one section per page at most.
// `tight` is the 96px top for the second of two sections that share a background.
const surfaces = {
  white: "bg-white",
  cloud: "bg-cloud",
  "sky-wash": "bg-[image:var(--grad-sky-wash)]",
} as const;

export type Surface = keyof typeof surfaces;

export function Section({
  surface = "white",
  tight = false,
  contained = true,
  className,
  children,
  ...props
}: ComponentProps<"section"> & {
  surface?: Surface;
  tight?: boolean;
  /** Wrap children in the 1200px Container (default). Turn off for full-width content. */
  contained?: boolean;
}) {
  return (
    <section
      data-surface={surface}
      className={cn(
        "py-[var(--section-y)]",
        surfaces[surface],
        tight && "pt-[var(--section-y-tight)]",
        className,
      )}
      {...props}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
