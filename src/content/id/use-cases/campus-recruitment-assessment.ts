import type { UseCaseContent } from "../../types";

// Use case: Asesmen rekrutmen kampus, from content/id/use-cases/campus-recruitment-assessment.md (Task G4.3,
// SEO/geo-implementation-plan.md §S12), which wins on wording. The facts are the English page's; the search phrase
// "rekrutmen kampus" is in the H1 and the answer passage. The `> Note:` lines are dropped, and the download offer
// is the shared block (`offer`). No client story is about a campus drive, so the proof has no story card. The
// closing is the Telkom story's approved one, as on the Management Trainee page.
// Registered only while `showIndonesianLeadPages` is on.

const gba = "/solutions/game-based-assessment";

export const campusRecruitmentId: UseCaseContent = {
  meta: {
    title: "Asesmen Rekrutmen Kampus: Menyaring Lulusan dalam Jumlah Besar",
    description:
      "Saring lulusan dari banyak universitas lewat game Personality dan Cognitive di browser. Peringkat yang jelas dan bisa dipertanggungjawabkan, dinilai otomatis dan dinormakan pada populasi Indonesia.",
  },
  slug: "campus-recruitment-assessment",
  product: { name: "Game-Based Assessment", path: gba },
  whatsapp: "assessment",
  breadcrumb: "Asesmen rekrutmen kampus",
  hero: {
    eyebrow: "Kasus penggunaan · Game-Based Assessment",
    title: "Asesmen rekrutmen kampus",
    passage:
      "DEUS menjalankan asesmen rekrutmen kampus untuk perusahaan di Indonesia yang merekrut lulusan dalam jumlah besar. Pelamar dari banyak universitas memainkan game Personality dan Cognitive yang singkat di browser ponsel atau laptop, tanpa aplikasi untuk dipasang. Hasilnya berupa peringkat yang jelas dan bisa dipertanggungjawabkan untuk kandidat yang CV-nya mirip. Penilaian berjalan otomatis, dan setiap skor dinormakan pada populasi Indonesia.",
    cta: { label: "Minta uji coba gratis", href: "/contact?product=gba" },
    screens: [
      {
        image: "discoverFestival",
        title: "Memainkan DEUS Discover",
        alt: "Layar pembuka DEUS Discover, Heroes of a Fallen Land, dengan tombol Begin Adventure.",
      },
      {
        image: "gbaNumerical",
        title: "Memainkan game kognitif",
        alt: "Layar game kognitif: balok angka di atas gerobak, dan target yang harus dicapai.",
      },
    ],
  },
  problem: {
    eyebrow: "Masalahnya",
    title: "Ratusan lulusan, dan CV yang mirip satu sama lain.",
    lede: "Rekrutmen kampus mendatangkan pelamar dalam jumlah besar dari banyak universitas. Di atas kertas, banyak dari mereka tampak sama, dan alat penyaringan yang biasa dipakai tidak membedakan mereka dengan baik.",
    items: [
      {
        title: "CV tidak membedakan mereka",
        body: "Jurusan, IPK, dan kegiatannya sering mirip, jadi CV saja nyaris tak memberi dasar untuk meranking.",
      },
      {
        title: "Kandidat belajar untuk psikotes",
        body: "Jawaban tes kepribadian yang umum mudah dicari di internet. Hasilnya akhirnya mengukur seberapa baik seseorang berlatih, bukan siapa dia sebenarnya.",
      },
      {
        title: "Kandidat yang bagus berhenti di tengah jalan",
        body: "Asesmen yang panjang dan monoton membuat orang menyerah sebelum selesai.",
      },
      {
        title: "Menilai manual memperlambat rekrutmen",
        body: "Tim HR Anda menghabiskan berhari-hari untuk menilai, merekap, dan merapikan hasil, sementara kandidat menunggu.",
      },
    ],
  },
  how: {
    eyebrow: "Cara DEUS bekerja",
    title: "Personality dan Cognitive, untuk peringkat yang bisa Anda jelaskan.",
    lede: "Untuk rekrutmen kampus, kami memasangkan dua modul. Bersama-sama keduanya menunjukkan siapa setiap lulusan dan bagaimana ia berpikir, sehingga daftar pendek bertumpu pada lebih dari sekadar CV.",
    items: [
      {
        title: "Personality · DEUS Discover",
        body: "Kandidat mengambil keputusan di dalam cerita bergaya RPG. Pilihan mereka membentuk profil 32 subtrait kepribadian dan 24 trait kompetensi berdasarkan model Big Five (OCEAN), diukur terhadap kompetensi yang dibutuhkan tiap posisi. Tidak ada jawaban benar yang jelas untuk dikejar.",
        link: { label: "Modul Personality", href: `${gba}#personality` },
      },
      {
        title: "Cognitive",
        body: "Tujuh game singkat berwaktu tentang kecepatan pemrosesan, memori kerja, penalaran, dan lainnya. Game ini mengukur akurasi dan kecepatan secara real time, memberi Anda tolok ukur learning agility, dan bisa dijalankan untuk sebanyak apa pun kandidat yang Anda butuhkan sekaligus.",
        link: { label: "Modul Cognitive", href: `${gba}#cognitive` },
      },
    ],
    note: {
      text: "Pasangan yang sama berlaku untuk posisi apa pun dengan pelamar dalam jumlah besar. Sedang menyeleksi program Management Trainee?",
      link: { label: "Asesmen Management Trainee", href: "/solutions/management-trainee-assessment" },
    },
  },
  runs: {
    eyebrow: "Cara menjalankannya",
    title: "Satu unggahan untuk setiap universitas di daftar Anda.",
    steps: [
      {
        title: "Undang",
        body: "Tambahkan semua pelamar dari satu file CSV, dari kampus mana pun mereka melamar. Undangan bermerek terkirim otomatis, dan kandidat yang belum mulai menerima pengingat.",
      },
      {
        title: "Mulai dengan aman",
        body: "Pengecekan perangkat dan logika anti-curang berjalan sebelum game pertama. Kandidat bermain di ponsel atau laptop mereka sendiri, di browser, tanpa perlu mengunduh apa pun.",
      },
      {
        title: "Main",
        body: "Mereka mengerjakan cerita dan game kognitif. Kandidat pulang dengan kesan bahwa perusahaan Anda modern dan serius soal talenta.",
      },
      {
        title: "Putuskan",
        body: "Laporan siap begitu kandidat selesai. Batch report meranking setiap pelamar dan menandai yang berada di bawah skor batas Anda, dan lewat dashboard interaktif, komite rekrutmen Anda bisa menyaring berdasarkan rentang skor dan membuka profil lengkap kandidat mana pun.",
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
    title: "Pertanyaan seputar asesmen rekrutmen kampus.",
    items: [
      {
        question: "Asesmen apa yang paling cocok untuk rekrutmen kampus?",
        answer:
          "Personality dan Cognitive bersama-sama. Rekrutmen kampus mendatangkan pelamar dalam jumlah besar dari banyak universitas, dengan CV yang mirip. Personality menunjukkan bagaimana perilaku tiap lulusan dan kompetensi apa yang ia bawa, sedangkan Cognitive mengukur kecepatan, akurasi, dan learning agility. Keduanya memberi Anda peringkat yang jelas dan bisa dipertanggungjawabkan. Anda bisa mulai dari satu modul dan menambahkan yang lain nanti.",
      },
      {
        question: "Apakah lulusan perlu memasang sesuatu?",
        answer:
          "Tidak. Asesmen berjalan di browser ponsel atau desktop, jadi kandidat mengerjakannya di ponsel atau laptop mereka sendiri. Mereka hanya perlu koneksi internet yang stabil. Pengecekan perangkat dan logika anti-curang berjalan sebelum game pertama, dan tidak ada yang perlu diunduh.",
      },
      {
        question: "Berapa banyak pelamar yang bisa ditangani sekaligus?",
        answer:
          "Sebanyak yang Anda butuhkan. Sebuah grup telekomunikasi nasional memakai DEUS untuk menilai lebih dari 1.000 kandidat Management Trainee di 30+ provinsi sekaligus, dengan hasil dalam sehari. Platform mengirim undangan dan pengingat, memantau siapa yang sudah selesai, dan membuat setiap laporan, jadi rekrutmen kampus berskala besar tidak berarti menambah orang di tim HR Anda.",
      },
      {
        question: "Apakah kandidat akan menikmatinya?",
        answer:
          "Game memang dibuat untuk itu: lebih cepat dan menarik daripada kuesioner panjang, yang sering ditinggalkan kandidat di tengah jalan. Kandidat pulang dengan kesan bahwa perusahaan Anda modern dan serius soal talenta, dan peserta pernah mengatakan kepada kami bahwa rasanya sama sekali tidak seperti psikotes.",
      },
    ],
  },
  // as in English; it shows only while the guide has an Indonesian version (RelatedGuide)
  relatedGuide: "campus-recruitment-screening",
  // The Telkom story's approved closing (clients-telkom-group.md §8, R17 F86), in Indonesian, as on the Management Trainee page.
  closing: {
    label: "Sedang menyiapkan rekrutmen?",
    title: "Menjalankan rekrutmen MT atau rekrutmen kampus?",
    lede: "Kami akan tunjukkan setiap langkah rekrutmen skala nasional di DEUS, sampai daftar akhir berperingkat.",
    cta: { label: "Minta demo", href: "/contact?product=gba" },
  },
};
