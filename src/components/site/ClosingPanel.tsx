import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { HeadingLines } from "@/components/ui/section-header";
import { LabelPill } from "@/components/ui/pills";
import { Link } from "@/i18n/navigation";
import {
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  type WhatsAppContext,
  emailHref,
  whatsappHref,
} from "@/lib/links";
import { cn } from "@/lib/utils";
import { contactHref } from "./nav";

type ClosingPanelProps = {
  /** Pill above the heading. Defaults to the global one. */
  label?: string;
  /** Heading: a string, or lines (the content files write them as `A / B`). */
  title?: string | readonly string[];
  lede?: string;
  /** Primary button label and target. Defaults to "Request a demo" → Contact. */
  ctaLabel?: string;
  ctaHref?: string;
  /** Which prefilled WhatsApp message the secondary button and contact bar use. */
  whatsapp?: WhatsAppContext;
  className?: string;
};

// DESIGN-GUIDE.md §7.18. The page's last block: gradient panel, two buttons and the frosted
// contact bar. Used on every page except Contact and Privacy. The contact bar carries
// `data-contact-bar`, which hides the floating WhatsApp button while it is on screen.
export function ClosingPanel({
  label,
  title,
  lede,
  ctaLabel,
  ctaHref = contactHref,
  whatsapp = "default",
  className,
}: ClosingPanelProps) {
  const t = useTranslations("Closing");
  const tc = useTranslations("Common");
  const heading = title ?? t("title").split(" / ");
  const linkClass = "group/item relative inline-flex gap-2 text-ink before:absolute before:-inset-x-1 before:-inset-y-3 before:content-['']";

  return (
    <section aria-labelledby="closing-title" className={cn("px-6 pb-6", className)}>
      <div className="relative mx-auto max-w-wide overflow-hidden rounded-xl bg-[image:var(--grad-closing)] px-6 py-16 text-center desk:px-12 desk:py-[120px]">
        <LabelPill onSky className="mb-5">
          {label ?? t("label")}
        </LabelPill>
        <h2 id="closing-title" className="mx-auto max-w-[12em] text-closing text-balance text-ink">
          <HeadingLines lines={heading} />
        </h2>
        <p className="mx-auto mt-[22px] max-w-[32em] text-lede-sm text-slate">{lede ?? t("lede")}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 desk:flex-row">
          <Button asChild>
            <Link href={ctaHref}>{ctaLabel ?? t("cta")}</Link>
          </Button>
          <Button asChild variant="secondary">
            <a href={whatsappHref(whatsapp)} target="_blank" rel="noopener">
              {t("whatsapp")}
              <span className="sr-only"> {tc("opensInNewTab")}</span>
            </a>
          </Button>
        </div>

        <div
          role="group"
          aria-label={t("contactLabel")}
          data-contact-bar=""
          className="mt-9 inline-flex flex-col gap-1.5 rounded-[20px] bg-white/70 px-6 py-3 text-ui font-semibold backdrop-blur-[10px] desk:flex-row desk:gap-7 desk:rounded-pill"
        >
          <a href={whatsappHref(whatsapp)} target="_blank" rel="noopener" className={linkClass}>
            <span className="font-medium text-slate">{t("contactWhatsapp")}</span>
            <span className="group-hover/item:underline group-hover/item:underline-offset-3">
              {WHATSAPP_DISPLAY}
            </span>
            <span className="sr-only">{tc("opensInNewTab")}</span>
          </a>
          <a href={emailHref()} className={linkClass}>
            <span className="font-medium text-slate">{t("contactEmail")}</span>
            <span className="group-hover/item:underline group-hover/item:underline-offset-3">
              {CONTACT_EMAIL}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
