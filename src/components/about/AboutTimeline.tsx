import { MilestoneTimeline } from "@/components/blocks/JourneyTimeline";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { AboutContent } from "@/content/types";

// About section 6, "Our journey", 2022 → today (White, tight under the values, which are White
// too): MilestoneTimeline with the ember "now" node on the newest year (guide §7.12).
// `current` in the content says which entry is "now"; the component marks the last one, so the
// content keeps the newest entry last.
export function AboutTimeline({ section }: { section: AboutContent["timeline"] }) {
  return (
    <Section tight aria-labelledby="timeline-title">
      <Reveal>
        <SectionHeader id="timeline-title" label={section.eyebrow} title={section.title} lede={section.lede} />
      </Reveal>
      <Reveal>
        <MilestoneTimeline
          label={section.eyebrow}
          milestones={section.entries.map((entry) => ({
            year: entry.year,
            title: entry.title,
            label: entry.body,
          }))}
        />
      </Reveal>
    </Section>
  );
}
