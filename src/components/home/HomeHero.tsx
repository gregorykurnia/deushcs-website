import { AppraisalCard, PlayCard, ProfileCard } from "@/components/blocks/DataCards";
import { JourneyTimeline } from "@/components/blocks/JourneyTimeline";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeadingLines } from "@/components/ui/section-header";
import { images } from "@/content/images";
import type { HomeContent } from "@/content/types";
import { Link } from "@/i18n/navigation";

// Home section 1 (DESIGN-GUIDE.md §4.2, §6.2, §7.12): the centred headline, lede and two
// buttons, then the sky window with one person's journey. The hero glow sits behind the
// transparent sticky header too, so it starts a header-height above the section; the section
// clips it sideways only (`overflow-x: clip` keeps the header sticky and the glow's top visible).
// Headline, lede and buttons never animate (§9.2: never delay the LCP text).
export function HomeHero({ hero }: { hero: HomeContent["hero"] }) {
  const { journey } = hero;

  return (
    <section aria-labelledby="home-hero-title" className="relative isolate overflow-x-clip pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[calc(-340px-var(--header-h))] left-1/2 -z-10 h-[1100px] w-[1700px] -translate-x-1/2 bg-[image:var(--grad-hero-glow)]"
      />

      <Container className="text-center">
        <h1 id="home-hero-title" className="mx-auto max-w-[11em] text-display text-ink">
          <HeadingLines lines={hero.title} />
        </h1>
        <p className="mx-auto mt-7 max-w-[34em] text-lede text-balance text-slate">{hero.lede}</p>
        <div className="mt-10 flex flex-col items-center gap-3 desk:flex-row desk:justify-center">
          {hero.ctas.map((cta, i) => (
            <Button key={cta.href} asChild variant={i === 0 ? "primary" : "secondary"}>
              {/* "#solutions" jumps within the page; next-intl's Link is for locale paths. */}
              {cta.href.startsWith("#") ? <a href={cta.href}>{cta.label}</a> : <Link href={cta.href}>{cta.label}</Link>}
            </Button>
          ))}
        </div>
      </Container>

      <JourneyTimeline
        className="mt-16"
        caption={journey.caption}
        label={journey.label}
        steps={[
          {
            when: journey.play.when,
            // The title beside the screenshot says what it shows.
            card: <PlayCard image={{ ...images.gbaStory, alt: "" }} title={journey.play.title} meta={journey.play.meta} />,
          },
          { when: journey.profile.when, card: <ProfileCard {...journey.profile} /> },
          { when: journey.appraisal.when, card: <AppraisalCard {...journey.appraisal} /> },
        ]}
      />
    </section>
  );
}
