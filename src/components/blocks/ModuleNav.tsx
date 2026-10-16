"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// WEBSITE-PLAN.md §5.5. The sticky pill sub-nav for the four modules on the GBA page, in the shape
// of the header's nav pill (DESIGN-GUIDE.md §7.1): 70% white with a blur and a hairline, the
// current module filled ink. It sticks just under the header, inside the block that holds the
// module sections, so it lets go after the last one. The links are plain in-page anchors, so
// they work without JavaScript; the script only marks which module is on screen
// (`aria-current="location"`). On a phone the four links are wider than the pill, so it scrolls
// sideways, and the current link is slid into view.

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
  const navRef = useRef<HTMLElement>(null);

  // Slide the pill (only the pill, never the page) so the current link is fully visible.
  useEffect(() => {
    const nav = navRef.current;
    const link = active ? nav?.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
    if (!nav || !link) return;
    const left = link.offsetLeft - nav.offsetLeft;
    if (left < nav.scrollLeft || left + link.offsetWidth > nav.scrollLeft + nav.clientWidth) {
      nav.scrollTo({ left: left - (nav.clientWidth - link.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [active]);

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
    // (the header is 68px below 480px: HeaderFrame.tsx)
    <div
      className={cn(
        "pointer-events-none sticky top-[var(--header-h)] z-40 flex justify-center px-3 py-3 max-[479px]:top-[68px]",
        className,
      )}
    >
      <nav
        ref={navRef}
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
