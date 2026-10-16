import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.7. A section label names a section, a tag states an attribute,
// a chip is a control. Tags must not look clickable.

/** The label above a section heading (F4, option B): small azure-ink capitals between two
 *  short azure lines (`.section-label` in globals.css). No fill, so it reads the same on white,
 *  cloud and sky. Inline-block, so it follows the text alignment of its parent (centred headers,
 *  left-aligned articles) and a long label wraps in balanced rows. */
export function SectionLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "section-label inline-block max-w-full align-top text-eyebrow text-balance text-azure-ink uppercase",
        className,
      )}
      {...props}
    />
  );
}

/** Static attribute: features on the lead tile, product tags on story cards. */
export function Tag({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-block rounded-pill bg-sky-1 px-[13px] py-[7px] text-[13.5px]/[1.65] font-semibold text-azure-ink",
        className,
      )}
      {...props}
    />
  );
}

/** Interactive filter or choice. Pressed (or checked, in a radiogroup) fills ink. */
export function Chip({
  pressed,
  className,
  type,
  ...props
}: ComponentProps<"button"> & { pressed?: boolean }) {
  return (
    <button
      type={type ?? "button"}
      aria-pressed={props.role === "radio" ? undefined : pressed}
      className={cn(
        "relative inline-flex items-center rounded-pill border border-line bg-white px-3.5 py-2 text-label font-semibold text-ink-2",
        "transition-[background-color,border-color,color] duration-150 hover:border-slate-2",
        "before:absolute before:inset-x-0 before:-inset-y-1 before:content-['']",
        "aria-checked:border-ink aria-checked:bg-ink aria-checked:text-white",
        "aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white",
        "disabled:cursor-not-allowed disabled:border-line disabled:text-slate-2",
        className,
      )}
      {...props}
    />
  );
}
