import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §12 ("use 1, 2, 3 in circles") and §7.10's 32px number circle. A short
// ordered journey, such as "Invite → Start securely → Play → Decide": numbered circles on a
// hairline that joins them (desktop), the title in 22/700 and one slate line. The first circle
// is ink like the active tab; the rest are cloud. Ember is not used: there is no "now" here.

export type Step = { title: string; body: string };

export function NumberedSteps({
  steps,
  className,
}: {
  steps: readonly Step[];
  className?: string;
}) {
  return (
    <ol
      style={{ "--cols": steps.length } as CSSProperties}
      className={cn(
        "grid gap-10 min-[600px]:grid-cols-2 desk:grid-cols-[repeat(var(--cols),minmax(0,1fr))] desk:gap-8",
        className,
      )}
    >
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          {/* the line to the next circle */}
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute top-4 left-12 right-[-2rem] hidden h-px bg-line desk:block"
            />
          )}
          <span
            aria-hidden="true"
            className={cn(
              "relative grid size-8 place-items-center rounded-full text-label font-bold tabular-nums",
              i === 0 ? "bg-ink text-white" : "bg-cloud text-slate",
            )}
          >
            {i + 1}
          </span>
          <h3 className="mt-5 text-h3-panel text-ink">{step.title}</h3>
          <p className="mt-2.5 text-body-sm text-slate">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
