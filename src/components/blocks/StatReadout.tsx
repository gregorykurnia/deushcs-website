import type { CSSProperties, ReactNode } from "react";
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
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-5",
        stats.length >= 3 && "desk:grid-cols-[repeat(var(--n),minmax(0,1fr))]",
        panel && "rounded-lg bg-cloud p-8",
        className,
      )}
      style={{ "--n": stats.length } as CSSProperties}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn("flex flex-col-reverse justify-end", !panel && "rounded-md border border-line bg-white px-[22px] py-5")}
        >
          {/* <dl> needs the label (dt) first; flex-col-reverse puts the number on top */}
          <dt className="mt-2 max-w-[18ch] text-ui text-slate">{stat.label}</dt>
          <dd className="text-stat text-ink tabular-nums">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** "Trusted by **40+ brands** across six industries", then the industries in one centred row.
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
      {children ??
        (industries && (
          <ul className="mt-[22px] flex flex-wrap justify-center gap-x-6 gap-y-3 text-[16px]/[1.4] font-semibold tracking-[-0.01em] text-slate desk:flex-nowrap desk:gap-12 desk:text-[19px]">
            {industries.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ))}
    </div>
  );
}
