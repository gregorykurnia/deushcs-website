"use client";

import { Tabs } from "radix-ui";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.10 "Segmented tabs", extrapolated: short switchers (Reports on GBA, the
// persona switcher on Enhance) in the nav-pill shape. The selected trigger fills ink, never
// ember. Centred, 40px above the panel. On a phone the pill scrolls sideways with no visible
// scrollbar, and the selected trigger scrolls into view. Radix Tabs gives the ARIA and arrow
// keys. Every panel stays in the HTML; the inactive ones are hidden.

export type SegmentedItem = { value: string; label: string; content: ReactNode };

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

  const change = (next: string) => {
    setValue(next);
    // keep the page still; only scroll the pill sideways
    const list = listRef.current;
    const trigger = list?.querySelector<HTMLElement>(`[data-value="${CSS.escape(next)}"]`);
    if (list && trigger && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: trigger.offsetLeft - 6, behavior: "smooth" });
    }
  };

  return (
    <Tabs.Root value={value} onValueChange={change} className={className}>
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
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
