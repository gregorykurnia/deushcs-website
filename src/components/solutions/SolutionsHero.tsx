import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/pills";
import { HeadingLines } from "@/components/ui/section-header";
import type { SolutionsContent } from "@/content/types";

// Solutions section 1 (WEBSITE-PLAN.md §5.2, DESIGN-GUIDE.md §6.2): a short, centred hero with no
// sky window, the same shape as AboutHero: section label, headline and lede. The section pulls up under
// the transparent header and pads itself back down, so the glow sits behind both. Nothing here
// animates, so the LCP text is never delayed.
export function SolutionsHero({ hero }: { hero: SolutionsContent["hero"] }) {
  return (
    <section
      aria-labelledby="solutions-hero-title"
      className="relative isolate overflow-x-clip -mt-[84px] pt-[156px] pb-[var(--section-y)] max-[479px]:-mt-[68px] max-[479px]:pt-[140px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-340px] left-1/2 -z-10 h-[1100px] w-[1700px] -translate-x-1/2 bg-[image:var(--grad-hero-glow)]"
      />
      <Container className="text-center">
        <SectionLabel className="mb-6">{hero.eyebrow}</SectionLabel>
        <h1 id="solutions-hero-title" className="mx-auto max-w-[11em] text-display text-balance text-ink">
          <HeadingLines lines={hero.title} />
        </h1>
        {hero.lede && <p className="mx-auto mt-7 max-w-[34em] text-lede text-balance text-slate">{hero.lede}</p>}
        {/* G1.7 (GEO §S2): the answer passage, smaller than the lede it follows */}
        {hero.passage && (
          <p className="mx-auto mt-5 max-w-[40em] text-lede-sm text-balance text-slate">{hero.passage}</p>
        )}
      </Container>
    </section>
  );
}
