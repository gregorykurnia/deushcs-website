"use client";

import { Check } from "lucide-react";
import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.9 "Checkbox (consent)", extrapolated. A native checkbox (so it works without
// JavaScript and posts with the form), drawn as a 22px box, radius 6, white with a 3:1 border.
// Checked: ink fill with a white check. The whole row is the label, so it's all clickable.
export function Checkbox({
  label,
  error,
  className,
  id: idProp,
  ...props
}: Omit<ComponentProps<"input">, "type"> & {
  /** 15/400 slate beside the box. Inline links inside it stay underlined. */
  label: ReactNode;
  error?: ReactNode;
}) {
  const generated = useId();
  const id = idProp ?? generated;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div data-slot="checkbox" className={className}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-ui text-slate has-disabled:cursor-not-allowed">
        <span className="relative mt-px grid size-[22px] shrink-0 place-items-center">
          <input
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className={cn(
              "peer size-[22px] cursor-pointer appearance-none rounded-[6px] border-[1.5px] border-field-border bg-white",
              "transition-[background-color,border-color] duration-150 hover:border-slate",
              "checked:border-ink checked:bg-ink checked:hover:border-ink",
              "aria-invalid:border-error",
              "disabled:cursor-not-allowed disabled:border-line disabled:bg-cloud",
            )}
            {...props}
          />
          <Check
            aria-hidden="true"
            strokeWidth={3}
            className="pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100"
          />
        </span>
        <span>{label}</span>
      </label>
      {error && (
        <p id={errorId} className="mt-[7px] pl-[34px] text-meta/[1.45] text-error-ink">
          {error}
        </p>
      )}
    </div>
  );
}
