import { EventLog } from "@/components/blocks/EventLog";
import { GameGrid, GameTile } from "@/components/blocks/GameTile";
import { LinkCard } from "@/components/blocks/LinkCard";
import { StatTiles } from "@/components/blocks/StatReadout";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/pills";
import { TextLink } from "@/components/ui/text-link";
import { images } from "@/content/images";
import type { HomeContent } from "@/content/types";

// Home section 6, the assessment spotlight (DESIGN-GUIDE.md §6, §7.14–7.16): the one sky-wash
// section on the page. Three game tiles with the event log floating over the first, then a note
// row: the rest of the copy, the follow-up line and link beside two short facts, then the Telkom
// link card (Task 4.4). On phones the log hides (§7.14).
export function GbaSpotlight({ section }: { section: HomeContent["gbaSpotlight"] }) {
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
              image={{ ...images[game.image], alt: "" }}
              title={game.title}
              caption={game.caption}
              overlay={i === 0 ? <EventLog title={section.log.title} rows={section.log.rows} /> : undefined}
            />
          ))}
        </GameGrid>
      </Reveal>

      <Reveal className="mt-10 grid items-center gap-8 desk:mt-16 desk:grid-cols-2 desk:gap-16">
        <div>
          <div className="space-y-5 text-[18px]/[1.65] text-slate">
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>{section.followUp}</p>
          </div>
          <TextLink href={section.cta.href} className="mt-5 text-ui">
            {section.cta.label}
          </TextLink>
        </div>
        <StatTiles items={section.facts} />
      </Reveal>

      <Reveal className="mt-10 desk:mt-14">
        <LinkCard line={section.clientStory.line} href={section.clientStory.href} surface="white" />
      </Reveal>
    </Section>
  );
}
