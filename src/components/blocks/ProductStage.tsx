import Image from "next/image";
import type { ReactNode } from "react";
import { Placeholder } from "@/components/ui/placeholder";
import type { ContentImage } from "@/content/images";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.10 (the stage tile) and §8.1–8.2. A sky tile with one product screen
// floating at a fixed inset, so it runs off the right edge (never centred with even margins).
// A TODO placeholder stands in until the screenshot exists (§14.3). `children` is for a floating
// result card overlapping the screen's corner.

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
    <div
      className={cn(
        "relative min-h-[340px] overflow-hidden rounded-xl border border-line bg-[image:var(--grad-stage)] desk:min-h-[480px]",
        className,
      )}
    >
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
