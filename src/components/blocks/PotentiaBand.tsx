import Image from "next/image";
import type { ContentImage } from "@/content/images";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §2.3 and §7.11. Potentia is a separate sub-brand with its own site, so on this
// site it is one warm tile or band: the warm gradient, warm text and link, and the phone and
// report images with the warm shadow (the only place a phone frame is allowed). Headings stay
// ink. Never Potentia's own royal blue, star mark or Montserrat.

/** The phone game and the report, overlapping, cropped by the band. Shared with the tile. */
export function PotentiaArt({
  phone,
  report,
  className,
}: {
  phone: ContentImage;
  report: ContentImage;
  className?: string;
}) {
  const img = "absolute max-w-none rounded-md shadow-warm";
  return (
    <div className={cn("relative h-[260px] overflow-hidden", className)}>
      <Image
        src={phone.src}
        width={phone.width}
        height={phone.height}
        alt={phone.alt}
        sizes="150px"
        className={cn(img, "top-10 left-6 w-[150px] min-[480px]:left-[60px]")}
      />
      <Image
        src={report.src}
        width={report.width}
        height={report.height}
        alt={report.alt}
        sizes="300px"
        className={cn(img, "top-14 left-[190px] h-[300px] w-[300px] object-cover object-top min-[480px]:left-[236px]")}
      />
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
        <h2 className="max-w-[20em] text-[26px]/[1.2] font-bold tracking-[-0.025em] text-balance text-ink desk:text-[30px]">
          {title}
        </h2>
        <p className="mt-3 max-w-[34em] text-body text-warm-text">{body}</p>
        <TextLink href={link.href} tone="warm" className="mt-5 self-start text-ui">
          {link.label}
        </TextLink>
      </div>
      <PotentiaArt {...art} className="shrink-0 self-stretch desk:h-auto desk:min-h-[300px] desk:basis-[520px]" />
    </div>
  );
}
