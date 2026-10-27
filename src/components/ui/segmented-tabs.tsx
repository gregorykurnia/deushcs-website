"use client";

import { Tabs } from "radix-ui";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.10 "Segmented tabs", extrapolated: short switchers (since round 4 only the
// styleguide shows one) in the nav-pill shape. The selected trigger fills ink, never ember.
// Centred, 40px above the panel. On a phone the pill scrolls sideways with no visible scrollbar,
// and the selected trigger scrolls into view. Radix Tabs gives the ARIA and arrow keys. Every panel
// stays in the HTML; the inactive ones are hidden.
//
// A tab with an `anchor` (GBA's "Behind the results" used it until round 4) can be linked to:
// arriving with that hash, or a hash change to it, opens the tab and brings the pill just under
// the header. The anchor sits at the top of the tab's panel.

export type SegmentedItem = { value: string; label: string; content: ReactNode; anchor?: string };

export function SegmentedTabs({
  items,
  label,
  defaultValue,
  surface = "white",
  className,
}: {
  items: readonly SegmentedItem[];
  /** The tab list's accessible name. */
  label: string;
  defaultValue?: string;
  /** The section's surface: the pill is 70% white on White, solid white on Cloud. */
  surface?: "white" | "cloud";
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? items[0]?.value);
  const listRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const anchors = items.flatMap((item) => (item.anchor ? [`${item.anchor}=${item.value}`] : [])).join(" ");

  const change = (next: string) => {
    setValue(next);
    // keep the page still; only scroll the pill sideways
    const list = listRef.current;
    const trigger = list?.querySelector<HTMLElement>(`[data-value="${CSS.escape(next)}"]`);
    if (list && trigger && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: trigger.offsetLeft - 6, behavior: "smooth" });
    }
  };

  // Open an anchored tab from the address bar: on arrival (a frame later, after the browser's own
  // try at the hidden panel) and on every hash change.
  useEffect(() => {
    if (!anchors) return;
    const byAnchor = new Map(anchors.split(" ").map((pair) => pair.split("=") as [string, string]));
    const open = () => {
      const target = byAnchor.get(window.location.hash.slice(1));
      if (!target) return;
      change(target);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => rootRef.current?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" }));
    };
    const frame = requestAnimationFrame(open);
    window.addEventListener("hashchange", open);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", open);
    };
  }, [anchors]);

  return (
    <Tabs.Root
      ref={rootRef}
      value={value}
      onValueChange={change}
      // the pill lands just under the header (84px, 68px below 480px)
      className={cn(anchors && "scroll-mt-24 max-[479px]:scroll-mt-20", className)}
    >
      <div className="flex justify-center">
        <Tabs.List
          ref={listRef}
          aria-label={label}
          className={cn(
            "flex max-w-full snap-x snap-mandatory gap-1.5 overflow-x-auto rounded-pill border border-line p-1.5 text-ui font-medium",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            surface === "white" ? "bg-white/70 backdrop-blur-[12px]" : "bg-white",
          )}
        >
          {items.map((item) => (
            <Tabs.Trigger
              key={item.value}
              value={item.value}
              data-value={item.value}
              className={cn(
                "relative shrink-0 snap-start rounded-pill px-[18px] py-2 whitespace-nowrap text-ink-2",
                "transition-colors duration-150",
                "before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-['']",
                "data-[state=inactive]:hover:bg-ink/6 data-[state=inactive]:hover:text-ink",
                "data-[state=active]:bg-ink data-[state=active]:text-white",
              )}
            >
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>
      {items.map((item) => (
        <Tabs.Content
          key={item.value}
          value={item.value}
          forceMount
          className="mt-10 data-[state=inactive]:hidden"
        >
          {item.anchor ? <div id={item.anchor}>{item.content}</div> : item.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
