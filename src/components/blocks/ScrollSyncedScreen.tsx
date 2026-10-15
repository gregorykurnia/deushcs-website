"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ContentImage } from "@/content/images";
import { Placeholder } from "@/components/ui/placeholder";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.25, ENHANCE-PAGE-SPEC.md §4, IMPLEMENTATION_PLAN.md §5. The web version of
// the deck's "scroll to reveal each step". On desktop the steps scroll beside a sticky stage; the
// step crossing the middle of the viewport (IntersectionObserver, a zero-height line at 50%) is
// active: white card, ink circle and the ember bar, which fills with scroll progress through the
// step. The stage crossfades to that step's screen over .4s.
// Below 901px there is no stage: each step shows its screen inline, on a sky tile.
// Before the script runs (or without IntersectionObserver), nothing is synced: every step sits
// beside its own screen, all visible. With reduced motion the screens swap instantly and the
// active bar shows full.

export type ScrollStep = {
  title: string;
  body: string;
  /** The step's screen; a TODO placeholder when the screenshot doesn't exist yet. */
  image?: ContentImage;
  placeholder?: string;
};

function InlineScreen({ step, className }: { step: ScrollStep; className?: string }) {
  if (!step.image) {
    return <Placeholder caption={step.placeholder ?? ""} className={cn("mt-5 min-h-[240px] rounded-lg desk:mt-0", className)} />;
  }
  return (
    <div
      className={cn(
        "mt-5 overflow-hidden rounded-lg border border-line bg-[image:var(--grad-stage)] pt-5 pl-5 desk:mt-0 desk:pt-10 desk:pl-10",
        className,
      )}
    >
      <Image
        src={step.image.src}
        width={step.image.width}
        height={step.image.height}
        alt={step.image.alt}
        sizes="(max-width: 900px) 100vw, 720px"
        className="block w-[112%] max-w-none rounded-md shadow-float"
      />
    </div>
  );
}

export function ScrollSyncedScreen({
  steps,
  className,
}: {
  steps: readonly ScrollStep[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const activeRef = useRef(0);
  const paintRef = useRef<() => void>(() => {});
  const [live, setLive] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const items = stepRefs.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target as HTMLLIElement));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const item of items) if (item) observer.observe(item);

    // The ember bar: how far the middle line has travelled through the active step. Written to
    // a CSS variable on the root, so scrolling never re-renders.
    let frame = 0;
    const paint = () => {
      frame = 0;
      const item = items[activeRef.current];
      if (!item) return;
      const { top, height } = item.getBoundingClientRect();
      const progress = reduce.matches ? 1 : Math.min(1, Math.max(0, (window.innerHeight / 2 - top) / height));
      root.style.setProperty("--step-progress", String(progress));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paintRef.current = schedule;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    setLive(true);
    schedule();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
      paintRef.current = () => {};
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
    paintRef.current();
  }, [active]);

  return (
    <div
      ref={rootRef}
      data-scroll-sync={live ? "live" : "static"}
      className={cn(live && "desk:grid desk:grid-cols-[420px_1fr] desk:gap-10", className)}
    >
      <ol className={cn("flex flex-col", live ? "gap-12 desk:gap-0" : "gap-12 desk:gap-16")}>
        {steps.map((step, i) => {
          const on = live && i === active;
          return (
            <li
              key={i}
              ref={(node) => {
                stepRefs.current[i] = node;
              }}
              aria-current={on ? "step" : undefined}
              className={cn(
                live ? "desk:min-h-[60vh]" : "desk:grid desk:grid-cols-[420px_1fr] desk:items-center desk:gap-10",
              )}
            >
              <div
                className={cn(
                  "rounded-lg border border-transparent transition-[background-color,border-color,box-shadow] duration-200 desk:px-7 desk:py-[26px]",
                  on && "desk:border-line desk:bg-white desk:shadow-soft",
                )}
              >
                <h3
                  className={cn(
                    "flex items-center gap-3.5 text-title text-ink transition-colors duration-200",
                    live && !on && "desk:text-slate",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full bg-ink text-label/none font-bold text-white transition-colors duration-200",
                      live && !on && "desk:bg-white desk:text-slate",
                    )}
                  >
                    {i + 1}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-3 pl-[46px] text-body-sm text-slate">{step.body}</p>
                {live && (
                  <span
                    aria-hidden="true"
                    data-step-bar=""
                    className={cn("mt-[18px] ml-[46px] hidden h-[3px] overflow-hidden rounded-[9px] bg-line", on && "desk:block")}
                  >
                    <i
                      style={{ transform: "scaleX(var(--step-progress, 0))" }}
                      className="block h-full origin-left rounded-[9px] bg-ember"
                    />
                  </span>
                )}
              </div>
              <InlineScreen step={step} className={cn(live && "desk:hidden")} />
            </li>
          );
        })}
      </ol>

      {live && (
        <div className="hidden desk:block">
          <div
            data-stage=""
            className="sticky top-[calc(var(--header-h)+48px)] h-[min(600px,calc(100vh-180px))] overflow-hidden rounded-xl border border-line bg-[image:var(--grad-stage)]"
          >
            {steps.map((step, i) => {
              const on = i === active;
              return (
                <div
                  key={i}
                  data-screen={i}
                  className={cn(
                    "absolute inset-0 transition-[opacity,visibility] duration-400 ease-in-out motion-reduce:transition-none",
                    on ? "visible opacity-100" : "invisible opacity-0",
                  )}
                >
                  {step.image ? (
                    <Image
                      src={step.image.src}
                      width={step.image.width}
                      height={step.image.height}
                      alt={step.image.alt}
                      sizes="760px"
                      className="absolute top-14 left-14 w-[760px] max-w-none rounded-[16px] shadow-float"
                    />
                  ) : (
                    <Placeholder
                      caption={step.placeholder ?? ""}
                      className="absolute inset-10 min-h-0 rounded-md bg-[image:var(--grad-stage)] shadow-soft"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
