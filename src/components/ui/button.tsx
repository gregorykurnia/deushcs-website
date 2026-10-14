import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.5. Navy pill for the one main action, white pill for the second,
// and a quiet text button. Ember is never a button colour.
const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-pill border border-transparent",
    "font-semibold leading-none whitespace-nowrap select-none",
    "transition-[background-color,border-color,box-shadow,color,transform] duration-150",
    "active:translate-y-px",
    // 44px touch target even for the 42px sizes
    "before:absolute before:-inset-1 before:content-['']",
    "[&_svg]:size-[17px] [&_svg]:shrink-0 [&_svg]:stroke-2",
    // disabled (extrapolated); a busy button keeps its colour and shows a spinner
    "disabled:cursor-not-allowed disabled:active:translate-y-0",
    "disabled:not-aria-busy:border-transparent disabled:not-aria-busy:bg-line disabled:not-aria-busy:text-slate-2 disabled:not-aria-busy:shadow-none",
    "aria-disabled:cursor-not-allowed aria-disabled:border-transparent aria-disabled:bg-line aria-disabled:text-slate-2 aria-disabled:shadow-none",
    "aria-busy:cursor-progress",
  ],
  {
    variants: {
      variant: {
        primary: "bg-ink text-white shadow-btn hover:bg-ink-2",
        secondary: [
          "border-line bg-white text-ink shadow-soft",
          "hover:border-[color-mix(in_srgb,var(--color-line),var(--color-slate-2)_20%)] hover:shadow-float",
        ],
        text: "bg-transparent text-ink-2 hover:bg-ink/6 hover:text-ink",
      },
      size: {
        md: "h-13 px-6.5 text-[16px]",
        sm: "h-[42px] px-5 text-[15px]",
        icon: "size-[42px] p-0 [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render the child element (usually a Link) with button styling. */
    asChild?: boolean;
    /** Pending state: disables the button, sets aria-busy and shows a spinner before the label. */
    busy?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  busy = false,
  disabled,
  children,
  type,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (asChild) {
    return (
      <Slot.Root data-slot="button" className={classes} {...props}>
        {children}
      </Slot.Root>
    );
  }

  return (
    <button
      data-slot="button"
      type={type ?? "button"}
      className={classes}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      {...props}
    >
      {busy && <LoaderCircle aria-hidden="true" className="animate-spin" />}
      {children}
    </button>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
