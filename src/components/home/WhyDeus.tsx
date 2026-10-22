import { WhyPanel } from "@/components/blocks/WhyPanel";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { HomeContent } from "@/content/types";

// Home's "Why DEUS" (DESIGN-GUIDE.md §7.17): four panels, two by two. White section with Cloud
// panels, since it follows the Cloud solutions section (R14a cut the spotlights between them).
export function WhyDeus({ section }: { section: HomeContent["whyDeus"] }) {
  return (
    <Section aria-labelledby="why-deus-title">
      <Reveal>
        <SectionHeader id="why-deus-title" label={section.eyebrow} title={section.title} />
      </Reveal>
      <Reveal>
        <WhyPanel items={section.items} />
      </Reveal>
    </Section>
  );
}
