"use client";

import { ChevronDown } from "lucide-react";
import {
  createContext,
  useContext,
  useId,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.9. Label (14/600 ink) → 8px → control → 7px → hint or error (13px).
// A Field gives its control an id and wires the label, hint and error to it, so callers only
// pass text. Fields are soft (cloud fill) with a 3:1 border at rest (--field-border, §2.6),
// turn white with an azure border and ring on focus, and white with an error border when
// invalid. 16px text, so iOS doesn't zoom in on focus.

type FieldState = {
  id: string;
  describedBy?: string;
  invalid: boolean;
};

const FieldContext = createContext<FieldState | null>(null);

/** For custom controls inside a Field: the id and ARIA wiring to put on the control. */
export function useField() {
  return useContext(FieldContext);
}

export function Field({
  label,
  optional,
  hint,
  error,
  id: idProp,
  className,
  children,
}: {
  label: ReactNode;
  /** The "(optional)" marker text, shown after the label. */
  optional?: string;
  hint?: ReactNode;
  /** The error message. Its presence marks the control invalid. */
  error?: ReactNode;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const generated = useId();
  const id = idProp ?? generated;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <FieldContext.Provider value={{ id, describedBy, invalid: !!error }}>
      <div data-slot="field" className={className}>
        <label htmlFor={id} className="mb-2 block text-label/[1.4] font-semibold text-ink">
          {label}
          {optional && <span className="font-medium text-slate"> {optional}</span>}
        </label>
        {children}
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
      </div>
    </FieldContext.Provider>
  );
}

/** Shared look for inputs, selects and textareas. */
export const fieldControl = cn(
  "w-full rounded-field border border-field-border bg-cloud px-4 text-[16px]/[1.4] text-ink",
  "transition-[background-color,border-color,box-shadow] duration-150",
  "placeholder:text-slate-2 hover:border-slate",
  // fields show the 4px ring instead of the site-wide focus outline
  "focus:border-azure focus:bg-white focus:shadow-[0_0_0_4px_var(--focus-ring)] focus-visible:outline-none!",
  "aria-invalid:border-error aria-invalid:bg-white",
  "aria-invalid:focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--error)_14%,transparent)]",
  "disabled:cursor-not-allowed disabled:border-line disabled:bg-cloud disabled:text-slate-2",
  "read-only:not-disabled:hover:border-field-border",
);

/** Merge a Field's wiring with props the caller set explicitly. */
function useControlProps<P extends { id?: string; "aria-describedby"?: string; "aria-invalid"?: unknown }>(props: P) {
  const field = useField();
  return {
    ...props,
    id: props.id ?? field?.id,
    "aria-describedby": props["aria-describedby"] ?? field?.describedBy,
    "aria-invalid": props["aria-invalid"] ?? (field?.invalid || undefined),
  };
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input {...useControlProps(props)} className={cn(fieldControl, "h-[50px]", className)} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      {...useControlProps(props)}
      className={cn(fieldControl, "block min-h-[140px] resize-y py-3.5 leading-[1.55]", className)}
    />
  );
}

/** Native select (more than six options, or a long list): the field look plus a chevron. */
export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        {...useControlProps(props)}
        className={cn(fieldControl, "h-[50px] cursor-pointer appearance-none pr-12", className)}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-[18px] -translate-y-1/2 text-slate"
      />
    </div>
  );
}
