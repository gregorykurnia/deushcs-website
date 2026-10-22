import { WhereWeHelpTabs, type ShowcaseTab } from "@/components/blocks/WhereWeHelpTabs";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { images, missingScreens } from "@/content/images";
import type { HomeContent, StageContent } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// Home section 4, "From hire to reward" (WEBSITE-PLAN.md §5.1, DESIGN-GUIDE.md §7.10, §9.2):
// the three stages as tabs, each swapping the product screen on the stage beside it.
// White, like the hero before it (§6.1).
function toTab(stage: StageContent, locale: Locale): ShowcaseTab {
  const { screen } = stage;
  return {
    title: stage.title,
    body: stage.body,
    result: stage.result,
    ...("image" in screen
      ? { image: { ...images[screen.image], alt: screen.alt } }
      : { placeholder: missingScreens[screen.missing][locale] }),
  };
}

export function HireToReward({
  section,
  locale,
}: {
  section: HomeContent["hireToReward"];
  locale: Locale;
}) {
  const title = typeof section.title === "string" ? section.title : section.title.join(" ");

  return (
    <Section aria-labelledby="hire-to-reward-title">
      <SectionHeader id="hire-to-reward-title" label={section.eyebrow} title={section.title} />
      <WhereWeHelpTabs label={title} tabs={section.stages.map((stage) => toTab(stage, locale))} />
    </Section>
  );
}
