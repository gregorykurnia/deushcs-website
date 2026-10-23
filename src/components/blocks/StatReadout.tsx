import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Rich } from "@/components/ui/rich";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.15. Three ways to state a fact: short stat tiles ("Browser only"),
// big-number stats ("32 personality subtraits"), and the proof row under the hero.

export type StatFact = { title: string; body: string };

/** Short facts in white tiles with a hairline: a bold title and one slate line. */
export function StatTiles({ items, className }: { items: readonly StatFact[]; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-4 min-[600px]:flex-row", className)}>
      {items.map((item) => (
        <li key={item.title} className="flex-1 rounded-md border border-line bg-white px-[22px] py-5">
          <b className="block text-title text-ink">{item.title}</b>
          <span className="mt-1 block text-label/[1.45] text-slate">{item.body}</span>
        </li>
      ))}
    </ul>
  );
}

export type BigStat = {
  /** The number as written, "+" included: "40+", "1,000+", "32". */
  value: string;
  label: string;
};

/** Big-number stats (extrapolated): 52/600 numbers, 15px labels, two to four in a row.
 *  `panel` sits them on one cloud panel (on White); `tiles` gives each a white tile (on Cloud). */
export function StatReadout({
  stats,
  surface = "panel",
  className,
}: {
  stats: readonly BigStat[];
  surface?: "panel" | "tiles";
  className?: string;
}) {
  const panel = surface === "panel";
  // The numbers stay at 52px unless the longest one wouldn't fit its cell ("1,000+" in half a phone's
  // panel): then every number in the readout shrinks to fit it, so they stay one size. An odd one out
  // has the whole row below desktop, so it is sized on its own and a wordy one ("+ your own") doesn't
  // shrink the rest.
  const oddOut = stats.length % 2 === 1 ? stats.length - 1 : -1;
  const longest = Math.max(1, ...stats.filter((_, i) => i !== oddOut).map((stat) => stat.value.length));
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-5",
        stats.length >= 3 && "desk:grid-cols-[repeat(var(--n),minmax(0,1fr))]",
        panel && "rounded-lg bg-cloud p-8",
        className,
      )}
      style={{ "--n": stats.length, "--stat-chars": longest } as CSSProperties}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-col-reverse justify-end [container-type:inline-size]",
            !panel && "rounded-md border border-line bg-white px-[22px] py-5",
            // an odd one out takes the whole row below desktop, so a wordy value ("+ your own")
            // isn't squeezed into half the width
            i === oddOut && "max-desk:col-span-2",
          )}
          style={i === oddOut ? ({ "--stat-chars": stat.value.length } as CSSProperties) : undefined}
        >
          {/* <dl> needs the label (dt) first; flex-col-reverse puts the number on top */}
          <dt className="mt-2 max-w-[18ch] text-ui text-slate">{stat.label}</dt>
          {/* a character of the stat face is about 0.52em wide; 0.56 leaves room for the widest digits */}
          <dd
            className="text-stat text-ink tabular-nums"
            style={{ fontSize: "min(var(--text-stat), calc(100cqi / (var(--stat-chars) * 0.56)))" }}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The industries in one centred row, wrapping on a phone: IndustryTicker's static form. */
export function IndustryList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul
      className={cn(
        "flex flex-wrap justify-center gap-x-6 gap-y-3 text-[16px]/[1.4] font-semibold tracking-[-0.01em] text-slate desk:gap-x-12 desk:text-[19px]",
        className,
      )}
    >
      {items.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}

/** Every industry at once, as pills that fade up one after another as they scroll in (the Clients
 *  hub, owner 2026-10-23). Without script or with reduced motion they are simply there. */
export function IndustryPills({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("mx-auto flex max-w-[56em] flex-wrap justify-center gap-3 desk:gap-4", className)}>
      {items.map((name, i) => (
        <Reveal
          as="li"
          index={i}
          key={name}
          className="rounded-pill bg-sky-1 px-5 py-2.5 text-[16px]/[1.4] font-semibold tracking-[-0.01em] text-azure-ink desk:px-6 desk:py-3 desk:text-[19px]"
        >
          {name}
        </Reveal>
      ))}
    </ul>
  );
}

// The rotating industries (F44, F81, D4; DESIGN-GUIDE.md §7.15 and §9.3): one industry at a time
// slides in from the right and out to the left, about 2.5s each, on a loop. CSS only, so every
// industry is in the HTML and it runs without JavaScript. The words sit stacked in one grid cell,
// as wide as the longest, so nothing shifts as they change. Screen readers get the full list once
// (the static list, kept visually hidden while the words move); the moving words are aria-hidden.
// Hover or focus pauses it. With reduced motion the static list is the line and nothing moves.
const TICKER_STEP = 2.5; // seconds each industry leads
const TICKER_MOVE = 0.5; // seconds to slide in (and, overlapping the next one's entrance, out)

/** One keyframes block per list length: each word is on screen for 1/n of the loop. */
function tickerKeyframes(count: number) {
  const loop = count * TICKER_STEP;
  const at = (seconds: number) => `${+((seconds / loop) * 100).toFixed(3)}%`;
  return (
    `@keyframes industry-ticker-${count}{` +
    `0%{opacity:0;translate:24px 0}` +
    `${at(TICKER_MOVE)},${at(TICKER_STEP)}{opacity:1;translate:0 0}` +
    `${at(TICKER_STEP + TICKER_MOVE)},100%{opacity:0;translate:-24px 0}}`
  );
}

export function IndustryTicker({ items, className }: { items: readonly string[]; className?: string }) {
  const count = items.length;
  if (count < 2) return <IndustryList items={items} className={className} />;
  const name = `industry-ticker-${count}`;
  return (
    // focusable so a keyboard can pause it as a pointer does (WCAG 2.2.2); it reads the list
    <div tabIndex={0} className={cn("industry-ticker mx-auto w-fit rounded-sm text-center", className)}>
      <IndustryList items={items} className="motion-safe:sr-only" />
      <span
        aria-hidden="true"
        className="hidden text-[16px]/[1.4] font-semibold tracking-[-0.01em] whitespace-nowrap text-slate motion-safe:inline-grid motion-safe:justify-items-center desk:text-[19px]"
      >
        {items.map((item, i) => (
          <span
            key={item}
            className="industry-ticker-word [grid-area:1/1]"
            // name, length and delay only: a shorthand here would reset the play state hover pauses
            style={{
              animationName: name,
              animationDuration: `${count * TICKER_STEP}s`,
              animationDelay: `${i * TICKER_STEP - TICKER_MOVE}s`,
            }}
          >
            {item}
          </span>
        ))}
      </span>
      {/* React puts this in the head once per length, however many tickers share it */}
      <style href={name} precedence="default">
        {tickerKeyframes(count)}
      </style>
    </div>
  );
}

/** "Trusted by **40+ brands** across Indonesia.", then the industries rotating under it.
 *  When logos are approved, pass the logo wall as `children` instead of `industries`. */
export function ProofRow({
  line,
  industries,
  children,
  className,
}: {
  line: string;
  industries?: readonly string[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <p className="text-body-sm text-slate">
        <Rich text={line} />
      </p>
      {children ?? (industries && <IndustryTicker items={industries} className="mt-[22px]" />)}
    </div>
  );
}
