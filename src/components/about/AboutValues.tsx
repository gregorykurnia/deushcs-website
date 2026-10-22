import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { AboutContent } from "@/content/types";

// About section 4, the 6 I's (Cloud, F90): a plain list on the section's background, no panels, so
// nothing looks clickable. Each value is its letter (azure, decorative: the name starts with it),
// the value and one line, over a hairline. Three columns, two from 600 to 900px, one below.
export function AboutValues({ section }: { section: AboutContent["values"] }) {
  return (
    <Section surface="cloud" aria-labelledby="values-title">
      <Reveal>
        <SectionHeader id="values-title" label={section.eyebrow} title={section.title} lede={section.lede} />
      </Reveal>
      <Reveal>
        <ul className="grid gap-x-10 gap-y-8 min-[600px]:grid-cols-2 desk:grid-cols-3">
          {section.items.map((item) => (
            <li key={item.title} className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line pt-6">
              <span aria-hidden="true" className="text-h2 leading-[0.9] text-azure">
                {item.title.charAt(0)}
              </span>
              <div>
                <h3 className="text-title text-ink">{item.title}</h3>
                <p className="mt-2 text-body text-slate">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
