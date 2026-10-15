import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import type { ContentImage } from "@/content/images";
import { Placeholder } from "@/components/ui/placeholder";
import { Tag } from "@/components/ui/pills";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.21, story card (Clients hub). The side product tile with the product tag
// on top, the client name, the result as the heading (three lines at most) and "Read the story →".
// The whole card is one link, so its accessible name is the tag, client and result in reading order.
// Hover and focus lift 4px and add the float shadow (only the shadow with reduced motion).

export function StoryGrid({ className, ...props }: ComponentProps<"ul">) {
  // a lone card keeps its half width but sits in the middle, so the row doesn't look half empty
  return (
    <ul
      className={cn(
        "grid gap-5 desk:grid-cols-2 desk:[&>li:only-child]:col-span-2 desk:[&>li:only-child]:mx-auto desk:[&>li:only-child]:w-[calc(50%-10px)]",
        className,
      )}
      {...props}
    />
  );
}

type StoryCardProps = {
  /** The product: "Game-Based Assessment". */
  product: string;
  /** The client's name, or an anonymous description while permission is pending. */
  client: string;
  /** The result, as the heading. */
  result: string;
  href: string;
  /** "Story is in Indonesian": shown under the link when the story isn't in the page's language. */
  note?: string;
  /** Optional thumbnail on a sky tile. Without `image` or `placeholder` the card has no tile. */
  image?: ContentImage;
  placeholder?: string;
  className?: string;
};

export function StoryCard({ product, client, result, href, note, image, placeholder, className }: StoryCardProps) {
  const t = useTranslations("ClientStoryCard");
  const hasTile = Boolean(image ?? placeholder);

  return (
    <li className={className}>
      <Link
        href={href}
        className={cn(
          "group/tile flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white",
          "transition-[box-shadow,transform] duration-200 hover:shadow-float focus-visible:shadow-float",
          "motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1",
        )}
      >
        <div className={cn("flex flex-col px-8 pt-[30px]", hasTile ? "pb-[26px]" : "pb-8")}>
          <Tag className="self-start">{product}</Tag>
          <p className="mt-5 text-label font-medium text-slate">{client}</p>
          {/* three lines (§7.21) where the card is half the width; a phone needs more for the same
              sentence, so the clamp there is only a safety net and never cuts the result short */}
          <h3 className="mt-1 line-clamp-6 text-h3 text-ink desk:line-clamp-3">{result}</h3>
          <span className="mt-5 inline-flex items-center gap-2 text-ui font-semibold text-azure-ink">
            <span className="group-hover/tile:underline group-hover/tile:underline-offset-3">{t("cta")}</span>
            <ArrowRight
              aria-hidden="true"
              className="size-[17px] shrink-0 stroke-2 transition-transform duration-150 group-hover/tile:translate-x-[3px]"
            />
          </span>
          {note && <span className="mt-1 text-meta text-slate">{note}</span>}
        </div>

        {hasTile && (
          <div className="relative mt-auto h-[200px] shrink-0 overflow-hidden bg-[image:var(--grad-thumb)] desk:h-[170px]">
            {image ? (
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                sizes="(max-width: 900px) 90vw, 440px"
                className="absolute top-[26px] left-8 h-[240px] w-[calc(100%-64px)] max-w-none rounded-sm object-cover object-top shadow-soft"
              />
            ) : (
              <Placeholder
                caption={placeholder ?? ""}
                className="absolute top-[26px] right-8 bottom-4 left-8 min-h-0 rounded-sm bg-[image:var(--grad-stage)] p-3 shadow-soft"
              />
            )}
          </div>
        )}
      </Link>
    </li>
  );
}
