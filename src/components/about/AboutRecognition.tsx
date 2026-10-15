import { Reveal } from "@/components/ui/reveal";
import { LabelPill } from "@/components/ui/pills";
import { Rich } from "@/components/ui/rich";
import { Section } from "@/components/ui/section";
import type { AboutContent } from "@/content/types";

// About section 7, recognition and partners (Cloud): plain statements in white panels, the name in
// bold, centred in rows of three so an odd count doesn't leave a gap. Not links. UGM and Agate show only once
// their co-branding flags are on ([VERIFY] in about.md).
export function AboutRecognition({ section }: { section: AboutContent["recognition"] }) {
  return (
    <Section surface="cloud" aria-labelledby="recognition-label">
      <Reveal className="mb-[var(--head-gap)] text-center">
        {/* The pill is the section's heading, so the panels' h3s sit under it in the outline. */}
        <h2>
          <LabelPill id="recognition-label">{section.eyebrow}</LabelPill>
        </h2>
      </Reveal>
      <Reveal>
        <ul className="flex flex-wrap justify-center gap-5">
          {section.items.map((item) => (
            <li
              key={item}
              className="basis-full rounded-lg border border-line bg-white p-7 text-body-sm text-slate min-[600px]:basis-[calc(50%-10px)] desk:basis-[calc((100%-40px)/3)]"
            >
              <Rich text={item} />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
