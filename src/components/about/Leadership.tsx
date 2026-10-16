import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/pills";
import { Section } from "@/components/ui/section";
import type { AboutContent } from "@/content/types";

// About section 8, leadership (White). Q10: the page renders it only while `showLeadership` is on,
// and the owner turns that on once photos and short bios exist. Until then names and roles are
// text only; a photo slot is added with the bios.
export function Leadership({ section }: { section: AboutContent["leadership"] }) {
  return (
    <Section aria-labelledby="leadership-label">
      <Reveal className="mb-[var(--head-gap)] text-center">
        {/* The label is the section's heading, so the panels' h3s sit under it in the outline. */}
        <h2>
          <SectionLabel id="leadership-label">{section.eyebrow}</SectionLabel>
        </h2>
      </Reveal>
      <ul className="flex flex-wrap justify-center gap-5">
        {section.people.map((person) => (
          <Reveal
            as="li"
            key={person.name}
            className="w-full rounded-lg bg-cloud p-7 text-center min-[600px]:w-[calc(50%-10px)] desk:w-[calc((100%-40px)/3)]"
          >
            <h3 className="text-h3-panel text-ink">{person.name}</h3>
            <p className="mt-2 text-body-sm text-slate">{person.role}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
