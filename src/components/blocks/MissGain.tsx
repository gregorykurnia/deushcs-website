import { Check, Minus } from "lucide-react";
import type { MissGain as MissGainContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

// "What traditional tests miss / What you get instead": the two columns under every Next Chapter
// module (WEBSITE-PLAN.md §5.5). Two panels, as in Why DEUS (§7.17): on a White section they are
// Cloud; on a Cloud section they flip to white with a hairline. What's missed is a slate dash, what
// you get is an azure check, never ember. Each column is a list under its own heading.

function Column({
  title,
  points,
  kind,
  surface,
  index,
}: {
  title: string;
  points: readonly string[];
  kind: "miss" | "gain";
  surface: "white" | "cloud";
  index: number;
}) {
  const Icon = kind === "gain" ? Check : Minus;
  return (
    <Reveal
      as="li"
      index={index}
      className={cn(
        "rounded-lg p-7 desk:p-10",
        surface === "white" ? "bg-cloud" : "border border-line bg-white",
      )}
    >
      <h3 className="text-h3-panel text-ink">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-body-sm text-slate">
            <Icon
              aria-hidden="true"
              className={cn("mt-[5px] size-[18px] shrink-0", kind === "gain" ? "text-azure" : "text-slate-2")}
              strokeWidth={kind === "gain" ? 2.4 : 2}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function MissGain({
  missGain,
  surface = "white",
  className,
}: {
  missGain: MissGainContent;
  /** The surface of the section it sits in. */
  surface?: "white" | "cloud";
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-5 desk:grid-cols-2", className)}>
      <Column {...missGain.miss} kind="miss" surface={surface} index={0} />
      <Column {...missGain.gain} kind="gain" surface={surface} index={1} />
    </ul>
  );
}
