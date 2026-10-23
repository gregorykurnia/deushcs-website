import { CONTACT_EMAIL, WHATSAPP_DISPLAY, potentiaHref } from "@/lib/links";
import type { ContactContent } from "../types";

// Indonesian copy for /id/contact (Task G4.1), from content/id/contact.md, which wins on wording. Same
// structure and omissions as src/content/en/contact.ts: no office address (Q9) and no business hours until
// confirmed. The Potentia link drops "(in Indonesian)": the site it opens is in Indonesian already. The
// registry serves this module only while siteFlags.showIndonesianLeadPages is on.

export const contactId: ContactContent = {
  meta: {
    title: "Hubungi DEUS | Minta Demo",
    description:
      "Bicarakan asesmen berbasis game atau manajemen kinerja bersama DEUS. Kirim pesan, atau hubungi kami lewat WhatsApp atau email.",
  },
  hero: {
    eyebrow: "Kontak",
    title: "Mari bicara tentang karyawan Anda.",
    lede: "Sedang menyiapkan rekrutmen, review talenta, atau siklus appraisal berikutnya? Ceritakan sedikit, dan kami akan menghubungi Anda. Belum yakin produk mana yang cocok? Tidak apa-apa. Mencari tahu bersama justru bagian dari percakapan kita.",
  },
  ways: {
    whatsapp: { label: "WhatsApp", value: WHATSAPP_DISPLAY, cta: "Chat via WhatsApp" },
    email: { label: "Email", value: CONTACT_EMAIL, cta: "Kirim email" },
  },
  potentia: {
    body: "Mencari Potentia? Voucher, pendaftaran sekolah, dan bantuan semuanya ada di situs Potentia.",
    cta: { label: "Kunjungi Potentia ↗", href: potentiaHref() },
  },
};
