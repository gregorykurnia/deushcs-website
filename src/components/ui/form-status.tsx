"use client";

import { Check, CircleAlert } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.9, extrapolated. The form-level error sits above the submit button; the
// success panel replaces the form. No ember (a sent form isn't "now") and no green (there is
// no green in the palette).

/** "Something went wrong on our side…": error-wash panel, 15px error-ink text. */
export function FormError({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-md bg-error-wash px-5 py-4 text-ui text-error-ink",
        className,
      )}
    >
      <CircleAlert aria-hidden="true" className="mt-[3px] size-[18px] shrink-0" />
      <p>{children}</p>
    </div>
  );
}

/** Replaces the form once it's sent. Focus moves to the heading so screen readers hear it. */
export function SuccessPanel({
  title,
  body,
  action,
  focusOnMount = true,
  headingLevel = 3,
  className,
}: {
  title: string;
  body?: ReactNode;
  /** Usually "In a hurry? Chat with us on WhatsApp". */
  action?: ReactNode;
  focusOnMount?: boolean;
  /** 2 where the panel sits straight under the page's h1 (Contact), 3 inside a section. */
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  useEffect(() => {
    if (focusOnMount) heading.current?.focus();
  }, [focusOnMount]);

  return (
    <div className={cn("rounded-lg border border-line bg-white p-10 text-center", className)}>
      <span aria-hidden="true" className="mx-auto grid size-12 place-items-center rounded-full bg-sky-1">
        <Check className="size-6 text-azure" strokeWidth={2.2} />
      </span>
      <Heading ref={heading} tabIndex={-1} className="mt-5 text-h3 text-ink">
        {title}
      </Heading>
      {body && <p className="mx-auto mt-3 max-w-[30em] text-body text-slate">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
