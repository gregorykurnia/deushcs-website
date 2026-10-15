import { ArrowDown, BriefcaseBusiness, Check, Factory, TrendingUp, UserRound, Users } from "lucide-react";
import Image from "next/image";
import { FloatingCard } from "@/components/ui/floating-card";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Rich } from "@/components/ui/rich";
import type { ContentImage } from "@/content/images";
import type { Item } from "@/content/types";
import { cn } from "@/lib/utils";

// The pieces only the Enhance page uses (ENHANCE-PAGE-SPEC.md). Everything visible comes in as
// props from src/content/en/enhance.ts; the page decides the sections and their surfaces.

/** A plain number in a 32px circle (guide §12: never `01`). */
function StepNumber({ n, className }: { n: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-8 place-items-center rounded-full bg-sky-1 text-label/none font-bold text-azure-ink tabular-nums",
        className,
      )}
    >
      {n}
    </span>
  );
}

/** A product screen floating over the hero's sky window (guide §7.12, no device frame). */
export function HeroScreen({
  image,
  sizes,
  className,
}: {
  image: ContentImage;
  sizes: string;
  className?: string;
}) {
  return (
    <FloatingCard shape="play" className={className}>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes={sizes}
        className="block h-auto w-full rounded-[14px]"
      />
    </FloatingCard>
  );
}

/** §2: five numbered problem panels and the teaser that jumps to the solution. The teaser is the
 *  sixth cell, so the grid closes exactly at 3×2 and at 2×3 on a phone. */
export function ProblemGrid({
  items,
  teaser,
  teaserHref,
}: {
  items: readonly Item[];
  teaser: string;
  teaserHref: string;
}) {
  return (
    <ol className="grid grid-cols-2 gap-3 min-[600px]:gap-5 desk:grid-cols-3">
      {items.map((item, i) => (
        <Reveal
          as="li"
          index={i}
          key={item.title}
          className="rounded-lg border border-line bg-white p-5 min-[600px]:p-7 desk:p-9"
        >
          <StepNumber n={i + 1} />
          <h3 className="mt-4 text-title-sm text-ink min-[600px]:text-h3-panel">{item.title}</h3>
          <p className="mt-2 text-body-sm text-slate">{item.body}</p>
        </Reveal>
      ))}
      <li className="flex">
        <a
          href={teaserHref}
          className="flex w-full items-center justify-center rounded-lg bg-sky-1 px-4 py-7 text-center text-title-sm text-ink transition-colors duration-150 hover:bg-sky-2 min-[600px]:px-6 min-[600px]:text-title"
        >
          <span>
            <Rich text={teaser} />
          </span>
        </a>
      </li>
    </ol>
  );
}

// The deck's role icons, in the roles' fixed order: HR, plant & operations, managers, employees,
// senior management & finance. §3 and §8 use the same order and icons (spec §3 "Design note").
const roleIcons = [Users, Factory, BriefcaseBusiness, UserRound, TrendingUp];

/** §3 and §8: one card per role, icon in a tile, the role in azure, then the scenario or outcome. */
export function RoleCards({ roles, surface }: { roles: readonly Item[]; surface: "white" | "sky-wash" }) {
  const onWhite = surface === "white";
  return (
    <ul className="grid gap-4 min-[600px]:grid-cols-2 min-[1100px]:grid-cols-5">
      {roles.map((role, i) => {
        const Icon = roleIcons[i] ?? Users;
        return (
          <Reveal
            as="li"
            index={i}
            key={role.title}
            className={cn(
              "flex flex-col rounded-lg p-6",
              onWhite ? "bg-cloud" : "border border-line bg-white shadow-soft",
            )}
          >
            <span
              aria-hidden="true"
              className={cn("flex size-12 items-center justify-center rounded-md", onWhite ? "bg-white" : "bg-sky-1")}
            >
              <Icon className="size-[22px] text-azure" strokeWidth={1.8} />
            </span>
            <h3 className="mt-5 text-label font-semibold text-azure-ink">{role.title}</h3>
            <p className="mt-2 text-card text-slate">{role.body}</p>
          </Reveal>
        );
      })}
    </ul>
  );
}

/** A small azure check in a sky circle (never ember: it's a tick, not "now"). */
function CheckMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-1", className)}
    >
      <Check className="size-[18px] text-azure" strokeWidth={2.4} />
    </span>
  );
}

/** §4's closing card under the steps: "Turn results into decisions". */
export function FeatureCard({ item }: { item: Item }) {
  return (
    <Reveal className="mx-auto mt-12 flex max-w-[760px] items-start gap-5 rounded-lg border border-line bg-white p-7 desk:mt-16 desk:p-9">
      <CheckMark />
      <div>
        <h3 className="text-h3-panel text-ink">{item.title}</h3>
        <p className="mt-2 text-body-sm text-slate">{item.body}</p>
      </div>
    </Reveal>
  );
}

export type RewardStep = Item & { image?: ContentImage; placeholder?: string };

/** §5: four numbered steps, each with its screen on a small sky tile (or its TODO). */
export function RewardSteps({ steps }: { steps: readonly RewardStep[] }) {
  return (
    <ol className="grid gap-x-6 gap-y-10 min-[600px]:grid-cols-2 desk:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal as="li" index={i} key={step.title}>
          {step.image ? (
            <div className="h-[200px] overflow-hidden rounded-lg border border-line bg-[image:var(--grad-stage)] pt-5 pl-5">
              <Image
                src={step.image.src}
                width={step.image.width}
                height={step.image.height}
                alt={step.image.alt}
                sizes="(max-width: 600px) 130vw, 420px"
                className="block w-[150%] max-w-none rounded-md shadow-float"
              />
            </div>
          ) : (
            <Placeholder caption={step.placeholder ?? ""} className="h-[200px] min-h-0 rounded-lg" />
          )}
          <StepNumber n={i + 1} className="mt-6" />
          <h3 className="mt-3 text-title text-ink">{step.title}</h3>
          <p className="mt-2 text-card text-slate">{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** §6's illustration, drawn in code until there is artwork: the systems flowing into Enhance. */
export function SystemsDiagram({ sources, hub }: { sources: readonly string[]; hub: string }) {
  return (
    <div className="rounded-xl border border-line bg-[image:var(--grad-stage)] p-6 desk:p-10">
      <ul className="grid grid-cols-2 gap-3">
        {sources.map((source) => (
          <li
            key={source}
            className="rounded-md border border-line bg-white px-4 py-3.5 text-center text-ui font-semibold text-ink shadow-soft"
          >
            {source}
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex justify-center py-4">
        <ArrowDown className="size-6 text-azure" strokeWidth={2} />
      </div>
      <p className="rounded-lg bg-ink px-6 py-5 text-center text-title text-white">{hub}</p>
    </div>
  );
}

/** §9: the self-qualifier, one ticked line per check. */
export function FitChecklist({ checks }: { checks: readonly string[] }) {
  return (
    <ul className="mx-auto grid max-w-[760px] gap-3">
      {checks.map((check, i) => (
        <Reveal
          as="li"
          index={i}
          key={check}
          className="flex items-center gap-4 rounded-lg border border-line bg-white px-5 py-4 desk:px-6"
        >
          <CheckMark />
          <p className="text-body text-ink">{check}</p>
        </Reveal>
      ))}
    </ul>
  );
}

/** §11: the review's two steps, numbered in 32px circles (guide §12); the first is ink. */
export function ReviewSteps({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="grid gap-5">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-4">
          <span
            aria-hidden="true"
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full text-label font-semibold tabular-nums",
              i === 0 ? "bg-ink text-white" : "border border-line bg-white text-ink",
            )}
          >
            {i + 1}
          </span>
          <p className="text-body text-slate">{step}</p>
        </li>
      ))}
    </ol>
  );
}
