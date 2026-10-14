import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §4.1. Gutters sit inside the max width, as in the mockup's `.wrap`
// (box-sizing: border-box). `wide` is the 1320px frame for the header, hero window
// and closing panel; `article` is the 720px reading column.
const sizes = {
  content: "max-w-content",
  wide: "max-w-wide",
  article: "max-w-[calc(var(--container-article)+2*var(--gutter))]",
} as const;

export function Container({
  size = "content",
  className,
  ...props
}: ComponentProps<"div"> & { size?: keyof typeof sizes }) {
  return (
    <div
      className={cn("mx-auto w-full px-[var(--gutter)]", sizes[size], className)}
      {...props}
    />
  );
}
