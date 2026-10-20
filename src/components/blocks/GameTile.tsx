import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { Placeholder } from "@/components/ui/placeholder";
import type { ContentImage } from "@/content/images";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.16. A game screenshot (cropped to cover) above a caption row: the module
// or game name, and what it shows. Game screenshots are the one place with dark, saturated
// colour, so the surfaces around them stay light. Static by default; with `href` the whole tile
// is a link and lifts like a product tile. A screen that isn't supplied yet is a `placeholder`
// caption in the same frame (§14.3). In the games list the caption sits under the name, because
// "what it measures" can run to a line and a half.

const grids = {
  /** Home spotlight, four tiles as a mirrored 2×2 (F31): wide + narrow, then narrow + wide. Three
   *  tracks so a wide tile spans two (1fr + 0.6fr, the old 1.6fr lead). The first carries the event log. */
  spotlight:
    "grid gap-5 desk:grid-cols-[1fr_0.6fr_1fr] desk:[&>li:nth-child(4n+1)]:col-span-2 desk:[&>li:nth-child(4n)]:col-span-2",
  /** GBA module games list (extrapolated): three equal columns, two from 600 to 900px. Below 600px a
   *  sideways-swipe row (F40), out to the screen's edges, each tile 78% wide so the next one peeks
   *  in; the bottom padding keeps the tiles' shadow clear of the scroll box. */
  list: cn(
    "-mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-3",
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>li]:w-[78%] [&>li]:shrink-0 [&>li]:snap-start",
    "min-[600px]:mx-0 min-[600px]:grid min-[600px]:grid-cols-2 min-[600px]:gap-5 min-[600px]:overflow-visible min-[600px]:p-0 min-[600px]:[&>li]:w-auto desk:grid-cols-3",
  ),
} as const;

export function GameGrid({
  variant = "spotlight",
  className,
  ...props
}: ComponentProps<"ul"> & { variant?: keyof typeof grids }) {
  return <ul className={cn(grids[variant], className)} {...props} />;
}

export function GameTile({
  image,
  placeholder,
  title,
  caption,
  size = "spotlight",
  overlay,
  overlayOnMobile = "hide",
  href,
  className,
}: {
  image?: ContentImage;
  /** The TODO caption shown in place of a screenshot that isn't supplied yet. */
  placeholder?: string;
  /** Module or game name: "Personality". */
  title: string;
  /** What it shows or measures: "Story choices". */
  caption?: string;
  /** Image height: 300px in the spotlight, 200px in the games list. */
  size?: "spotlight" | "list";
  /** The event log, floated top right over the screenshot on desktop. */
  overlay?: ReactNode;
  /** Below 901px the log hides (mockup), or sits under the caption when the section is about it. */
  overlayOnMobile?: "hide" | "below";
  href?: string;
  className?: string;
}) {
  const body = (
    <>
      {image ? (
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes={size === "list" ? "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 380px" : "(max-width: 900px) 100vw, 720px"}
          className={cn("w-full object-cover", size === "list" ? "h-[200px]" : "h-[300px]")}
        />
      ) : (
        <Placeholder
          caption={placeholder ?? ""}
          className={cn("rounded-none", size === "list" ? "h-[200px]" : "h-[300px]")}
        />
      )}
      <div
        className={cn(
          "px-[22px] py-[18px]",
          // In the spotlight a caption that doesn't fit beside the name drops whole to its own line,
          // left-aligned, instead of breaking into a ragged right-aligned pair (Indonesian runs longer).
          size === "list" ? "flex flex-col gap-1" : "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1",
        )}
      >
        <b className="text-title-sm text-ink">{title}</b>
        {caption && (
          <span className={cn("text-label text-slate", size !== "list" && "whitespace-nowrap")}>{caption}</span>
        )}
      </div>
      {overlay && (
        <div
          className={cn(
            "desk:absolute desk:top-4 desk:right-4 desk:w-[290px]",
            overlayOnMobile === "hide" ? "max-desk:hidden" : "mx-4 mb-4",
            "desk:m-0",
          )}
        >
          {overlay}
        </div>
      )}
    </>
  );

  const tile = cn(
    "relative block h-full overflow-hidden rounded-lg border border-line bg-white shadow-soft",
    href && "transition-[box-shadow,transform] duration-200 hover:shadow-float focus-visible:shadow-float motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1",
  );

  return (
    <li className={className}>
      {href ? (
        <Link href={href} className={tile}>
          {body}
        </Link>
      ) : (
        <div className={tile}>{body}</div>
      )}
    </li>
  );
}
