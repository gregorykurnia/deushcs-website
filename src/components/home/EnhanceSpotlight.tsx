import { ProductStage } from "@/components/blocks/ProductStage";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TextLink } from "@/components/ui/text-link";
import { images } from "@/content/images";
import type { HomeContent } from "@/content/types";

// Home section 7, the Enhance spotlight: copy on the left, one product screen on a sky stage on
// the right (DESIGN-GUIDE.md §7.10, §8). It follows the sky wash, whose edges are white, so it
// takes the tight 96px top (§4.2). The mockup has no such section; this one applies the guide's
// header-and-stage recipe (extrapolated).
export function EnhanceSpotlight({ section }: { section: HomeContent["enhanceSpotlight"] }) {
  return (
    <Section tight aria-labelledby="enhance-spotlight-title">
      <Reveal className="grid items-center gap-12 desk:grid-cols-2 desk:gap-16">
        <div>
          <SectionHeader
            id="enhance-spotlight-title"
            label={section.eyebrow}
            title={section.title}
            align="left"
            className="mb-8"
          />
          <div className="max-w-[34em] space-y-5 text-body text-slate">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <TextLink href={section.cta.href} className="mt-6 text-ui">
            {section.cta.label}
          </TextLink>
        </div>
        <ProductStage image={{ ...images[section.screen.image], alt: section.screen.alt }} />
      </Reveal>
    </Section>
  );
}
