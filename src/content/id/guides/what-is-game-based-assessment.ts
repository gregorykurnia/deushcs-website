import { gbaEn } from "../../en/game-based-assessment";
import type { GuideContent } from "../../types";
import { formatIDR } from "@/lib/format";

// Guide 1 in Indonesian: Apa itu asesmen berbasis game?, from content/id/guides/what-is-game-based-assessment.md (Task G4.4,
// SEO/geo-implementation-plan.md §S9 and §S12), which wins on wording. The facts are the English guide's; the search phrase
// "asesmen berbasis game" is in the H1 and the answer. The `> Note:` lines, "Sumber fakta" and italics are dropped, the download
// offer is the shared block (`nextStep.offer`) and the closing is the default one. The SEO title loses its " | DEUS" tail.
// Telkom stays "a national telecom group" (never named), the price is the GBA page's own amount through `formatIDR`.
// Registered only while `showIndonesianLeadPages` is on (src/content/guides/index.ts).

const gba = "/solutions/game-based-assessment";
const price = formatIDR(gbaEn.pricing.from.amount, "id");

export const whatIsGbaId: GuideContent = {
  meta: {
    title: "Apa Itu Asesmen Berbasis Game? Panduan untuk Tim HR di Indonesia",
    description:
      "Apa itu asesmen berbasis game, bagaimana game mengukur kepribadian dan cara berpikir, apa kata riset sejauh ini, dan kapan tim HR di Indonesia sebaiknya memakainya.",
  },
  slug: "what-is-game-based-assessment",
  published: true,
  product: { name: "Game-Based Assessment", path: gba },
  whatsapp: "assessment",
  breadcrumb: "Apa itu asesmen berbasis game?",
  contactHref: "/contact?product=gba",
  dates: { published: "2026-10-23", updated: "2026-10-23" },
  author: "DEUS Human Capital Services",
  header: {
    eyebrow: "Panduan · Asesmen berbasis game",
    title: "Apa itu asesmen berbasis game? Panduan untuk tim HR di Indonesia",
    answer:
      "Asesmen berbasis game mengukur cara seorang kandidat berpikir dan bertindak dengan mengamati mereka memainkan game singkat, bukan dengan meminta mereka menggambarkan diri sendiri di kuesioner. Setiap pilihan, setiap keraguan, dan setiap reaksi di bawah tekanan waktu dinilai terhadap sifat atau kemampuan yang hendak diukur oleh game tersebut. Bagi tim HR, artinya data yang sulit dilatih lebih dulu oleh kandidat, dinilai otomatis, untuk jumlah peserta berapa pun.",
    keyPoints: [
      "Asesmen berbasis game menyimpulkan sifat seseorang dari cara ia bermain. Ini bukan kuesioner yang ditambahi poin dan lencana.",
      "Asesmen yang baik disusun seperti tes psikometri mana pun: teori dulu, lalu desain game, validasi, dan norma untuk populasi yang jelas.",
      "Riset sejauh ini menemukan bahwa kandidat cenderung bereaksi sedikit lebih baik terhadap asesmen berbasis game dan gamifikasi dibanding asesmen tradisional. Bukti tentang kemampuan memprediksi dan tentang kecurangan masih muda, jadi mintalah setiap vendor menunjukkan validasinya sendiri.",
      "Paling cocok saat jumlah peserta besar dan waktu sempit: rekrutmen Management Trainee, rekrutmen kampus, dan talent mapping internal.",
    ],
  },
  nextStep: {
    text: "Sedang menjalankan rekrutmen Management Trainee?",
    link: { label: "Lihat cara DEUS melakukan asesmennya", href: "/solutions/management-trainee-assessment" },
    offer: true,
    useCase: "management-trainee-assessment",
  },
  sections: [
    {
      id: "what-counts",
      title: "Apa yang disebut asesmen berbasis game?",
      blocks: [
        { type: "paragraph", text: "Tiga istilah sering tertukar, dan perbedaannya penting saat Anda membandingkan vendor. Tinjauan sistematis tahun 2022 atas 34 studi tentang asesmen terkait game untuk perekrutan membedakannya begini:" },
        {
          type: "list",
          items: [
            "**Asesmen berbasis game** adalah metode asesmen tersendiri. Ia mengukur sifat dan kemampuan yang berkaitan dengan pekerjaan lewat game.",
            "**Gamifikasi** mengambil tes yang sudah ada lalu menambahkan elemen game, seperti poin, cerita, atau bilah kemajuan. Tes di baliknya sebagian besar tetap sama.",
            "**Gameful design** memakai elemen game untuk membangun asesmen baru dari awal.",
          ],
        },
        { type: "paragraph", text: "Jadi kuesioner kepribadian dengan bilah kemajuan dan pemandu kartun tetaplah kuesioner. Kandidat tetap menilai diri sendiri, dan tetap bisa menebak jawaban apa yang diinginkan perusahaan. Pada asesmen berbasis game yang sebenarnya, tidak ada pernyataan untuk disetujui atau tidak disetujui. Game mencatat apa yang dilakukan kandidat." },
        { type: "paragraph", text: "Ketika vendor mengaku \"gamifikasi\", tanyakan yang mana dari ketiganya yang dimaksud." },
      ],
    },
    {
      id: "how-it-measures",
      title: "Bagaimana sebuah game mengukur suatu sifat?",
      blocks: [
        { type: "paragraph", text: "Setiap game berangkat dari sifat atau kemampuan yang sudah didefinisikan riset, dan dari wujud sifat itu dalam perilaku. Game dirancang untuk memunculkan perilaku tersebut, lalu mencatat jauh lebih banyak daripada jawaban benar atau salah: seberapa cepat seseorang merespons, seberapa konsisten, dan bagaimana ia bereaksi saat waktu menipis." },
        { type: "paragraph", text: "Contoh riset yang terkenal adalah Balloon Analogue Risk Task. Peserta mendapat uang untuk setiap pompaan balon virtual, dan kehilangan uang balon itu jika balonnya meletus. Dalam studi aslinya dengan 86 peserta, seberapa jauh orang berani memaksakan peruntungan berkaitan dengan pencarian sensasi, impulsivitas, dan perilaku berisiko yang mereka laporkan sendiri dalam kehidupan nyata, di luar yang bisa dijelaskan oleh data demografis dan kuesioner." },
        { type: "paragraph", text: "Rangkaian DEUS bekerja dengan prinsip yang sama lewat empat modul:" },
        {
          type: "table",
          caption: "Keempat modul asesmen berbasis game DEUS",
          columns: ["Modul", "Format", "Yang ditunjukkan"],
          rows: [
            [
              "Personality (DEUS Discover)",
              "Cerita bergaya RPG tempat kandidat mengambil keputusan seiring alurnya",
              "32 subsifat kepribadian dan 24 sifat kompetensi, ditambah kompetensi dari kerangka milik Anda sendiri",
            ],
            [
              "Cognitive",
              "Tujuh game singkat berwaktu",
              "Kecepatan pemrosesan, memori kerja, pengenalan pola, aritmetika, penalaran spasial dan logis, ketangkasan kognitif",
            ],
            [
              "Neuroscience",
              "Enam game yang diadaptasi dari riset neurosains, termasuk Balloon Game",
              "Pengambilan risiko, perencanaan, motivasi, alokasi usaha, ketelitian, dan pengenalan emosi",
            ],
            [
              "Simulation",
              "Dua skenario bisnis, disusun sesuai industri Anda",
              "Berpikir analitis, kecakapan bisnis, pengumpulan informasi, dan sintesis tertulis, dengan pengatur waktu langsung",
            ],
          ],
        },
      ],
    },
    {
      id: "science",
      title: "Apa landasan ilmiahnya?",
      blocks: [
        { type: "paragraph", text: "Asesmen berbasis game mengumpulkan bukti bagi teori-teori kepribadian dan kecerdasan yang sudah mapan dengan cara baru. Tiga tradisi riset berada di baliknya." },
        { type: "paragraph", text: "**Kepribadian.** Sebagian besar ukuran kepribadian bertumpu pada model Big Five: openness, conscientiousness, extraversion, agreeableness, dan neuroticism, yang kebalikannya adalah stabilitas emosi. Tinjauan tahun 2019 atas 92 meta-analisis menemukan bahwa conscientiousness adalah prediktor non-kognitif terkuat untuk kinerja di tempat kerja. DEUS Discover dibangun di atas Big Five dan Universal Competency Framework." },
        { type: "paragraph", text: "**Cara berpikir.** Tes kemampuan kognitif masih termasuk prediktor tunggal kinerja kerja yang lebih baik. Analisis ulang riset seleksi tahun 2022 menempatkan validitasnya di 0,31. Analisis itu juga menempatkan wawancara terstruktur di urutan pertama, di 0,42, dan menemukan bahwa studi-studi terdahulu melebih-lebihkan validitas sebagian besar metode seleksi. Game kognitif DEUS berpijak pada kerangka klasik untuk kecepatan pemrosesan, memori, penalaran, dan atensi." },
        { type: "paragraph", text: "**Perilaku.** Riset neurosains punya daftar panjang tugas perilaku, seperti tugas balon di atas, yang menyingkap pengambilan risiko, motivasi, usaha, dan pengenalan emosi lewat apa yang dilakukan orang, bukan apa yang mereka katakan. Modul Neuroscience DEUS mengadaptasi tugas semacam ini." },
        { type: "paragraph", text: "**Validitas dan norma.** Standards for Educational and Psychological Testing memandang validitas sebagai bukti bahwa skor mendukung penggunaan yang Anda tujukan, dan menyatakan bahwa norma harus berasal dari populasi yang ingin Anda jadikan pembanding kandidat. Untuk kandidat di Indonesia, itu berarti norma Indonesia. Norma Barat membandingkan kandidat Anda dengan orang yang pendidikan, bahasa, dan budayanya berbeda. Setiap asesmen DEUS melewati empat fase (teori, pengembangan butir, validasi, dan penormaan), dibimbing oleh psikometrisi dan peneliti psikologi industri dan organisasi, dan dinormakan pada populasi Indonesia. Game kognitif kami telah divalidasi terhadap tes kognitif tradisional." },
      ],
    },
    {
      id: "research",
      title: "Apa kata riset sejauh ini?",
      blocks: [
        { type: "paragraph", text: "Berhati-hatilah terhadap siapa pun yang menyebut persoalannya sudah selesai. Tinjauan sistematis tahun 2022 adalah ringkasan paling lengkap sejauh ini, dan ia terus terang:" },
        {
          type: "list",
          items: [
            "**Reaksi kandidat** adalah area yang paling banyak diteliti, dan paling positif. Kandidat cenderung lebih menghargai asesmen terkait game dibanding asesmen konvensional, meski selisihnya kecil, dan keuntungan paling jelas ada pada seberapa menarik mereka menilai pemberi kerja. Bila reaksinya negatif, penyebabnya biasanya masalah teknis, bukan asesmennya.",
            "**Prediksi:** asesmen terkait game dapat memprediksi kinerja, tetapi tinjauan itu belum menemukan bukti bahwa prediksinya lebih baik daripada metode lain.",
            "**Kecurangan:** klaim bahwa game mengurangi kecurangan masih kurang didukung bukti kuat. Hanya satu studi yang pernah mengujinya langsung, dan hasilnya positif.",
            "**Keadilan:** sejauh ini asesmen ini tidak menunjukkan dampak merugikan (adverse impact) yang lebih besar daripada tes konvensional, meski itu bergantung pada apa yang diukur.",
          ],
        },
        { type: "paragraph", text: "Eksperimen terpisah dengan tes penilaian situasional (situational judgment test) yang digamifikasi menemukan bahwa pelamar melaporkan kepuasan lebih tinggi terhadap prosesnya, menilainya lebih adil, dan menganggap perusahaannya lebih menarik dibanding versi teks dari tes yang sama." },
        { type: "paragraph", text: "Artinya dalam praktik: asesmen berbasis game adalah tahap pertama yang kuat untuk rekrutmen besar, karena cepat, dinilai otomatis, dan diterima dengan baik. Perlakukan ia sebagai satu bagian dari proses seleksi, bukan seluruhnya, dan mintalah bukti validasi untuk penggunaan Anda dari setiap vendor." },
      ],
    },
    {
      id: "when-to-use",
      title: "Kapan sebaiknya Anda memakai asesmen berbasis game?",
      blocks: [
        { type: "paragraph", text: "Ia paling berguna saat Anda punya banyak kandidat, waktu sedikit, dan keputusan yang harus bisa dipertanggungjawabkan. Berikut tempat klien DEUS memakainya:" },
        {
          type: "list",
          items: [
            "**Rekrutmen Management Trainee:** Cognitive dan Neuroscience untuk menyaring peserta, Simulation untuk babak akhir. Sebuah grup telekomunikasi nasional memakai DEUS untuk menilai lebih dari 1.000 kandidat Management Trainee di 30+ provinsi sekaligus, dengan hasil dalam satu hari.",
            "**Rekrutmen kampus dan lulusan baru:** Personality dan Cognitive memberi peringkat yang jelas di antara pelamar dalam jumlah besar.",
            "**Pemetaan kompetensi dan talent mapping:** cocokkan profil tiap orang dengan kerangka kompetensi Anda dan lihat kesenjangannya.",
            "**Identifikasi pemimpin:** data modul Neuroscience tentang risiko, motivasi, dan pengenalan emosi sangat berguna untuk menemukan calon supervisor dan manajer.",
            "**Promosi, rotasi, dan mutasi:** periksa kecocokan untuk peran baru dengan bukti yang sama seperti yang Anda pakai untuk kandidat dari luar.",
          ],
        },
        { type: "paragraph", text: "Untuk satu posisi senior, wawancara terstruktur yang dijalankan dengan baik mungkin sudah memberi sebagian besar yang Anda perlukan." },
      ],
    },
    {
      id: "choose-a-provider",
      title: "Apa yang perlu Anda periksa sebelum memilih penyedia?",
      blocks: [
        { type: "paragraph", text: "Pedoman ITC dan ATP, Guidelines for Technology-Based Assessment (2022), membahas asesmen yang digamifikasi bersama semua tes digital lain. Kekhawatiran utamanya adalah validitas, keadilan, aksesibilitas, keamanan, dan privasi. Diterjemahkan menjadi pertanyaan untuk vendor:" },
        {
          type: "list",
          ordered: true,
          items: [
            "**Apa yang diukur tiap game, dan bagaimana divalidasi?** Anda berhak mendapat jawaban yang jelas untuk setiap skor di laporan.",
            "**Norma berdasarkan siapa?** Untuk kandidat Indonesia, mintalah norma Indonesia.",
            "**Bagaimana kecurangan ditangani?** Tanyakan soal pemeriksaan perangkat dan logika anti-curang.",
            "**Apa yang dibutuhkan kandidat?** Tanyakan apakah perlu aplikasi atau perangkat tertentu. DEUS berjalan di browser ponsel atau laptop mana pun tanpa perlu memasang apa pun.",
            "**Seberapa cepat hasilnya, dan bisakah dicoba dulu?** Di DEUS, skor dan laporan siap begitu tiap kandidat selesai. Anda bisa mulai dengan uji coba gratis atau pilot di satu divisi, tanpa kontrak jangka panjang.",
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    title: "Pertanyaan tentang asesmen berbasis game.",
    items: [
      {
        question: "Apakah asesmen berbasis game sama dengan tes yang digamifikasi?",
        answer:
          "Tidak selalu. Tes yang digamifikasi menambahkan elemen game ke kuesioner yang sudah ada, sehingga kandidat tetap menilai diri sendiri. Asesmen berbasis game mengukur sifat dari cara kandidat bermain. Tanyakan kepada setiap vendor mana dari keduanya yang mereka tawarkan.",
      },
      {
        question: "Bisakah kandidat berlatih untuk asesmen berbasis game?",
        answer:
          "Tidak mudah. Game mengukur perilaku, bukan jawaban, sehingga hampir tidak ada yang bisa dicari atau dihafalkan. Setiap sesi DEUS juga diawali pemeriksaan perangkat dan logika anti-curang. Riset independen tentang kecurangan di game masih terbatas, jadi tanyakan kepada penyedia mana pun apa yang sudah mereka uji.",
      },
      {
        question: "Apakah ini menggantikan wawancara?",
        answer:
          "Tidak. Paling baik dipakai sebagai tahap pertama, untuk menyaring peserta dalam jumlah besar dengan cepat dan adil. Riset seleksi menempatkan wawancara terstruktur di antara prediktor kinerja kerja yang terkuat, jadi sisakan satu untuk para finalis Anda.",
      },
      {
        question: "Berapa biayanya?",
        answer:
          `Harga DEUS mulai dari ${price} per kandidat dan makin rendah seiring bertambahnya volume. Anda hanya membayar modul yang Anda pilih.`,
      },
    ],
  },
  sources: [
    {
      label:
        "Ramos-Villagrasa, Fernández-del-Río and Castro (2022), \"Game-related assessments for personnel selection: A systematic review,\" Frontiers in Psychology (dalam bahasa Inggris)",
      href: "https://doi.org/10.3389/fpsyg.2022.952002",
    },
    {
      label:
        "Lejuez et al. (2002), \"Evaluation of a behavioral measure of risk taking: The Balloon Analogue Risk Task (BART),\" Journal of Experimental Psychology: Applied (dalam bahasa Inggris)",
      href: "https://researchconnect.stonybrook.edu/en/publications/evaluation-of-a-behavioral-measure-of-risk-taking-the-balloon-ana/",
    },
    {
      label:
        "Kepribadian Big Five, Wikipedia bahasa Indonesia",
      href: "https://id.wikipedia.org/wiki/Kepribadian_Big_Five",
    },
    {
      label:
        "The Big Five personality traits, Wikipedia (dalam bahasa Inggris, memuat stabilitas emosi)",
      href: "https://en.wikipedia.org/wiki/Big_Five_personality_traits",
    },
    {
      label:
        "Wilmot and Ones (2019), \"A century of research on conscientiousness at work,\" PNAS, dilaporkan oleh University of Toronto (dalam bahasa Inggris)",
      href: "https://utoronto.ca/news/being-conscientious-one-strongest-predictors-success-workplace-u-t-study-finds",
    },
    {
      label:
        "O'Shea and Fox Luscombe, \"Is cognitive ability the best predictor of job performance?\", tentang Sackett, Zhang, Berry and Lievens (2022), TIP, SIOP (dalam bahasa Inggris)",
      href: "https://www.siop.org/tip-article/is-cognitive-ability-the-best-predictor-of-job-performance",
    },
    {
      label:
        "AERA, APA and NCME (2014), Standards for Educational and Psychological Testing (akses terbuka, dalam bahasa Inggris)",
      href: "https://www.testingstandards.net/open-access-files.html",
    },
    {
      label:
        "Georgiou and Nikolaou (2020), \"Are applicants in favor of traditional or gamified assessment methods?\", Computers in Human Behavior (dalam bahasa Inggris)",
      href: "https://doi.org/10.1016/j.chb.2020.106356",
    },
    {
      label:
        "International Test Commission and Association of Test Publishers (2022), Guidelines for Technology-Based Assessment (dalam bahasa Inggris)",
      href: "https://www.intestcom.org/upload/media-library/guidelines-for-technology-based-assessment-v20221108-16684036687NAG8.pdf",
    },
  ],
  cta: {
    text: "Lihat apa yang diukur setiap dari keempat modul, dan seperti apa laporannya.",
    link: { label: "Lihat keempat modul", href: gba },
  },
  related: [
    "game-based-assessment-vs-psychometric-tests",
    "management-trainee-recruitment",
    "campus-recruitment-screening",
  ],
  // the default closing section and contact bar (messages/id.json, "Closing")
  closing: {},
};
