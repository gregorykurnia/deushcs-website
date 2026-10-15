// Outbound links used across the site. Values from IMPLEMENTATION_PLAN.md "Global constraints"
// and content/en/global.md ("WhatsApp prefilled messages").

export const WHATSAPP_NUMBER = "6282312121660";
export const WHATSAPP_DISPLAY = "+62 823-1212-1660";
export const CONTACT_EMAIL = "admin@deushcs.com";
export const POTENTIA_ORIGIN = "https://deuspotentia.com";

export type WhatsAppContext = "default" | "assessment" | "enhance";

// Prefilled messages stay in Indonesian on every locale (content/en/global.md).
const whatsappMessages: Record<WhatsAppContext, string> = {
  default: "Halo DEUS, saya ingin bertanya tentang layanan DEUS.",
  assessment: "Halo DEUS, saya tertarik dengan asesmen berbasis game untuk perusahaan saya.",
  enhance: "Halo DEUS, saya ingin tahu lebih lanjut tentang DEUS Enhance.",
};

export function whatsappHref(context: WhatsAppContext = "default"): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessages[context])}`;
}

export function potentiaHref(path = "/"): string {
  const url = new URL(path, POTENTIA_ORIGIN);
  url.searchParams.set("utm_source", "deushcs.com");
  url.searchParams.set("utm_medium", "referral");
  return url.toString();
}

/** A mailto link, optionally with a prefilled subject and body. */
export function emailHref(prefill?: { subject: string; body: string }): string {
  if (!prefill) return `mailto:${CONTACT_EMAIL}`;
  // mailto wants %20 for spaces, not URLSearchParams' "+"
  const query = `subject=${encodeURIComponent(prefill.subject)}&body=${encodeURIComponent(prefill.body)}`;
  return `mailto:${CONTACT_EMAIL}?${query}`;
}
