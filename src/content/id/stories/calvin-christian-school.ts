import { potentiaHref } from "@/lib/links";
import type { StoryContent } from "../../types";

// Client story: Calvin Christian School, from content/id/clients-calvin-christian-school.md. It is
// written in Indonesian first, because Potentia's audience is. Wording is kept as written; the
// `> Note:` and [VERIFY] lines are dropped. Labels leave out the arrows the Markdown writes: the
// link components draw them.
//
// Held until Q11 is answered: `siteFlags.publishCalvin` stays off, and the story registry (Task 4.2)
// and the Clients hub only include this story while it is on. Before turning it on, check with the school:
//   - permission to name it;
//   - the names and titles of both quotes. "Yennie, Guru" and "Chrissie, Orang tua" are the first
//     names from the brief. The press credits similar quotes to Chrissie Martinez (Principal, Calvin
//     Christian School) and Oh Yen Nie (Dean of Teachers College, Universitas Pelita Harapan), so the
//     roles below may be wrong, and so may the "Orang tua" label;
//   - that the challenge paragraph describes the school's own goal (it is framed from the teacher's quote).

export const calvinStoryId: StoryContent = {
  meta: {
    title: "Calvin Christian School: Mengenali Potensi 200+ Siswa dengan Potentia",
    description:
      "Bagaimana Calvin Christian School menggunakan Potentia untuk memahami profil kognitif lebih dari 200 siswa SD dan menyesuaikan cara mengajar di kelas.",
  },
  slug: "calvin-christian-school",
  product: "Potentia",
  whatsapp: "default",
  client: "Calvin Christian School",
  header: {
    eyebrow: "Cerita klien",
    title: "Lebih dari 200 siswa SD, dan gambaran yang lebih jelas tentang cara masing-masing belajar.",
    lede: "Bagaimana Calvin Christian School menggunakan Potentia untuk membantu guru mengenali potensi kognitif setiap siswa.",
  },
  glance: {
    stats: [
      { value: "200+", label: "siswa SD" },
      { value: "8", label: "kemampuan kognitif per siswa" },
      { value: "3", label: "lapis laporan: siswa, orang tua, dan guru" },
    ],
  },
  challenge: {
    eyebrow: "Tantangannya",
    title: "Mengajar setiap siswa sesuai cara belajarnya.",
    paragraphs: [
      "Calvin Christian School ingin guru-gurunya bisa menyesuaikan pembelajaran dengan kemampuan setiap siswa. Untuk itu, guru perlu lebih dari sekadar nilai ujian: mereka perlu tahu bagaimana masing-masing siswa memproses informasi, mengingat, dan belajar.",
    ],
  },
  did: {
    eyebrow: "Yang kami lakukan",
    title: "Potentia untuk seluruh siswa SD.",
    paragraphs: [
      "Lebih dari 200 siswa SD memainkan 8 minigame Potentia. Orang tua menerima laporan profil kognitif anak mereka, dan guru mendapat Dashboard Kelas untuk melihat profil seluruh siswa di kelasnya.",
      "Sekolah berencana memperluas penggunaan Potentia ke jenjang SMP dan SMA.",
    ],
  },
  words: {
    eyebrow: "Kata mereka",
    featured: [
      {
        quote:
          "Dashboard Potentia dapat membantu guru mengenali potensi kognitif setiap siswa, sehingga pembelajaran bisa disesuaikan dengan kemampuan mereka. Lebih tepat, menarik, dan berdampak melalui modifikasi dan diferensiasi.",
        name: "Yennie",
        role: "Guru",
      },
      {
        quote:
          "Metode tes kecerdasan Potentia dengan gamifikasi menarik sekaligus menguji berbagai aspek kecerdasan anak. Hasil tes yang diberikan juga cukup komprehensif, menunjukkan berbagai potensi yang ada pada diri anak, dan data-datanya disajikan dengan jelas serta mudah diakses.",
        name: "Chrissie",
        role: "Orang tua",
      },
    ],
  },
  closing: {
    label: "Untuk sekolah Anda",
    title: ["Ingin hal yang sama", "untuk siswa Anda?"],
    lede: "Daftarkan sekolah Anda di situs Potentia, atau pelajari dulu cara kerjanya dan apa saja yang didapat guru, siswa, dan orang tua.",
    cta: { label: "Daftarkan sekolah Anda", href: potentiaHref("/daftar/institusi") },
    secondary: { label: "Kunjungi Potentia", href: potentiaHref() },
  },
};
