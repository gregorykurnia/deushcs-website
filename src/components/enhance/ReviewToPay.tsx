"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { FloatingCard } from "@/components/ui/floating-card";
import { Placeholder } from "@/components/ui/placeholder";
import type { ContentImage } from "@/content/images";
import { cn } from "@/lib/utils";

// The Enhance hero picture (F72, D10; DESIGN-GUIDE.md §7.12 "Product heroes", §9.3): four screens
// in one loop, KPI → appraisal → calibration → bonus, each held for --tab-dwell with a .4s
// crossfade, and a numbered step row under them whose ember bar fills as each screen shows, as the
// Home tabs' bar does. CSS keyframes do the work (globals.css `.review-to-pay`); the animations
// rest paused on the first step, and script only lets them run while the panel is on screen
// (`data-playing`). So without JavaScript the first screen shows. Hover or focus pauses it (the
// figure takes focus, so a keyboard or a tap can stop it, WCAG 2.2.2). With reduced motion the
// last step, the bonus screen, shows still. A step without its screen shows its placeholder.

export type SequenceFrame = { label: string } & ({ image: ContentImage } | { placeholder: string });

/** The stage's shape. Each screen is sized to fit it whole, so taller screens float narrower. */
const STAGE_RATIO = 4 / 3;
/** Share of the stage the widest screen takes, leaving sky around it. */
const FILL = 0.92;

function frameWidth(frame: SequenceFrame) {
  const ratio = "image" in frame ? frame.image.width / frame.image.height : 16 / 10;
  return `${+(Math.min(1, ratio / STAGE_RATIO) * FILL * 100).toFixed(2)}%`;
}

export function ReviewToPay({
  caption,
  frames,
  className,
}: {
  caption: string;
  frames: readonly [SequenceFrame, SequenceFrame, SequenceFrame, SequenceFrame];
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(!!entry?.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      data-review-to-pay=""
      data-playing={onScreen || undefined}
      tabIndex={0}
      className={cn("review-to-pay rounded-lg", className)}
    >
      <figcaption className="text-center text-ui font-semibold text-ink">{caption}</figcaption>
      <div className="relative mt-5 aspect-[4/3]">
        {frames.map((frame, i) => (
          <div
            key={frame.label}
            className="rtp-frame absolute inset-0 flex items-center justify-center"
            style={{ "--i": i } as CSSProperties}
          >
            <FloatingCard shape="play" style={{ width: frameWidth(frame) }}>
              {"image" in frame ? (
                <Image
                  src={frame.image.src}
                  width={frame.image.width}
                  height={frame.image.height}
                  alt={frame.image.alt}
                  sizes="(max-width: 900px) 90vw, 640px"
                  // the first screen is the hero's picture until the loop starts
                  priority={i === 0}
                  className="block h-auto w-full rounded-[14px]"
                />
              ) : (
                <Placeholder caption={frame.placeholder} className="aspect-[16/10] min-h-0 rounded-[14px]" />
              )}
            </FloatingCard>
          </div>
        ))}
      </div>
      <ol className="mt-6 grid grid-cols-4 gap-1.5 desk:gap-3">
        {frames.map((frame, i) => (
          <li key={frame.label} className="rtp-step min-w-0" style={{ "--i": i } as CSSProperties}>
            <span className="flex flex-col items-center gap-1.5 text-center desk:flex-row desk:gap-2.5 desk:text-left">
              <span
                aria-hidden="true"
                className="rtp-num grid size-7 shrink-0 place-items-center rounded-full text-[13px] font-bold tabular-nums"
              >
                {i + 1}
              </span>
              <span className="rtp-label text-[13px]/[1.3] font-semibold desk:text-label/[1.3]">{frame.label}</span>
            </span>
            <span aria-hidden="true" className="mt-3 block h-[3px] overflow-hidden rounded-[9px] bg-white/70">
              <span className="rtp-bar block h-full origin-left rounded-[9px] bg-ember" />
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
