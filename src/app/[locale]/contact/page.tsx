import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactSideColumn } from "@/components/contact/ContactSideColumn";
import { LeadForm } from "@/components/forms/LeadForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Section } from "@/components/ui/section";
import { contactEn } from "@/content/en/contact";
import { siteFlags } from "@/content/flags";
import { loadPage } from "@/content/load-page";
import { getPageContent } from "@/content/registry";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// Contact (WEBSITE-PLAN.md §5.10, Task 1.7): the lead form beside the other ways to reach us. The
// page is the call to action, so it has no closing panel and no floating WhatsApp button. English
// only for now: loadPage sends the other locales to this page. The route stays static; the product
// preselect (`?product=`) is read from the URL by LeadForm, after hydration.

const PATH = "/contact";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this page redirects in the page itself; its metadata falls back to English
  const content = getPageContent("contact", locale) ?? contactEn;
  return pageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: getPageContent("contact", locale) ? locale : "en",
    path: PATH,
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { content: c, available } = loadPage("contact", locale);
  // The office address stays out until the owner confirms it (Q9): both the flag and the content must be set.
  const office = siteFlags.showAddress ? c.office : undefined;

  return (
    <>
      <Header available={available} />
      <main>
        <ContactHero hero={c.hero} />
        <Section tight surface="cloud">
          <div className="grid gap-12 desk:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] desk:gap-16">
            <div className="rounded-xl border border-line bg-white p-6 desk:p-10">
              <LeadForm variant="contact" />
            </div>
            <ContactSideColumn ways={c.ways} potentia={c.potentia} office={office} />
          </div>
        </Section>
      </main>
      <Footer available={available} />
    </>
  );
}
