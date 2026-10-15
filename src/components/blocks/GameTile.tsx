import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import type { ContentImage } from "@/content/images";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.16. A game screenshot (cropped to cover) above a caption row: the module
// or game name, and what it shows. Game screenshots are the one place with dark, saturated
// colour, so the surfaces around them stay light. Static by default; with `href` the whole tile
// is a link and lifts like a product tile.

const grids = {
  /** Home spotlight: the first, wider tile can carry the event log. */
  spotlight: "grid gap-5 desk:grid-cols-[1.6fr_1fr_1fr]",
  /** Next Chapter games list (extrapolated): three equal columns, two from 600 to 900px. */
  list: "grid gap-5 min-[600px]:grid-cols-2 desk:grid-cols-3",
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
  title,
  caption,
  size = "spotlight",
  overlay,
  overlayOnMobile = "hide",
  href,
  className,
}: {
  image: ContentImage;
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
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes={size === "list" ? "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 380px" : "(max-width: 900px) 100vw, 560px"}
        className={cn("w-full object-cover", size === "list" ? "h-[200px]" : "h-[300px]")}
      />
      <div className="flex items-baseline justify-between gap-4 px-[22px] py-[18px]">
        <b className="text-title-sm text-ink">{title}</b>
        {caption && <span className="text-right text-label text-slate">{caption}</span>}
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
