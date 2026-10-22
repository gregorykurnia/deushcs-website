import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/pills";
import { Rich } from "@/components/ui/rich";
import { HeadingLines } from "@/components/ui/section-header";
import { Link } from "@/i18n/navigation";
import type { Cta, Heading } from "@/content/types";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §6.2 and §7.12 ("Other pages: product heroes"; F71, D10). Built to look unlike
// Home's centred hero, so a visitor knows they're on a product page: two columns on desktop, the
// copy left-aligned on the left (the product name as a large azure line, then an H2-sized heading,
// smaller than Home's display one) and the product picture in a sky panel on the right, the wider
// of the two. On a phone the copy stays left-aligned and the panel follows it. The hero glow sits
// behind the header: the section pulls up under the transparent header and pads itself back down.
// The copy never animates, so the LCP text is never delayed; the panel's content may (Enhance).

/** The sky panel (guide §7.12) the product picture floats in: a rounded panel, not a window
 *  docked to the section's foot as on Home. */
export function SkyPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[image:var(--grad-sky-window)] px-[18px] py-8 desk:px-10 desk:py-10",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[image:var(--grad-sky-highlights)]" />
      {children}
    </div>
  );
}

export function ProductHero({
  eyebrow,
  title,
  lede,
  chips,
  ctas,
  children,
  className,
}: {
  /** The product name, shown large above the heading. */
  eyebrow: string;
  title: Heading;
  /** **bold** is allowed, as in the content files. */
  lede?: string;
  /** Tags under the lede, naming what the product covers (Enhance: "KPIs · Appraisal · …"). */
  chips?: readonly string[];
  /** The first button is the primary (navy), the second the white pill. */
  ctas: readonly Cta[];
  /** The sky panel's content: the product picture. */
  children: ReactNode;
  className?: string;
}) {
  const [primary, secondary] = ctas;
  return (
    <section
      aria-labelledby="hero-title"
      className={cn(
        "relative isolate overflow-hidden pb-[var(--section-y-tight)]",
        // 84px header (68px below 480px), then 56px (40px) above the product name
        "-mt-[84px] pt-[140px] max-[479px]:-mt-[68px] max-[479px]:pt-[108px]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute top-[-340px] left-[30%] -z-10 h-[1100px] w-[1700px] -translate-x-1/2 bg-[image:var(--grad-hero-glow)]"
      />
      <div className="mx-auto grid max-w-wide gap-10 px-[var(--gutter)] desk:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] desk:items-center desk:gap-14 desk:px-6">
        <div className="desk:pl-6">
          <p className="text-h3 text-azure-ink">{eyebrow}</p>
          <h1 id="hero-title" className="mt-4 max-w-[13em] text-h2 text-balance text-ink">
            <HeadingLines lines={title} />
          </h1>
          {lede && (
            <p className="mt-6 max-w-[32em] text-lede-sm text-slate">
              <Rich text={lede} />
            </p>
          )}
          {chips && chips.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <li key={chip}>
                  <Tag>{chip}</Tag>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-9 flex flex-col items-start gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
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
        <SkyPanel>{children}</SkyPanel>
      </div>
    </section>
  );
}
