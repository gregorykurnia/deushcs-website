import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/site/BreadcrumbJsonLd";
import { ContactHero, ContactSide } from "@/components/contact/ContactBlocks";
import { LeadForm } from "@/components/forms/LeadForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { contactEn } from "@/content/en/contact";
import { siteFlags } from "@/content/flags";
import { loadPage } from "@/content/load-page";
import { getPageContent } from "@/content/registry";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

// Contact (WEBSITE-PLAN.md §5.10): a short hero, the contact form beside the other ways to reach
// DEUS, and the Potentia note. No closing panel and no floating WhatsApp button: the page is the
// call to action (guide §7.18, §7.26). Everything visible comes from src/content/en/contact.ts and
// messages `ContactForm`. `?product=` preselects the form's product; LeadForm reads it from the URL
// after hydration, so the page stays static and the form still posts without script.

const PATH = "/contact";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this page redirects in the page itself; its metadata falls back to English
  const content = getPageContent("contact", locale) ?? contactEn;
  const metadata = pageMetadata({
    title: null,
    description: content.meta.description,
    locale: getPageContent("contact", locale) ? locale : "en",
    path: PATH,
  });
  // contact.md's SEO title already names DEUS, so it is the whole title, as Home's is (owner's
  // decision after the Phase 1 review: no second brand suffix)
  return {
    ...metadata,
    title: { absolute: content.meta.title },
    openGraph: { ...metadata.openGraph, title: content.meta.title },
  };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "Header" });
  const { content: c, available } = loadPage("contact", locale);

  return (
    <>
      <Header available={available} />
      <main>
        <ContactHero hero={c.hero} />
        <Section surface="cloud" tight>
          <div className="grid gap-8 desk:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] desk:gap-12">
            <Reveal className="rounded-xl border border-line bg-white p-6 desk:p-10">
              <LeadForm variant="contact" />
            </Reveal>
            <Reveal>
              <ContactSide ways={c.ways} potentia={c.potentia} showAddress={siteFlags.showAddress} />
            </Reveal>
          </div>
        </Section>
      </main>
      <Footer available={available} />
      <BreadcrumbJsonLd locale={locale} trail={[{ name: nav("nav.contact"), path: "/contact" }]} />
    </>
  );
}
