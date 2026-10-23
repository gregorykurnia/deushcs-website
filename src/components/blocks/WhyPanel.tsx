import {
  ArrowRight,
  Compass,
  FlaskConical,
  Gauge,
  Handshake,
  Lightbulb,
  MapPin,
  Puzzle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// DESIGN-GUIDE.md §7.17. The default for any 2–6 benefits, pillars or values: panels with a
// 24px azure line icon in a 56px white tile, a 22/700 title and a 16px slate line. On a White
// section the panels are Cloud; on a Cloud section they flip to white with a hairline.
// No numbers. Content modules name the icon by key, so they stay plain data.

export const whyIcons = {
  flask: FlaskConical,
  "map-pin": MapPin,
  users: Users,
  refresh: RefreshCw,
  lightbulb: Lightbulb,
  target: Target,
  shield: ShieldCheck,
  sparkles: Sparkles,
  compass: Compass,
  handshake: Handshake,
  gauge: Gauge,
  puzzle: Puzzle,
} as const satisfies Record<string, LucideIcon>;

export type WhyIcon = keyof typeof whyIcons;
/** `href`: a page the whole panel opens (the title is its link). */
export type WhyItem = { icon: WhyIcon; title: string; body: string; href?: string };

export function WhyPanel({
  items,
  surface = "white",
  columns = 2,
  className,
}: {
  items: readonly WhyItem[];
  /** The section's surface; the panels take the other one. */
  surface?: "white" | "cloud";
  /** 2 (2×2, Why DEUS) or 3 (3×2, The 6 I's: two columns from 600 to 900px). */
  columns?: 2 | 3;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-5",
        columns === 2 ? "desk:grid-cols-2" : "min-[600px]:grid-cols-2 desk:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = whyIcons[item.icon];
        return (
          <li
            key={item.title}
            className={cn(
              "grid grid-cols-1 content-start gap-6 rounded-lg p-7",
              item.href && "relative",
              // three across leaves no room beside the icon: keep it above, as on mobile
              columns === 2 && "desk:grid-cols-[56px_1fr] desk:p-10",
              columns === 3 && "desk:p-8",
              surface === "white" ? "bg-cloud" : "border border-line bg-white",
            )}
          >
            <span
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-md border border-line bg-white"
            >
              <Icon className="size-6 text-azure" strokeWidth={1.7} />
            </span>
            <div>
              <h3 className="text-h3-panel text-ink">
                {item.href ? (
                  // the link's ::after stretches over the panel, so the whole card is the target
                  <Link
                    href={item.href}
                    className="group/link after:absolute after:inset-0 after:content-[''] hover:underline hover:underline-offset-3"
                  >
                    {item.title}
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-2 inline size-[17px] align-[-0.1em] text-azure-ink stroke-2 transition-transform duration-150 group-hover/link:translate-x-[3px]"
                    />
                  </Link>
                ) : (
                  item.title
                )}
              </h3>
              <p className="mt-2.5 text-body-sm text-slate">{item.body}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
