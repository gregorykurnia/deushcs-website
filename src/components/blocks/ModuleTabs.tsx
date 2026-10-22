"use client";

import { ArrowRight } from "lucide-react";
import { Tabs } from "radix-ui";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type TouchEvent } from "react";
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
//
// F68: a round arrow button at the pill's right opens the next module (Simulation wraps round to
// Personality), named after it ("Next module: Cognitive"). On a touch screen a sideways swipe on
// the module does the same, left for the next and right for the one before, except on something
// that scrolls sideways itself (a phone's game row).

export type ModuleTabItem = { id: string; label: string; content: ReactNode };

type ScrollMode = "always" | "if-above";

/** A swipe: at least 50px sideways, and mostly sideways. */
const SWIPE_MIN = 50;

/** Whether a touch started on something that scrolls sideways (the phone's game rows), whose own
 *  swipe isn't a module switch. */
function inSideScroller(target: EventTarget | null, stop: Element) {
  for (let el = target instanceof Element ? target : null; el && el !== stop; el = el.parentElement) {
    const { overflowX } = getComputedStyle(el);
    if ((overflowX === "auto" || overflowX === "scroll") && el.scrollWidth > el.clientWidth) return true;
  }
  return false;
}

export function ModuleTabs({
  items,
  label,
  nextLabel,
  className,
}: {
  items: readonly ModuleTabItem[];
  /** The tab list's accessible name. */
  label: string;
  /** The arrow button's name; {module} is the next module's label ("Next module: {module}"). */
  nextLabel: string;
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLDivElement>(null);
  const pending = useRef<ScrollMode | null>(null);
  const touch = useRef<{ x: number; y: number; skip: boolean } | null>(null);
  const ids = items.map((item) => item.id).join(" ");
  const index = Math.max(0, items.findIndex((item) => item.id === active));
  /** The module `step` places after the open one, wrapping round at either end. */
  const neighbour = (step: 1 | -1) => items[(index + step + items.length) % items.length];
  const next = neighbour(1);

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

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const point = event.touches[0];
    touch.current =
      event.touches.length === 1 && point
        ? { x: point.clientX, y: point.clientY, skip: inSideScroller(event.target, event.currentTarget) }
        : null;
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touch.current;
    const point = event.changedTouches[0];
    touch.current = null;
    if (!start || start.skip || !point) return;
    const dx = point.clientX - start.x;
    const dy = point.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const to = neighbour(dx < 0 ? 1 : -1);
    if (to) select(to.id, "if-above");
  };

  return (
    <Tabs.Root value={active} onValueChange={(id) => select(id, "if-above")} className={className}>
      {/* the band is clear and lets clicks through; only the pill takes them
          (the header is 68px below 480px: HeaderFrame.tsx) */}
      <div className="pointer-events-none sticky top-[var(--header-h)] z-40 flex justify-center gap-2 px-3 py-3 max-[479px]:top-[68px]">
        <Tabs.List
          ref={listRef}
          aria-label={label}
          className="pointer-events-auto flex min-w-0 max-w-full gap-1.5 overflow-x-auto rounded-pill border border-line bg-white/70 p-1.5 text-ui font-medium backdrop-blur-[12px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
        {/* as wide as the pill is tall (55px), so it's a circle beside it */}
        {next && items.length > 1 && (
          <button
            type="button"
            onClick={() => select(next.id, "if-above")}
            aria-label={nextLabel.replace("{module}", next.label)}
            className={cn(
              "pointer-events-auto grid w-[55px] shrink-0 self-stretch place-items-center rounded-pill border border-line bg-white/70 text-ink backdrop-blur-[12px]",
              "transition-colors duration-150 hover:border-azure hover:text-azure-ink",
            )}
          >
            <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2} />
          </button>
        )}
      </div>
      {/* the panels take a sideways swipe on a touch screen (F68); vertical scrolling stays the page's */}
      <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {items.map((item) => (
          <Tabs.Content key={item.id} value={item.id} forceMount className="data-[state=inactive]:hidden">
            {item.content}
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}
