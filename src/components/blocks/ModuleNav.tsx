"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// WEBSITE-PLAN.md §5.5. The sticky pill sub-nav for the three Next Chapter modules, in the shape
// of the header's nav pill (DESIGN-GUIDE.md §7.1): 70% white with a blur and a hairline, the
// current module filled ink. It sticks just under the header, inside the block that holds the
// module sections, so it lets go after the last one. The links are plain in-page anchors, so
// they work without JavaScript; the script only marks which module is on screen
// (`aria-current="location"`).

export type ModuleNavItem = { id: string; label: string };

export function ModuleNav({
  items,
  label,
  className,
}: {
  items: readonly ModuleNavItem[];
  /** The nav's accessible name. */
  label: string;
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = items.flatMap((item) => document.getElementById(item.id) ?? []);
    const onScreen = new Set<string>();
    // A thin band 30% down the viewport: the section crossing it is the one being read.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target.id);
          else onScreen.delete(entry.target.id);
        }
        setActive(items.find((item) => onScreen.has(item.id))?.id ?? null);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [items]);

  return (
    // the band is clear and lets clicks through; only the pill takes them
    <div className={cn("pointer-events-none sticky top-[var(--header-h)] z-40 flex justify-center px-3 py-3", className)}>
      <nav
        aria-label={label}
        className="pointer-events-auto flex max-w-full gap-1.5 overflow-x-auto rounded-pill border border-line bg-white/70 p-1.5 text-ui font-medium backdrop-blur-[12px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className={cn(
              "relative shrink-0 rounded-pill px-[18px] py-2 whitespace-nowrap max-[479px]:px-3.5 text-ink-2",
              "transition-colors duration-150",
              "before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-['']",
              "hover:bg-ink/6 hover:text-ink",
              "aria-[current=location]:bg-ink aria-[current=location]:text-white",
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
