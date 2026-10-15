import { Container } from "@/components/ui/container";
import { LabelPill } from "@/components/ui/pills";
import { HeadingLines } from "@/components/ui/section-header";
import type { SectionIntro } from "@/content/types";

// Contact section 1 (WEBSITE-PLAN.md §5.10): a short, centred hero with no sky window, the same shape
// as SolutionsHero: label pill, headline and lede. It pulls up under the transparent header, and the
// form section below starts with the tight top padding, so the glow sits behind both.
export function ContactHero({ hero }: { hero: SectionIntro }) {
  return (
    <section
      aria-labelledby="contact-hero-title"
      className="relative isolate overflow-x-clip -mt-[84px] pt-[156px] max-[479px]:-mt-[68px] max-[479px]:pt-[140px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-340px] left-1/2 -z-10 h-[1100px] w-[1700px] -translate-x-1/2 bg-[image:var(--grad-hero-glow)]"
      />
      <Container className="text-center">
        <LabelPill className="mb-6">{hero.eyebrow}</LabelPill>
        <h1 id="contact-hero-title" className="mx-auto max-w-[14em] text-display text-balance text-ink">
          <HeadingLines lines={hero.title} />
        </h1>
        {hero.lede && <p className="mx-auto mt-7 max-w-[36em] text-lede text-balance text-slate">{hero.lede}</p>}
      </Container>
    </section>
  );
}
