import type { CSSProperties, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Rich } from "@/components/ui/rich";
import { SequenceOnView } from "@/components/ui/sequence-on-view";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.12 and §9.2. The brand's signature moment: one person's story across
// the sky window, on a track whose last node is "now" (ember). On load the track draws left to
// right, each node and card arrives as the line reaches it, and the last node turns ember.
// That motion is CSS only (globals.css, `journey-*`), plays once, and with reduced motion the
// window simply shows its final state. Markup is an ordered list; track and nodes are decoration.

export type JourneyStep = {
  /** Date line under the node; **bold** marks the date: "**March 2025**, assessed". */
  when: string;
  /** A floating card from DataCards.tsx (frosted, over the sky). */
  card: ReactNode;
};

/** Node centres: 16.6% → 83.4% of the window, as in the mockup, spread evenly. */
function position(i: number, count: number) {
  return count === 1 ? 50 : 16.6 + (i * 66.8) / (count - 1);
}

export function JourneyTimeline({
  caption,
  label,
  steps,
  className,
}: {
  /** Centred above the track: "One person, from first game to first bonus". */
  caption: string;
  /** The list's accessible name: "Example: one candidate from assessment to first bonus". */
  label: string;
  steps: readonly JourneyStep[];
  className?: string;
}) {
  const t = useTranslations("Timeline");
  const last = steps.length - 1;

  return (
    <div className={cn("mx-auto max-w-wide px-6 max-[479px]:px-3", className)}>
      <div className="relative overflow-hidden rounded-t-xl bg-[image:var(--grad-sky-window)] px-[18px] pt-7 pb-10 desk:h-[580px] desk:p-0">
        <div aria-hidden="true" className="absolute inset-0 bg-[image:var(--grad-sky-highlights)]" />

        <p className="journey-caption relative mb-5 text-center text-ui text-balance font-semibold text-ink desk:absolute desk:inset-x-0 desk:top-10 desk:mb-0">
          {caption}
        </p>

        <div
          aria-hidden="true"
          className="journey-track absolute top-[104px] right-[16.6%] left-[16.6%] hidden h-0.5 bg-white/85 after:absolute after:inset-y-0 after:right-0 after:left-1/2 after:bg-[image:var(--grad-ember-track)] after:content-[''] desk:block"
        />

        <ol aria-label={label} className="relative flex flex-col gap-5 desk:static">
          {steps.map((step, i) => {
            const now = i === last;
            const style = {
              left: `${position(i, steps.length)}%`,
              "--step-delay": `${0.4 + i * 0.4}s`,
            } as CSSProperties;
            return (
              <li
                key={i}
                style={style}
                className="flex flex-col gap-2 desk:absolute desk:inset-y-0 desk:-ml-[170px] desk:block desk:w-[340px]"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-[96px] left-1/2 z-[2] -ml-[9px] hidden size-[18px] rounded-full border-2 desk:block",
                    now
                      ? "journey-now border-white bg-ember shadow-[0_0_0_6px_var(--ember-halo)]"
                      : "journey-node border-ink bg-white",
                  )}
                />
                <p className="journey-when flex items-center gap-2 text-label font-medium text-ink-2 desk:absolute desk:inset-x-0 desk:top-[128px] desk:block desk:text-center">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-2.5 shrink-0 rounded-full border-2 desk:hidden",
                      now
                        ? "border-white bg-ember shadow-[0_0_0_4px_var(--ember-halo-sm)]"
                        : "border-ink bg-white",
                    )}
                  />
                  <span>
                    <Rich text={step.when} />
                    {now && <span className="sr-only"> ({t("current")})</span>}
                  </span>
                </p>
                <div className="journey-card desk:absolute desk:inset-x-0 desk:top-[170px]">{step.card}</div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/** `title` is the optional short name of the year ("The beginning"); `label` is its text. */
export type Milestone = { year: string; title?: string; label: string };

// DESIGN-GUIDE.md §7.12 "Process timeline" (extrapolated; About's journey. Enhance's support
// journey was cut in round 5, F122, so `align="start"` and `announceCurrent={false}` have no user now):
// the same track on White, in --line, with every dot alike (F77, F91, D5): no ember end node, so
// no step looks more important. The dots rest filled in azure; SequenceOnView empties them while
// the timeline is below the fold and fills them one after another as it comes into view.
// From 1100px (`lap:`, F127): nodes spaced evenly on one line, five columns at least 187px wide.
// Below it, down to the phone: a vertical rail with the text beside it, in a column at most 34em
// wide and centred. The block doesn't use the site's 900px switch, because five columns of text
// need more room than the layout does.
export function MilestoneTimeline({
  label,
  milestones,
  align = "center",
  announceCurrent = true,
  className,
}: {
  label: string;
  milestones: readonly Milestone[];
  /**
   * Columns only (from 1100px). "center": node and text centred in each column (About's short year labels).
   * "start": node and text at each column's left, for lines longer than three centred lines
   * would allow (guide §4.5).
   */
  align?: "center" | "start";
  /** False when the last entry is the ongoing stage of a service, not "where we are now". */
  announceCurrent?: boolean;
  className?: string;
}) {
  const t = useTranslations("Timeline");
  const count = milestones.length;
  const last = count - 1;
  const start = align === "start";
  // the line runs from the first node's centre to the last one's: for "center" that is half a
  // column in from each end; for "start", 9px (half a node) in from the left, and from the right
  // one column (the grid's gap is 1.25rem) less those 9px
  const inset = `${50 / count}%`;
  const insetEnd = `calc((100% - ${count - 1} * 1.25rem) / ${count} - 9px)`;

  return (
    <SequenceOnView className={className}>
      <ol
        aria-label={label}
        style={
          {
            "--cols": count,
            "--inset-start": start ? "9px" : inset,
            "--inset-end": start ? insetEnd : inset,
          } as CSSProperties
        }
        className={cn(
          "relative mx-auto flex max-w-[34em] flex-col gap-8 pl-9 lap:grid lap:max-w-none lap:grid-cols-[repeat(var(--cols),minmax(0,1fr))] lap:gap-5 lap:pl-0",
          // the track (columns): one line from the first node to the last (the stacked rail is drawn per entry)
          "before:hidden lap:before:absolute lap:before:top-2 lap:before:right-[var(--inset-end)] lap:before:left-[var(--inset-start)] lap:before:block lap:before:h-0.5 lap:before:bg-line lap:before:content-['']",
        )}
      >
        {milestones.map((m, i) => {
          const now = i === last;
          return (
            <li
              key={m.year}
              className={cn(
                "relative lap:pt-10",
                // the stacked rail: from this entry's node down to the next one's, so it ends on the last node
                "before:absolute before:top-[13px] before:-bottom-[calc(2rem+13px)] before:-left-[28px] before:w-0.5 before:bg-line before:content-[''] last:before:hidden lap:before:hidden",
                !start && "lap:text-center",
              )}
            >
              <span
                aria-hidden="true"
                style={{ "--i": i } as CSSProperties}
                className={cn(
                  "timeline-dot absolute top-1 -left-9 size-[18px] rounded-full border-2 border-azure bg-azure lap:top-0",
                  start ? "lap:left-0" : "lap:left-1/2 lap:-ml-[9px]",
                )}
              />
              <p className="text-title text-ink tabular-nums">
                {m.year}
                {now && announceCurrent && <span className="sr-only"> ({t("current")})</span>}
              </p>
              {m.title && <p className="mt-1.5 text-ui font-semibold text-ink">{m.title}</p>}
              <p className={cn("mt-1.5 text-ui text-slate", start ? "max-w-[34em]" : "lap:mx-auto lap:max-w-[22ch]")}>
                {m.label}
              </p>
            </li>
          );
        })}
      </ol>
    </SequenceOnView>
  );
}
