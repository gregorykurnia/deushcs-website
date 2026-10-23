import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Brand } from "./Brand";
import { ContactLink } from "./ContactLink";
import { HeaderFrame } from "./HeaderFrame";
import { LanguageSwitch } from "./LanguageSwitch";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { contactHref } from "./nav";

export type HeaderCta = "demo" | "trial" | "call";

type HeaderProps = {
  /** Page-specific button: "Request a demo" (default), "Request a free trial" (assessment
   *  pages), "Book a 30-minute call" (Enhance). */
  cta?: HeaderCta;
  /** Where the button goes. Defaults to the contact page. */
  ctaHref?: string;
  /** Locales this page exists in. Others show disabled in the language switch. */
  available?: readonly Locale[];
};

// DESIGN-GUIDE.md §7.1. Three zones in the 1320px frame, 84px tall: brand · pill nav · language,
// Contact and the CTA. At 900px and below: brand, CTA and the menu button. Contact hides
// below 1100px. The side zones never shrink below their content, so between 901 and 1100px
// the pill gives up exact centring before anything overlaps. Pages render their own Header, because the CTA and the available locales
// are per page.
export function Header({ cta = "demo", ctaHref = contactHref, available = locales }: HeaderProps) {
  const t = useTranslations("Header");
  return (
    <HeaderFrame>
      <div className="mx-auto flex h-full w-full max-w-wide items-center gap-4 px-[var(--gutter)]">
        <div className="flex min-w-max flex-1">
          {/* The longer page-specific CTAs don't fit beside the wordmark on a phone (guide §10.2). */}
          <Brand
            wordmarkClassName={cn(
              "max-[359px]:sr-only",
              cta !== "demo" && "max-[479px]:sr-only",
            )}
          />
        </div>

        <MegaMenu className="hidden desk:flex" />

        <div className="flex min-w-max flex-1 items-center justify-end gap-2.5 text-ui font-medium desk:gap-[22px]">
          <LanguageSwitch available={available} className="hidden desk:flex" />
          <ContactLink className="hidden min-[1100px]:inline">{t("nav.contact")}</ContactLink>
          <Button asChild size="sm" data-cta={`header-${cta}`}>
            <Link href={ctaHref}>{t(`cta.${cta}`)}</Link>
          </Button>
          <MobileMenu available={available} className="desk:hidden" />
        </div>
      </div>
    </HeaderFrame>
  );
}
