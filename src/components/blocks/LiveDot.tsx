"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.14 and §9.3. The 8px ember "recording now" dot. Its halo pulses slowly
// (4px → 7px → 4px, 2.4s), one of the site's two loops (the rotating industries are the other),
// and only while it's on screen.
// With reduced motion, the global rule stops it and the dot is still.
export function LiveDot({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(!!entry?.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <i
      ref={ref}
      aria-hidden="true"
      data-pulse={onScreen || undefined}
      className={cn(
        "live-dot size-2 shrink-0 rounded-full bg-ember shadow-[0_0_0_4px_var(--ember-halo-sm)]",
        className,
      )}
    />
  );
}
