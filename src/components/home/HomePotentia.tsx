import { PotentiaBand } from "@/components/blocks/PotentiaBand";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { images } from "@/content/images";
import type { HomeContent } from "@/content/types";

// Home's Potentia band (DESIGN-GUIDE.md §2.3, §7.11): one warm panel in the content width, in
// Indonesian on both locales (`lang="id"`). Its link opens deuspotentia.com in a new tab. It follows
// the Enhance spotlight (F9), a second White section, so it takes the tight top.
export function HomePotentia({ section }: { section: HomeContent["potentia"] }) {
  const title = typeof section.title === "string" ? section.title : section.title.join(" ");

  return (
    <Section tight aria-labelledby="potentia-title">
      <Reveal>
        <PotentiaBand
          eyebrow={section.eyebrow}
          title={title}
          body={section.body}
          link={section.link}
          lang={section.lang}
          titleId="potentia-title"
          art={{
            phone: { ...images.potentiaPhone, alt: "" },
            report: { ...images.potentiaReport, alt: "" },
          }}
        />
      </Reveal>
    </Section>
  );
}
