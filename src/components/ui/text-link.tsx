import type { ComponentProps, ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.6.
// standalone: azure-ink, 600, arrow, no underline at rest ("See DEUS Enhance →").
// inline: underlined, for links inside body copy, where colour alone isn't enough.
type TextLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "standalone" | "inline";
  /** next = ArrowRight (internal), external = ArrowUpRight, down = in-page jump. External hrefs default to external. */
  icon?: "next" | "external" | "down" | "none";
  /** On the Potentia warm band, links use --warm-link. */
  tone?: "default" | "warm";
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children" | "className">;

const icons = { next: ArrowRight, external: ArrowUpRight, down: ArrowDown } as const;

export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

export function TextLink({
  href,
  children,
  variant = "standalone",
  icon,
  tone = "default",
  className,
  ...rest
}: TextLinkProps) {
  const locale = useLocale();
  const t = useTranslations("Common");
  const external = isExternalHref(href);
  const special = /^(mailto|tel):/.test(href) || href.startsWith("#");
  const iconKey = icon ?? (variant === "inline" ? "none" : external ? "external" : "next");
  const Icon = iconKey === "none" ? null : icons[iconKey];

  const classes = cn(
    "group/link font-semibold",
    tone === "warm" ? "text-warm-link" : "text-azure-ink",
    variant === "standalone"
      ? "inline-flex items-center gap-2"
      : "underline decoration-1 underline-offset-3",
    className,
  );

  const content = (
    <>
      <span className={variant === "standalone" ? "group-hover/link:underline group-hover/link:underline-offset-3" : undefined}>
        {children}
      </span>
      {Icon && (
        <Icon
          aria-hidden="true"
          className="size-[17px] shrink-0 stroke-2 transition-transform duration-150 group-hover/link:translate-x-[3px]"
        />
      )}
      {/* In the page's language, even inside a block marked lang="id" (the Potentia band). */}
      {external && (
        <span lang={locale} className="sr-only">
          {" "}
          {t("opensInNewTab")}
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes} {...rest}>
        {content}
      </a>
    );
  }
  if (special) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
