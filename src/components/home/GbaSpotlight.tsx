import { EventLog } from "@/components/blocks/EventLog";
import { GameGrid, GameTile } from "@/components/blocks/GameTile";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/pills";
import { TextLink } from "@/components/ui/text-link";
import { images, missingScreens } from "@/content/images";
import type { HomeContent } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// Home section 6, the assessment spotlight (DESIGN-GUIDE.md §6, §7.14–7.16): the one sky-wash
// section on the page. Four game tiles, one per module, with the event log floating over the first
// (F31: Simulation shows its missing-screen caption until the screenshot arrives), then a two-column note row: the rest of the copy on the left, the follow-up line with its link on the right. The facts and the client story
// card came off in R4 (F5, F6). On phones the log hides (§7.14).
export function GbaSpotlight({ section, locale }: { section: HomeContent["gbaSpotlight"]; locale: Locale }) {
  // The first paragraph is short, so it is the header's centred lede; the rest is body copy longer
  // than three lines, which is never centred (§4.5), so it opens the left-aligned note row.
  const [lede, ...rest] = section.paragraphs;
  return (
    <Section surface="sky-wash" aria-labelledby="gba-spotlight-title">
      <Reveal>
        <SectionHeader
          id="gba-spotlight-title"
          label={section.eyebrow}
          title={section.title}
          lede={lede}
          className="mb-8"
        />
        <ul className="mx-auto mb-[var(--head-gap)] flex max-w-[40em] flex-wrap justify-center gap-2">
          {section.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <GameGrid>
          {section.games.map((game, i) => (
            <GameTile
              key={game.title}
              {...("image" in game
                ? { image: { ...images[game.image], alt: "" } }
                : { placeholder: missingScreens[game.missing][locale] })}
              title={game.title}
              caption={game.caption}
              overlay={i === 0 ? <EventLog title={section.log.title} rows={section.log.rows} /> : undefined}
            />
          ))}
        </GameGrid>
      </Reveal>

      <Reveal className="mt-10 grid items-start gap-5 desk:mt-16 desk:grid-cols-2 desk:gap-16">
        <div className="space-y-5 text-[18px]/[1.65] text-slate">
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div>
          <p className="text-[18px]/[1.65] text-slate">{section.followUp}</p>
          <TextLink href={section.cta.href} className="mt-5 text-ui">
            {section.cta.label}
          </TextLink>
        </div>
      </Reveal>
    </Section>
  );
}
