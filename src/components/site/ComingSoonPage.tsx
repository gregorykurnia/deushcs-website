import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { solutionsHref } from "@/components/site/nav";
import { StatusPanel } from "@/components/site/StatusPanel";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/metadata";

// Task 2.6: the page for a route that isn't built yet. Home links to four such routes (clients,
// contact, Enhance and privacy); each route file renders this and passes its own path to the metadata.
// The panel is the 404 one (DESIGN-GUIDE.md §7.27). Copy: messages/*.json, key ComingSoon. English only
// for now, so every other locale redirects to the English page before this renders.
export function ComingSoonPage() {
  const t = useTranslations("ComingSoon");
  return (
    <>
      <Header available={["en"]} />
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
      <Footer available={["en"]} />
    </>
  );
}

// "Coming soon | DEUS Human Capital Services", noindex like every page until launch (pageMetadata).
export async function comingSoonMetadata(path: string): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "ComingSoon" });
  return pageMetadata({ title: t("label"), description: t("lede"), locale: "en", path });
}
