import Image from "next/image";
import type { ComponentProps } from "react";
import type { ContentImage } from "@/content/images";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.22. <figure>, <blockquote>, <figcaption>. No italics, no ember.
// `main` is the full-width client quote (26px on desktop); `participant` is one of a three-up
// grid (18px / 500). On Cloud sections use `surface="white"` (white with a hairline).
// Quotes need permission and keep their original language: `lang` marks it for screen readers
// and hyphenation, and `translation` is the smaller line below.

export function QuoteGrid({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("grid gap-5 desk:grid-cols-3", className)} {...props} />;
}

type QuoteCardProps = {
  quote: string;
  /** Language of `quote` when it differs from the page: "id". */
  lang?: string;
  /** The same quote in the page's language, as a smaller line below. */
  translation?: string;
  translationLang?: string;
  /** Who said it. Participant quotes can go without. */
  name?: string;
  role?: string;
  portrait?: ContentImage;
  variant?: "main" | "participant";
  surface?: "cloud" | "white";
  className?: string;
};

export function QuoteCard({
  quote,
  lang,
  translation,
  translationLang,
  name,
  role,
  portrait,
  variant = "participant",
  surface = "cloud",
  className,
}: QuoteCardProps) {
  const main = variant === "main";
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-lg p-7 desk:p-10",
        surface === "cloud" ? "bg-cloud" : "border border-line bg-white",
        className,
      )}
    >
      <span aria-hidden="true" className="mb-2 block text-[56px]/[.6] font-semibold text-sky-3 select-none">
        “
      </span>
      <blockquote
        className={cn(
          "text-pretty text-ink",
          main
            ? "text-[22px]/[1.45] font-semibold tracking-[-0.015em] desk:text-[26px]/[1.45]"
            : "text-[18px]/[1.5] font-medium tracking-[-0.01em]",
        )}
      >
        <p lang={lang}>{quote}</p>
        {translation && (
          <p lang={translationLang} className="mt-4 text-label/[1.55] font-medium tracking-normal text-slate">
            {translation}
          </p>
        )}
      </blockquote>
      {name && (
        <figcaption className="mt-6 flex items-center gap-3">
          {portrait && (
            <Image
              src={portrait.src}
              width={44}
              height={44}
              alt={portrait.alt}
              className="size-11 shrink-0 rounded-full object-cover"
            />
          )}
          <span>
            <b className="block text-ui font-bold text-ink">{name}</b>
            {role && <span className="block text-label text-slate">{role}</span>}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
