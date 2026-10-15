import { WhyPanel } from "@/components/blocks/WhyPanel";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { HomeContent } from "@/content/types";

// Home section 8, "Why DEUS" (DESIGN-GUIDE.md §7.17): four panels, two by two. Cloud section, so
// the panels flip to white with a hairline. It comes after the White Enhance spotlight.
export function WhyDeus({ section }: { section: HomeContent["whyDeus"] }) {
  return (
    <Section surface="cloud" aria-labelledby="why-deus-title">
      <Reveal>
        <SectionHeader id="why-deus-title" label={section.eyebrow} title={section.title} />
      </Reveal>
      <Reveal>
        <WhyPanel items={section.items} surface="cloud" />
      </Reveal>
    </Section>
  );
}
