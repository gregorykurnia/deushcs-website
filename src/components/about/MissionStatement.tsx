import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/pills";
import { Section } from "@/components/ui/section";
import type { AboutContent } from "@/content/types";

// About section 3, mission and vision as two equal halves (White, D4, F125 and F126): side by side
// from 901px, stacked on a phone, divided by a hairline. Each is a small label (its h2) over its
// official sentence at the lede size in ink, left-aligned, so neither outranks the other. Neither
// sentence is a heading: the guide forbids a long sentence as a display heading (§7.32).
export function MissionStatement({ section }: { section: AboutContent["mission"] }) {
  return (
    <Section aria-labelledby="mission-title vision-title">
      <Reveal className="grid desk:grid-cols-2">
        <Half id="mission-title" label={section.eyebrow} body={section.title} className="pb-10 desk:pr-14 desk:pb-0" />
        <Half
          id="vision-title"
          label={section.vision.eyebrow}
          body={section.vision.body}
          className="border-t border-line pt-10 desk:border-t-0 desk:border-l desk:pt-0 desk:pl-14"
        />
      </Reveal>
    </Section>
  );
}

function Half({ id, label, body, className }: { id: string; label: string; body: string; className: string }) {
  return (
    <div className={className}>
      <h2 id={id}>
        <SectionLabel>{label}</SectionLabel>
      </h2>
      <p className="mt-5 max-w-[34em] text-lede text-balance text-ink">{body}</p>
    </div>
  );
}
