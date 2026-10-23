import { useTranslations } from "next-intl";
import { TextLink } from "@/components/ui/text-link";
import { getUseCase } from "@/content/use-cases";
import { cn } from "@/lib/utils";

// G2.4 (SEO/geo-implementation-plan.md §S8): a row of links into the use-case pages, under a product tile,
// a story or a section. Each link is the page's breadcrumb name. A page that isn't registered (while
// `showUseCases` is off) leaves its link out, and a row with none renders nothing. The pages exist in
// English only, so the lookup is English: another language's link reaches the page by its redirect.
export function UseCaseLinks({
  slugs,
  align = "center",
  className,
}: {
  slugs: readonly string[];
  align?: "start" | "center";
  className?: string;
}) {
  const t = useTranslations("UseCaseLinks");
  const pages = slugs.flatMap((slug) => {
    const page = getUseCase(slug, "en");
    return page ? [page] : [];
  });
  if (pages.length === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-6 gap-y-2",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      <span className="text-label font-bold text-ink">{t("label")}</span>
      {pages.map((page) => (
        <TextLink key={page.slug} href={`/solutions/${page.slug}`}>
          {page.breadcrumb}
        </TextLink>
      ))}
    </div>
  );
}
