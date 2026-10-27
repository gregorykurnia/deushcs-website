import Image from "next/image";
import type { ContentImage } from "@/content/images";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §2.3 and §7.11. Potentia is a separate sub-brand with its own site, so on this
// site it is one warm tile or band: the warm gradient, warm text and link, and the phone and
// report images with the warm shadow (the only place a phone frame is allowed), both shown whole.
// Headings stay ink. Never Potentia's own royal blue, star mark or Montserrat.

/** The phone game and the report, side by side and the same height, each shown whole (never cut
 *  off, F110). They fill the box's height less 20px above and below, and shrink together when
 *  the box is too narrow for both. Shared with the tile. */
export function PotentiaArt({
  phone,
  report,
  className,
}: {
  phone: ContentImage;
  report: ContentImage;
  className?: string;
}) {
  // Both pictures at one height H are H × (sum of their aspect ratios) wide plus the gap, so H
  // can't be more than (box width − gap) / that sum. `cqw` is the box's own width.
  const gap = 16;
  const ratios = phone.width / phone.height + report.width / report.height;
  const img = "w-auto max-w-none rounded-md shadow-warm";
  const style = { height: `min(100%, calc((100cqw - ${gap}px) / ${ratios.toFixed(3)}))` };
  return (
    <div className={cn("relative min-h-[260px]", className)}>
      <div className="@container absolute inset-x-6 inset-y-5 flex items-center justify-center gap-4">
        <Image src={phone.src} width={phone.width} height={phone.height} alt={phone.alt} sizes="140px" className={img} style={style} />
        <Image src={report.src} width={report.width} height={report.height} alt={report.alt} sizes="150px" className={img} style={style} />
      </div>
    </div>
  );
}

/** "For parents and schools, in Bahasa Indonesia": the small chip above the heading. */
export function WarmChip({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block self-start rounded-pill bg-white/70 px-[11px] py-[5px] text-meta/[1.4] font-semibold text-warm-chip",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Home's Potentia band: a warm panel in the content width, copy beside the art.
 *  Its copy is in Indonesian on both locales, so pass `lang="id"` with it. */
export function PotentiaBand({
  eyebrow,
  title,
  body,
  link,
  art,
  lang,
  titleId,
  className,
}: {
  eyebrow: string;
  title: string;
  body: string;
  /** Goes to deuspotentia.com via `potentiaHref()`; opens in a new tab. */
  link: { label: string; href: string };
  art: { phone: ContentImage; report: ContentImage };
  /** The band's language when it differs from the page's. */
  lang?: string;
  /** An id for the heading, so the section around the band can be named by it. */
  titleId?: string;
  className?: string;
}) {
  return (
    <div
      lang={lang}
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-warm-line bg-[image:var(--grad-warm)] desk:flex-row desk:items-center",
        className,
      )}
    >
      <div className="flex flex-1 flex-col p-7 desk:px-14 desk:py-12">
        <WarmChip className="mb-4">{eyebrow}</WarmChip>
        <h2 id={titleId} className="max-w-[20em] text-[26px]/[1.2] font-bold tracking-[-0.025em] text-balance text-ink desk:text-[30px]">
          {title}
        </h2>
        <p className="mt-3 max-w-[34em] text-body text-warm-text">{body}</p>
        <TextLink href={link.href} tone="warm" className="mt-5 self-start text-ui">
          {link.label}
        </TextLink>
      </div>
      <PotentiaArt {...art} className="shrink-0 self-stretch desk:min-h-[300px] desk:basis-[520px]" />
    </div>
  );
}
