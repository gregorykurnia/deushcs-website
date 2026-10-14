import { useTranslations } from "next-intl";
import { LabelPill } from "@/components/ui/pills";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.21, client story link card (product pages). One row on a cloud panel:
// the "Client story" pill, one line naming the client and the result, and "Read the story →".
// On a phone the link drops below. It repeats no other numbers or quotes.
export function LinkCard({
  line,
  href,
  className,
}: {
  /** "Telkom Group: 1,000+ MT candidates, results in 1 day". */
  line: string;
  href: string;
  className?: string;
}) {
  const t = useTranslations("ClientStoryCard");
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-lg bg-cloud px-6 py-6 min-[600px]:px-8 min-[600px]:py-7 desk:flex-row desk:items-center desk:justify-between desk:gap-8",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col items-start gap-3 desk:flex-row desk:items-center desk:gap-6">
        <LabelPill className="shrink-0">{t("label")}</LabelPill>
        <p className="text-title text-ink">{line}</p>
      </div>
      <TextLink href={href} className="shrink-0">
        {t("cta")}
        {/* the link's name carries the story it opens */}
        <span className="sr-only">: {line}</span>
      </TextLink>
    </div>
  );
}
