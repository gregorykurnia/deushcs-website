import { Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { Container } from "@/components/ui/container";
import { LabelPill } from "@/components/ui/pills";
import { Rich } from "@/components/ui/rich";
import { TextLink } from "@/components/ui/text-link";
import type { PrivacyContent } from "@/content/types";
import { emailHref, whatsappHref } from "@/lib/links";

// The privacy policy (WEBSITE-PLAN.md §5.11): one left-aligned article in the 720px reading column
// (DESIGN-GUIDE.md §4.4), with article-size H2s (§3.2). All copy comes from src/content/en/privacy.ts.

export function PrivacyArticle({ content: c }: { content: PrivacyContent }) {
  return (
    <article aria-labelledby="privacy-title" className="py-[var(--section-y)]">
      <Container size="article">
        <header>
          <LabelPill className="mb-6">{c.eyebrow}</LabelPill>
          <h1 id="privacy-title" className="text-closing text-ink">
            {c.title}
          </h1>
          <p className="mt-4 text-label text-slate">{c.updated}</p>
          {c.intro.map((p) => (
            <p key={p} className="mt-6 text-lede text-slate">
              <Rich text={p} />
            </p>
          ))}
        </header>

        {c.sections.map((s) => (
          <section key={s.id} aria-labelledby={s.id} className="mt-14 desk:mt-16">
            <h2 id={s.id} className="scroll-mt-28 text-h2-article text-ink">
              {s.title}
            </h2>
            <div className="mt-5 grid gap-4 text-body text-slate">
              {s.body?.map((p) => (
                <p key={p}>
                  <Rich text={p} />
                </p>
              ))}
              {s.points && (
                <ul className="grid list-disc gap-2 pl-6 marker:text-slate-2">
                  {s.points.map((point) => (
                    <li key={point} className="pl-1">
                      <Rich text={point} />
                    </li>
                  ))}
                </ul>
              )}
              {s.after?.map((p) => (
                <p key={p}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
          </section>
        ))}

        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-body">
          <li className="flex items-center gap-2.5">
            <Mail aria-hidden="true" className="size-5 text-ink" />
            <TextLink href={emailHref()}>{c.contact.email}</TextLink>
          </li>
          <li className="flex items-center gap-2.5">
            <WhatsAppIcon aria-hidden="true" className="size-5 text-ink" />
            <TextLink href={whatsappHref("default")} icon="none">
              {c.contact.whatsapp}
            </TextLink>
          </li>
        </ul>
      </Container>
    </article>
  );
}
