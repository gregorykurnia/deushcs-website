"use client";

import { useEffect, useRef, type ComponentProps, type CSSProperties } from "react";

// DESIGN-GUIDE.md §9.3. Fades an element up 24px over .6s when 20% of it scrolls into view,
// once. The hidden state is added from script, and only for elements still below the fold,
// so without JavaScript, with reduced motion, or for anything already on screen, content is
// simply visible. Never wrap hero text in this.
type RevealTag = "div" | "li" | "article" | "section";

export function Reveal({
  as: Tag = "div",
  index = 0,
  style,
  ...props
}: ComponentProps<"div"> & {
  as?: RevealTag;
  /** Position in a group; each step delays the entrance by 80ms. */
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        // 20% of the element; anything taller than the screen shows as soon as it enters
        const seen = entry.intersectionRatio >= 0.2 || el.offsetHeight > window.innerHeight;
        if (!seen) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { threshold: [0, 0.2] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Element = Tag as "div";
  return (
    <Element
      ref={ref}
      style={{ ...style, "--i": index } as CSSProperties}
      {...props}
    />
  );
}
