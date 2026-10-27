"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { ContentImage } from "@/content/images";
import { Placeholder } from "@/components/ui/placeholder";
import { cn } from "@/lib/utils";
import { ResultCard } from "./DataCards";

// DESIGN-GUIDE.md §7.10 and §9.2 (the second orchestrated moment). Three stacked tabs beside a
// sky stage. The active tab's ember bar fills over --showcase-dwell (3s, this showcase's own
// value, not the shared --tab-dwell), then the next tab takes over and the stage crossfades
// (.4s). The bar's CSS animation is the timer: `animationend` advances, and `animation-play-state`
// pauses it while the pointer or keyboard focus is inside, or while the showcase is off screen.
// Autoplay keeps cycling (F107, D3): a pick switches the tab and its screen, and the cycle
// carries on from there. A mouse click leaves focus on the button, which doesn't pause it; only
// keyboard focus does. With reduced motion, or before the script runs, nothing moves and no
// bar shows (its place is kept, so nothing shifts). The three screens share one frame on the
// stage and each shows whole (F108).

export type ShowcaseTab = {
  title: string;
  body: string;
  /** Product line under the description: "Game-Based Assessment". */
  product?: string;
  /** Floating screenshot on the stage; a TODO placeholder when the screen doesn't exist yet. */
  image?: ContentImage;
  placeholder?: string;
  /** Result card overlapping the screenshot's corner. */
  result?: { label: string; value: string; unit?: string; bar?: number };
};

type Mode = "static" | "auto";

/** True for focus the visitor reached by keyboard (or when the browser can't say). */
function isKeyboardFocus(el: Element) {
  try {
    return el.matches(":focus-visible");
  } catch {
    return true;
  }
}

export function WhereWeHelpTabs({
  tabs,
  label,
  className,
}: {
  tabs: readonly ShowcaseTab[];
  /** The tab list's accessible name, e.g. the section heading. */
  label: string;
  className?: string;
}) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<Mode>("static");
  const [onScreen, setOnScreen] = useState(false);
  // Pointer and focus are tracked apart, so moving the mouse out doesn't restart autoplay while a
  // keyboard user is still on a tab (and tabbing away doesn't while the pointer rests on it).
  // Only keyboard focus counts: a click focuses its button, and that must not hold the cycle.
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const held = hovered || focused;

  // Autoplay only with script and without reduced motion, and only while on screen.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMode(media.matches ? "static" : "auto");
    sync();
    media.addEventListener("change", sync);

    const el = rootRef.current;
    let observer: IntersectionObserver | undefined;
    if (el && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => setOnScreen(!!entry?.isIntersecting), {
        threshold: 0.35,
      });
      observer.observe(el);
    } else {
      setOnScreen(true);
    }
    return () => {
      media.removeEventListener("change", sync);
      observer?.disconnect();
    };
  }, []);

  const pick = (index: number, focus = false) => {
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: (active + 1) % tabs.length,
      ArrowRight: (active + 1) % tabs.length,
      ArrowUp: (active - 1 + tabs.length) % tabs.length,
      ArrowLeft: (active - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    pick(next, true);
  };

  const running = mode === "auto" && onScreen && !held;

  return (
    <div
      ref={rootRef}
      data-mode={mode}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e) => setFocused(isKeyboardFocus(e.target))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      className={cn(
        "grid gap-10 desk:grid-cols-[minmax(320px,420px)_1fr]",
        className,
      )}
    >
      <div role="tablist" aria-label={label} aria-orientation="vertical" className="flex flex-col gap-3">
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={i}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => pick(i)}
              onKeyDown={onKeyDown}
              className={cn(
                "group/tab rounded-lg border px-7 py-[26px] text-left transition-[background-color,border-color,box-shadow] duration-200",
                selected
                  ? "border-line bg-white shadow-soft"
                  : "border-transparent hover:bg-white/60",
              )}
            >
              <span
                className={cn(
                  "flex items-center gap-3.5 text-title",
                  selected ? "text-ink" : "text-slate group-hover/tab:text-ink",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full text-label/none font-bold transition-colors duration-200",
                    selected ? "bg-ink text-white" : "bg-cloud text-slate",
                  )}
                >
                  {i + 1}
                </span>
                {tab.title}
              </span>
              {selected && <span className="mt-3 block pl-[46px] text-body-sm text-slate">{tab.body}</span>}
              {selected && (
                <>
                  {tab.product && (
                    <span className="mt-3.5 block pl-[46px] text-label font-semibold text-azure-ink">
                      {tab.product}
                    </span>
                  )}
                  <span
                    aria-hidden="true"
                    data-progress=""
                    className={cn(
                      "mt-[18px] ml-[46px] block h-[3px] overflow-hidden rounded-[9px]",
                      mode === "auto" && "bg-line",
                    )}
                  >
                    {mode === "auto" && (
                      <i
                        // a new element per activation restarts the animation
                        key={active}
                        onAnimationEnd={() => setActive((a) => (a + 1) % tabs.length)}
                        style={{ animationPlayState: running ? "running" : "paused" }}
                        className="tab-progress block h-full origin-left rounded-[9px] bg-ember"
                      />
                    )}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[280px] overflow-hidden rounded-xl border border-line bg-[image:var(--grad-stage)] desk:min-h-[520px]">
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <div
              key={i}
              role="tabpanel"
              id={`${id}-panel-${i}`}
              aria-labelledby={`${id}-tab-${i}`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "absolute inset-0 grid place-items-center p-5 transition-[opacity,visibility] duration-400 ease-in-out desk:p-8",
                selected ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              {/* One frame for all three screens (F108): the same size, 16:9, and each screen
                  fits whole inside it, so none is cut off and the stage doesn't jump. */}
              <div
                data-frame=""
                className="relative aspect-video w-full overflow-hidden rounded-md border border-line bg-white shadow-float"
              >
                {tab.image ? (
                  <Image
                    src={tab.image.src}
                    width={tab.image.width}
                    height={tab.image.height}
                    alt={tab.image.alt}
                    sizes="(max-width: 900px) 90vw, 580px"
                    className="absolute inset-0 size-full object-contain p-2.5 desk:p-3"
                  />
                ) : (
                  <Placeholder caption={tab.placeholder ?? ""} className="absolute inset-0 rounded-none" />
                )}
              </div>
              {tab.result && (
                <ResultCard
                  {...tab.result}
                  className="absolute right-4 bottom-4 w-[220px] desk:right-10 desk:bottom-10 desk:w-[280px]"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
