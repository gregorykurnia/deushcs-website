"use client";

import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { NavigationMenu } from "radix-ui";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  activeSection,
  primaryLinks,
  solutionColumns,
  solutionsHref,
  type SolutionColumn,
  type SolutionItem,
} from "./nav";

// The header's pill nav with the Solutions mega menu (DESIGN-GUIDE.md §7.1, §7.2).
// Radix NavigationMenu gives the behaviour: click, Enter or Space toggles; hover opens after
// 120ms; Esc closes and returns focus to the trigger; outside click closes; arrow keys move
// between items. Shown above 900px; the mobile sheet replaces it below.

const pillItem = [
  "group/item relative inline-flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-ink-2 min-[1100px]:px-[18px]",
  "transition-colors duration-150",
  "before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-['']",
  "not-data-active:hover:bg-ink/6 not-data-active:hover:text-ink",
  "data-active:bg-ink data-active:text-white",
].join(" ");

export function MegaMenu({ className }: { className?: string }) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const active = activeSection(pathname);
  const inSolutions = active === "solutions";

  return (
    <NavigationMenu.Root
      aria-label={t("navLabel")}
      delayDuration={120}
      className={cn("relative items-center self-stretch", className)}
    >
      <NavigationMenu.List className="flex gap-1.5 rounded-pill border border-line bg-white/70 p-1.5 text-ui font-medium backdrop-blur-[12px]">
        <NavigationMenu.Item value="solutions">
          <NavigationMenu.Trigger
            data-active={inSolutions ? "" : undefined}
            aria-current={inSolutions ? "true" : undefined}
            className={cn(pillItem, "data-[state=open]:not-data-active:bg-ink/6 data-[state=open]:not-data-active:text-ink")}
          >
            {t("nav.solutions")}
            <ChevronDown
              aria-hidden="true"
              className="size-3.5 stroke-[2.2] transition-transform duration-200 group-data-[state=open]/item:rotate-180"
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-0 left-0 w-[min(760px,calc(100vw-48px))] p-3">
            <SolutionsPanel pathname={pathname} />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {primaryLinks.map((link) => (
          <NavigationMenu.Item key={link.key}>
            <NavigationMenu.Link asChild active={active === link.key}>
              <Link href={link.href} className={pillItem}>
                {t(`nav.${link.key}`)}
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      {/* Panel: centred under the nav pill, 8px below the header. */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
        <NavigationMenu.Viewport
          className={cn(
            "anim-menu relative overflow-hidden rounded-lg border border-line bg-white shadow-float",
            "h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]",
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
}

// Stacked rows, so neither side of the panel runs long: a product with modules spans the full
// width with its modules in a 2×2 grid, then the other products and the Potentia card sit side
// by side as equal tiles.
function SolutionsPanel({ pathname }: { pathname: string }) {
  const t = useTranslations("Header.solutionsMenu");
  const suites = solutionColumns.filter((column) => column.parts);
  const tiles = [
    ...solutionColumns.filter((column) => !column.parts).map((column) => column.lead),
    ...solutionColumns.flatMap((column) => (column.card ? [column.card] : [])),
  ];
  return (
    <>
      {suites.map((column) => (
        <Suite key={column.lead.key} column={column} pathname={pathname} />
      ))}
      <ul className="mt-2 grid grid-cols-2 gap-2">
        {tiles.map((item) => (
          <li key={item.key}>
            {item.external ? (
              <PotentiaItem item={item} />
            ) : (
              <ProductLink item={item} pathname={pathname} lead className="h-full" />
            )}
          </li>
        ))}
      </ul>
      <div className="mt-2 rounded-md bg-cloud px-4 py-3.5">
        <NavigationMenu.Link asChild active={pathname === solutionsHref}>
          <Link
            href={solutionsHref}
            className="group/link inline-flex items-center gap-2 text-[15px] font-semibold text-azure-ink"
          >
            <span className="group-hover/link:underline group-hover/link:underline-offset-3">{t("all")}</span>
            <ArrowRight
              aria-hidden="true"
              className="size-[17px] stroke-2 transition-transform duration-150 group-hover/link:translate-x-[3px]"
            />
          </Link>
        </NavigationMenu.Link>
      </div>
    </>
  );
}

function Suite({ column, pathname }: { column: SolutionColumn; pathname: string }) {
  return (
    <div>
      <ProductLink item={column.lead} pathname={pathname} lead />
      <ul className="mt-0.5 grid grid-cols-2 gap-x-2 gap-y-1">
        {column.parts?.map((part) => (
          <li key={part.key} className="ml-4 border-l-2 border-sky-2">
            <ProductLink item={part} pathname={pathname} className="h-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductLink({
  item,
  pathname,
  lead,
  className,
}: {
  item: SolutionItem;
  pathname: string;
  lead?: boolean;
  className?: string;
}) {
  const t = useTranslations("Header.solutionsMenu");
  return (
    <NavigationMenu.Link asChild active={pathname === item.href}>
      <Link
        href={item.href}
        className={cn(
          "block px-4 transition-colors duration-150 hover:bg-cloud focus-visible:bg-cloud data-active:bg-cloud",
          lead ? "rounded-md py-3.5" : "rounded-r-md py-2.5",
          className,
        )}
      >
        <span className={cn("block text-ink", lead ? "text-base/[1.4] font-bold" : "text-[15px]/[1.4] font-semibold")}>
          {t(`items.${item.key}.title`)}
        </span>
        <span className="mt-1 block text-[14px]/[1.45] text-pretty text-slate">{t(`items.${item.key}.description`)}</span>
      </Link>
    </NavigationMenu.Link>
  );
}

function PotentiaItem({ item }: { item: SolutionItem }) {
  const t = useTranslations("Header.solutionsMenu");
  return (
    <NavigationMenu.Link asChild>
      <a
        href={item.href}
        target="_blank"
        rel="noopener"
        className="block h-full rounded-md border border-warm-line bg-warm-1 px-4 py-3.5 transition-colors duration-150 hover:bg-warm-2 focus-visible:bg-warm-2"
      >
        <span className="flex items-center gap-1.5 text-[15px]/[1.4] font-bold text-ink">
          {t(`items.${item.key}.title`)}
          <ArrowUpRight aria-hidden="true" className="size-[15px] stroke-2" />
        </span>
        <span className="mt-1 block text-[14px]/[1.45] text-pretty text-warm-text">
          {t(`items.${item.key}.description`)}
        </span>
        <span className="mt-2 block text-meta/[1.45] text-pretty text-warm-text">{t("potentiaNote")}</span>
      </a>
    </NavigationMenu.Link>
  );
}
