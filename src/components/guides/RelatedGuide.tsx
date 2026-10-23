import { useTranslations } from "next-intl";
import { TextLink } from "@/components/ui/text-link";
import { getGuide } from "@/content/guides";
import { cn } from "@/lib/utils";

// G3.4 (SEO/geo-implementation-plan.md §S9): the one "Related guide" line a product or use-case page shows under
// its FAQ, linking to the guide that goes with it. The page names the guide by its slug. Nothing shows while that
// guide isn't registered (unpublished, or `showGuides` is off), so unpublishing a guide removes this line too.
// Guides are English only, so the lookup is English, as for the use-case links (UseCaseLinks).

export function RelatedGuide({ slug, className }: { slug?: string; className?: string }) {
  const t = useTranslations("Guides");
  const guide = slug ? getGuide(slug, "en") : null;
  if (!guide) return null;

  return (
    <p className={cn("mx-auto flex max-w-[800px] flex-wrap items-center gap-x-3 gap-y-2 text-body-sm text-slate", className)}>
      <span>{t("relatedGuide")}</span>
      <TextLink href={`/guides/${guide.slug}`}>{guide.header.title}</TextLink>
    </p>
  );
}
