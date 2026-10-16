import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/pills";
import { Section } from "@/components/ui/section";
import type { AboutContent } from "@/content/types";

// About section 4, vision and mission (Cloud): two side-by-side panels, both always visible
// (WEBSITE-PLAN.md §5.9). White panels with a hairline, as on a Cloud section (§7.17).
export function VisionMission({ section }: { section: AboutContent["visionMission"] }) {
  return (
    <Section surface="cloud" aria-labelledby="vision-mission-label">
      <Reveal className="mb-[var(--head-gap)] text-center">
        {/* The label is the section's heading, so the panels' h3s sit under it in the outline. */}
        <h2>
          <SectionLabel id="vision-mission-label">{section.eyebrow}</SectionLabel>
        </h2>
      </Reveal>
      <ul className="grid gap-5 desk:grid-cols-2">
        {section.items.map((item, i) => (
          <Reveal
            as="li"
            index={i}
            key={item.title}
            className="rounded-lg border border-line bg-white p-7 desk:p-10"
          >
            <h3 className="text-h3 text-ink">{item.title}</h3>
            <p className="mt-4 text-lede-sm text-slate">{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
