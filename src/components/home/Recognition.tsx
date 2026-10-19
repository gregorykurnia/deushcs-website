import { LogoMark } from "@/components/blocks/LogoWall";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { HomeContent } from "@/content/types";

// Home section 9, recognition (F7): a logo strip of Cloud panels on a White section, one even row on
// desktop and one column below it. Each panel has a fixed-height logo area (a white tile, so logos
// sit on white like the Why DEUS icon tiles, §7.17) and a one-line caption.
// Logos follow the logo wall's one-colour rule (§7.20), drawn larger. A slot without its logo file
// shows the name as text in the same area, so the strip never shows an empty frame. Not links.
export function Recognition({ section }: { section: HomeContent["recognition"] }) {
  return (
    <Section aria-labelledby="recognition-title">
      <Reveal>
        <SectionHeader id="recognition-title" label={section.eyebrow} title={section.title} />
      </Reveal>
      <Reveal>
        <ul className="mx-auto grid max-w-[560px] gap-5 desk:max-w-none desk:auto-cols-fr desk:grid-flow-col">
          {section.items.map((item) => (
            <li
              key={item.name}
              className="flex flex-col items-center rounded-lg bg-cloud p-5 pb-7 text-center desk:p-6 desk:pb-8"
            >
              <h3 className="flex h-24 w-full items-center justify-center rounded-md border border-line bg-white px-6 text-[17px]/[1.25] font-semibold tracking-[-0.01em] text-balance text-slate desk:h-28 desk:text-[19px]">
                {item.logo ? (
                  <LogoMark name={item.name} image={item.logo} className="h-10 max-h-10 max-w-[200px]" />
                ) : (
                  item.name
                )}
              </h3>
              <p className="mt-6 px-2 text-body-sm text-slate">{item.caption}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
