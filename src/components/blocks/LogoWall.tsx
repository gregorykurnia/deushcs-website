import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { ImageAsset } from "@/content/images";
import type { Cta, LogoEntry, LogoGroup } from "@/content/types";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.20. Six columns (three on a phone), one logo per 64px-tall cell. Logos are
// sized by area, not by one height, so a square mark (Boga, Pepper Lunch) holds its own beside a
// long wordmark (JVC Kenwood). Every logo is greyscale at 70%, whatever its file type, so they
// read as one grey. No hover colour change, and no link unless the logo opens a client story.
// Never pass a logo that hasn't been approved (WEBSITE-PLAN.md Q8): the site shows none until then.

export type Logo = LogoEntry;

const LOGO_AREA = 3000; // px² for each logo
const LOGO_MAX_W = 160;
const LOGO_MAX_H = 46;

/** The size a logo is drawn at: the same area for every logo, inside 160×46. */
export function logoSize({ width, height }: Pick<ImageAsset, "width" | "height">) {
  const ratio = width / height;
  let w = Math.min(LOGO_MAX_W, Math.sqrt(LOGO_AREA * ratio));
  let h = w / ratio;
  if (h > LOGO_MAX_H) {
    h = LOGO_MAX_H;
    w = h * ratio;
  }
  return { width: Math.round(w), height: Math.round(h) };
}

/** One logo in one colour. On a phone a wide logo shrinks to its cell, keeping its shape. */
export function LogoMark({ name, image, className }: Pick<Logo, "name" | "image"> & { className?: string }) {
  const size = logoSize(image);
  return (
    <Image
      src={image.src}
      width={size.width}
      height={size.height}
      alt={name}
      unoptimized={image.src.endsWith(".svg")}
      className={cn("block max-w-full object-contain opacity-70 grayscale", className)}
      style={size}
    />
  );
}

export function LogoWall({
  logos,
  label,
  more,
  className,
}: {
  logos: readonly Logo[];
  label?: string;
  /** A last cell linking to the full wall ("See all 40+"). */
  more?: Cta;
  className?: string;
}) {
  return (
    <ul
      aria-label={label}
      className={cn(
        "grid grid-cols-[repeat(3,minmax(0,1fr))] gap-x-5 gap-y-4 desk:grid-cols-[repeat(6,minmax(0,1fr))] desk:gap-x-12 desk:gap-y-6",
        className,
      )}
    >
      {logos.map((logo) => (
        <li key={logo.name} className="flex h-16 items-center justify-center">
          {logo.href ? (
            <Link href={logo.href} className="flex h-16 w-full items-center justify-center rounded-xs">
              <LogoMark {...logo} />
            </Link>
          ) : (
            <LogoMark {...logo} />
          )}
        </li>
      ))}
      {more && (
        <li className="flex h-16 items-center justify-center">
          <Button asChild variant="secondary" size="sm" className="max-desk:px-4 max-desk:text-[14px]">
            <Link href={more.href}>
              {more.label}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </li>
      )}
    </ul>
  );
}

/** The Clients hub's wall: each company's name, then its logos. */
export function LogoGroups({ groups, className }: { groups: readonly LogoGroup[]; className?: string }) {
  return (
    <div className={cn("grid gap-12 desk:gap-14", className)}>
      {groups.map((group) => (
        <div key={group.name}>
          <h3 className="mb-4 text-[14px]/[1.4] font-bold text-slate">{group.name}</h3>
          <LogoWall logos={group.logos} label={group.name} />
        </div>
      ))}
    </div>
  );
}
