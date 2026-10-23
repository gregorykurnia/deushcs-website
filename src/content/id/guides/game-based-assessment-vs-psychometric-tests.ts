import { gbaEn } from "../../en/game-based-assessment";
import type { GuideContent } from "../../types";
import { formatIDR } from "@/lib/format";

// Guide 2 in Indonesian: Asesmen berbasis game vs psikotes online dan psikotes tradisional, from
// content/id/guides/game-based-assessment-vs-psychometric-tests.md (Task G4.4, SEO/geo-implementation-plan.md §S9 and §S12), which
// wins on wording. The facts are the English guide's, plus one Indonesian source (test items shared online, section 3). The search
// phrases "asesmen berbasis game" and "psikotes online" are in the H1 and the answer. Kept as in guide 1's module: notes, "Sumber fakta"
// and italics dropped, the SEO title without its " | DEUS" tail, the download offer and the closing are the shared blocks. The
// comparison table's empty first header is "Faktor". Registered only while `showIndonesianLeadPages` is on.

const gba = "/solutions/game-based-assessment";
const price = formatIDR(gbaEn.pricing.from.amount, "id");

export const gbaVsPsychometricId: GuideContent = {
  meta: {
    title: "Asesmen Berbasis Game vs Psikotes Online: Perbandingan yang Jujur",
    description:
      "Perbandingan asesmen berbasis game dengan psikotes online dan psikotes tradisional dalam hal pemalsuan jawaban, peserta yang berhenti di tengah jalan, kecepatan, penilaian, dan pengalaman kandidat, serta kapan memakai masing-masing.",
  },
  slug: "game-based-assessment-vs-psychometric-tests",
  published: true,
  product: { name: "Game-Based Assessment", path: gba },
  whatsapp: "assessment",
  breadcrumb: "Asesmen berbasis game vs psikotes online",
  contactHref: "/contact?product=gba",
  dates: { published: "2026-10-23", updated: "2026-10-23" },
  author: "DEUS Human Capital Services",
  header: {
    eyebrow: "Panduan · Asesmen berbasis game",
    title: "Asesmen berbasis game vs psikotes online dan psikotes tradisional",
    answer:
      "Psikotes tradisional, termasuk psikotes online, meminta kandidat menilai diri sendiri atau menjawab butir soal yang punya jawaban benar. Asesmen berbasis game merekam apa yang mereka lakukan dalam game singkat: pilihan, kecepatan, dan reaksi mereka di bawah tekanan waktu. Game biasanya lebih cepat dinilai dan lebih disukai kandidat, sementara tes tradisional punya riwayat riset yang jauh lebih panjang. Pembagian yang masuk akal adalah memakai game untuk menyaring, lalu menyisakan wawancara terstruktur untuk keputusan akhir.",
    keyPoints: [
      "Kuesioner swanilai bisa dipalsukan: pelamar kerja menilai diri lebih tinggi daripada orang yang tidak sedang melamar, terutama pada conscientiousness dan stabilitas emosi.",
      "Game mengukur perilaku, jadi hampir tidak ada yang bisa dilatih. Riset independen tentang pemalsuan jawaban (faking) di game memang masih tipis.",
      "Kandidat cenderung bereaksi sedikit lebih baik terhadap asesmen berbasis game dan gamifikasi, dan memandang pemberi kerja lebih menarik.",
      "Tes tradisional punya riset validitas selama puluhan tahun. Asesmen berbasis game lebih muda, jadi mintalah validasi dari setiap vendor.",
      "Keduanya bisa dipakai bersama. Anda tidak perlu mengganti semuanya sekaligus.",
    ],
  },
  nextStep: {
    text: "Memilih tes untuk rekrutmen MT berikutnya?",
    link: { label: "Lihat cara DEUS melakukan asesmen Management Trainee", href: "/solutions/management-trainee-assessment" },
    offer: true,
    useCase: "management-trainee-assessment",
  },
  sections: [
    {
      id: "what-is-traditional",
      title: "Apa yang disebut psikotes online dan psikotes tradisional?",
      blocks: [
        { type: "paragraph", text: "Yang kami maksud dengan psikotes tradisional adalah salah satu dari dua jenis tes, atau keduanya:" },
        {
          type: "list",
          items: [
            "**Kuesioner kepribadian swanilai.** Kandidat membaca pernyataan seperti \"Saya senang bertemu orang baru\" dan menilai seberapa cocok tiap pernyataan dengan dirinya.",
            "**Tes kemampuan dengan jawaban benar.** Misalnya deret angka, analogi verbal, penalaran abstrak. Kandidat mengerjakan butir soal di atas kertas atau di layar, sering kali dengan batas waktu.",
          ],
        },
        { type: "paragraph", text: "Mengerjakannya online tidak mengubah jenisnya: psikotes online tetap kuesioner swanilai atau soal dengan jawaban benar, hanya dikerjakan di layar. Keduanya sudah dipahami dengan baik, dan yang terbaik di antaranya punya riset yang kuat. Masalah muncul ketika taruhannya tinggi dan jumlah pesertanya besar, yang menggambarkan sebagian besar rekrutmen Management Trainee dan rekrutmen kampus." },
      ],
    },
    {
      id: "how-they-compare",
      title: "Bagaimana perbandingannya?",
      blocks: [
        {
          type: "table",
          caption: "Psikotes tradisional dan asesmen berbasis game, dibandingkan faktor demi faktor",
          columns: ["Faktor", "Psikotes tradisional (termasuk online)", "Asesmen berbasis game"],
          rows: [
            [
              "Pemalsuan jawaban",
              "Penilaian diri bisa digeser ke arah yang diinginkan perusahaan, dan jawaban untuk tes yang umum hanya sekali cari di internet. Butir kemampuan bisa dilatih atau dihafalkan.",
              "Tidak ada pernyataan untuk disetujui dan tidak ada jawaban untuk dihafalkan. Datanya adalah cara kandidat bermain.",
            ],
            [
              "Berhenti di tengah jalan",
              "Tes yang panjang dan berulang membuat kandidat menyerah sebelum selesai.",
              "Game singkat dengan tujuan yang jelas.",
            ],
            [
              "Kecepatan",
              "Menilai, merekap, dan merapikan hasil bisa memakan waktu berhari-hari bagi tim HR.",
              "Skor dan laporan dibuat begitu tiap kandidat selesai.",
            ],
            [
              "Yang dinilai",
              "Jawaban benar atau salah, dan cara kandidat menggambarkan dirinya.",
              "Pilihan dan ketepatan, ditambah kecepatan, konsistensi, dan keraguan.",
            ],
            [
              "Pengalaman kandidat",
              "Sudah dikenal. Versi panjang bisa terasa berulang.",
              "Lebih disukai dalam riset, dan dinilai lebih adil.",
            ],
            [
              "Riwayat riset",
              "Puluhan tahun studi validitas dan norma yang dipublikasikan.",
              "Masih muda. Menjanjikan, tetapi masih dibangun.",
            ],
          ],
        },
        { type: "paragraph", text: "Baris-baris di atas perlu dijelaskan." },
        { type: "paragraph", text: "**Pemalsuan jawaban.** Meta-analisis atas 33 studi membandingkan skor kepribadian pelamar kerja dengan orang yang tidak sedang melamar apa pun. Pelamar mendapat skor lebih tinggi pada empat dari lima sifat Big Five. Selisih terbesar ada pada conscientiousness dan stabilitas emosi. Pada beberapa pekerjaan, seperti penjualan, pelamar menggelembungkan sifat yang tampak paling relevan dengan pekerjaan itu. Di Indonesia, sebuah studi kualitatif kecil berupa wawancara dengan satu psikolog melaporkan penjualan ilegal alat tes dan penyebaran butir soal di media sosial. Game menghilangkan pertanyaan yang memungkinkan hal ini. Namun agar adil terhadap buktinya: tinjauan sistematis tahun 2022 atas asesmen terkait game hanya menemukan satu studi yang menguji pemalsuan jawaban secara langsung. Hasilnya positif, tetapi tinjauan itu menyatakan klaimnya masih kurang didukung bukti ilmiah." },
        { type: "paragraph", text: "**Berhenti di tengah jalan.** Riset independen yang membandingkan tingkat penyelesaian game dan kuesioner dengan panjang sama masih sedikit. Data seorang penerbit tes dari ratusan ribu asesmen menunjukkan sekitar 80% kandidat menyelesaikan asesmen hingga 40 menit, dengan lebih banyak yang berhenti setelah itu. Apa pun formatnya, buatlah singkat dan jalankan di browser." },
        { type: "paragraph", text: "**Kecepatan.** Di sinilah selisihnya paling besar dalam praktik. Ketika sebuah grup telekomunikasi nasional menjalankan rekrutmen Management Trainee di DEUS, lebih dari 1.000 kandidat di 30+ provinsi dinilai sekaligus, dengan hasil dalam satu hari." },
        { type: "paragraph", text: "**Pengalaman kandidat.** Dalam satu eksperimen, pelamar yang mengerjakan tes penilaian situasional (situational judgment test) yang digamifikasi melaporkan kepuasan lebih tinggi terhadap prosesnya dibanding yang mengerjakan versi teks dari tes yang sama. Mereka juga menilainya lebih adil dan menganggap perusahaannya lebih menarik. Tinjauan 2022 menemukan pola yang sama di berbagai studi, meski keuntungannya biasanya tidak besar, dan mencatat bahwa reaksi negatif biasanya datang dari masalah teknis, bukan asesmennya. Peserta kami sendiri pernah bilang rasanya sama sekali tidak seperti psikotes." },
      ],
    },
    {
      id: "where-traditional-wins",
      title: "Di mana psikotes tradisional masih unggul?",
      blocks: [
        { type: "paragraph", text: "Kejujuran membantu di sini, karena Anda akan mempertanggungjawabkan pilihan ini kepada manajemen sendiri." },
        {
          type: "list",
          items: [
            "**Rekam jejak.** Analisis ulang riset seleksi tahun 2022 masih menempatkan tes kemampuan kognitif di antara prediktor terbaik kinerja kerja, dengan validitas 0,31. Asesmen berbasis game belum punya bukti sebanyak itu. Tinjauan 2022 tidak menemukan bukti bahwa asesmen terkait game memprediksi kinerja lebih baik daripada metode lain.",
            "**Keakraban.** Psikolog internal Anda tahu cara membaca hasilnya, begitu pula manajer perekrut Anda.",
            "**Jumlah kecil.** Untuk segelintir posisi senior, waktu penilaian yang dihemat kecil, dan wawancara terstruktur yang dijalankan dengan baik lebih penting. Analisis ulang yang sama menempatkan wawancara terstruktur di urutan pertama, di 0,42.",
          ],
        },
      ],
    },
    {
      id: "where-games-win",
      title: "Di mana asesmen berbasis game unggul?",
      blocks: [
        {
          type: "list",
          items: [
            "**Volume besar dengan waktu sempit.** Undangan, pengingat, pelacakan kemajuan, penilaian, dan laporan semuanya berjalan di platform, jadi rekrutmen seribu orang tidak memerlukan tim HR yang lebih besar.",
            "**Lebih sedikit yang bisa dilatih.** Game mengukur perilaku, bukan jawaban, jadi hampir tidak ada yang bisa dicari.",
            "**Apa yang dilakukan orang, bukan yang mereka katakan.** Game Neuroscience DEUS menunjukkan motivasi, kecenderungan mengambil risiko, alokasi usaha, dan pengenalan emosi lewat perilaku yang tidak dikendalikan orang secara sadar. Motivasi khususnya mudah salah dinilai dalam wawancara satu jam.",
            "**Norma lokal.** Setiap asesmen DEUS dinormakan pada populasi Indonesia, sehingga persentil membandingkan kandidat Anda dengan orang Indonesia, bukan dengan kelompok acuan Barat.",
            "**Employer brand Anda.** Kandidat pulang dengan kesan bahwa perusahaan itu modern dan serius terhadap talenta.",
          ],
        },
      ],
    },
    {
      id: "use-both",
      title: "Bisakah memakai keduanya?",
      blocks: [
        { type: "paragraph", text: "Bisa. Tinjauan 2022 menemukan bahwa asesmen terkait game tampaknya diuntungkan bila dipakai bersama tes konvensional." },
        { type: "paragraph", text: "Pembagian praktis untuk rekrutmen Management Trainee:" },
        {
          type: "list",
          ordered: true,
          items: [
            "**Penyaringan pertama:** game Cognitive dan Neuroscience DEUS untuk seluruh peserta, dengan skor batas yang otomatis menandai kandidat di bawahnya.",
            "**Babak akhir:** modul Simulation, tempat para finalis menganalisis kasus bisnis dan mengalokasikan anggaran dengan pengatur waktu langsung, dalam skenario yang disusun sesuai industri Anda.",
            "**Keputusan:** wawancara terstruktur dengan orang-orang yang masih bertahan.",
          ],
        },
        { type: "paragraph", text: "Jika Anda ingin kepribadian ada dalam proses tanpa kuesioner swanilai, DEUS Discover adalah salah satu jalannya. Ia adalah tes penilaian situasional yang disajikan sebagai cerita, dibangun di atas Big Five, dan hasilnya bisa dibingkai di sekitar kerangka kompetensi milik Anda sendiri. Kandidat memilih apa yang akan dilakukan seiring alur cerita, bukan menilai diri sendiri." },
      ],
    },
    {
      id: "switch",
      title: "Bagaimana beralih tanpa risiko?",
      blocks: [
        { type: "paragraph", text: `Jangan ganti seluruh proses Anda sekaligus. Mulailah dengan uji coba gratis, atau jalankan pilot di satu divisi, satu peran, atau satu angkatan. Menjalankan game dan tes Anda yang sekarang pada angkatan pilot yang sama memberi perbandingan langsung, di perusahaan Anda sendiri, sebelum Anda berkomitmen. DEUS tidak memakai kontrak jangka panjang: bayar per bulan atau per angkatan, mulai dari ${price} per kandidat.` },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    title: "Pertanyaan tentang asesmen berbasis game dan psikotes.",
    items: [
      {
        question: "Apakah asesmen berbasis game termasuk psikotes?",
        answer:
          "Ya, dalam arti ia adalah asesmen psikologis untuk perekrutan. Ia juga disusun seperti psikotes: game DEUS melewati teori, pengembangan butir, validasi, dan penormaan, dibimbing oleh psikometrisi. Bedanya, kandidat memainkan game, bukan mengisi kuesioner.",
      },
      {
        question: "Mana yang lebih akurat?",
        answer:
          "Tidak ada format yang akurat dengan sendirinya. Akurasi bergantung pada cara tes disusun dan divalidasi untuk penggunaan Anda. Tes tradisional punya lebih banyak riset yang dipublikasikan. Game kognitif kami telah divalidasi terhadap tes kognitif tradisional, dan menunjukkan validitas konvergen.",
      },
      {
        question: "Bisakah kami tetap memakai tes yang sekarang dan menambahkan game?",
        answer:
          "Bisa. Anda bisa mulai dengan satu modul, seperti Cognitive, di tahap pertama rekrutmen, dan menambah modul lain nanti.",
      },
      {
        question: "Apakah kandidat perlu memasang sesuatu?",
        answer:
          "Tidak. DEUS berjalan di browser ponsel atau laptop mana pun, dan setiap sesi diawali pemeriksaan perangkat dan logika anti-curang.",
      },
    ],
  },
  sources: [
    {
      label:
        "Birkeland, Manson, Kisamore, Brannick and Smith (2006), \"A meta-analytic investigation of applicant faking on personality measures,\" International Journal of Selection and Assessment (dalam bahasa Inggris)",
      href: "https://digitalcommons.usf.edu/psy_facpub/2324",
    },
    {
      label:
        "Ramos-Villagrasa, Fernández-del-Río and Castro (2022), \"Game-related assessments for personnel selection: A systematic review,\" Frontiers in Psychology (dalam bahasa Inggris)",
      href: "https://doi.org/10.3389/fpsyg.2022.952002",
    },
    {
      label:
        "Salsabila, Zahro, Shofi, Rachma dan Ratri (2026), \"Menjaga Kerahasiaan Alat Tes: Profesionalisme Psikolog dalam Asesmen Psikologi,\" Jurnal Psikologi Ekspresi 3(1), Universitas Muria Kudus",
      href: "https://jurnal.umk.ac.id/index.php/ekspresi/article/view/16958",
    },
    {
      label:
        "Millet (2022), \"How much testing is OK?\", Criteria Corp (dalam bahasa Inggris)",
      href: "https://criteriacorp.com/blog/how-much-testing-is-ok",
    },
    {
      label:
        "Georgiou and Nikolaou (2020), \"Are applicants in favor of traditional or gamified assessment methods?\", Computers in Human Behavior (dalam bahasa Inggris)",
      href: "https://doi.org/10.1016/j.chb.2020.106356",
    },
    {
      label:
        "O'Shea and Fox Luscombe, \"Is cognitive ability the best predictor of job performance?\", tentang Sackett, Zhang, Berry and Lievens (2022), TIP, SIOP (dalam bahasa Inggris)",
      href: "https://www.siop.org/tip-article/is-cognitive-ability-the-best-predictor-of-job-performance",
    },
  ],
  cta: {
    text: "Lihat keempat modul DEUS, dan apa yang diukur masing-masing.",
    link: { label: "Lihat cara kerja game-nya", href: gba },
  },
  related: [
    "what-is-game-based-assessment",
    "management-trainee-recruitment",
    "campus-recruitment-screening",
  ],
  // the default closing section and contact bar (messages/id.json, "Closing")
  closing: {},
};
