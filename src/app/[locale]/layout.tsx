import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { routing } from "@/i18n/routing";
import { robotsMeta, SITE_NAME, siteUrl } from "@/lib/metadata";
import "@/styles/tokens.css";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// Defaults for every page, including 404 and error: the site name as the title, and `noindex`
// until launch. Pages override the title and description with pageMetadata() (src/lib/metadata.ts).
export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: SITE_NAME,
  robots: robotsMeta(),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
