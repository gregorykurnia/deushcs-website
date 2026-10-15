import { ArrowDown } from "lucide-react";
import { FloatingCard } from "@/components/ui/floating-card";
import { cn } from "@/lib/utils";

// The Next Chapter hero's card: the three modules with their sizes, each one a jump link to its
// section (WEBSITE-PLAN.md §5.5 "3 module chips"). A frosted floating card (DESIGN-GUIDE.md §7.13)
// on the sky; the arrow is the guide's "in-page jump" icon.

export type ModuleChip = { id: string; label: string; detail: string };

export function ModuleChipsCard({
  chips,
  label,
  className,
}: {
  chips: readonly ModuleChip[];
  /** The list's accessible name. */
  label: string;
  className?: string;
}) {
  return (
    <FloatingCard className={cn("p-2", className)}>
      <ul aria-label={label}>
        {chips.map((chip) => (
          <li key={chip.id}>
            <a
              href={`#${chip.id}`}
              className="flex items-center justify-between gap-4 rounded-[15px] px-4 py-3.5 transition-colors duration-150 hover:bg-sky-1"
            >
              <span className="text-title-sm text-ink">{chip.label}</span>
              <span className="flex items-center gap-2 text-label text-slate">
                {chip.detail}
                <ArrowDown aria-hidden="true" className="size-4 text-azure-ink" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </FloatingCard>
  );
}
