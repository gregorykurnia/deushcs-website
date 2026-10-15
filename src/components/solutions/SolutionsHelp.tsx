import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { isExternalHref } from "@/components/ui/text-link";
import type { SolutionsContent } from "@/content/types";
import { Link } from "@/i18n/navigation";

// Solutions section 5, "Need a hand?" (White): the block before the closing panel. A centred header
// and two buttons. The first (navy) goes to Contact; the second (white) opens a WhatsApp chat in a new
// tab, as the closing panel's buttons do.
export function SolutionsHelp({ section }: { section: SolutionsContent["help"] }) {
  const t = useTranslations("Common");

  return (
    <Section aria-labelledby="help-title">
      <Reveal>
        <SectionHeader id="help-title" label={section.eyebrow} title={section.title} lede={section.lede} />
      </Reveal>
      <Reveal className="flex flex-col items-center justify-center gap-3 desk:flex-row">
        {section.ctas.map((cta, i) => {
          const variant = i === 0 ? "primary" : "secondary";
          return isExternalHref(cta.href) ? (
            <Button key={cta.label} asChild variant={variant}>
              <a href={cta.href} target="_blank" rel="noopener">
                {cta.label}
                <span className="sr-only"> {t("opensInNewTab")}</span>
              </a>
            </Button>
          ) : (
            <Button key={cta.label} asChild variant={variant}>
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          );
        })}
      </Reveal>
    </Section>
  );
}
