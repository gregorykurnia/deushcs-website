import { useTranslations } from "next-intl";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { StatusPanel } from "@/components/site/StatusPanel";
import { solutionsHref } from "@/components/site/nav";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

// DESIGN-GUIDE.md §7.27. Shown for notFound() in any page and for unknown paths under a locale
// (the [...rest] route). Header and footer as normal.
export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <>
      <Header />
      <main className="flex-1">
        <StatusPanel
          label={t("label")}
          title={t("title")}
          lede={t("lede")}
          actions={
            <>
              <Button asChild>
                <Link href="/">{t("home")}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={solutionsHref}>{t("solutions")}</Link>
              </Button>
            </>
          }
        />
      </main>
      <Footer />
    </>
  );
}
