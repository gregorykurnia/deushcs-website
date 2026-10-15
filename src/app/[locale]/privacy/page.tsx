import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ComingSoonPage, comingSoonMetadata } from "@/components/site/ComingSoonPage";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Task 2.6 placeholder. The privacy policy (Phase 1, Task 1.8) replaces this file.
const PATH = "/privacy";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return comingSoonMetadata(PATH);
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  if (locale !== "en") redirect({ href: PATH, locale: "en" });
  setRequestLocale(locale);
  return <ComingSoonPage />;
}
