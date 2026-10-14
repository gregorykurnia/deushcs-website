import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { emailHref, whatsappHref } from "@/lib/links";
import { Brand } from "./Brand";
import { LanguageSwitch } from "./LanguageSwitch";
import { contactHref, primaryLinks, solutionGroups } from "./nav";

const solutions = solutionGroups.flatMap((group) => group.items);
const company = [...primaryLinks, { key: "contact", href: contactHref }] as const;

const linkClass =
  "relative transition-colors duration-150 hover:text-ink before:absolute before:-inset-x-1 before:-inset-y-2 before:content-['']";

// DESIGN-GUIDE.md §7.19. Four columns on white (no top border: the closing panel separates it),
// then a hairline and the bottom row. Column 1 spans both columns below 901px.
// The postal address stays out until the team confirms it (WEBSITE-PLAN.md Q-list, [VERIFY]).
export function Footer({ available = locales }: { available?: readonly Locale[] }) {
  const t = useTranslations("Footer");
  const th = useTranslations("Header");
  const tc = useTranslations("Common");

  return (
    <footer aria-label={t("label")} className="pt-[72px] pb-10">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 desk:grid-cols-[1.6fr_1fr_1fr_1fr] desk:gap-12">
          <div className="col-span-2 desk:col-span-1">
            <Brand />
            <p className="mt-[18px] max-w-[22em] text-ui text-slate">{t("about")}</p>
            <div className="mt-5 flex gap-2.5">
              <Button asChild variant="secondary" size="sm">
                <a href={whatsappHref()} target="_blank" rel="noopener">
                  {t("whatsapp")}
                  <span className="sr-only"> {tc("opensInNewTab")}</span>
                </a>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <a href={emailHref()}>{t("email")}</a>
              </Button>
            </div>
          </div>

          <div>
            <p id="footer-solutions" className="mb-4 text-label font-bold text-ink">
              {t("solutions")}
            </p>
            <ul aria-labelledby="footer-solutions" className="space-y-2.5 text-ui text-slate">
              {solutions.map((item) => (
                <li key={item.key}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener" className={`${linkClass} inline-flex items-center gap-1`}>
                      {t("potentia")}
                      <ArrowUpRight aria-hidden="true" className="size-[15px] stroke-2" />
                      <span className="sr-only">{tc("opensInNewTab")}</span>
                    </a>
                  ) : (
                    <Link href={item.href} className={linkClass}>
                      {th(`solutionsMenu.items.${item.key}.title`)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p id="footer-company" className="mb-4 text-label font-bold text-ink">
              {t("companyHeading")}
            </p>
            <ul aria-labelledby="footer-company" className="space-y-2.5 text-ui text-slate">
              {company.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className={linkClass}>
                    {th(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p id="footer-legal" className="mb-4 text-label font-bold text-ink">
              {t("legal")}
            </p>
            <ul aria-labelledby="footer-legal" className="space-y-2.5 text-ui text-slate">
              <li>
                <Link href="/privacy" className={linkClass}>
                  {t("privacy")}
                </Link>
              </li>
              <li>{t("legalEntity")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-label text-slate desk:flex-row desk:justify-between">
          <span>{t("copyright")}</span>
          <LanguageSwitch variant="names" available={available} />
        </div>
      </Container>
    </footer>
  );
}
