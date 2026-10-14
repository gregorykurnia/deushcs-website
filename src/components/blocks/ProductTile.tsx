import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import type { ContentImage } from "@/content/images";
import { Placeholder } from "@/components/ui/placeholder";
import { Tag } from "@/components/ui/pills";
import { isExternalHref } from "@/components/ui/text-link";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PotentiaArt, WarmChip } from "./PotentiaBand";

// DESIGN-GUIDE.md §7.11. Each tile is one link. The lead tile (Enhance) spans two rows with a
// large bleed-crop screenshot; side tiles show the top of a screenshot in a short sky thumbnail;
// Potentia spans the full width in the warm skin and opens deuspotentia.com in a new tab.
// Rest is flat with a hairline; hover and focus lift 4px and add the float shadow (only the
// shadow with reduced motion). The image never moves.

export function ProductGrid({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("grid gap-5 desk:grid-cols-[1.25fr_1fr]", className)} {...props} />;
}

type ProductTileProps = {
  variant: "lead" | "side" | "potentia";
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
  className,
}: ProductTileProps) {
  const t = useTranslations("Common");
  const external = isExternalHref(href);
  const lead = variant === "lead";
  const potentia = variant === "potentia";
  const Arrow = external ? ArrowUpRight : ArrowRight;

  const tile = cn(
    "group/tile flex h-full overflow-hidden rounded-lg border",
    "transition-[box-shadow,transform] duration-200 hover:shadow-float focus-visible:shadow-float",
    "motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1",
    potentia
      ? "flex-col border-warm-line bg-[image:var(--grad-warm)] desk:flex-row desk:items-center"
      : "flex-col border-line bg-white",
  );

  const content = (
    <>
      <div
        className={cn(
          "flex flex-col",
          lead && "p-8 desk:px-10 desk:pt-10 desk:pb-8",
          variant === "side" && "px-8 pt-[30px] pb-[26px]",
          potentia && "flex-1 p-7 desk:px-12 desk:py-11",
        )}
      >
        {chip && <WarmChip className="mb-4">{chip}</WarmChip>}
        <h3
          className={cn(
            "text-ink",
            lead && "text-h3-lead",
            variant === "side" && "text-h3",
            potentia && "text-[26px]/[1.2] font-bold tracking-[-0.025em] desk:text-[30px]",
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
        {tags && tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        )}
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
        <PotentiaArt {...art} className="shrink-0 self-stretch desk:basis-[520px]" />
      )}

      {!potentia && (
        <div
          className={cn(
            "relative overflow-hidden bg-[image:var(--grad-thumb)]",
            lead ? "min-h-[300px] flex-1 desk:min-h-[380px]" : "mt-auto h-[200px] shrink-0 desk:h-[170px]",
          )}
        >
          {image ? (
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes={lead ? "(max-width: 900px) 560px, 680px" : "(max-width: 900px) 90vw, 440px"}
              className={cn(
                "absolute max-w-none",
                lead
                  ? "top-6 left-6 w-[560px] rounded-field shadow-float desk:top-10 desk:left-10 desk:w-[680px]"
                  : "top-[26px] left-8 h-[240px] w-[calc(100%-64px)] rounded-sm object-cover object-top shadow-soft",
              )}
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

  return (
    <li className={cn(lead && "desk:row-span-2", potentia && "col-span-full", className)}>
      {external ? (
        <a href={href} target="_blank" rel="noopener" className={tile}>
          {content}
        </a>
      ) : (
        <Link href={href} className={tile}>
          {content}
        </Link>
      )}
    </li>
  );
}
