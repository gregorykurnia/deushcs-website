import { Container } from "@/components/ui/container";
import { Rich } from "@/components/ui/rich";
import type { AboutContent } from "@/content/types";

// About section 9, company details: the legal entity in one quiet line above the closing panel.
// The office address (Q9) is added here behind `siteFlags.showAddress` when it is supplied.
export function CompanyDetails({ section }: { section: AboutContent["companyDetails"] }) {
  return (
    <Container className="pt-14 pb-[var(--section-y)] text-center">
      <p className="mx-auto max-w-[36em] text-body-sm text-slate">
        <Rich text={section.line} />
      </p>
    </Container>
  );
}
