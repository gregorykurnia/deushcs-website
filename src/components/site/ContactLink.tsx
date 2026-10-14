"use client";

import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { contactHref } from "./nav";

// The header's "Contact" text link (15/500, ink), marked current on the contact page.
export function ContactLink({ children, className }: { children: ReactNode; className?: string }) {
  const current = usePathname() === contactHref;
  return (
    <Link
      href={contactHref}
      aria-current={current ? "page" : undefined}
      className={cn(
        "relative rounded-xs text-ink transition-colors duration-150 hover:text-ink-2",
        "before:absolute before:-inset-x-1 before:-inset-y-3 before:content-['']",
        "aria-[current=page]:font-bold",
        className,
      )}
    >
      {children}
    </Link>
  );
}
