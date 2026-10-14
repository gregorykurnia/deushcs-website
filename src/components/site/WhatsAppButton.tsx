"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { type WhatsAppContext, whatsappHref } from "@/lib/links";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./whatsapp-icon";

// DESIGN-GUIDE.md §7.26. A 56px ink circle, bottom right. It fades out while the closing
// panel's contact bar (`[data-contact-bar]`) is on screen, so there are never two WhatsApp
// links in view. Pages render it themselves, with their WhatsApp message; the Contact page
// doesn't render it at all.
export function WhatsAppButton({
  context = "default",
  className,
}: {
  context?: WhatsAppContext;
  className?: string;
}) {
  const t = useTranslations("WhatsAppButton");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const bars = document.querySelectorAll("[data-contact-bar]");
    if (bars.length === 0 || !("IntersectionObserver" in window)) return;
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setHidden(onScreen.size > 0);
    });
    bars.forEach((bar) => observer.observe(bar));
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappHref(context)}
      target="_blank"
      rel="noopener"
      aria-label={t("label")}
      // inert while faded out: not clickable, not focusable, not read out
      inert={hidden}
      data-hidden={hidden || undefined}
      className={cn(
        "group fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-pill bg-ink text-white desk:right-6 desk:bottom-6",
        "shadow-[var(--shadow-btn),var(--shadow-lg)] transition-[opacity,background-color] duration-200",
        "hover:bg-ink-2 data-[hidden]:pointer-events-none data-[hidden]:opacity-0",
        className,
      )}
    >
      <WhatsAppIcon className="size-[26px]" />
      {/* Tooltip on hover and focus; the link's aria-label already says it. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-full mr-2 -translate-y-1/2 rounded-pill bg-ink px-3.5 py-2 text-meta/none font-semibold whitespace-nowrap text-white opacity-0 shadow-soft transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 max-[900px]:hidden"
      >
        {t("label")}
      </span>
    </a>
  );
}
