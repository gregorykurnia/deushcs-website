import Image from "next/image";
import type { CSSProperties } from "react";
import type { ImageAsset } from "@/content/images";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.20. Six columns (three on a phone), each logo in a 56px box, at most 32px
// tall and 140px wide, in one colour. SVG logos are drawn as a slate mask (the CSS way of
// `fill: currentColor` for an image file); raster logos are greyscaled at 70% opacity. No hover
// colour change, and no link unless the logo opens a client story. Never pass a logo that
// hasn't been approved (WEBSITE-PLAN.md Q8): the site shows none until then.

export type Logo = {
  /** The client's name, used as the alt text. */
  name: string;
  image: ImageAsset;
  /** Opens this client's story. */
  href?: string;
};

function LogoMark({ name, image }: Pick<Logo, "name" | "image">) {
  if (image.src.endsWith(".svg")) {
    return (
      <span
        role="img"
        aria-label={name}
        className="block h-8 w-full max-w-[140px] bg-slate mask-contain mask-center mask-no-repeat"
        style={{ maskImage: `url(${image.src})`, WebkitMaskImage: `url(${image.src})` } as CSSProperties}
      />
    );
  }
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={name}
      className="h-auto max-h-8 w-auto max-w-[140px] object-contain opacity-70 grayscale"
    />
  );
}

export function LogoWall({ logos, label, className }: { logos: readonly Logo[]; label?: string; className?: string }) {
  return (
    <ul
      aria-label={label}
      className={cn("grid grid-cols-3 gap-x-6 gap-y-7 desk:grid-cols-6 desk:gap-x-12 desk:gap-y-10", className)}
    >
      {logos.map((logo) => (
        <li key={logo.name} className="flex h-14 items-center justify-center">
          {logo.href ? (
            <Link href={logo.href} className="flex h-14 w-full items-center justify-center rounded-xs">
              <LogoMark {...logo} />
            </Link>
          ) : (
            <LogoMark {...logo} />
          )}
        </li>
      ))}
    </ul>
  );
}
