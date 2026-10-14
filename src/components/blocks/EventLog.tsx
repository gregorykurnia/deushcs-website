import { cn } from "@/lib/utils";
import { LiveDot } from "./LiveDot";

// DESIGN-GUIDE.md §7.14. What a candidate does inside a game, as a frosted card that floats over
// the first game tile (GameTile places it). Timestamps in slate (the mockup's slate-2 fails
// contrast); the last row is the decision, in 700. Timestamps and actions are illustrative.

export type LogRow = {
  /** "00:45.4" (minutes:seconds), shown as written. */
  time: string;
  action: string;
};

/** "00:45.4" → "PT0M45.4S", so <time> carries a machine-readable duration. */
export function toDuration(time: string) {
  const match = /^(\d+):(\d+(?:\.\d+)?)$/.exec(time);
  return match ? `PT${Number(match[1])}M${match[2]}S` : undefined;
}

export function EventLog({
  title,
  rows,
  className,
}: {
  /** "Recording this scene". */
  title: string;
  rows: readonly LogRow[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md bg-white/92 px-4 pt-3.5 pb-1.5 shadow-float backdrop-blur-[14px]",
        className,
      )}
    >
      <p className="flex items-center gap-2 border-b border-line pb-2 text-meta/[1.4] font-bold text-ink">
        <LiveDot />
        {title}
      </p>
      <ol>
        {rows.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-[54px_1fr] gap-2 border-b border-line py-2 text-meta/[1.45] text-ink last:border-b-0 last:font-bold"
          >
            <time dateTime={toDuration(row.time)} className="text-slate tabular-nums">
              {row.time}
            </time>
            <span>{row.action}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
