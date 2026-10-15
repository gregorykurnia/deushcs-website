import { WhyPanel } from "@/components/blocks/WhyPanel";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { AboutContent } from "@/content/types";

// About section 5, the 6 I's (White): a 3×2 grid of values in Cloud panels (two columns from 600
// to 900px, one below). The one new layout in this page is only the column count of WhyPanel.
export function AboutValues({ section }: { section: AboutContent["values"] }) {
  return (
    <Section aria-labelledby="values-title">
      <Reveal>
        <SectionHeader id="values-title" label={section.eyebrow} title={section.title} lede={section.lede} />
      </Reveal>
      <Reveal>
        <WhyPanel items={section.items} columns={3} />
      </Reveal>
    </Section>
  );
}
