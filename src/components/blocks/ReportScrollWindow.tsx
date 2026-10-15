"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// The window of a tall report (ProductStage.tsx `ScrollingReport`, globals.css `.report-scroll`).
// The scroll only runs while the window is on screen (§9.3: loops only while visible), so it
// stays at the top before the script runs. The window takes focus, which pauses it: Tab reaches
// it from the keyboard and a tap focuses it on a touch screen, so every visitor can stop the
// movement (WCAG 2.2.2), as the pointer does by hovering.
export function ReportScrollWindow({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(!!entry?.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-report-scroll=""
      data-playing={onScreen || undefined}
      tabIndex={0}
      className={cn("report-scroll", className)}
    >
      {children}
    </div>
  );
}
