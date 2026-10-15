import { Reveal } from "@/components/ui/reveal";
import { LabelPill } from "@/components/ui/pills";
import { Section } from "@/components/ui/section";
import { HeadingLines } from "@/components/ui/section-header";
import type { AboutContent } from "@/content/types";

// About section 3, the mission as one large centred statement (White). The design guide (§3.3)
// forbids accenting part of a headline, so the statement is plain ink: no underline wipe on the
// bold phrase, which about.md's note suggested.
export function MissionStatement({ section }: { section: AboutContent["mission"] }) {
  return (
    <Section aria-labelledby="mission-title">
      <Reveal className="text-center">
        <LabelPill className="mb-5">{section.eyebrow}</LabelPill>
        <h2 id="mission-title" className="mx-auto max-w-[26em] text-h2 text-balance text-ink">
          <HeadingLines lines={section.title} />
        </h2>
      </Reveal>
    </Section>
  );
}
