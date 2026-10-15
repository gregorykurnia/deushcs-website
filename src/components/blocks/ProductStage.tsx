import Image from "next/image";
import type { ReactNode } from "react";
import { Placeholder } from "@/components/ui/placeholder";
import type { ContentImage } from "@/content/images";
import { cn } from "@/lib/utils";
import { ReportScrollWindow } from "./ReportScrollWindow";

// DESIGN-GUIDE.md §7.10 (the stage tile) and §8.1–8.2. A sky tile with one product screen
// floating at a fixed inset, so it runs off the right edge (never centred with even margins).
// A TODO placeholder stands in until the screenshot exists (§14.3). `children` is for a floating
// result card overlapping the screen's corner.

const stage =
  "relative overflow-hidden rounded-xl border border-line bg-[image:var(--grad-stage)]";

export function ProductStage({
  image,
  placeholder,
  children,
  className,
}: {
  image?: ContentImage;
  /** Caption of the placeholder shown when there is no `image`: "TODO: GBA CMS screenshot". */
  placeholder?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(stage, "min-h-[340px] desk:min-h-[480px]", className)}>
      {image ? (
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes="(max-width: 900px) 90vw, 680px"
          className="absolute top-5 left-5 w-[90%] max-w-none rounded-md shadow-float desk:top-14 desk:left-14 desk:w-[620px] desk:rounded-[16px]"
        />
      ) : (
        <Placeholder caption={placeholder ?? ""} className="absolute inset-5 min-h-0 shadow-soft desk:inset-10" />
      )}
      {children}
    </div>
  );
}

// DESIGN-GUIDE.md §8.4, "Tall reports": a slow auto-scroll inside the stage, 20s ease-in-out,
// holding at the top and the bottom, paused on hover or focus. The movement is CSS (globals.css,
// `.report-scroll`); `ReportScrollWindow` runs it only while on screen and makes the window
// focusable, so the keyboard and a tap can pause it too. Before the script, and with reduced
// motion, the report simply shows its top.

export function ScrollingReport({
  image,
  placeholder,
  className,
}: {
  /** A tall report screenshot. */
  image?: ContentImage;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn(stage, "h-[400px] desk:h-[520px]", className)}>
      {image ? (
        <ReportScrollWindow
          // --report-view is the visible height (stage height minus the top inset), which the
          // keyframes need to know how far to scroll: the screen runs off the stage's bottom.
          className="absolute inset-x-5 top-5 h-[var(--report-view)] overflow-hidden rounded-t-md bg-white shadow-float [--report-view:380px] desk:inset-x-14 desk:top-14 desk:rounded-t-[16px] desk:[--report-view:464px]"
        >
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            sizes="(max-width: 900px) 90vw, 560px"
            className="report-scroll-image block h-auto w-full"
          />
        </ReportScrollWindow>
      ) : (
        <Placeholder caption={placeholder ?? ""} className="absolute inset-5 min-h-0 shadow-soft desk:inset-10" />
      )}
    </div>
  );
}
