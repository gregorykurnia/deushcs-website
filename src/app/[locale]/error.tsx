"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { StatusPanel } from "@/components/site/StatusPanel";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

// DESIGN-GUIDE.md §7.27. The error page uses the 404's panel: "That wasn't supposed to happen."
// with Refresh (re-fetches and re-renders the page) and Go to the homepage.
export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

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
              <Button onClick={() => retry()}>{t("refresh")}</Button>
              <Button asChild variant="secondary">
                <Link href="/">{t("home")}</Link>
              </Button>
            </>
          }
        />
      </main>
      <Footer />
    </>
  );
}
