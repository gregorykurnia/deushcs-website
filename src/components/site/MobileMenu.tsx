"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { emailHref, whatsappHref } from "@/lib/links";
import { Brand } from "./Brand";
import { LanguageSwitch } from "./LanguageSwitch";
import { activeSection, contactHref, primaryLinks, solutionColumns } from "./nav";

// The menu at 900px and below (DESIGN-GUIDE.md §7.3): a full-height sheet from the top.
// Radix Dialog locks body scroll, traps focus, closes on Esc and returns focus to the button.
// It also closes on route change: it only counts as open for the path it was opened on.

const itemClass =
  "flex items-center gap-1.5 border-b border-line py-3.5 text-[17px]/[1.4] font-semibold text-ink aria-[current=page]:text-azure-ink";

const partClass =
  "flex items-center border-b border-line py-3 text-[16px]/[1.4] font-medium text-ink-2";

export function MobileMenu({
  available,
  className,
}: {
  available?: readonly Locale[];
  className?: string;
}) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const active = activeSection(pathname);
  const close = () => setOpenedOn(null);

  return (
    <Dialog.Root open={open} onOpenChange={(next) => setOpenedOn(next ? pathname : null)}>
      <Dialog.Trigger asChild>
        <Button variant="secondary" size="icon" aria-label={t("mobileMenu.open")} className={className}>
          <Menu aria-hidden="true" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* The overlay carries Radix's body scroll lock; the sheet itself covers the screen. */}
        <Dialog.Overlay className="fixed inset-0 z-70 bg-white" />
        <Dialog.Content
          aria-describedby={undefined}
          className="anim-sheet fixed inset-0 z-70 overflow-y-auto overscroll-contain bg-white px-[var(--gutter)] pb-8"
        >
          <Dialog.Title className="sr-only">{t("mobileMenu.title")}</Dialog.Title>

          <div className="flex h-[var(--header-h)] items-center justify-between max-[479px]:h-[68px]">
            <Brand onClick={close} />
            <Dialog.Close asChild>
              <Button variant="secondary" size="icon" aria-label={t("mobileMenu.close")}>
                <X aria-hidden="true" />
              </Button>
            </Dialog.Close>
          </div>

          <nav aria-label={t("navLabel")}>
            <ul className="mt-2">
              {solutionColumns.map((column) => (
                <li key={column.lead.key}>
                  <Link
                    href={column.lead.href}
                    onClick={close}
                    aria-current={pathname === column.lead.href ? "page" : undefined}
                    className={itemClass}
                  >
                    {t(`solutionsMenu.items.${column.lead.key}.title`)}
                  </Link>
                  {column.parts && (
                    <ul className="ml-1 border-l-2 border-sky-2 pl-4">
                      {column.parts.map((part) => (
                        <li key={part.key}>
                          <Link href={part.href} onClick={close} className={partClass}>
                            {t(`solutionsMenu.items.${part.key}.title`)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {column.card && (
                    <a
                      href={column.card.href}
                      target="_blank"
                      rel="noopener"
                      className="my-3 flex items-center gap-1.5 rounded-md border border-warm-line bg-warm-1 px-4 py-3.5 text-[17px]/[1.4] font-semibold text-ink"
                    >
                      {t(`solutionsMenu.items.${column.card.key}.title`)}
                      <ArrowUpRight aria-hidden="true" className="size-[17px] stroke-2" />
                      <span className="sr-only">{t("solutionsMenu.potentiaNote")}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <ul className="mt-6">
              {[...primaryLinks, { key: "contact" as const, href: contactHref }].map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={active === link.key ? "page" : undefined}
                    className={itemClass}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitch variant="segmented" available={available} onNavigate={close} className="mt-8" />

          <div className="mt-6 flex flex-col gap-3">
            <Button asChild variant="secondary" className="w-full">
              <a href={whatsappHref("default")} target="_blank" rel="noopener">
                {t("mobileMenu.whatsapp")}
              </a>
            </Button>
            <Button asChild variant="secondary" className="w-full">
              <a href={emailHref()}>{t("mobileMenu.email")}</a>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
