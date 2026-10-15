import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LabelPill } from "@/components/ui/pills";
import { HeadingLines } from "@/components/ui/section-header";
import { Link } from "@/i18n/navigation";
import type { Cta, Heading } from "@/content/types";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §6.2 and §7.12 ("Other pages: product heroes"). A centred hero: label pill,
// display heading, lede and two buttons, then the sky window with floating screens or cards
// (no track). The hero glow sits behind the header: the section pulls up under the transparent
// header and pads itself back down, so the heading keeps the guide's 64px below the header.
// Nothing here is animated, so the LCP text is never delayed.

/** The sky window (guide §7.12) without the track: 500px tall on desktop, since two or three
 *  floating cards need less room than the journey's 580px; it grows to fit on a phone. */
export function SkyWindow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-wide px-6 max-[479px]:px-3", className)}>
      <div className="relative overflow-hidden rounded-t-xl bg-[image:var(--grad-sky-window)] px-[18px] pt-10 pb-12 desk:h-[500px] desk:px-14 desk:pt-16 desk:pb-0">
        <div aria-hidden="true" className="absolute inset-0 bg-[image:var(--grad-sky-highlights)]" />
        {children}
      </div>
    </div>
  );
}

export function ProductHero({
  eyebrow,
  title,
  lede,
  ctas,
  children,
  className,
}: {
  /** Product name in the label pill above the heading. */
  eyebrow: string;
  title: Heading;
  lede?: string;
  /** The first button is the primary (navy), the second the white pill. */
  ctas: readonly Cta[];
  /** The sky window's content. */
  children: ReactNode;
  className?: string;
}) {
  const [primary, secondary] = ctas;
  return (
    <section
      aria-labelledby="hero-title"
      className={cn(
        "relative isolate overflow-hidden",
        // 84px header (68px below 480px) + the guide's 8px + 64px above the heading
        "-mt-[84px] pt-[156px] max-[479px]:-mt-[68px] max-[479px]:pt-[140px]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute top-[-340px] left-1/2 -z-10 h-[1100px] w-[1700px] -translate-x-1/2 bg-[image:var(--grad-hero-glow)]"
      />
      <div className="mx-auto w-full max-w-content px-[var(--gutter)] text-center">
        <LabelPill className="mb-6">{eyebrow}</LabelPill>
        <h1 id="hero-title" className="mx-auto max-w-[11em] text-display text-balance text-ink">
          <HeadingLines lines={title} />
        </h1>
        {lede && <p className="mx-auto mt-7 max-w-[34em] text-lede text-balance text-slate">{lede}</p>}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 desk:flex-row">
          {primary && (
            <Button asChild>
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
          )}
          {secondary && (
            <Button asChild variant="secondary">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          )}
        </div>
      </div>
      <SkyWindow className="mt-16">{children}</SkyWindow>
    </section>
  );
}
