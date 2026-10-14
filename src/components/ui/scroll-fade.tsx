"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// A sideways-scrolling box with a white fade on the right edge while there is more to see
// (DESIGN-GUIDE.md §7.24, wide matrices on a phone). The fade goes once the end is reached.
export function ScrollFade({
  label,
  children,
  className,
}: {
  /** Accessible name for the scroll region, so keyboard users can find and scroll it. */
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    update();
    el.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        // focusable only when it actually scrolls
        tabIndex={more ? 0 : undefined}
        className="overflow-x-auto"
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-white to-transparent transition-opacity duration-200",
          more ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
