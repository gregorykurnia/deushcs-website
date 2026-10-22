import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  FeatureCard,
  FitChecklist,
  HeroScreen,
  ProblemGrid,
  ReviewSteps,
  RewardSteps,
  RoleCards,
  SystemsDiagram,
} from "@/components/enhance/EnhanceBlocks";
import { MilestoneTimeline } from "@/components/blocks/JourneyTimeline";
import { ProductHero } from "@/components/blocks/ProductHero";
import { ScrollSyncedScreen } from "@/components/blocks/ScrollSyncedScreen";
import { LeadForm } from "@/components/forms/LeadForm";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Accordion } from "@/components/ui/accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Rich } from "@/components/ui/rich";
import { Section, type Surface } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TextLink } from "@/components/ui/text-link";
import { enhanceEn } from "@/content/en/enhance";
import { images, missingScreens } from "@/content/images";
import { loadPage } from "@/content/load-page";
import { getPageContent } from "@/content/registry";
import type { SectionIntro } from "@/content/types";
import { type Locale, routing } from "@/i18n/routing";
import { emailHref, whatsappHref } from "@/lib/links";
import { pageMetadata, siteUrl } from "@/lib/metadata";
import { faqPageJsonLd, softwareApplicationJsonLd } from "@/lib/structured-data";

// DEUS Enhance, the page sales sends first (WEBSITE-PLAN.md §5.6, ENHANCE-PAGE-SPEC.md "Page at a
// glance"). Thirteen sections; section 10 shows only once Q19 is confirmed (`betterTogether`).
// Everything visible comes from src/content/en/enhance.ts; the screens from src/content/images.ts,
// with TODO placeholders for the ones not sent yet. The hero's CTA and the fit check jump to the
// form (#next-step); "See how it works" jumps to the steps (#solution).

const PATH = "/solutions/enhance";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/solutions/enhance">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // a locale without this page redirects in the page itself; its metadata falls back to English
  const content = getPageContent("enhance", locale) ?? enhanceEn;
  return pageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    locale: getPageContent("enhance", locale) ? locale : "en",
    path: PATH,
  });
}

/** A section with its centred header; `id` is the in-page anchor and names the region. */
function EnhanceSection({
  id,
  intro,
  surface = "white",
  tight,
  align,
  children,
}: {
  id: string;
  intro: SectionIntro;
  surface?: Surface;
  tight?: boolean;
  /** "left" for a lede longer than three lines, which is never centred (guide §4.5). */
  align?: "center" | "left";
  children: ReactNode;
}) {
  return (
    <Section id={id} surface={surface} tight={tight} aria-labelledby={`${id}-title`}>
      <Reveal>
        <SectionHeader
          id={`${id}-title`}
          label={intro.eyebrow}
          title={intro.title}
          lede={intro.lede}
          align={align}
        />
      </Reveal>
      {children}
    </Section>
  );
}

export default async function EnhancePage({ params }: PageProps<"/[locale]/solutions/enhance">) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: Locale = requested;
  setRequestLocale(locale);
  const { content: c, available } = loadPage("enhance", locale);

  const dashboard = { ...images.enhanceDashboard, alt: c.screens.dashboard };
  const calibration = { ...images.enhanceCalibrationMatrix, alt: c.screens.calibrationMatrix };
  const rewardGrouping = { ...images.enhanceRewardGrouping, alt: c.screens.rewardGrouping };
  const overview = missingScreens.enhanceProductOverview[locale];

  // Spec §4's screen for each step: overview, overview, appraisal dashboard, calibration matrix, talent map.
  const solutionScreens = [
    { placeholder: overview },
    { placeholder: overview },
    { image: dashboard },
    { image: calibration },
    { image: { ...images.enhanceCalibrationMatrix, alt: c.screens.talentMap } },
  ];
  // Spec §5: bonus cycle setup, bonus participants, reward grouping, salary increase dashboard.
  const rewardScreens = [
    { placeholder: missingScreens.enhanceBonusCycleSetup[locale] },
    { placeholder: missingScreens.enhanceBonusParticipants[locale] },
    { image: rewardGrouping },
    { placeholder: missingScreens.enhanceSalaryIncrease[locale] },
  ];
  const next = c.nextStep;
  // The SoftwareApplication's publisher is the legal entity the footer names.
  const footer = await getTranslations({ locale, namespace: "Footer" });

  return (
    <>
      <Header cta="call" ctaHref={c.hero.primary.href} available={available} />
      <main>
        {/* 1. Hero: the two screens on disk float in the sky window. The spec's five-screen
            crossfade waits until the other three screenshots exist. */}
        <ProductHero
          eyebrow={c.hero.eyebrow}
          title={c.hero.title}
          lede={c.hero.lede}
          chips={c.hero.chips}
          ctas={[c.hero.primary, c.hero.secondary]}
        >
          <div className="relative mx-auto grid max-w-[460px] gap-5 desk:max-w-[1000px] desk:grid-cols-[1.5fr_1fr] desk:items-start desk:gap-8">
            <HeroScreen image={calibration} sizes="(max-width: 900px) 90vw, 600px" />
            <HeroScreen image={rewardGrouping} sizes="(max-width: 900px) 90vw, 400px" className="desk:mt-28" />
          </div>
        </ProductHero>

        {/* 2. The problem */}
        <EnhanceSection id="problem" intro={c.problem} surface="cloud">
          <ProblemGrid items={c.problem.items} teaser={c.problem.teaser} teaserHref="#urgency" />
        </EnhanceSection>

        {/* 3. The urgency */}
        <EnhanceSection id="urgency" intro={c.urgency}>
          <RoleCards roles={c.urgency.roles} surface="white" />
        </EnhanceSection>

        {/* 4. The solution: five steps scroll beside the product screen */}
        <EnhanceSection id="solution" intro={c.solution} surface="cloud">
          <ScrollSyncedScreen steps={c.solution.steps.map((step, i) => ({ ...step, ...solutionScreens[i] }))} />
          <FeatureCard item={c.solution.feature} />
        </EnhanceSection>

        {/* 5. From rating to reward */}
        <EnhanceSection id="reward" intro={c.reward} align="left">
          <RewardSteps steps={c.reward.steps.map((step, i) => ({ ...step, ...rewardScreens[i] }))} />
          <Reveal>
            <p className="mx-auto mt-14 max-w-[24em] text-center text-h3 text-balance text-ink desk:mt-20">
              <Rich text={c.reward.closing} />
            </p>
          </Reveal>
        </EnhanceSection>

        {/* 6. Works with what you have */}
        <Section id="systems" surface="cloud" aria-labelledby="systems-title">
          <Reveal className="grid items-center gap-12 desk:grid-cols-2 desk:gap-16">
            <div>
              <SectionHeader
                id="systems-title"
                label={c.systems.eyebrow}
                title={c.systems.title}
                align="left"
                className="mb-8"
              />
              <h3 className="text-h3 text-ink">{c.systems.item.title}</h3>
              <p className="mt-3 max-w-[34em] text-body text-slate">{c.systems.item.body}</p>
            </div>
            <SystemsDiagram sources={c.systems.diagram.sources} hub={c.systems.diagram.hub} />
          </Reveal>
        </Section>

        {/* 7. Supported beyond the platform: the five stages, the last one (ongoing) in ember.
            No numbers (guide §12), the stage names lead, and the lines are left-aligned (§4.5). */}
        <EnhanceSection id="support" intro={c.support}>
          <Reveal>
            <MilestoneTimeline
              label={typeof c.support.title === "string" ? c.support.title : c.support.title.join(" ")}
              milestones={c.support.items.map((item) => ({ year: item.title, label: item.body }))}
              align="start"
              announceCurrent={false}
            />
          </Reveal>
        </EnhanceSection>

        {/* 8. The business outcome: the same five roles, in the same order */}
        <EnhanceSection id="outcome" intro={c.outcome} surface="sky-wash" tight>
          <RoleCards roles={c.outcome.roles} surface="sky-wash" />
        </EnhanceSection>

        {/* 9. Is it a fit? */}
        <EnhanceSection id="fit" intro={c.fit} surface="cloud">
          <FitChecklist checks={c.fit.checks} />
          <Reveal className="mt-10 text-center desk:mt-12">
            <p className="text-lede-sm text-balance text-slate">{c.fit.prompt}</p>
            <TextLink href={c.fit.cta.href} icon="down" className="mt-4">
              {c.fit.cta.label.replace(/\s*↓$/, "")}
            </TextLink>
          </Reveal>
        </EnhanceSection>

        {/* 10. Better together: only once Q19 confirms it */}
        {c.betterTogether && (
          <EnhanceSection id="better-together" intro={c.betterTogether}>
            <Reveal className="text-center">
              <p className="mx-auto max-w-[40em] text-body text-slate">{c.betterTogether.body}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
                {c.betterTogether.links.map((link) => (
                  <TextLink key={link.href} href={link.href}>
                    {link.label.replace(/\s*→$/, "")}
                  </TextLink>
                ))}
              </div>
            </Reveal>
          </EnhanceSection>
        )}

        {/* 11. Next step and the inquiry form */}
        <Section id="next-step" surface="cloud" tight={!c.betterTogether} aria-labelledby="next-step-title">
          <div className="grid gap-12 desk:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] desk:gap-16">
            <Reveal>
              <SectionHeader
                id="next-step-title"
                label={next.eyebrow}
                title={next.title}
                lede={next.lede}
                align="left"
                className="mb-8"
              />
              <ReviewSteps steps={next.steps} />
              <p className="mt-10 text-ui text-slate">
                {next.talkFirst.lead}{" "}
                <TextLink href={whatsappHref("enhance")} variant="inline" icon="none">
                  {next.talkFirst.whatsapp.replace(/\s*↗$/, "")}
                </TextLink>{" "}
                {next.talkFirst.or}{" "}
                <TextLink href={emailHref(next.email)} variant="inline">
                  {next.talkFirst.email.replace(/\s*↗$/, "")}
                </TextLink>
              </p>
              <Placeholder
                caption={missingScreens.enhanceBonusParticipants[locale]}
                className="mt-10 hidden min-h-[220px] rounded-lg desk:flex"
              />
            </Reveal>
            <div className="rounded-xl border border-line bg-white p-6 desk:p-10">
              <h3 className="text-h3 text-ink">{next.form.title}</h3>
              <p className="mt-2 text-body-sm text-slate">{next.form.lede}</p>
              <div className="mt-8">
                <LeadForm variant="enhance" enhance={next.form} />
              </div>
            </div>
          </div>
        </Section>

        {/* 12. FAQ */}
        <EnhanceSection id="faq" intro={c.faq}>
          <Reveal>
            <Accordion items={c.faq.items} />
          </Reveal>
          <JsonLd data={faqPageJsonLd(c.faq.items)} />
        </EnhanceSection>

        {/* 13. Closer: the two-beat line, then the button back to the form */}
        <ClosingPanel
          title={c.closing.title}
          lede={c.closing.lede}
          ctaLabel={c.hero.primary.label}
          ctaHref={c.hero.primary.href}
          whatsapp="enhance"
        />
      </main>
      <Footer available={available} />
      <WhatsAppButton context="enhance" />
      <JsonLd
        data={softwareApplicationJsonLd({
          name: c.hero.eyebrow,
          description: c.meta.description,
          url: new URL(`/${locale}${PATH}`, siteUrl()).toString(),
          publisher: footer("legalEntity"),
        })}
      />
    </>
  );
}
