import { FileDown } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteFlags } from "@/content/flags";
import { cn } from "@/lib/utils";

// The sample-report download (SEO/geo-implementation-plan.md §S11): a smaller step for visitors who
// aren't ready to ask for a trial. A resting card (white, hairline border, radius 24) with an icon
// tile, the title and one line on what's inside, beside the download variant of `LeadForm`, which is
// always open. Copy: messages `DownloadOffer` (`global.md` "Download offer").
//
// Pages use `DownloadOffer`, which renders nothing while `showSampleReport` is off. The card on its
// own is for the styleguide, which shows the form's states without the switch.

/** The block, while the sample report is on offer. */
export function DownloadOffer({ className }: { className?: string }) {
  if (!siteFlags.showSampleReport) return null;
  return (
    <DownloadOfferCard className={className}>
      <LeadForm variant="download" offer="gba-sample-report" />
    </DownloadOfferCard>
  );
}

/** The card around a download form: the form (or its success panel) is `children`. */
export function DownloadOfferCard({ className, children }: { className?: string; children: ReactNode }) {
  const t = useTranslations("DownloadOffer");
  return (
    <div
      data-download-offer
      className={cn(
        "mx-auto grid max-w-[960px] gap-8 rounded-lg border border-line bg-white p-6 min-[600px]:p-8",
        "desk:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] desk:gap-14 desk:p-12",
        className,
      )}
    >
      <div>
        <span aria-hidden="true" className="grid size-14 place-items-center rounded-md border border-line bg-white">
          <FileDown className="size-6 text-azure" strokeWidth={1.7} />
        </span>
        <h3 className="mt-6 text-h3-panel text-balance text-ink">{t("title")}</h3>
        <p className="mt-3 text-body-sm text-slate">{t("body")}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
