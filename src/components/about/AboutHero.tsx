import { SectionLabel } from "@/components/ui/pills";
import { Container } from "@/components/ui/container";
import { HeadingLines } from "@/components/ui/section-header";
import type { AboutContent } from "@/content/types";

// About section 1 (WEBSITE-PLAN.md §5.9, DESIGN-GUIDE.md §6.2): a short, centred hero with no sky
// window: section label, headline and the About paragraph. The section pulls up under the transparent
// header and pads itself back down (as ProductHero does), so the glow sits behind both.
// The headline is a long sentence (55 characters), so it takes the closing size, the guide's size for
// long page H1s, and a 16em measure: two lines from 1024px (F124, D8), up to four on a phone.
// Nothing here animates, so the LCP text is never delayed.
export function AboutHero({ hero }: { hero: AboutContent["hero"] }) {
  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative isolate overflow-x-clip -mt-[84px] pt-[156px] pb-[var(--section-y)] max-[479px]:-mt-[68px] max-[479px]:pt-[140px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-340px] left-1/2 -z-10 h-[1100px] w-[1700px] -translate-x-1/2 bg-[image:var(--grad-hero-glow)]"
      />
      <Container className="text-center">
        <SectionLabel className="mb-6">{hero.eyebrow}</SectionLabel>
        <h1 id="about-hero-title" className="mx-auto max-w-[16em] text-closing text-balance text-ink">
          <HeadingLines lines={hero.title} />
        </h1>
        {hero.lede && <p className="mx-auto mt-7 max-w-[34em] text-lede text-balance text-slate">{hero.lede}</p>}
      </Container>
    </section>
  );
}
