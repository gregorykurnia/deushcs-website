"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.9 "Choice", extrapolated: a radio group drawn as chips (§7.7), for six
// options or fewer (product interest, company size). Native radios underneath, so arrow keys,
// form posting and no-JavaScript all work; the selected chip fills ink. Chips wrap on mobile.
export type ChoiceOption = { value: string; label: string };

export function ChoiceChips({
  legend,
  optional,
  name,
  options,
  defaultValue,
  required,
  disabled,
  error,
  hint,
  className,
}: {
  legend: ReactNode;
  optional?: string;
  name: string;
  options: readonly ChoiceOption[];
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  error?: ReactNode;
  hint?: ReactNode;
  className?: string;
}) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <fieldset
      role="radiogroup"
      aria-invalid={error ? true : undefined}
      aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
      disabled={disabled}
      className={cn("min-w-0", className)}
    >
      <legend className="mb-2 text-label/[1.4] font-semibold text-ink">
        {legend}
        {optional && <span className="font-medium text-slate"> {optional}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.value} className="relative cursor-pointer has-disabled:cursor-not-allowed">
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={option.value === defaultValue}
              required={required}
              className="peer sr-only"
            />
            <span
              className={cn(
                "relative inline-flex min-h-[38px] items-center rounded-pill border border-line bg-white px-3.5 py-2 text-label/[1.3] font-semibold text-ink-2",
                "transition-[background-color,border-color,color] duration-150 hover:border-slate-2",
                // 44px tap target
                "before:absolute before:inset-x-0 before:-inset-y-[3px] before:content-['']",
                "peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-azure",
                "peer-disabled:border-line peer-disabled:text-slate-2 peer-disabled:hover:border-line",
                error && "border-error",
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-[7px] text-meta/[1.45] text-error-ink">
          {error}
        </p>
      )}
      {hint && (
        <p id={hintId} className="mt-[7px] text-meta/[1.45] text-slate">
          {hint}
        </p>
      )}
    </fieldset>
  );
}
