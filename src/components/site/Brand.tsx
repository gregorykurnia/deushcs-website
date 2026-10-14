import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// Logo tile (36×36, radius 10) + "DEUS" wordmark (19/700, −0.02em), gap 12. Links to Home.
// The logo is the 157px PNG from design-directions/assets until the SVG arrives (guide §14.2).
export function Brand({
  className,
  wordmarkClassName,
  onClick,
}: {
  className?: string;
  wordmarkClassName?: string;
  onClick?: () => void;
}) {
  const t = useTranslations("Header");
  return (
    <Link
      href="/"
      aria-label={t("homeLabel")}
      onClick={onClick}
      className={cn("relative inline-flex items-center gap-3 rounded-xs", className)}
    >
      <Image
        src="/assets/deus-logo.png"
        alt=""
        width={36}
        height={36}
        loading="eager"
        className="size-9 rounded-xs"
      />
      <b className={cn("text-[19px]/none font-bold tracking-[-0.02em] text-ink", wordmarkClassName)}>
        {t("wordmark")}
      </b>
    </Link>
  );
}
