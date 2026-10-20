"use client";

import { Tabs } from "radix-ui";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// WEBSITE-PLAN.md §5.5, F40. The four modules on the GBA page as tabs: one module shows at a time,
// so the page is a third shorter. The switcher is the sticky pill the module sub-nav was, in the
// shape of the header's nav pill (DESIGN-GUIDE.md §7.1): 70% white with a blur and a hairline, the
// selected module filled ink. It sticks just under the header, inside the block that holds the
// panels, so it lets go after them. Radix Tabs gives the ARIA and arrow keys; every panel stays in
// the HTML and the inactive ones are hidden.
//
// Each panel is a module section whose id (#personality, #cognitive…) is what the menu, the old
// Discover and Next Chapter redirects and other pages link to. Such a link opens its tab and
// scrolls to it, on load, on `hashchange` (plain anchors, like the science cards and the "Next
// module" links) and on a click of a same-page link the router handles without one (the menu).
// Switching tabs puts the module in the address bar without adding a history step. On a phone the
// pill is wider than the screen, so it scrolls sideways and the selected tab slides into view.

export type ModuleTabItem = { id: string; label: string; content: ReactNode };

type ScrollMode = "always" | "if-above";

export function ModuleTabs({
  items,
  label,
  className,
}: {
  items: readonly ModuleTabItem[];
  /** The tab list's accessible name. */
  label: string;
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLDivElement>(null);
  const pending = useRef<ScrollMode | null>(null);
  const ids = items.map((item) => item.id).join(" ");

  /** Bring a module section to its scroll margin (its label just under the header and the pill).
   *  "if-above" only moves when the reader has scrolled past the label, so a switch near the top
   *  of the block keeps the page still. */
  const scrollTo = useCallback((id: string, mode: ScrollMode, smooth: boolean) => {
    const section = document.getElementById(id);
    if (!section) return;
    const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
    if (mode === "if-above" && section.getBoundingClientRect().top >= margin - 1) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ block: "start", behavior: smooth && !reduced ? "smooth" : "auto" });
  }, []);

  const select = useCallback(
    (id: string, mode: ScrollMode) => {
      if (!ids.split(" ").includes(id)) return;
      if (window.location.hash !== `#${id}`) window.history.replaceState(window.history.state, "", `#${id}`);
      if (id === active) scrollTo(id, mode, true);
      else {
        pending.current = mode;
        setActive(id);
      }
    },
    [active, ids, scrollTo],
  );

  // Once the new panel is showing, it can be measured and scrolled to.
  useLayoutEffect(() => {
    const mode = pending.current;
    pending.current = null;
    if (mode) scrollTo(active, mode, mode === "if-above");
  }, [active, scrollTo]);

  // A module in the address bar on arrival (the menu from another page, a redirect, a shared link),
  // a frame later, after the browser's own try at the hidden section.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!ids.split(" ").includes(id)) return;
    const frame = requestAnimationFrame(() => select(id, "always"));
    return () => cancelAnimationFrame(frame);
    // on arrival only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Links to a module once the page is open.
  useEffect(() => {
    const fromHash = () => select(window.location.hash.slice(1), "always");
    // The router moves to a same-page "#module" link (the menu) with pushState, which fires no
    // hashchange, so the click is watched instead: on the way down, leaving the link's own handlers
    // (the menu closing) alone, and the tab opens once the router has the new address.
    let frame = 0;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement) || link.pathname !== window.location.pathname) return;
      const id = link.hash.slice(1);
      if (!ids.split(" ").includes(id)) return;
      let tries = 30;
      const settle = () => {
        if (window.location.hash === link.hash || --tries === 0) select(id, "always");
        else frame = requestAnimationFrame(settle);
      };
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(settle);
    };
    window.addEventListener("hashchange", fromHash);
    window.addEventListener("popstate", fromHash);
    document.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener("popstate", fromHash);
      document.removeEventListener("click", onClick, true);
    };
  }, [ids, select]);

  // Slide the pill (only the pill, never the page) so the selected tab is fully visible.
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-value="${CSS.escape(active)}"]`);
    if (!list || !tab) return;
    const left = tab.offsetLeft - list.offsetLeft;
    if (left < list.scrollLeft || left + tab.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: left - (list.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [active]);

  return (
    <Tabs.Root value={active} onValueChange={(id) => select(id, "if-above")} className={className}>
      {/* the band is clear and lets clicks through; only the pill takes them
          (the header is 68px below 480px: HeaderFrame.tsx) */}
      <div className="pointer-events-none sticky top-[var(--header-h)] z-40 flex justify-center px-3 py-3 max-[479px]:top-[68px]">
        <Tabs.List
          ref={listRef}
          aria-label={label}
          className="pointer-events-auto flex max-w-full gap-1.5 overflow-x-auto rounded-pill border border-line bg-white/70 p-1.5 text-ui font-medium backdrop-blur-[12px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <Tabs.Trigger
              key={item.id}
              value={item.id}
              data-value={item.id}
              className={cn(
                "relative shrink-0 rounded-pill px-[18px] py-2 whitespace-nowrap max-[479px]:px-3.5 text-ink-2",
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
        <Tabs.Content key={item.id} value={item.id} forceMount className="data-[state=inactive]:hidden">
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
