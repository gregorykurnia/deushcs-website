import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §14.3. Stands in for a missing image: a sky tile (the thumbnail gradient)
// with a 15px slate caption naming what goes there, e.g. "TODO: Calibration matrix screenshot".
// Never a grey box or a stock photo. The caption sits in the lower, lighter part of the tile,
// where slate on the gradient stays above 4.5:1.
export function Placeholder({
  caption,
  className,
}: {
  caption: string;
  className?: string;
}) {
  return (
    <div
      data-placeholder=""
      className={cn(
        "flex min-h-40 items-end justify-center overflow-hidden rounded-md bg-[image:var(--grad-thumb)] p-5 text-center",
        className,
      )}
    >
      <p className="max-w-[28em] text-[15px]/[1.5] font-medium text-slate">{caption}</p>
    </div>
  );
}
