"use client";

import { useEffect, useRef, type ComponentProps } from "react";

// DESIGN-GUIDE.md §7.12 and §9.3 (F77, F91). Plays a step-by-step sequence once, when half of the
// element (or half the screen, for anything taller) is in view: the CSS for `data-sequence` in
// globals.css says what "pending" and "play" look like (the process timeline's dots). The pending
// state is set from script, and only for elements still below the fold, so without JavaScript,
// with reduced motion, or for anything already on screen, the end state simply shows.
export function SequenceOnView(props: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.sequence = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        const seen = entry.intersectionRatio >= 0.5 || entry.intersectionRect.height >= window.innerHeight / 2;
        if (!seen) return;
        el.dataset.sequence = "play";
        observer.disconnect();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} {...props} />;
}
