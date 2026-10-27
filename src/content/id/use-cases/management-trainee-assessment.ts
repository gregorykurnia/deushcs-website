import { GBA_FROM_PRICE } from "@/content/prices";
import type { UseCaseContent } from "../../types";
import { formatIDR } from "@/lib/format";

// Use case: Asesmen Management Trainee, from content/id/use-cases/management-trainee-assessment.md (Task G4.3,
// SEO/geo-implementation-plan.md §S12), which wins on wording. The facts are the English page's; the search phrase
// "asesmen management trainee" is in the H1 and the answer passage. The `> Note:` lines are dropped, and the
// download offer is the shared block (`offer`). Telkom stays "a national telecom group" (never named in the copy).
// Registered only while `showIndonesianLeadPages` is on.

const gba = "/solutions/game-based-assessment";

export const managementTraineeId: UseCaseContent = {
  meta: {
    title: "Asesmen Management Trainee: Rekrutmen MT Berbasis Game",
    description:
      "Asesmen Management Trainee untuk perusahaan di Indonesia: game Cognitive dan Neuroscience untuk menyaring peserta, simulasi bisnis untuk finalis, hasil keluar begitu peserta selesai.",
  },
  slug: "management-trainee-assessment",
  product: { name: "Game-Based Assessment", path: gba },
  whatsapp: "assessment",
  breadcrumb: "Asesmen Management Trainee",
  hero: {
    eyebrow: "Kasus penggunaan · Game-Based Assessment",
    title: "Asesmen Management Trainee",
    passage:
      "DEUS menjalankan asesmen Management Trainee untuk perusahaan di Indonesia lewat game singkat yang dimainkan di browser. Modul Cognitive dan Neuroscience menyaring peserta MT dalam jumlah besar dengan cepat dan adil, lalu Simulation bisnis menguji para finalis. Penilaian berjalan otomatis dan setiap asesmen dinormakan pada populasi Indonesia. Sebuah grup telekomunikasi nasional memakai DEUS untuk menilai lebih dari 1.000 kandidat MT di 30+ provinsi sekaligus.",
    cta: { label: "Minta uji coba gratis", href: "/contact?product=gba" },
    screens: [
      {
        image: "gbaNumerical",
        title: "Memainkan game kognitif",
        alt: "Layar game kognitif: balok angka di atas gerobak, dan target yang harus dicapai.",
      },
      {
        image: "gbaBatchReport",
        title: "Meranking seluruh peserta",
        alt: "Batch report Game-Based Assessment: ringkasan satu kohort dengan skor untuk setiap domain.",
      },
    ],
  },
  problem: {
    eyebrow: "Masalahnya",
    title: "Rekrutmen MT dengan pelamar membeludak, waktu untuk memilih sangat sedikit.",
    lede: "Program Management Trainee menarik banyak pelamar, dan tim seleksi hanya punya waktu singkat untuk mengubahnya menjadi daftar pendek yang bisa dipertanggungjawabkan. Alat yang biasa dipakai justru mempersulit.",
    items: [
      {
        title: "Kandidat belajar untuk tesnya",
        body: "Jawaban tes kepribadian yang umum mudah dicari di internet. Hasilnya akhirnya mengukur seberapa baik seseorang berlatih, bukan siapa dia sebenarnya.",
      },
      {
        title: "Tes di atas kertas tidak menunjukkan cara berpikir di bawah tekanan",
        body: "Soal-soal abstrak hampir tidak menjelaskan bagaimana calon manajer bernalar saat waktu mepet dan taruhannya nyata.",
      },
      {
        title: "Kandidat yang bagus berhenti di tengah jalan",
        body: "Asesmen yang panjang dan monoton membuat orang menyerah sebelum selesai, dan sebagian dari mereka justru yang Anda cari.",
      },
      {
        title: "Menilai manual menahan seluruh proses",
        body: "Tim HR Anda menghabiskan berhari-hari untuk menilai, merekap, dan merapikan hasil, sementara kandidat menunggu.",
      },
    ],
  },
  how: {
    eyebrow: "Cara DEUS bekerja",
    title: "Saring dengan dua modul. Pilih finalis dengan modul ketiga.",
    lede: "Untuk rekrutmen MT, kami menyarankan Cognitive dan Neuroscience di tahap pertama, lalu Simulation di tahap akhir. Anda bisa mulai dari satu modul dan menambah modul lain nanti.",
    items: [
      {
        title: "Tahap pertama: Cognitive",
        body: "Tujuh game singkat berwaktu tentang kecepatan pemrosesan, memori kerja, penalaran, dan lainnya. Game ini menangkap kecepatan dan konsistensi, bukan hanya jawaban benar, dan memberi Anda tolok ukur learning agility.",
        link: { label: "Modul Cognitive", href: `${gba}#cognitive` },
      },
      {
        title: "Tahap pertama: Neuroscience",
        body: "Enam game yang menunjukkan motivasi, kecenderungan mengambil risiko, alokasi usaha, dan pengenalan emosi lewat perilaku yang tidak dikendalikan orang secara sadar. Semua itu mudah salah dinilai dalam wawancara satu jam.",
        link: { label: "Modul Neuroscience", href: `${gba}#neuro` },
      },
      {
        title: "Tahap akhir: Simulation",
        body: "Dua skenario bisnis. Para finalis mempelajari kasus dan menulis laporan bisnis, lalu mengalokasikan anggaran dengan timer yang berjalan. Setiap finalis mendapat skenario yang sama, disusun sesuai industri Anda, tanpa biaya menyelenggarakan assessment center.",
        link: { label: "Modul Simulation", href: `${gba}#simulation` },
      },
    ],
  },
  runs: {
    eyebrow: "Cara menjalankannya",
    title: "Dari daftar pelamar sampai daftar pendek berperingkat, tanpa menilai manual.",
    steps: [
      {
        title: "Undang",
        body: "Unggah seluruh peserta dari satu file CSV. Undangan bermerek terkirim otomatis, dan kandidat yang belum mulai menerima pengingat.",
      },
      {
        title: "Mulai dengan aman",
        body: "Pengecekan perangkat dan logika anti-curang berjalan sebelum game pertama. Kandidat bermain di browser ponsel atau laptop, tanpa perlu mengunduh apa pun.",
      },
      {
        title: "Main",
        body: "Peserta mengerjakan game kognitif dan neuroscience, dan finalis mengerjakan simulasi. Anda bisa melihat siapa yang sudah mulai, siapa yang sudah selesai, dan siapa yang belum membuka undangan.",
      },
      {
        title: "Putuskan",
        body: "Laporan siap begitu kandidat selesai. Batch report meranking seluruh peserta, menandai semua yang berada di bawah skor batas Anda, dan merangkum setiap jalur posisi.",
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
    title: "Pertanyaan seputar asesmen peserta Management Trainee.",
    items: [
      {
        question: "Berapa banyak kandidat Management Trainee yang bisa dinilai sekaligus?",
        answer:
          "Sebanyak yang dibutuhkan rekrutmen Anda, pada saat yang sama. Sebuah grup telekomunikasi nasional memakai DEUS untuk menilai lebih dari 1.000 kandidat Management Trainee di 30+ provinsi sekaligus, dengan hasil dalam sehari, dua tahun berturut-turut. Platform mengirim undangan dan pengingat, memantau progres, dan membuat laporan, jadi rekrutmen skala nasional tidak berarti menambah orang di tim HR Anda.",
      },
      {
        question: "Modul apa yang sebaiknya dipakai untuk rekrutmen Management Trainee?",
        answer:
          "Cognitive dan Neuroscience di tahap pertama, lalu Simulation di tahap akhir. Dua modul pertama menyaring pelamar dalam jumlah besar dengan cepat dan adil. Simulation kemudian menunjukkan bagaimana tiap finalis menganalisis kasus bisnis, menentukan prioritas, dan mengalokasikan anggaran di bawah tekanan waktu yang nyata. Anda bisa mulai dari satu modul dan menambah modul lain nanti.",
      },
      {
        question: "Seberapa cepat hasilnya keluar?",
        answer:
          "Skor dan laporan dibuat begitu setiap kandidat selesai, jadi tidak ada orang di tim Anda yang menilai manual. Batch report meranking seluruh peserta dan menandai semua yang berada di bawah skor batas Anda. Jika Anda menambahkan modul Personality, profilnya siap di hari yang sama atau keesokan harinya.",
      },
      {
        question: "Apakah kandidat bisa curang atau menghafal jawabannya?",
        answer:
          "Tidak mudah. Setiap sesi dimulai dengan pengecekan perangkat dan logika anti-curang. Karena game mengukur perilaku, bukan jawaban, hampir tidak ada yang bisa dicari atau dihafal. Kandidat tidak bisa memalsukan cara mereka bermain: setiap pilihan, setiap keraguan, dan setiap reaksi di bawah tekanan waktu menjadi data.",
      },
      {
        question: "Berapa biaya asesmen Management Trainee?",
        answer: `Harga mulai dari ${formatIDR(GBA_FROM_PRICE, "id")} per kandidat, dan harga per kandidat makin murah seiring bertambahnya volume. Anda hanya membayar modul yang Anda pilih, tanpa kontrak jangka panjang, jadi Anda bisa membayar per batch. Minta penawaran, dan kami akan menghitungnya untuk rekrutmen Anda.`,
      },
    ],
  },
  // as in English; it shows only while the guide has an Indonesian version (RelatedGuide)
  relatedGuide: "management-trainee-recruitment",
  // The Telkom story's approved closing (clients-telkom-group.md §8, R17 F86), in Indonesian.
  closing: {
    label: "Sedang menyiapkan rekrutmen?",
    title: "Menjalankan rekrutmen MT atau rekrutmen kampus?",
    lede: "Kami akan tunjukkan bagaimana rekrutmen skala nasional berjalan di DEUS, dari unggahan pertama sampai daftar akhir berperingkat.",
    cta: { label: "Minta demo", href: "/contact?product=gba" },
  },
};
