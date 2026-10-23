import type { UseCaseContent } from "../../types";

// Use case: Talent mapping dan promosi internal, from content/id/use-cases/talent-mapping.md (Task G4.3,
// SEO/geo-implementation-plan.md §S12), which wins on wording. The facts are the English page's. The search phrase is
// "talent mapping" in the H1, paired with "pemetaan talenta" (the glossary's term) in the answer passage: Indonesian
// HR searches with the English term, and the glossary keeps the Indonesian one. The `> Note:` lines are dropped,
// and the download offer is the shared block (`offer`). The closing is the GBA page's approved one, in Indonesian.
// Registered only while `showIndonesianLeadPages` is on.

const gba = "/solutions/game-based-assessment";

export const talentMappingId: UseCaseContent = {
  meta: {
    title: "Talent Mapping dan Pemetaan Kompetensi dengan Asesmen Berbasis Game",
    description:
      "Petakan talenta yang sudah Anda miliki: pemetaan kompetensi, identifikasi calon pemimpin, promosi dan mutasi, dengan asesmen berbasis game yang dinormakan pada populasi Indonesia.",
  },
  slug: "talent-mapping",
  product: { name: "Game-Based Assessment", path: gba },
  whatsapp: "assessment",
  breadcrumb: "Talent mapping dan promosi internal",
  hero: {
    eyebrow: "Kasus penggunaan · Game-Based Assessment",
    title: "Talent mapping dan promosi internal",
    passage:
      "DEUS membantu perusahaan di Indonesia melakukan talent mapping, atau pemetaan talenta, atas karyawan yang sudah ada lewat asesmen berbasis game. Data Personality dan Cognitive menunjukkan kekuatan, kesenjangan, dan high-potential yang belum terlihat di berbagai tim dan divisi. Modul Neuroscience menambahkan risiko, motivasi, dan kecerdasan emosional untuk keputusan kepemimpinan. Perusahaan memakai hasilnya untuk pemetaan kompetensi, promosi, rotasi, dan mutasi, serta untuk menentukan ke mana anggaran pengembangan diarahkan.",
    cta: { label: "Minta uji coba gratis", href: "/contact?product=gba" },
    screens: [
      {
        image: "gbaSuitabilityReport",
        title: "Kecocokan dengan posisi",
        alt: "Laporan kecocokan untuk kandidat Service Crew: 90 dari 100, Highly Recommended, persentil ke-99, dengan ringkasan singkat dan kompetensi teratasnya.",
      },
      {
        image: "gbaReportInteractive",
        title: "Filter menurut modul atau rentang skor",
        alt: "Dashboard interaktif untuk satu kandidat: persentil kognitif dan neuro, radar chart dibandingkan rata-rata batch, dan distribusi rentang skor.",
      },
    ],
  },
  problem: {
    eyebrow: "Masalahnya",
    title: "Perpindahan internal layak mendapat bukti yang sama dengan perekrutan dari luar.",
    lede: "Anda tahu rekam jejak karyawan Anda. Yang lebih sulit dilihat adalah siapa yang siap naik, dan di posisi mana masing-masing akan paling berhasil berikutnya.",
    items: [
      {
        title: "Potensi sulit terlihat dari bagan organisasi",
        body: "Siapa yang siap menjadi supervisor atau manajer jarang terlihat dari jabatannya sekarang atau appraisal terakhirnya.",
      },
      {
        title: "Motivasi dan risiko baru terlihat belakangan",
        body: "Motivasi mudah salah dinilai dalam percakapan. Kecenderungan seseorang mengambil risiko biasanya baru tampak berbulan-bulan setelah keputusan diambil.",
      },
      {
        title: "Anggaran pelatihan butuh alasan",
        body: "Tanpa data kesenjangan tiap orang, sulit memutuskan siapa mendapat program apa, dan high-potential mana yang diinvestasikan lebih dulu.",
      },
      {
        title: "Posisi baru perlu uji kecocokan",
        body: "Sebelum Anda mempromosikan, merotasi, atau memutasi seseorang, kecocokannya dengan posisi baru sama pentingnya dengan rekam jejaknya di posisi lama.",
      },
    ],
  },
  how: {
    eyebrow: "Cara DEUS bekerja",
    title: "Modul yang tepat untuk setiap keputusan talenta.",
    items: [
      {
        title: "Pemetaan kompetensi: Personality · DEUS Discover",
        body: "Cocokkan profil setiap orang dengan kerangka kompetensi milik Anda sendiri, dengan istilah yang sudah dipakai para manajer Anda dan dipetakan ke apa yang dibutuhkan tiap posisi. Lihat kesenjangannya dan susun rencana pengembangan yang menyasar kesenjangan itu.",
        link: { label: "Modul Personality", href: `${gba}#personality` },
      },
      {
        title: "Kekuatan di berbagai tim: Personality dan Cognitive",
        body: "Bersama-sama keduanya memetakan kekuatan, kesenjangan, dan high-potential yang belum terlihat di berbagai tim dan divisi. Cognitive menambahkan tolok ukur learning agility.",
        link: { label: "Modul Cognitive", href: `${gba}#cognitive` },
      },
      {
        title: "Identifikasi calon pemimpin: Neuroscience",
        body: "Temukan orang di dalam perusahaan Anda yang siap menjadi supervisor dan manajer. Data modul ini tentang risiko, motivasi, dan kecerdasan emosional berasal dari apa yang orang lakukan, bukan apa yang mereka katakan.",
        link: { label: "Modul Neuroscience", href: `${gba}#neuro` },
      },
      {
        title: "Promosi dan rotasi",
        body: "Periksa kecocokan dengan posisi baru memakai bukti yang sama dengan yang Anda pakai untuk kandidat dari luar. Tampilan kecocokan profil individu menunjukkan seberapa dekat profil tiap orang dengan kebutuhan posisinya.",
      },
    ],
  },
  runs: {
    eyebrow: "Cara menjalankannya",
    title: "Review talenta tanpa berminggu-minggu wawancara.",
    steps: [
      {
        title: "Undang",
        body: "Unggah karyawan yang masuk dalam review dari satu file CSV. Undangan dan pengingat terkirim otomatis.",
      },
      {
        title: "Mulai dengan aman",
        body: "Pengecekan perangkat dan logika anti-curang berjalan sebelum game pertama. Karyawan bermain di ponsel atau laptop, di browser, tanpa perlu mengunduh apa pun.",
      },
      {
        title: "Main",
        body: "Mereka mengerjakan skenario cerita dan game singkat. Anda bisa melihat sekilas siapa yang sudah mulai dan siapa yang sudah selesai.",
      },
      {
        title: "Putuskan",
        body: "Laporan siap begitu tiap orang selesai, berisi kekuatan, area pengembangan, dan analisis tertulis tentang arti skornya. Dashboard interaktif memungkinkan review talenta Anda menyaring menurut modul atau rentang skor dan membuka profil lengkap siapa pun. HR dan manajer masing-masing melihat apa yang mereka perlukan, dan tidak lebih.",
      },
    ],
  },
  proof: {
    line: "Dipercaya **40+ merek** di seluruh Indonesia.",
    moreLabel: "Lihat 40+",
    storiesLabel: "Baca cerita klien",
  },
  offer: true,
  faq: {
    eyebrow: "FAQ",
    title: "Pertanyaan seputar talent mapping bersama DEUS.",
    items: [
      {
        question: "Bisakah asesmen berbasis game dipakai untuk karyawan yang sudah ada, bukan hanya kandidat?",
        answer:
          "Bisa. Asesmen yang sama berlaku untuk rekrutmen dan untuk orang-orang yang sudah Anda miliki: pengembangan karyawan, kesiapan promosi, analisis kebutuhan pelatihan, dan pemetaan calon pemimpin. Data Personality dan Cognitive menunjukkan kekuatan, kesenjangan, dan high-potential yang belum terlihat di berbagai tim dan divisi, sehingga Anda bisa merencanakan pengembangan dan perpindahan internal berdasarkan bukti.",
      },
      {
        question: "Bisakah karyawan dipetakan terhadap kerangka kompetensi kami sendiri?",
        answer:
          "Bisa. Hasil disusun berdasarkan kerangka kompetensi milik Anda, dengan istilah yang sudah dikenal para manajer Anda, dan setiap posisi diukur terhadap kompetensi yang benar-benar dibutuhkannya. Skenarionya juga bisa menyesuaikan industri Anda. Anda melihat di mana tiap orang sesuai dengan kerangka, di mana kesenjangannya, dan rencana pengembangan apa yang akan menutupnya.",
      },
      {
        question: "Modul mana yang membantu mengidentifikasi calon pemimpin?",
        answer:
          "Modul Neuroscience. Enam game-nya menangkap kecenderungan mengambil risiko, motivasi, alokasi usaha, dan pengenalan emosi lewat perilaku yang tidak dikendalikan orang secara sadar. Data itu sangat berguna untuk menemukan orang yang siap menjadi supervisor dan manajer, juga untuk posisi kepemimpinan dan posisi yang berhadapan dengan pelanggan, di mana kemampuan membaca emosi penting.",
      },
      {
        question: "Bagaimana ini membantu promosi, rotasi, dan mutasi?",
        answer:
          "Ia memeriksa kecocokan dengan posisi baru sebelum Anda memutuskan. Setiap orang dinilai dengan bukti yang sama dengan yang Anda pakai untuk kandidat dari luar, dan tampilan kecocokan profil individu menunjukkan seberapa dekat profilnya dengan kebutuhan posisi tersebut. Gunakan sebelum promosi, rotasi, atau mutasi.",
      },
    ],
  },
  // as in English; it shows only while the guide has an Indonesian version (RelatedGuide)
  relatedGuide: "what-is-game-based-assessment",
  // The GBA page's approved closing (game-based-assessment.md §11), in Indonesian.
  closing: {
    label: "Lihat sendiri",
    title: ["Cara terbaik memahaminya", "adalah memainkannya."],
    lede: "Minta uji coba gratis dan coba sendiri asesmennya, atau jalankan bersama sekelompok kecil dari tim Anda. Kami akan mendampingi Anda membaca hasilnya.",
    cta: { label: "Minta uji coba gratis", href: "/contact?product=gba" },
  },
};
