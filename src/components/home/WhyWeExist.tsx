import { Reveal } from "@/components/ui/reveal";
import { Rich } from "@/components/ui/rich";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { HomeContent } from "@/content/types";

// Home section 3, "Why DEUS exists": the problem in three short paragraphs. Body copy longer than
// three lines is never centred (DESIGN-GUIDE.md §4.5), so the header is left-aligned beside the
// paragraphs on desktop and above them on a phone, the same layout as About's "Our story". Cloud,
// between the proof row and "From hire to reward" (White). The last paragraph is the company's one
// bold line; `Rich` renders its **bold**.
export function WhyWeExist({ section }: { section: HomeContent["why"] }) {
  return (
    <Section surface="cloud" aria-labelledby="why-exists-title">
      <div className="grid gap-10 desk:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] desk:gap-20">
        <Reveal>
          <SectionHeader
            id="why-exists-title"
            label={section.eyebrow}
            title={section.title}
            align="left"
            className="mb-0"
          />
        </Reveal>
        <Reveal className="space-y-5 text-lede-sm text-slate">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <Rich text={paragraph} />
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
