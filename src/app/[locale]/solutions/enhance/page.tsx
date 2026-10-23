import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProblemGrid, ReviewSteps, RoleCards, SystemsDiagram } from "@/components/enhance/EnhanceBlocks";
import { MilestoneTimeline } from "@/components/blocks/JourneyTimeline";
import { ProductHero } from "@/components/blocks/ProductHero";
import { ReviewToPay } from "@/components/enhance/ReviewToPay";
import { WhereWeHelpTabs } from "@/components/blocks/WhereWeHelpTabs";
import { LeadForm } from "@/components/forms/LeadForm";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Accordion } from "@/components/ui/accordion";
import { BreadcrumbJsonLd } from "@/components/site/BreadcrumbJsonLd";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { Section, type Surface } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TextLink } from "@/components/ui/text-link";
import { enhanceEn } from "@/content/en/enhance";
import { images } from "@/content/images";
import { loadPage } from "@/content/load-page";
import { getPageContent } from "@/content/registry";
import type { SectionIntro } from "@/content/types";
import { type Locale, routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { faqPageJsonLd, softwareApplicationJsonLd } from "@/lib/structured-data";

// DEUS Enhance, the page sales sends first (WEBSITE-PLAN.md §5.6, ENHANCE-PAGE-SPEC.md "Page at a
// glance"). Eleven sections since R16b (F76 cut "From rating to reward", F78 "Is it a fit?");
// "Better together" shows only once Q19 is confirmed (`betterTogether`).
// Everything visible comes from src/content/en/enhance.ts; the screens from src/content/images.ts,
// with TODO placeholders for the ones not sent yet. Every "Book a call" jumps to the booking form
// in the closing panel (#book-a-call, F79); "See how it works" jumps to the steps (#solution).

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

  // The screen for each step: the KPI library, the team table, appraisal dashboard, calibration matrix,
  // talent map, and for step 6 the bonus dashboard (F75).
  const solutionScreens = [
    { image: { ...images.enhanceKpiLibrary, alt: c.screens.kpiLibrary } },
    { image: { ...images.enhanceTeamMembers, alt: c.screens.teamMembers } },
    { image: dashboard },
    { image: calibration },
    { image: { ...images.enhanceTalentMap, alt: c.screens.talentMap } },
    { image: { ...images.enhanceBonusDashboard, alt: c.screens.bonusDashboard } },
  ];
  const solutionLabel = typeof c.solution.title === "string" ? c.solution.title : c.solution.title.join(" ");
  const [kpiStep, appraisalStep, calibrationStep, bonusStep] = c.hero.sequence.steps;
  const heroFrames = [
    { label: kpiStep.label, image: { ...images.enhancePaCycle, alt: kpiStep.alt } },
    { label: appraisalStep.label, image: { ...images.enhancePaDashboard, alt: appraisalStep.alt } },
    { label: calibrationStep.label, image: { ...images.enhanceCalibrationMatrix, alt: calibrationStep.alt } },
    { label: bonusStep.label, image: { ...images.enhanceBonusDashboard, alt: bonusStep.alt } },
  ] as const;
  const next = c.nextStep;
  const header = await getTranslations({ locale, namespace: "Header" });

  return (
    <>
      <Header cta="call" ctaHref={c.hero.primary.href} available={available} />
      <main>
        {/* 1. Hero: the review-to-pay loop (F72), KPI → appraisal → calibration → bonus. */}
        <ProductHero
          eyebrow={c.hero.eyebrow}
          title={c.hero.title}
          lede={c.hero.lede}
          chips={c.hero.chips}
          ctas={[c.hero.primary, c.hero.secondary]}
        >
          <ReviewToPay caption={c.hero.sequence.caption} frames={heroFrames} />
        </ProductHero>

        {/* 2. The problem */}
        <EnhanceSection id="problem" intro={c.problem} surface="cloud">
          <ProblemGrid items={c.problem.items} teaser={c.problem.teaser} teaserHref="#urgency" />
        </EnhanceSection>

        {/* 3. The urgency */}
        <EnhanceSection id="urgency" intro={c.urgency}>
          <RoleCards roles={c.urgency.roles} surface="white" />
        </EnhanceSection>

        {/* 4. The solution: six steps in Home's switcher (F74, F75), every step's text shown without script */}
        <EnhanceSection id="solution" intro={c.solution} surface="cloud">
          <WhereWeHelpTabs
            label={solutionLabel}
            openWithoutScript
            tabs={c.solution.steps.map((step, i) => ({ ...step, ...solutionScreens[i] }))}
          />
        </EnhanceSection>

        {/* 5. Works with what you have (White since R16b, so the surfaces still alternate) */}
        <Section id="systems" aria-labelledby="systems-title">
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

        {/* 6. Supported beyond the platform: the five stages, their dots filling in one by one (F77).
            No numbers (guide §12), the stage names lead, and the lines are left-aligned (§4.5). */}
        <EnhanceSection id="support" intro={c.support} surface="cloud">
          <Reveal>
            <MilestoneTimeline
              label={typeof c.support.title === "string" ? c.support.title : c.support.title.join(" ")}
              milestones={c.support.items.map((item) => ({ year: item.title, label: item.body }))}
              align="start"
              announceCurrent={false}
            />
          </Reveal>
        </EnhanceSection>

        {/* 7. The business outcome: the same five roles, in the same order */}
        <EnhanceSection id="outcome" intro={c.outcome} surface="sky-wash" tight>
          <RoleCards roles={c.outcome.roles} surface="sky-wash" />
        </EnhanceSection>

        {/* 8. Better together: only once Q19 confirms it */}
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

        {/* 9. Next step: the review's two steps, as text (F79); the form is in the closing panel */}
        <Section id="next-step" surface="cloud" tight={!c.betterTogether} aria-labelledby="next-step-title">
          <Reveal className="mx-auto max-w-[760px]">
            <SectionHeader
              id="next-step-title"
              label={next.eyebrow}
              title={next.title}
              lede={next.lede}
              align="left"
              className="mb-8"
            />
            <ReviewSteps steps={next.steps} />
          </Reveal>
        </Section>

        {/* 10. FAQ */}
        <EnhanceSection id="faq" intro={c.faq}>
          <Reveal>
            <Accordion items={c.faq.items} />
          </Reveal>
          <JsonLd data={faqPageJsonLd(c.faq.items)} />
        </EnhanceSection>

        {/* 11. Closer: the two-beat line, then the booking form, WhatsApp and email together (F79) */}
        <ClosingPanel title={c.closing.title} lede={c.closing.lede} whatsapp="enhance" email={next.email}>
          <div id="book-a-call" className="scroll-mt-28 rounded-xl border border-line bg-white p-5 desk:p-10">
            <h3 className="text-h3 text-ink">{next.form.title}</h3>
            <p className="mt-2 text-body-sm text-slate">{next.form.lede}</p>
            <div className="mt-8">
              <LeadForm variant="enhance" enhance={next.form} />
            </div>
          </div>
        </ClosingPanel>
      </main>
      <Footer available={available} />
      <WhatsAppButton context="enhance" />
      <BreadcrumbJsonLd
        locale={locale}
        trail={[
          { name: header("nav.solutions"), path: "/solutions" },
          { name: header("solutionsMenu.items.enhance.title"), path: PATH },
        ]}
      />
      <JsonLd
        data={softwareApplicationJsonLd({
          name: c.hero.eyebrow,
          // the hero's line, not the meta description: every value must be visible on the page
          description: c.hero.lede,
          locale,
          path: PATH,
          // the six step titles of "How Enhance closes each gap". No offers: no price is public.
          featureList: c.solution.steps.map((step) => step.title),
        })}
      />
    </>
  );
}
