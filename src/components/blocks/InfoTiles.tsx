import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.15 (stat tiles), used for plain title-and-line facts that need no icon:
// the platform's features, "Start small". White tiles with a hairline,
// a 17/700 title and a slate line; on a White section the hairline keeps them apart, on Cloud
// they read as white cards. `check` puts a small azure check before the title (never ember).

export type InfoTile = { title: string; body: string };

export function InfoTiles({
  items,
  columns = 2,
  check = false,
  className,
}: {
  items: readonly InfoTile[];
  /** Columns from 901px up; two from 600px, one below. */
  columns?: 2 | 3 | 4;
  check?: boolean;
  className?: string;
}) {
  return (
    <ul
      style={{ "--cols": columns } as CSSProperties}
      className={cn(
        "grid gap-5 min-[600px]:grid-cols-2 desk:grid-cols-[repeat(var(--cols),minmax(0,1fr))]",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item.title} className="rounded-md border border-line bg-white px-6 py-[22px]">
          <h3 className="flex items-start gap-2.5 text-title-sm text-ink">
            {check && (
              <Check aria-hidden="true" className="mt-[3px] size-[18px] shrink-0 text-azure" strokeWidth={2.4} />
            )}
            {item.title}
          </h3>
          <p className="mt-2 text-card text-slate">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
