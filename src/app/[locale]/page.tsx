import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { routing } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Scaffold");

  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
      </main>
      <ClosingPanel />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
