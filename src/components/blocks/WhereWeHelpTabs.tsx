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
// sky stage. The active tab's ember bar fills over --tab-dwell (7s), then the next tab takes
// over and the stage crossfades (.4s). The bar's CSS animation is the timer: `animationend`
// advances, and `animation-play-state` pauses it while the pointer or focus is inside, or
// while the showcase is off screen. Autoplay stops for good once the visitor picks a tab.
// With reduced motion, or before the script runs, nothing moves and the active bar shows full.

export type ShowcaseTab = {
  title: string;
  body: string;
  /** Product line under the description: "DEUS Discover and Next Chapter". */
  product?: string;
  /** Floating screenshot on the stage; a TODO placeholder when the screen doesn't exist yet. */
  image?: ContentImage;
  placeholder?: string;
  /** Result card overlapping the screenshot's corner. */
  result?: { label: string; value: string; unit?: string; bar?: number };
};

type Mode = "static" | "auto" | "stopped";

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
  const [held, setHeld] = useState(false); // pointer or focus inside

  // Autoplay only with script and without reduced motion, and only while on screen.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMode((m) => (m === "stopped" ? m : media.matches ? "static" : "auto"));
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
    setMode("stopped");
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
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
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
              {selected && (
                <>
                  <span className="mt-3 block pl-[46px] text-body-sm text-slate">{tab.body}</span>
                  {tab.product && (
                    <span className="mt-3.5 block pl-[46px] text-label font-semibold text-azure-ink">
                      {tab.product}
                    </span>
                  )}
                  <span aria-hidden="true" className="mt-[18px] ml-[46px] block h-[3px] overflow-hidden rounded-[9px] bg-line">
                    <i
                      // a new element per activation restarts the animation
                      key={`${active}-${mode}`}
                      onAnimationEnd={() => {
                        if (mode === "auto") setActive((a) => (a + 1) % tabs.length);
                      }}
                      style={{ animationPlayState: running ? "running" : "paused" }}
                      className={cn(
                        "block h-full origin-left rounded-[9px] bg-ember",
                        mode === "auto" && "tab-progress",
                      )}
                    />
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[340px] overflow-hidden rounded-xl border border-line bg-[image:var(--grad-stage)] desk:min-h-[520px]">
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
                "absolute inset-0 transition-[opacity,visibility] duration-400 ease-in-out",
                selected ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              {tab.image ? (
                <Image
                  src={tab.image.src}
                  width={tab.image.width}
                  height={tab.image.height}
                  alt={tab.image.alt}
                  sizes="(max-width: 900px) 90vw, 620px"
                  className="absolute top-5 left-5 w-[90%] max-w-none rounded-md shadow-float desk:top-14 desk:left-14 desk:w-[620px]"
                />
              ) : (
                <Placeholder
                  caption={tab.placeholder ?? ""}
                  className="absolute top-5 left-5 h-[260px] w-[90%] shadow-float desk:top-14 desk:left-14 desk:h-[360px] desk:w-[620px]"
                />
              )}
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
