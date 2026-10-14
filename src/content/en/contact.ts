import { CONTACT_EMAIL, WHATSAPP_DISPLAY, potentiaHref } from "@/lib/links";
import type { ContactContent } from "../types";

// English copy for /contact (Task 1.1), from content/en/contact.md, which wins on wording. The
// Markdown's `## N.` headings are structure labels, so they are not copied. Left out until the
// owner confirms them: the office address (Q9, siteFlags.showAddress) and business hours
// (WEBSITE-PLAN.md §5.10 [VERIFY], with no flag yet).

export const contactEn: ContactContent = {
  meta: {
    title: "Contact DEUS | Request a Demo",
    description:
      "Talk to DEUS about game-based assessment or performance management. Send us a message, or reach us on WhatsApp or by email.",
  },
  hero: {
    eyebrow: "Contact",
    title: "Let's talk about your people.",
    lede: "Planning a recruitment drive, a talent review or your next appraisal cycle? Tell us a little about it and we'll get back to you. If you're not sure which product fits, that's fine. Helping you work that out is part of the conversation.",
  },
  ways: {
    whatsapp: { label: "WhatsApp", value: WHATSAPP_DISPLAY, cta: "Chat on WhatsApp" },
    email: { label: "Email", value: CONTACT_EMAIL, cta: "Send an email" },
  },
  potentia: {
    body: "Looking for Potentia? Vouchers, school registration and support are all on the Potentia website.",
    cta: { label: "Visit Potentia (in Indonesian) ↗", href: potentiaHref() },
  },
};
