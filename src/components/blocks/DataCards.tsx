import Image from "next/image";
import type { ContentImage } from "@/content/images";
import {
  DataBar,
  FloatingCard,
  FloatingCardKey,
  FloatingCardTitle,
} from "@/components/ui/floating-card";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.13. The four floating UI cards, built in code so they stay sharp,
// translatable and accessible. All data is illustrative until the team approves sample data
// (guide, top note). Bars are sky-3 → azure; the only ember inside a card is "Approved".

type Surface = "frosted" | "solid";

/** A game screenshot with what's being played: "Plays DEUS Discover · 22 minutes". By default the card
 *  is as tall as its screenshot; `frame` fits the screen whole in a 16:10 box instead, so two cards
 *  side by side match whatever shapes their screens have (B2, F104). */
export function PlayCard({
  image,
  title,
  meta,
  surface,
  sizes = "(max-width: 900px) 90vw, 340px",
  frame,
  className,
}: {
  image: ContentImage;
  title: string;
  meta?: string;
  surface?: Surface;
  /** The image's `sizes`, when the card is wider than the 340px of the hero journey. */
  sizes?: string;
  frame?: boolean;
  className?: string;
}) {
  return (
    <FloatingCard shape="play" surface={surface} className={className}>
      {frame ? (
        <div data-frame="" className="relative aspect-[16/10] overflow-hidden rounded-[15px] bg-white">
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            sizes={sizes}
            className="absolute inset-0 size-full object-contain"
          />
        </div>
      ) : (
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes={sizes}
          className="w-full rounded-[15px]"
        />
      )}
      <div className="flex items-center justify-between gap-3 px-2.5 pt-3 pb-1.5 text-label/[1.4] font-semibold text-ink">
        <span>{title}</span>
        {meta && <span className="text-meta/[1.4] font-medium text-slate">{meta}</span>}
      </div>
    </FloatingCard>
  );
}

export type Trait = { label: string; value: number };

/** Key → person → three trait rows with bars → a footer line above a hairline. */
export function ProfileCard({
  label,
  name,
  traits,
  footer,
  surface,
  className,
}: {
  label: string;
  name: string;
  traits: readonly Trait[];
  footer?: string;
  surface?: Surface;
  className?: string;
}) {
  return (
    <FloatingCard surface={surface} className={className}>
      <FloatingCardKey>{label}</FloatingCardKey>
      <FloatingCardTitle>{name}</FloatingCardTitle>
      <ul>
        {traits.map((trait) => (
          <li key={trait.label}>
            <p className="mt-3.5 flex justify-between text-label/[1.4] font-semibold text-ink">
              <span>{trait.label}</span>
              <span className="text-slate tabular-nums">{trait.value}</span>
            </p>
            {/* The label and number above already say it; the bar is a picture of them. */}
            <DataBar value={trait.value} />
          </li>
        ))}
      </ul>
      {footer && (
        <p className="mt-4 border-t border-line pt-3.5 text-[13.5px]/[1.5] font-semibold text-ink">
          {footer}
        </p>
      )}
    </FloatingCard>
  );
}

/** Key → big score with a rating tag → two split cells → the bonus row ("Approved" in ember-ink). */
export function AppraisalCard({
  label,
  score,
  rating,
  split,
  bonus,
  surface,
  className,
}: {
  label: string;
  score: string;
  rating: string;
  split: readonly [{ label: string; value: string }, { label: string; value: string }];
  bonus: { label: string; status: string };
  surface?: Surface;
  className?: string;
}) {
  return (
    <FloatingCard surface={surface} className={className}>
      <FloatingCardKey>{label}</FloatingCardKey>
      <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <b className="text-stat text-ink tabular-nums">{score}</b>
        <span className="rounded-pill bg-sky-1 px-[11px] py-[5px] text-[13.5px]/[1.3] font-semibold text-azure-ink">
          {rating}
        </span>
      </div>
      <dl className="mt-[18px] grid grid-cols-2 gap-2.5">
        {split.map((cell) => (
          <div key={cell.label} className="rounded-sm bg-cloud px-3 py-2.5 text-[12.5px]/[1.5] text-slate">
            <dt>{cell.label}</dt>
            <dd className="mt-px text-[18px]/[1.3] font-bold text-ink tabular-nums">{cell.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 flex items-center justify-between gap-3 rounded-sm bg-ember-wash px-3.5 py-3 text-label/[1.4] font-semibold text-ink">
        <span>{bonus.label}</span>
        <span className="text-meta/[1.4] text-ember-ink">{bonus.status}</span>
      </p>
    </FloatingCard>
  );
}

/** Solid result card on a stage: "Numerical reasoning · 82 percentile, Indonesian norm". */
export function ResultCard({
  label,
  value,
  unit,
  bar,
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  /** Bar fill, 0–100. Leave out when the value isn't a share. */
  bar?: number;
  className?: string;
}) {
  return (
    <FloatingCard shape="result" className={cn("text-left", className)}>
      <FloatingCardKey>{label}</FloatingCardKey>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
        <b className="text-[40px]/[1.05] font-semibold tracking-[-0.04em] text-ink tabular-nums">{value}</b>
        {unit && <span className="text-meta/[1.4] text-slate">{unit}</span>}
      </p>
      {bar !== undefined && <DataBar value={bar} className="mt-3" />}
    </FloatingCard>
  );
}
