import { Mail } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { TextLink } from "@/components/ui/text-link";
import type { ContactContent } from "@/content/types";
import { emailHref, whatsappHref } from "@/lib/links";

// Contact's side column (WEBSITE-PLAN.md §5.10, DESIGN-GUIDE.md §7.18): WhatsApp and email, the
// office address when the page passes one (it passes one only while siteFlags.showAddress is on),
// then the Potentia note on the warm tile of §2.3. Copy comes from the content module; the links
// come from lib/links, so the prefilled WhatsApp message stays in Indonesian like the rest.

type ContactSideColumnProps = Pick<ContactContent, "ways" | "potentia"> & {
  office?: ContactContent["office"];
};

export function ContactSideColumn({ ways, potentia, office }: ContactSideColumnProps) {
  return (
    <aside className="flex flex-col gap-4">
      <WayCard
        icon={<WhatsAppIcon className="size-5" />}
        label={ways.whatsapp.label}
        value={ways.whatsapp.value}
        cta={{ label: ways.whatsapp.cta, href: whatsappHref() }}
      />
      <WayCard
        icon={<Mail aria-hidden="true" className="size-5" />}
        label={ways.email.label}
        value={ways.email.value}
        cta={{ label: ways.email.cta, href: emailHref() }}
      />
      {office && (
        <div className="rounded-lg border border-line bg-white p-6">
          <p className="text-label font-semibold text-slate">{office.label}</p>
          {office.lines.map((line) => (
            <p key={line} className="mt-2 text-body-sm text-ink">
              {line}
            </p>
          ))}
        </div>
      )}
      <div className="rounded-lg border border-warm-line bg-[image:var(--grad-warm)] p-6">
        <p className="text-body-sm text-warm-text">{potentia.body}</p>
        {/* TextLink draws the arrow for an external link, so the content's own ↗ is dropped. */}
        <TextLink href={potentia.cta.href} tone="warm" className="mt-4">
          {potentia.cta.label.replace(/\s*↗$/, "")}
        </TextLink>
      </div>
    </aside>
  );
}

function WayCard({
  icon,
  label,
  value,
  cta,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  cta: { label: string; href: string };
}) {
  return (
    <div className="rounded-lg border border-line bg-white p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sky-1 text-azure-ink">{icon}</span>
        <p className="text-label font-semibold text-slate">{label}</p>
      </div>
      <p className="mt-4 text-h3-panel text-ink">{value}</p>
      <TextLink href={cta.href} className="mt-3">
        {cta.label}
      </TextLink>
    </div>
  );
}
