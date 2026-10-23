import type { UseCaseContent } from "../../types";

// Use case: Menghubungkan appraisal dengan gaji dan bonus, from content/id/use-cases/performance-appraisal-and-pay.md
// (Task G4.3, SEO/geo-implementation-plan.md §S12), which wins on wording. The facts are the English page's. The search
// phrases "remunerasi berbasis kinerja" (H1 and passage) and "sistem appraisal karyawan" (passage) come from §S12.
// The product is DEUS Enhance, so the call to action is Enhance's own booking form (`#book-a-call`) and there's no
// download offer. The closing headline is the Enhance page's approved one, in Indonesian; the label is left out, so
// the global one shows. Registered only while `showIndonesianLeadPages` is on.

export const performanceAppraisalId: UseCaseContent = {
  meta: {
    title: "Remunerasi Berbasis Kinerja: Sistem Appraisal Karyawan dan KPI",
    description:
      "Aplikasi penilaian kinerja untuk perusahaan di Indonesia: KPI, appraisal, dan kalibrasi yang menjadi dasar keputusan bonus, insentif, dan kenaikan gaji. Berjalan berdampingan dengan HRIS dan payroll Anda.",
  },
  slug: "performance-appraisal-and-pay",
  product: { name: "DEUS Enhance", path: "/solutions/enhance" },
  whatsapp: "enhance",
  breadcrumb: "Remunerasi berbasis kinerja",
  hero: {
    eyebrow: "Kasus penggunaan · DEUS Enhance",
    title: "Remunerasi berbasis kinerja: dari appraisal ke gaji dan bonus",
    passage:
      "DEUS Enhance adalah sistem appraisal karyawan yang menghubungkan penilaian kinerja dengan remunerasi berbasis kinerja di perusahaan Indonesia. Tim HR, manajemen, dan keuangan menetapkan KPI dan kompetensi sendiri, menjalankan satu proses appraisal terstruktur untuk semua orang, dan mengkalibrasi hasil antar manajer dan unit. Hasil yang sudah dikalibrasi lalu menjadi dasar keputusan bonus, insentif, dan kenaikan gaji, sehingga imbalan bertumpu pada kinerja yang terukur. Enhance berjalan berdampingan dengan HRIS, ERP, dan payroll yang sudah dipakai perusahaan.",
    cta: { label: "Jadwalkan panggilan 30 menit", href: "/solutions/enhance#book-a-call" },
    screens: [
      {
        image: "enhanceCalibrationMatrix",
        title: "Kalibrasi antar manajer",
        alt: "Matriks kalibrasi DEUS Enhance",
      },
      {
        image: "enhanceBonusDashboard",
        title: "Menjalankan setiap siklus bonus",
        alt: "Dashboard bonus DEUS Enhance untuk satu siklus bonus",
      },
    ],
  },
  problem: {
    eyebrow: "Masalahnya",
    title: "Rating di satu spreadsheet, bonus di spreadsheet lain.",
    lede: "Ketika hasil appraisal dan imbalan dihitung di tempat yang berbeda, tidak ada yang bisa menunjukkan bagaimana yang satu mengarah ke yang lain.",
    items: [
      {
        title: "Data tersebar",
        body: "KPI dan hasil appraisal tersebar di Excel dan sistem yang tidak terhubung. Seminggu sebelum kalibrasi, HR masih mengumpulkan skor.",
      },
      {
        title: "Standar yang tidak konsisten",
        body: "Dua manajer menilai kinerja yang sama dengan cara berbeda. Tidak ada yang menyadarinya sampai kalibrasi, kalaupun sampai.",
      },
      {
        title: "Imbalan yang terputus dari kinerja",
        body: "Bonus difinalkan dari spreadsheet yang tidak pernah dicocokkan dengan rating kinerja yang sebenarnya.",
      },
      {
        title: "Tidak ada jawaban untuk \"kenapa?\"",
        body: "Seorang karyawan bertanya kenapa rekannya mendapat bonus lebih besar. Tidak ada yang bisa menjelaskannya dengan bukti yang objektif.",
      },
    ],
  },
  how: {
    eyebrow: "Cara DEUS bekerja",
    title: "Cara Enhance menghubungkan rating dengan imbalan.",
    items: [
      {
        title: "Susun kerangkanya",
        body: "Sesuaikan KPI, kompetensi, bobot, rumus, periode, dan ukuran menurut posisi dan level.",
      },
      {
        title: "Tinjau kinerja",
        body: "Satu proses penilaian diri dan appraisal yang terstruktur untuk semua orang, dipantau dari level perusahaan sampai tim dan individu.",
      },
      {
        title: "Kalibrasi hasil",
        body: "Tinjau evaluasi antar manajer, departemen, atau pabrik agar konsisten. Matriks kalibrasi menampilkan evaluasi semua orang berdampingan, sehingga rating yang tidak mengikuti standar yang sama langsung menonjol.",
      },
      {
        title: "Petakan talenta",
        body: "Grid sembilan kotak memplot hasil KPI terhadap hasil kompetensi, sehingga Anda bisa melihat performer terbaik, kesenjangan kinerja, dan potensi pengembangan.",
      },
      {
        title: "Ubah hasil menjadi keputusan gaji",
        body: "Hubungkan hasil yang sudah dikalibrasi dengan insentif, bonus, kenaikan gaji, dan pengembangan. Atur setiap siklus bonus dan siapa yang ikut, kelompokkan kinerja yang serupa ke imbalan yang serupa, dan rencanakan kenaikan gaji berdampingan dengan kinerja di baliknya.",
      },
    ],
    note: {
      text: "Enhance bisa melengkapi HRIS, ERP, payroll, dan sistem operasional yang sudah Anda punya, tanpa harus menggantinya. Bagaimana data mengalir di antara sistem-sistem itu dipastikan saat scoping.",
      link: { label: "Lihat DEUS Enhance", href: "/solutions/enhance" },
    },
  },
  runs: {
    eyebrow: "Cara menjalankannya",
    title: "Mulai dengan tinjauan 30 menit atas proses appraisal Anda.",
    steps: [
      {
        title: "Tinjau",
        body: "Tinjauan singkat tanpa komitmen besar tentang bagaimana kinerja dipantau dan dievaluasi hari ini, untuk tahu apa yang dipertahankan dan di mana kesenjangannya.",
      },
      {
        title: "Rekomendasikan",
        body: "Kami merekomendasikan apakah workshop pemetaan KPI, pilot, atau uji coba yang disesuaikan adalah langkah berikutnya yang terbaik untuk Anda.",
      },
      {
        title: "Siapkan",
        body: "Kami menyiapkan Enhance mengikuti struktur Anda, periode review Anda, dan cara kerja Anda yang sudah berjalan, dan membantu menyusun kerangka KPI jika Anda belum punya. HR, manajer, dan karyawan belajar memakainya sebelum siklus pertama dimulai.",
      },
      {
        title: "Jalankan siklusnya",
        body: "Appraisal, kalibrasi, dan keputusan imbalan dalam satu platform. Setelah setiap siklus, kami melihat kembali bersama Anda apa yang berhasil dan apa yang perlu diubah lain kali.",
      },
    ],
  },
  // The line is about DEUS as a whole: no copy here says these brands use Enhance.
  proof: {
    line: "Dipercaya **40+ merek** di seluruh Indonesia.",
    moreLabel: "Lihat 40+",
    storiesLabel: "Baca cerita klien",
  },
  offer: false,
  faq: {
    eyebrow: "FAQ",
    title: "Pertanyaan seputar menghubungkan appraisal dengan gaji.",
    items: [
      {
        question: "Bagaimana Enhance menghubungkan penilaian kinerja dengan gaji?",
        answer:
          "Enhance mengalirkan hasil appraisal yang sudah dikalibrasi langsung ke keputusan bonus, insentif, dan kenaikan gaji. KPI, appraisal, kalibrasi, dan pemetaan talenta ada dalam satu platform, dan hasilnya mengalir ke siklus bonus, pengelompokan imbalan, dan perencanaan kenaikan gaji. Jadi ketika seorang karyawan bertanya kenapa rekannya mendapat bonus lebih besar, ada kinerja terukur di balik jawabannya.",
      },
      {
        question: "Kenapa perlu kalibrasi sebelum memutuskan bonus?",
        answer:
          "Karena manajer, departemen, atau pabrik bisa menilai kinerja yang sama dengan cara berbeda. Kalibrasi meninjau evaluasi di antara mereka agar konsisten sebelum hasilnya sampai ke imbalan. Di Enhance, matriks kalibrasi menampilkan evaluasi semua orang berdampingan, sehingga rating yang tidak mengikuti standar yang sama langsung menonjol. Baru setelah itu hasilnya menjadi dasar keputusan bonus, insentif, dan gaji.",
      },
      {
        question: "Apakah kami harus mengganti HRIS atau sistem payroll?",
        answer:
          "Tidak. Enhance berjalan berdampingan dengan HRIS, ERP, payroll, dan sistem operasional yang sudah ada, dan tidak harus menggantikan satu pun dari semuanya. Integrasi, aliran data, dan konfigurasi disesuaikan dengan proses organisasi Anda, dan kami menyepakati bagaimana data berpindah di antara sistem saat scoping.",
      },
      {
        question: "Bisakah kami memakai KPI dan kompetensi kami sendiri?",
        answer:
          "Bisa. Anda menetapkan KPI, kompetensi, bobot, rumus, periode, dan ukuran, dan semuanya bisa berbeda menurut posisi dan level. Kinerja kemudian dipantau dari level perusahaan sampai setiap tim dan individu, dan setiap karyawan menjalani proses penilaian diri dan appraisal terstruktur yang sama.",
      },
      {
        question: "Kami belum punya kerangka KPI. Apakah tetap bisa mulai?",
        answer:
          "Bisa. Banyak perusahaan memulai dari sana. Kami bisa membantu Anda merancang KPI dan kompetensi yang sesuai untuk setiap posisi dan level, sering kali dimulai dengan workshop pemetaan KPI. Langkah pertamanya adalah tinjauan singkat tentang cara appraisal Anda berjalan hari ini, lalu dari sana kami merekomendasikan workshop, pilot, atau uji coba yang disesuaikan.",
      },
    ],
  },
  // as in English; it shows only while the guide has an Indonesian version (RelatedGuide)
  relatedGuide: "link-performance-appraisal-to-pay",
  // The Enhance page's approved closing headline (enhance.md §13) in Indonesian, and the line under it restating
  // §11's first step. The label falls back to the global one.
  closing: {
    title: ["Buat kinerja terlihat.", "Buat keputusan lebih jelas."],
    lede: "Jadwalkan panggilan 30 menit, dan kami akan mulai dengan tinjauan singkat tentang cara appraisal Anda berjalan hari ini.",
    cta: { label: "Jadwalkan panggilan 30 menit", href: "/solutions/enhance#book-a-call" },
  },
};
