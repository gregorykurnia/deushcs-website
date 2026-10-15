import { Rich } from "@/components/ui/rich";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { HomeContent } from "@/content/types";

// Home section 3, "Why DEUS exists": the problem in three short paragraphs under a centred
// header, in the reading width. Cloud, between the proof row and "From hire to reward" (White).
// The last paragraph is the company's one bold line; `Rich` renders its **bold**.
export function WhyWeExist({ section }: { section: HomeContent["why"] }) {
  return (
    <Section surface="cloud" aria-labelledby="why-exists-title">
      <SectionHeader id="why-exists-title" label={section.eyebrow} title={section.title} />
      <div className="mx-auto max-w-[36em] space-y-5 text-center text-lede-sm text-balance text-slate">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <Rich text={paragraph} />
          </p>
        ))}
      </div>
    </Section>
  );
}
