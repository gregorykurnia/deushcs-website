import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import type { ContentImage } from "@/content/images";
import { Placeholder } from "@/components/ui/placeholder";
import { TagList } from "@/components/ui/pills";
import { isExternalHref } from "@/components/ui/text-link";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PotentiaArt, WarmChip } from "./PotentiaBand";

// DESIGN-GUIDE.md §7.11. Each tile is one link. The lead tile (Enhance) spans two rows with a
// large bleed-crop screenshot; side tiles show the whole screenshot in a white frame on a short sky
// thumbnail, the frame the same size on each side tile;
// Potentia spans the full width in the warm skin (or, stacked, sits in a row of three cards) and
// opens deuspotentia.com in a new tab; its phone and report art always show whole (F110). A wide
// tile (extrapolated) is the lead tile alone in its row: copy left, the bleed-crop screenshot right
// on desktop, so a group with one product doesn't leave half a tile empty.
// Rest is flat with a hairline; hover and focus lift 4px and add the float shadow (only the
// shadow with reduced motion). The image never moves.

// `thirds` puts three cards of the same size in one row (Home, F50: side tiles and a stacked
// Potentia tile); the default `1.25fr 1fr` is for a lead tile next to a side tile (Solutions page,
// styleguide).
export function ProductGrid({ thirds, className, ...props }: ComponentProps<"ul"> & { thirds?: boolean }) {
  return (
    <ul className={cn("grid gap-5", thirds ? "desk:grid-cols-3" : "desk:grid-cols-[1.25fr_1fr]", className)} {...props} />
  );
}

type ProductTileProps = {
  variant: "lead" | "side" | "wide" | "potentia";
  title: string;
  /** "Performance and reward". */
  subtitle?: string;
  body: string;
  /** Lead tile: three feature tags. */
  tags?: readonly string[];
  /** "See DEUS Enhance". An arrow is added: → internal, ↗ external. */
  linkLabel: string;
  href: string;
  /** Lead and side tiles. A TODO placeholder stands in until the screenshot exists. */
  image?: ContentImage;
  placeholder?: string;
  /** Potentia: the language chip and the phone + report art. */
  chip?: string;
  art?: { phone: ContentImage; report: ContentImage };
  /** Potentia as a card the size of a side tile (copy over its art, which fills the rest of the
   *  card) instead of the full-width row, for a row of three equal cards (Home, F50). */
  stacked?: boolean;
  className?: string;
};

export function ProductTile({
  variant,
  title,
  subtitle,
  body,
  tags,
  linkLabel,
  href,
  image,
  placeholder,
  chip,
  art,
  stacked = false,
  className,
}: ProductTileProps) {
  const t = useTranslations("Common");
  const external = isExternalHref(href);
  const wide = variant === "wide";
  // A wide tile is a lead tile laid out in a row: same type, padding and screenshot.
  const lead = variant === "lead" || wide;
  const potentia = variant === "potentia";
  // A stacked Potentia tile takes a side tile's padding and type; its art fills the rest of the card.
  const row = potentia && !stacked;
  const side = variant === "side" || (potentia && stacked);
  const Arrow = external ? ArrowUpRight : ArrowRight;

  const tile = cn(
    "group/tile flex h-full overflow-hidden rounded-lg border",
    "transition-[box-shadow,transform] duration-200 hover:shadow-float focus-visible:shadow-float",
    "motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1",
    potentia
      ? cn("flex-col border-warm-line bg-[image:var(--grad-warm)]", row && "desk:flex-row desk:items-center")
      : cn("flex-col border-line bg-white", wide && "desk:flex-row"),
  );

  const content = (
    <>
      <div
        className={cn(
          "flex flex-col",
          lead && "p-8 desk:px-10 desk:pt-10 desk:pb-8",
          wide && "desk:flex-1 desk:justify-center desk:p-12",
          side && "px-8 pt-[30px] pb-[26px]",
          row && "flex-1 p-7 desk:px-12 desk:py-11",
        )}
      >
        {chip && <WarmChip className="mb-4">{chip}</WarmChip>}
        <h3
          className={cn(
            "text-ink",
            lead && "text-h3-lead",
            side && "text-h3",
            row && "text-[26px]/[1.2] font-bold tracking-[-0.025em] desk:text-[30px]",
          )}
        >
          {title}
        </h3>
        {subtitle && <p className="text-label font-medium text-slate">{subtitle}</p>}
        <p
          className={cn(
            "mt-3",
            lead ? "max-w-[30em] text-body text-slate" : "text-card",
            potentia ? "max-w-[34em] text-warm-text" : "text-slate",
          )}
        >
          {body}
        </p>
        {tags && tags.length > 0 && <TagList items={tags} className={cn("mt-5", potentia && "text-warm-text")} />}
        <span
          className={cn(
            "mt-5 inline-flex items-center gap-2 text-ui font-semibold",
            potentia ? "text-warm-link" : "text-azure-ink",
          )}
        >
          <span className="group-hover/tile:underline group-hover/tile:underline-offset-3">{linkLabel}</span>
          <Arrow
            aria-hidden="true"
            className="size-[17px] shrink-0 stroke-2 transition-transform duration-150 group-hover/tile:translate-x-[3px]"
          />
          {external && <span className="sr-only"> {t("opensInNewTab")}</span>}
        </span>
      </div>

      {potentia && art && (
        <PotentiaArt
          {...art}
          className={cn("shrink-0 self-stretch", row ? "desk:basis-[520px]" : "flex-1 desk:min-h-[200px]")}
        />
      )}

      {!potentia && (
        <div
          className={cn(
            "relative overflow-hidden bg-[image:var(--grad-thumb)]",
            lead ? "min-h-[300px] flex-1 desk:min-h-[380px]" : "mt-auto h-[200px] shrink-0",
            wide && "desk:flex-none desk:basis-[56%]",
          )}
        >
          {image && !lead ? (
            // Side tiles: the screen whole in a white frame the same size on each tile (Phase A
            // review, owner rule 2026-10-27: a product screen is never cut off), as the Enhance cards do.
            <div
              data-frame=""
              className="absolute inset-x-8 top-5 bottom-5 overflow-hidden rounded-sm border border-line bg-white shadow-soft"
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                sizes="(max-width: 900px) 90vw, 440px"
                className="absolute inset-0 size-full object-contain p-2"
              />
            </div>
          ) : image ? (
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes="(max-width: 900px) 560px, 680px"
              className="absolute top-6 left-6 w-[560px] max-w-none rounded-field shadow-float desk:top-10 desk:left-10 desk:w-[680px]"
            />
          ) : (
            <Placeholder
              caption={placeholder ?? ""}
              className={cn(
                "absolute min-h-0 rounded-sm bg-[image:var(--grad-stage)] shadow-soft",
                lead ? "inset-6 desk:inset-10" : "top-[26px] right-8 bottom-4 left-8 p-3",
              )}
            />
          )}
        </div>
      )}
    </>
  );

  // The tile's link is a call to action, named by where it goes (WEBSITE-PLAN.md §8.4).
  const cta = external ? new URL(href).hostname : href;

  return (
    <li className={cn(variant === "lead" && "desk:row-span-2", (row || wide) && "col-span-full", className)}>
      {external ? (
        <a href={href} target="_blank" rel="noopener" className={tile} data-cta={cta}>
          {content}
        </a>
      ) : (
        <Link href={href} className={tile} data-cta={cta}>
          {content}
        </Link>
      )}
    </li>
  );
}
