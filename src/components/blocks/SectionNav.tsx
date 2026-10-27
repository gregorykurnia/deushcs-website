"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.33 "On this page" bar (F103, D1). A row of plain links, one per section, each
// named by the section's own small label. It sits under the hero and sticks under the header (84px,
// 68px below 480px) while the page scrolls, on Enhance and Game-Based Assessment only. The links are
// ordinary `#id` links, so the bar works without script; script only marks the section being read
// (`aria-current="location"`, a filled ink pill like the selected tab, §7.10) and keeps that link in
// view when the row scrolls sideways on a phone. The sections it links to carry `.under-nav`
// (globals.css), so a jump lands them flush under the bar.

export type SectionNavItem = { id: string; label: string };

/** How much of the viewport, from the top, counts as "being read" (the bar's bottom edge down to
 *  this share): a section is current once its top is above that line. */
const READING_BAND = 0.45;

export function SectionNav({
  items,
  label,
  current: initial,
  sticky = true,
  className,
}: {
  items: readonly SectionNavItem[];
  /** The nav landmark's accessible name ("On this page"). */
  label: string;
  /** The section marked before any scrolling; the styleguide's sample uses it. */
  current?: string;
  /** `false` for a bar that sits in the flow and watches nothing (the styleguide's sample). */
  sticky?: boolean;
  className?: string;
}) {
  const [current, setCurrent] = useState<string | null>(initial ?? null);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Scrollspy: the current section is the last one, in page order, that touches the reading band.
  useEffect(() => {
    const nav = navRef.current;
    if (!sticky || !nav || typeof IntersectionObserver === "undefined") return;
    const sections = items.flatMap(({ id }) => {
      const el = document.getElementById(id);
      return el ? [{ id, el }] : [];
    });
    if (sections.length === 0) return;

    const touching = new Set<string>();
    let observer: IntersectionObserver | undefined;
    let barBottom = 0;

    const pick = () => {
      const last = sections.findLast(({ id }) => touching.has(id));
      if (last) return setCurrent(last.id);
      // Nothing in the band: above the first section or past the last one, nothing is current.
      // Anywhere else (a gap between sections) the mark stays where it was.
      const above = sections[0]!.el.getBoundingClientRect().top > barBottom;
      const past = sections.at(-1)!.el.getBoundingClientRect().bottom < barBottom;
      if (above || past) setCurrent(null);
    };

    const watch = () => {
      observer?.disconnect();
      touching.clear();
      // the bar's stuck position: the header's height, then the bar's own
      barBottom = Math.round(parseFloat(getComputedStyle(nav).top) + nav.offsetHeight);
      observer = new IntersectionObserver(
        (entries) => {
          for (const { target, isIntersecting } of entries) {
            if (isIntersecting) touching.add(target.id);
            else touching.delete(target.id);
          }
          pick();
        },
        { rootMargin: `-${barBottom}px 0px -${Math.round((1 - READING_BAND) * 100)}% 0px` },
      );
      for (const { el } of sections) observer.observe(el);
    };

    watch();
    window.addEventListener("resize", watch);
    return () => {
      window.removeEventListener("resize", watch);
      observer?.disconnect();
    };
  }, [items, sticky]);

  // On a phone the row scrolls sideways: bring the current link to the middle, scrolling the row
  // only (scrollIntoView would move the page).
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [current]);

  return (
    <nav
      ref={navRef}
      aria-label={label}
      className={cn(
        "z-40 h-[var(--section-nav-h)] bg-white/72 shadow-[0_1px_0_var(--color-line)]",
        "backdrop-blur-[16px] backdrop-saturate-[1.4]",
        sticky && "sticky top-[var(--header-h)] max-[479px]:top-[68px]",
        className,
      )}
    >
      <ul
        ref={listRef}
        className={cn(
          // the row bleeds to the screen's edges and scrolls sideways when it doesn't fit; the end
          // items' auto margins centre it when it does
          "relative flex h-full items-center gap-1.5 overflow-x-auto px-[var(--gutter)]",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "[&>li:first-child]:ml-auto [&>li:last-child]:mr-auto",
        )}
      >
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              aria-current={current === item.id ? "location" : undefined}
              onClick={() => sticky && setCurrent(item.id)}
              className={cn(
                "relative block rounded-pill px-3.5 py-2 text-ui font-medium whitespace-nowrap text-ink-2",
                "transition-colors duration-150",
                "before:absolute before:inset-x-0 before:-inset-y-1 before:content-['']",
                "not-aria-[current=location]:hover:bg-ink/6 not-aria-[current=location]:hover:text-ink",
                "aria-[current=location]:bg-ink aria-[current=location]:text-white",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
