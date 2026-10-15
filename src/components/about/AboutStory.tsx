import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { AboutContent } from "@/content/types";

// About section 2, "Our story" (Cloud): article text, so the header is left-aligned (§7.8) and sits
// beside the three paragraphs on desktop, above them on a phone. The paragraphs are in the reading width.
export function AboutStory({ section }: { section: AboutContent["story"] }) {
  return (
    <Section surface="cloud" aria-labelledby="story-title">
      <div className="grid gap-10 desk:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] desk:gap-20">
        <Reveal>
          <SectionHeader
            id="story-title"
            label={section.eyebrow}
            title={section.title}
            align="left"
            className="mb-0"
          />
        </Reveal>
        <Reveal className="space-y-5 text-lede-sm text-slate">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
