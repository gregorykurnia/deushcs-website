"use client";

import { useSyncExternalStore, type ReactNode } from "react";

// The sticky header bar. Transparent over the hero; once the page scrolls past 8px it turns
// 72% white with a blur and a bottom hairline (DESIGN-GUIDE.md §7.1, §5.2).
function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const isScrolled = () => window.scrollY > 8;
const serverSnapshot = () => false;

export function HeaderFrame({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(subscribe, isScrolled, serverSnapshot);
  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className={[
        "sticky top-0 z-50 h-[var(--header-h)] max-[479px]:h-[68px]",
        "transition-[background-color,box-shadow,backdrop-filter] duration-200",
        "data-scrolled:bg-white/72 data-scrolled:shadow-[0_1px_0_var(--color-line)]",
        "data-scrolled:backdrop-blur-[16px] data-scrolled:backdrop-saturate-[1.4]",
      ].join(" ")}
    >
      {children}
    </header>
  );
}
