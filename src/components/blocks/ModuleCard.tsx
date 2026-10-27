import Image from "next/image";
import type { ComponentProps } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Rich } from "@/components/ui/rich";
import type { ContentImage } from "@/content/images";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.10 "Module cards (GBA, round 4)". One card per assessment module, four in a
// 2 × 2 grid, so the whole suite is seen at once. It has the side product tile's anatomy (§7.11) as
// a static card, with no link and no hover lift: the title, a sentence or two on what the candidate
// does and shows, what it measures over a hairline, and a sky strip at the bottom holding the top
// of the module's screen, which the strip crops. The strip is pushed down (`mt-auto`), so the
// strips in a row line up. Each card is an `li` carrying the module's id, which the menu, the
// use-case pages and the old redirects link to; it scrolls to 12px under the header (84px tall,
// 68px below 480px). The title's id is `<id>-title`.
// Enhance's solution (round 4 §S10) reuses the card in three columns, with no measures line and no
// id: nothing links to a single one of those cards. With `screen="whole"` (GBA, owner 2026-10-27:
// a cut-off picture looks wrong) the card shows the whole screen instead, on the card's white with a
// hairline and no sky (owner, same day: sky panels of different heights look unprofessional, and
// the screens' shapes differ). The screen sits at the bottom, inset like the text, so the screens
// in a row end on one line. GBA's four screens (1.6 to 2.0 wide to high, B2, F104) and Enhance's three
// (2.2, 2.4 and 1.3, F121) both pass `frame`: the screen sits inside a 16:9 frame, the same size on
// every card, whole and centred, as Home's "Where we help" and the Enhance hero do.

/** Two equal columns above 900px (three with `columns={3}`), one at 900px and below, with 20px
 *  between cards. Cards in a row share a height (the grid stretches its items). */
export function ModuleGrid({ columns = 2, className, ...props }: ComponentProps<"ul"> & { columns?: 2 | 3 }) {
  return (
    <ul
      className={cn("grid gap-5", columns === 3 ? "desk:grid-cols-3" : "desk:grid-cols-2", className)}
      {...props}
    />
  );
}

type ModuleCardProps = {
  /** The module's anchor: `personality`, `cognitive`, `neuro` or `simulation`. Left out, the card has none. */
  id?: string;
  title: string;
  body: string;
  /** What it measures; the count is marked `**bold**`. Left out, the card has no measures line. */
  measures?: string;
  image: ContentImage;
  /** The image's `sizes` hint, for a grid whose columns are not the GBA page's two. */
  sizes?: string;
  /** `crop` (the default): a fixed-height sky strip showing the top of the screen. `whole`: all of
   *  it, on white. */
  screen?: "crop" | "whole";
  /** With `screen="whole"`: seat the screen in a 16:9 white frame the same size on every card, the
   *  screen fitted whole inside it, instead of at its own height. */
  frame?: boolean;
  /** Position in the grid, for the entrance stagger. */
  index?: number;
  className?: string;
};

export function ModuleCard({
  id,
  title,
  body,
  measures,
  image,
  sizes = "(max-width: 900px) 90vw, 540px",
  screen = "crop",
  frame = false,
  index = 0,
  className,
}: ModuleCardProps) {
  return (
    <Reveal
      as="li"
      id={id}
      index={index}
      className={cn(
        "flex scroll-mt-[96px] flex-col overflow-hidden rounded-lg border border-line bg-white shadow-soft max-[479px]:scroll-mt-20",
        className,
      )}
    >
      <div className="flex flex-col px-6 pt-6 pb-6 min-[600px]:px-8 min-[600px]:pt-[30px] min-[600px]:pb-[26px]">
        <h3 id={id && `${id}-title`} className="text-h3 text-ink">
          {title}
        </h3>
        <p className="mt-3 text-card text-slate">{body}</p>
        {measures && (
          <p className="mt-5 border-t border-line pt-5 text-card text-ink">
            <Rich text={measures} />
          </p>
        )}
      </div>
      {screen === "whole" ? (
        <div className="mt-auto px-6 pb-6 min-[600px]:px-8 min-[600px]:pb-8">
          {frame ? (
            <div
              data-frame=""
              className="relative aspect-video w-full overflow-hidden rounded-sm border border-line bg-white shadow-soft"
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                sizes={sizes}
                className="absolute inset-0 size-full object-contain p-2"
              />
            </div>
          ) : (
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes={sizes}
              className="h-auto w-full rounded-sm border border-line shadow-soft"
            />
          )}
        </div>
      ) : (
        <div className="relative mt-auto h-[150px] shrink-0 overflow-hidden bg-[image:var(--grad-thumb)] min-[600px]:h-[170px]">
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            sizes={sizes}
            className="absolute top-[26px] left-8 h-auto w-[calc(100%-64px)] max-w-none rounded-sm shadow-soft"
          />
        </div>
      )}
    </Reveal>
  );
}
