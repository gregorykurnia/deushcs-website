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
  /** A report screenshot: a tall one scrolls, a wide one fits the stage. */
  image?: ContentImage;
  placeholder?: string;
  className?: string;
}) {
  // A screenshot under 1.3 times as tall as it is wide is shorter than the window at full width,
  // in every layout that uses one, so it would leave white space under it: the stage takes its
  // height instead, and nothing scrolls.
  if (image && image.height / image.width < 1.3) {
    return (
      <div className={cn(stage, "flex flex-col justify-end px-5 pt-5 desk:px-14 desk:pt-14", className)}>
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes="(max-width: 900px) 90vw, 560px"
          className="block h-auto w-full rounded-t-md shadow-float desk:rounded-t-[16px]"
        />
      </div>
    );
  }
  return (
    <div className={cn(stage, "h-[400px] desk:h-[520px]", className)}>
      {image ? (
        <ReportScrollWindow
          // The window runs from the top inset off the stage's bottom, so its height follows the
          // stage's. --report-view is that height (100cqh of the window, a size container), which
          // the keyframes need to know how far to scroll.
          className="absolute inset-x-5 top-5 bottom-0 overflow-hidden rounded-t-md bg-white shadow-float [container-type:size] [--report-view:100cqh] desk:inset-x-14 desk:top-14 desk:rounded-t-[16px]"
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
