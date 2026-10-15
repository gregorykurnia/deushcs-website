import { EventLog } from "@/components/blocks/EventLog";
import { GameGrid, GameTile } from "@/components/blocks/GameTile";
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
// row: the follow-up line and link beside two short facts. On phones the log hides (§7.14).
export function GbaSpotlight({ section }: { section: HomeContent["gbaSpotlight"] }) {
  return (
    <Section surface="sky-wash" aria-labelledby="gba-spotlight-title">
      <Reveal>
        <SectionHeader
          id="gba-spotlight-title"
          label={section.eyebrow}
          title={section.title}
          className="mb-8"
        />
        <div className="mx-auto mb-[var(--head-gap)] max-w-[40em] space-y-5 text-center text-lede-sm text-balance text-slate">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="flex flex-wrap justify-center gap-2 pt-1">
            {section.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        </div>
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
          <p className="text-[18px]/[1.65] text-slate">{section.followUp}</p>
          <TextLink href={section.cta.href} className="mt-5 text-ui">
            {section.cta.label}
          </TextLink>
        </div>
        <StatTiles items={section.facts} />
      </Reveal>
    </Section>
  );
}
