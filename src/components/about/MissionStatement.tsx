import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/pills";
import { Section } from "@/components/ui/section";
import { HeadingLines } from "@/components/ui/section-header";
import type { AboutContent } from "@/content/types";

// About section 3, mission and vision in one section (White, D14): the mission as one large centred
// statement, the vision under it at the lede size, after a hairline. The design guide (§3.3) forbids
// accenting part of a headline, so the statement is plain ink.
export function MissionStatement({ section }: { section: AboutContent["mission"] }) {
  return (
    <Section aria-labelledby="mission-title">
      <Reveal className="text-center">
        <SectionLabel className="mb-5">{section.eyebrow}</SectionLabel>
        <h2 id="mission-title" className="mx-auto max-w-[26em] text-h2 text-balance text-ink">
          <HeadingLines lines={section.title} />
        </h2>
        <div className="mx-auto mt-12 max-w-[34em] border-t border-line pt-10 desk:mt-14 desk:pt-12">
          {/* the label is the vision's heading, under the mission's h2 */}
          <h3>
            <SectionLabel>{section.vision.eyebrow}</SectionLabel>
          </h3>
          <p className="mt-4 text-lede text-balance text-ink-2">{section.vision.body}</p>
        </div>
      </Reveal>
    </Section>
  );
}
