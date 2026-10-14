"use client";

import { useLocale, useTranslations } from "next-intl";
import { Fragment } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { languageOptions } from "./language-options";

// DESIGN-GUIDE.md §7.4. Fixed order EN / ID. Switching keeps the visitor on the same page.
// A language the page doesn't exist in yet is shown disabled, never as a broken link.
// `inline` is the header's text toggle; `segmented` is the 44px pill in the mobile sheet;
// `names` is the footer's "English / Bahasa Indonesia".
export function LanguageSwitch({
  available = locales,
  variant = "inline",
  className,
  onNavigate,
}: {
  available?: readonly Locale[];
  variant?: "inline" | "segmented" | "names";
  className?: string;
  onNavigate?: () => void;
}) {
  const t = useTranslations("LanguageSwitch");
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const options = languageOptions(current, available);
  const segmented = variant === "segmented";
  const names = variant === "names";

  return (
    <nav
      aria-label={names ? t("footerLabel") : t("label")}
      className={cn(
        segmented
          ? "flex h-11 gap-1 rounded-pill border border-line bg-white p-1 text-ui font-medium"
          : names
            ? "flex items-center text-label text-slate"
            : "flex items-center text-ui font-medium text-slate-2",
        className,
      )}
    >
      {options.map((option, i) => {
        const name = t(`name.${option.locale}`);
        const label = segmented || names ? name : t(`short.${option.locale}`);
        const base = segmented
          ? "relative flex flex-1 items-center justify-center rounded-pill before:absolute before:inset-x-0 before:-inset-y-1 before:content-['']"
          : "relative rounded-xs before:absolute before:-inset-x-1 before:-inset-y-3 before:content-['']";

        const item = !option.available ? (
          <span
            role="link"
            aria-disabled="true"
            aria-label={t("unavailable", { language: name })}
            lang={option.locale}
            className={cn(base, "cursor-not-allowed text-slate-2")}
          >
            {label}
          </span>
        ) : (
          <Link
            href={pathname}
            locale={option.locale}
            hrefLang={option.locale}
            lang={option.locale}
            aria-label={name}
            aria-current={option.current ? "true" : undefined}
            onClick={onNavigate}
            className={cn(
              base,
              "transition-colors duration-150",
              segmented
                ? option.current
                  ? "bg-ink text-white"
                  : "text-ink-2 hover:bg-ink/6 hover:text-ink"
                : option.current
                  ? "font-bold text-ink"
                  : "text-slate hover:text-ink",
            )}
          >
            {label}
          </Link>
        );

        return (
          <Fragment key={option.locale}>
            {i > 0 && !segmented && (
              <span aria-hidden="true" className="whitespace-pre">
                {" / "}
              </span>
            )}
            {item}
          </Fragment>
        );
      })}
    </nav>
  );
}
