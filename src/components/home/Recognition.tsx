import { Reveal } from "@/components/ui/reveal";
import { Rich } from "@/components/ui/rich";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { HomeContent } from "@/content/types";

// Home section 9, recognition: four short facts in Cloud panels on a White section (§6, §7.17's
// panel skin), each with the name of the recognition in bold. Plain statements, not links.
export function Recognition({ section }: { section: HomeContent["recognition"] }) {
  return (
    <Section aria-labelledby="recognition-title">
      <Reveal>
        <SectionHeader id="recognition-title" label={section.eyebrow} title={section.title} />
      </Reveal>
      <Reveal>
        <ul className="grid gap-5 min-[600px]:grid-cols-2 desk:grid-cols-4">
          {section.items.map((item) => (
            <li key={item} className="rounded-lg bg-cloud p-7 text-body-sm text-slate">
              <Rich text={item} />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
