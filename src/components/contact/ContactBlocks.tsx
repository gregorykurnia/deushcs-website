import { Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { Container } from "@/components/ui/container";
import { LabelPill } from "@/components/ui/pills";
import { HeadingLines } from "@/components/ui/section-header";
import { TextLink } from "@/components/ui/text-link";
import type { ContactContent } from "@/content/types";
import { emailHref, whatsappHref } from "@/lib/links";

// Blocks for /contact (WEBSITE-PLAN.md §5.10). The page is a short hero, then the form beside a
// side column of other ways to reach DEUS and a Potentia note. All copy comes from
// src/content/en/contact.ts; the form's own strings are in messages `ContactForm`.

/** A short, centred hero with no sky window: the same shape as SolutionsHero and AboutHero. */
export function ContactHero({ hero }: { hero: ContactContent["hero"] }) {
  return (
    <section
      aria-labelledby="contact-title"
      className="relative isolate overflow-x-clip -mt-[84px] pt-[156px] pb-[var(--section-y-tight)] max-[479px]:-mt-[68px] max-[479px]:pt-[140px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-340px] left-1/2 -z-10 h-[1100px] w-[1700px] -translate-x-1/2 bg-[image:var(--grad-hero-glow)]"
      />
      <Container className="text-center">
        {hero.eyebrow && <LabelPill className="mb-6">{hero.eyebrow}</LabelPill>}
        <h1 id="contact-title" className="mx-auto max-w-[14em] text-display text-balance text-ink">
          <HeadingLines lines={hero.title} />
        </h1>
        {hero.lede && <p className="mx-auto mt-7 max-w-[36em] text-lede text-balance text-slate">{hero.lede}</p>}
      </Container>
    </section>
  );
}

/** One way to reach DEUS: a white card with a small ink icon, the label, the value and a link. */
function WayCard({
  icon,
  label,
  value,
  children,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  children?: ReactNode;
}) {
  return (
    <li className="flex gap-4 rounded-lg border border-line bg-white p-6">
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-pill bg-cloud text-ink [&>svg]:size-5"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-label/[1.4] font-semibold text-slate">{label}</p>
        <p className="mt-1 text-h3-panel break-words text-ink">{value}</p>
        {children && <p className="mt-3 text-ui">{children}</p>}
      </div>
    </li>
  );
}

/**
 * The side column. The address card shows only while `showAddress` is on (Q9) and the content has
 * one; the Potentia note is a small warm tile, the only warm thing on the page (guide §2.3).
 */
export function ContactSide({
  ways,
  potentia,
  showAddress,
}: {
  ways: ContactContent["ways"];
  potentia: ContactContent["potentia"];
  showAddress: boolean;
}) {
  return (
    <div className="grid content-start gap-5">
      <ul className="grid gap-5">
        <WayCard icon={<WhatsAppIcon />} label={ways.whatsapp.label} value={ways.whatsapp.value}>
          <TextLink href={whatsappHref("default")} variant="inline" icon="none">
            {ways.whatsapp.cta}
          </TextLink>
        </WayCard>
        <WayCard icon={<Mail />} label={ways.email.label} value={ways.email.value}>
          <TextLink href={emailHref()} variant="inline">
            {ways.email.cta}
          </TextLink>
        </WayCard>
        {showAddress && ways.address && (
          <WayCard icon={<MapPin />} label={ways.address.label} value={ways.address.value} />
        )}
      </ul>
      <div className="flex flex-col rounded-lg border border-warm-line bg-[image:var(--grad-warm)] p-6">
        <p className="text-body-sm text-warm-text">{potentia.body}</p>
        <TextLink href={potentia.cta.href} tone="warm" className="mt-4 self-start text-ui">
          {potentia.cta.label.replace(/\s*↗$/, "")}
        </TextLink>
      </div>
    </div>
  );
}
