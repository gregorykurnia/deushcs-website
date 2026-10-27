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

/** Two equal columns above 900px, one at 900px and below, with 20px between cards. Cards in a row
 *  share a height (the grid stretches its items). */
export function ModuleGrid({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("grid gap-5 desk:grid-cols-2", className)} {...props} />;
}

type ModuleCardProps = {
  /** The module's anchor: `personality`, `cognitive`, `neuro` or `simulation`. */
  id: string;
  title: string;
  body: string;
  /** What it measures; the count is marked `**bold**`. */
  measures: string;
  image: ContentImage;
  /** Position in the grid, for the entrance stagger. */
  index?: number;
  className?: string;
};

export function ModuleCard({ id, title, body, measures, image, index = 0, className }: ModuleCardProps) {
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
        <h3 id={`${id}-title`} className="text-h3 text-ink">
          {title}
        </h3>
        <p className="mt-3 text-card text-slate">{body}</p>
        <p className="mt-5 border-t border-line pt-5 text-card text-ink">
          <Rich text={measures} />
        </p>
      </div>
      <div className="relative mt-auto h-[150px] shrink-0 overflow-hidden bg-[image:var(--grad-thumb)] min-[600px]:h-[170px]">
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes="(max-width: 900px) 90vw, 540px"
          className="absolute top-[26px] left-8 h-auto w-[calc(100%-64px)] max-w-none rounded-sm shadow-soft"
        />
      </div>
    </Reveal>
  );
}
