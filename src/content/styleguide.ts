import type { AccordionItem } from "@/components/ui/accordion";
import type { TableColumn, TableRow } from "@/components/ui/data-table";
import type { WhyItem } from "@/components/blocks/WhyPanel";

// Copy for /styleguide (Task 0.10). The `normal` set is the reviewed English copy from content/en/
// (home.md, about.md, game-based-assessment.md, global.md). The `long` set is
// for the "long text" toggle: draft Indonesian, roughly 25–35% longer, written only to test
// that pills, buttons, tabs and headings survive the length (IMPLEMENTATION_PLAN.md, review
// focus 1). It is not reviewed copy and must never be used on a page. People, scores, dates
// and timestamps are the guide's illustrative samples (DESIGN-GUIDE.md, top note).

type Heading = { label: string; title: string; lede?: string };

export type StyleguideCopy = {
  intro: { label: string; title: string; lede: string; note: string; longOn: string; longOff: string };
  headings: {
    colour: Heading; type: Heading; actions: Heading; pills: Heading; sectionHeader: Heading;
    journey: Heading; tabs: Heading; scroll: Heading; products: Heading; games: Heading; why: Heading;
    stats: Heading; milestones: Heading; potentia: Heading; forms: Heading; segmented: Heading;
    faq: Heading; tables: Heading; stories: Heading; quotes: Heading; logos: Heading; placeholder: Heading; status: Heading;
  };
  buttons: { primary: string; secondary: string; small: string; text: string; icon: string; disabled: string };
  links: { next: string; external: string; down: string; inlineBefore: string; inline: string; inlineAfter: string };
  pills: { label: string; tags: readonly string[]; chips: readonly string[] };
  sectionHeader: { label: string; title: readonly string[]; lede: string };
  journey: {
    caption: string;
    label: string;
    when: readonly [string, string, string];
    play: { title: string; meta: string; alt: string };
    profile: { label: string; name: string; traits: readonly { label: string; value: number }[]; footer: string };
    appraisal: { label: string; score: string; rating: string; split: readonly [{ label: string; value: string }, { label: string; value: string }]; bonus: { label: string; status: string } };
  };
  tabs: {
    label: string;
    items: readonly { title: string; body: string; product: string; alt?: string; placeholder?: string }[];
    result: { label: string; value: string; unit: string; bar: number };
  };
  scroll: readonly { title: string; body: string; alt?: string; placeholder?: string }[];
  products: {
    lead: { title: string; subtitle: string; body: string; tags: readonly string[]; link: string };
    discover: { title: string; subtitle: string; body: string; link: string };
    nextChapter: { title: string; subtitle: string; body: string; link: string };
    potentia: { chip: string; title: string; body: string; link: string; phoneAlt: string; reportAlt: string };
  };
  games: {
    log: { title: string; rows: readonly { time: string; action: string }[] };
    tiles: readonly { title: string; caption: string; alt: string }[];
    note: string;
    stats: readonly { title: string; body: string }[];
    list: readonly { title: string; caption: string }[];
  };
  why: readonly WhyItem[];
  values: readonly WhyItem[];
  bigStats: readonly { value: string; label: string }[];
  proof: { line: string; industries: readonly string[] };
  milestones: { label: string; items: readonly { year: string; label: string }[] };
  potentiaBand: { eyebrow: string; title: string; body: string; link: string };
  forms: {
    states: { rest: string; focus: string; error: string; disabled: string; filled: string };
    sampleEmail: string;
    sampleCompany: string;
    sampleMessage: string;
    selectPlaceholder: string;
  };
  segmented: { label: string; items: readonly { value: string; label: string; body: string }[] };
  faq: readonly AccordionItem[];
  tables: {
    pricing: { caption: string; columns: readonly TableColumn[]; rows: readonly TableRow[] };
    matrix: { caption: string; columns: readonly TableColumn[]; rows: readonly TableRow[] };
  };
  stories: {
    cards: readonly { product: string; client: string; result: string; note?: string; placeholder?: string }[];
    link: { line: string };
  };
  quotes: {
    main: { quote: string; translation: string; name: string; role: string };
    participants: readonly { quote: string; translation: string }[];
  };
  logos: { line: string; names: readonly string[] };
  placeholder: string;
};

const normal: StyleguideCopy = {
  intro: {
    label: "Daylight",
    title: "Styleguide",
    lede: "Every component on the site, built from DESIGN-GUIDE.md. Compare it with design-directions/c-daylight-v2.html, then sign it off.",
    note: "People, scores, dates and timestamps are illustrative samples until the team approves sample data.",
    longOn: "Show long text",
    longOff: "Show normal text",
  },
  headings: {
    colour: { label: "Colour", title: "Navy ink, a sky gradient, and ember for now." },
    type: { label: "Typography", title: "Manrope, SemiBold headlines, sentence case." },
    actions: { label: "Buttons and links", title: "Navy pills for actions, azure-ink for links." },
    pills: { label: "Label pills, tags and chips", title: "A label names, a tag states, a chip acts." },
    sectionHeader: { label: "Section header", title: "Label, heading, lede, then 72px to the content." },
    journey: { label: "Journey timeline", title: "One person, from first game to first bonus.", lede: "Reload the page to replay the motion." },
    tabs: { label: "Where we help", title: "One partner, from the first assessment to the last bonus decision." },
    scroll: { label: "Scroll-synced screen", title: "How Enhance closes each gap." },
    products: { label: "Our solutions", title: "Four products, built on the same idea: better evidence about people." },
    games: { label: "Game-Based Assessment", title: "Candidates can't fake how they play.", lede: "People prepare for personality tests. What they can't rehearse is how they behave inside a game." },
    why: { label: "Why DEUS", title: "What you can expect from us." },
    stats: { label: "Stats and readouts", title: "Big numbers, short facts and the proof row." },
    milestones: { label: "Our journey", title: "2022 to today." },
    potentia: { label: "Potentia band", title: "The warm band, in Indonesian on both locales." },
    forms: { label: "Form controls", title: "Soft fields that turn white on focus." },
    segmented: { label: "Segmented tabs", title: "Short switchers in the nav-pill shape." },
    faq: { label: "FAQ", title: "Questions HR teams usually ask." },
    tables: { label: "Data tables", title: "Pricing, games and the use-case matrix." },
    stories: { label: "Story card and link card", title: "Real programs, real results." },
    quotes: { label: "Quote cards", title: "In their words." },
    logos: { label: "Logo wall", title: "Trusted by 40+ brands across Indonesia." },
    placeholder: { label: "Placeholder", title: "A sky tile until the screenshot arrives." },
    status: { label: "404 and error", title: "The panel for pages that aren't there." },
  },
  buttons: {
    primary: "Request a demo",
    secondary: "Chat on WhatsApp",
    small: "Request a demo",
    text: "Explore our solutions",
    icon: "Open menu",
    disabled: "Send message",
  },
  links: {
    next: "Read the Telkom story",
    external: "Visit Potentia (in Indonesian)",
    down: "See how it works",
    inlineBefore: "Read our ",
    inline: "privacy policy",
    inlineAfter: " to see what we keep and why.",
  },
  pills: {
    label: "Where we help",
    tags: ["KPI framework design", "Calibration", "Bonus and salary links"],
    chips: ["DEUS Enhance", "Game-Based Assessment"],
  },
  sectionHeader: {
    label: "Why DEUS exists",
    title: ["Most people decisions still", "run on thin evidence."],
    lede: "Companies say people are their most important asset. Then they make decisions about them with the weakest data they have.",
  },
  journey: {
    caption: "One person, from first game to first bonus",
    label: "Example: one candidate from assessment to first bonus",
    when: ["**March 2025**, assessed", "**April 2025**, hired", "**March 2026**, appraised"],
    play: { title: "Plays DEUS Discover", meta: "22 minutes", alt: "DEUS Discover story game" },
    profile: {
      label: "Candidate profile",
      name: "Rina Wulandari",
      traits: [
        { label: "Rational", value: 94 },
        { label: "Empathy", value: 75 },
        { label: "Diplomatic", value: 60 },
      ],
      footer: "Recommended for the 2025 MT intake",
    },
    appraisal: {
      label: "Q1 2026 appraisal, DEUS Enhance",
      score: "3.05",
      rating: "Above expectations",
      split: [
        { label: "KPI", value: "2.96" },
        { label: "Competency", value: "3.40" },
      ],
      bonus: { label: "Bonus band B", status: "Approved" },
    },
  },
  tabs: {
    label: "From hire to reward",
    items: [
      {
        title: "Choose the right people",
        body: "Game-based assessments measure personality, cognitive ability, behavior under pressure and business judgment, so you're not relying on a CV and a gut feeling.",
        product: "Game-Based Assessment",
        alt: "Numerical reasoning game",
      },
      {
        title: "Find the potential you already have",
        body: "The same assessments map competencies across your teams, surface future leaders and show where training will make the biggest difference.",
        product: "Game-Based Assessment",
        placeholder: "TODO: Competency map screenshot",
      },
      {
        title: "Pay for performance you can prove",
        body: "One framework for KPIs, appraisals and calibration, connected to the bonus, incentive and salary decisions that follow.",
        product: "DEUS Enhance",
        alt: "DEUS Enhance performance appraisal dashboard",
      },
    ],
    result: { label: "Numerical reasoning", value: "82", unit: "percentile, Indonesian norm", bar: 82 },
  },
  // content/en/enhance.md §4, with the screens mapped in ENHANCE-PAGE-SPEC.md §4.
  scroll: [
    {
      title: "Set the framework",
      body: "Customize KPIs, competencies, weights, formulas, periods, and measures by role and level.",
      placeholder: "TODO: Enhance product overview screenshot",
    },
    {
      title: "Track across levels",
      body: "Monitor performance from company down to teams and individuals.",
      placeholder: "TODO: Enhance product overview screenshot",
    },
    {
      title: "Review performance",
      body: "One structured self-review and appraisal process for everyone.",
      alt: "DEUS Enhance performance appraisal dashboard",
    },
    {
      title: "Calibrate results",
      body: "Review evaluations across managers or units for consistency.",
      alt: "DEUS Enhance calibration matrix",
    },
    {
      title: "Talent mapping",
      body: "Visualize where everyone sits by performance and potential.",
      alt: "DEUS Enhance talent map",
    },
  ],
  products: {
    lead: {
      title: "DEUS Enhance",
      subtitle: "Performance and reward",
      body: "KPIs, appraisals and calibration in one place, connected to bonus, incentive and salary decisions. It works alongside the HR systems you already have.",
      tags: ["KPI framework design", "Calibration", "Bonus and salary links"],
      link: "See DEUS Enhance",
    },
    discover: {
      title: "DEUS Discover",
      subtitle: "Personality and competencies",
      body: "A story-driven game that profiles 32 personality subtraits and 24 competencies.",
      link: "See Discover",
    },
    nextChapter: {
      title: "Cognitive, Neuroscience and Simulation",
      subtitle: "Game-Based Assessment modules",
      body: "Cognitive, neuroscience and business simulation games that show how someone thinks, handles risk and makes decisions under time pressure.",
      link: "See the modules",
    },
    potentia: {
      chip: "For parents and schools, in Bahasa Indonesia",
      title: "Potentia by DEUS",
      body: "A gamified cognitive assessment that helps parents and schools understand how children aged 7–15 learn best.",
      link: "Visit Potentia (in Indonesian)",
      phoneAlt: "",
      reportAlt: "",
    },
  },
  games: {
    log: {
      title: "Recording this scene",
      rows: [
        { time: "00:43.8", action: "Reads both options" },
        { time: "00:45.0", action: "Hovers “follow the schedule”" },
        { time: "00:45.4", action: "Moves to the other option" },
        { time: "00:46.1", action: "Picks “follow the schedule”" },
      ],
    },
    tiles: [
      { title: "Personality", caption: "Story choices", alt: "DEUS Discover story game" },
      { title: "Cognitive", caption: "Categorization", alt: "Categorization game" },
      { title: "Neuroscience", caption: "Speed and stamina", alt: "Speed game" },
    ],
    note: "Use one module or all four. Reports are generated automatically, so results are ready as soon as candidates finish.",
    stats: [
      { title: "Browser only", body: "Phone or laptop, nothing to install" },
      { title: "Indonesian norms", body: "Compared with people like them" },
    ],
    list: [
      { title: "Objective Shooter", caption: "Processing speed and precision" },
      { title: "Reverse Retention", caption: "Working memory" },
      { title: "Odd One Out", caption: "Pattern recognition" },
    ],
  },
  why: [
    { icon: "flask", title: "Evidence over gut feel", body: "Our assessments are built on the Big Five, neuroscience research and established cognitive frameworks, developed with psychometricians and I/O psychology researchers." },
    { icon: "map-pin", title: "Built for Indonesia", body: "Our assessments are normed on the Indonesian population, so your candidates are compared with people like them, not with Western benchmarks." },
    { icon: "users", title: "Ready for volume", body: "Upload thousands of participants from a spreadsheet, send invitations automatically and see who has finished in real time." },
    { icon: "refresh", title: "A partner, not just a vendor", body: "Start with a free trial or a pilot in one division, with no long-term contract. For Enhance, we help design the KPI framework itself." },
  ],
  values: [
    { icon: "lightbulb", title: "Sample value one", body: "Three-column panels, as the 6 I's on About will use them. Two columns from 600 to 900px." },
    { icon: "target", title: "Sample value two", body: "On a Cloud section the panels flip to white with a hairline." },
    { icon: "shield", title: "Sample value three", body: "The icon sits above the text when three panels share a row." },
  ],
  bigStats: [
    { value: "32", label: "personality subtraits" },
    { value: "24", label: "competencies" },
    { value: "40+", label: "brands across six industries" },
  ],
  proof: {
    line: "Trusted by **40+ brands** across six industries in Indonesia",
    industries: ["Retail", "Telecommunications", "Education", "FMCG", "F&B", "Electronics"],
  },
  milestones: {
    label: "DEUS from 2022 to today",
    items: [
      { year: "2022", label: "DEUS Discover launches" },
      { year: "2023", label: "Startup Studio Indonesia; DEUS Enhance launches" },
      { year: "2024", label: "Innovfest by NUS x AsiaTech, Singapore" },
      { year: "2025", label: "Potentia launches" },
      { year: "2026", label: "Cognitive, neuroscience and simulation games" },
    ],
  },
  potentiaBand: {
    eyebrow: "Untuk orang tua dan sekolah",
    title: "Kita tahu nilai rapor anak. Tapi seberapa kenal kita dengan cara mereka belajar?",
    body: "Potentia mengajak anak usia 7–15 tahun memainkan 8 minigame selama sekitar 30 menit. Hasilnya, Anda mendapat gambaran jelas tentang cara anak berpikir, mengingat, dan belajar, lengkap dengan saran yang bisa langsung dipraktikkan.",
    link: "Kunjungi Potentia",
  },
  forms: {
    states: { rest: "Rest", focus: "Focus (click a field)", error: "Error", disabled: "Disabled", filled: "Filled" },
    sampleEmail: "rina@company.co.id",
    sampleCompany: "PT Contoh Sejahtera",
    sampleMessage: "We're hiring 300 Management Trainees in March.",
    selectPlaceholder: "Choose one",
  },
  segmented: {
    label: "Report types",
    items: [
      { value: "individual", label: "Individual", body: "One candidate's profile, ready as soon as they finish." },
      { value: "batch", label: "Batch", body: "Every candidate in an intake, side by side." },
      { value: "interactive", label: "Interactive", body: "Filter, compare and shortlist in the dashboard." },
    ],
  },
  faq: [
    { question: "Do candidates need to install anything?", answer: "No. The assessment runs in a mobile or desktop browser. Candidates just need a stable internet connection." },
    { question: "How quickly do we get results?", answer: "Scores and reports are generated as soon as each candidate finishes. Personality profiles are ready the same day or the next." },
    { question: "Can candidates cheat?", answer: "Every session starts with device checks and anti-cheat logic. And because the games measure behavior, not answers, there's very little to look up or memorize." },
  ],
  tables: {
    pricing: {
      caption: "Cognitive games",
      columns: [
        { key: "game", label: "Game" },
        { key: "measures", label: "What it measures" },
      ],
      rows: [
        { game: "Objective Shooter", measures: "Processing speed and precision" },
        { game: "Reverse Retention", measures: "Working memory" },
        { game: "Odd One Out", measures: "Pattern recognition" },
        { game: "Mallet Math", measures: "Arithmetic and problem solving" },
      ],
    },
    matrix: {
      caption: "Recommended modules by use case",
      columns: [
        { key: "useCase", label: "Use case" },
        { key: "personality", label: "Personality" },
        { key: "cognitive", label: "Cognitive" },
        { key: "neuro", label: "Neuroscience" },
        { key: "simulation", label: "Simulation" },
      ],
      rows: [
        { useCase: "Management Trainee recruitment", personality: false, cognitive: true, neuro: true, simulation: true },
        { useCase: "Campus recruitment", personality: true, cognitive: true, neuro: false, simulation: false },
        { useCase: "Leadership identification", personality: true, cognitive: false, neuro: true, simulation: false },
        { useCase: "Internal talent mapping", personality: true, cognitive: true, neuro: false, simulation: false },
      ],
    },
  },
  stories: {
    cards: [
      { product: "Game-Based Assessment", client: "A national telecom group", result: "1,000+ Management Trainee candidates across 30+ provinces, with results in one day.", placeholder: "TODO: Story photo or report screenshot" },
      { product: "Potentia", client: "An elementary school in Indonesia", result: "200+ elementary students, and a clearer picture for teachers of how each one learns.", note: "The story is in Indonesian." },
    ],
    link: { line: "A national telecom group: 1,000+ Management Trainee candidates, results in 1 day" },
  },
  quotes: {
    main: { quote: "Senang sekali bisa bekerja sama dengan tim DEUS dalam penyiapan seleksi untuk karyawan perusahaan kami. Kami sangat terbantu dengan profesionalitas sepanjang persiapan hingga proses akhirnya. Semoga kerja sama kami tetap berjalan dengan baik.", translation: "It was a real pleasure working with the DEUS team on the selection for our employees. Their professionalism helped us a great deal, from preparation right through to the end of the process. We hope to keep working together.", name: "Selection team", role: "A national telecom group" },
    participants: [
      { quote: "Bagus sekali idenya, saya pertama kali menjalankan psikotest dengan metode seperti ini dan tidak terasa seperti psikotest. Sangat menyenangkan!", translation: "Such a great idea. It was my first psychotest like this, and it didn't feel like a psychotest at all. Really fun!" },
      { quote: "Tidak pernah disangka tes psikologi dapat dilakukan dengan cara yang sangat menyenangkan.", translation: "I never imagined a psychological test could be this enjoyable." },
      { quote: "Semoga lebih banyak tes-tes gamifikasi yang luar biasa ke depan.", translation: "I hope there are more great gamified tests like this in the future." },
    ],
  },
  logos: { line: "Trusted by **40+ brands** across six industries", names: ["Sample logo 1","Sample logo 2","Sample logo 3","Sample logo 4","Sample logo 5","Sample logo 6","Sample logo 7","Sample logo 8","Sample logo 9","Sample logo 10","Sample logo 11","Sample logo 12"] },
  placeholder: "TODO: Calibration matrix screenshot",
};

// Draft Indonesian for the length test only (see the note at the top).
const long: StyleguideCopy = {
  ...normal,
  intro: {
    ...normal.intro,
    lede: "Setiap komponen di situs ini, dibuat dari DESIGN-GUIDE.md. Bandingkan dengan design-directions/c-daylight-v2.html, lalu setujui. Teks panjang: draf bahasa Indonesia, hanya untuk uji panjang.",
  },
  headings: {
    colour: { label: "Warna", title: "Tinta biru tua, gradien langit, dan ember untuk saat ini." },
    type: { label: "Tipografi", title: "Manrope, judul SemiBold, huruf kapital hanya di awal kalimat." },
    actions: { label: "Tombol dan tautan", title: "Pil biru tua untuk tindakan, azure-ink untuk tautan." },
    pills: { label: "Label, tag, dan chip", title: "Label memberi nama, tag menyatakan, chip bertindak." },
    sectionHeader: { label: "Judul bagian", title: "Label, judul, pengantar, lalu 72px ke konten." },
    journey: { label: "Linimasa perjalanan", title: "Satu orang, dari permainan pertama hingga bonus pertama.", lede: "Muat ulang halaman untuk memutar ulang animasinya." },
    tabs: { label: "Di mana kami membantu", title: "Satu mitra, dari asesmen pertama hingga keputusan bonus terakhir." },
    scroll: { label: "Layar yang mengikuti gulir", title: "Bagaimana Enhance menutup setiap kesenjangan." },
    products: { label: "Solusi kami", title: "Empat produk, dibangun di atas gagasan yang sama: bukti yang lebih baik tentang manusia." },
    games: { label: "Asesmen Berbasis Game", title: "Kandidat tidak bisa memalsukan cara mereka bermain.", lede: "Orang mempersiapkan diri untuk psikotes. Yang tidak bisa mereka latih adalah cara mereka berperilaku di dalam sebuah game." },
    why: { label: "Mengapa DEUS", title: "Apa yang bisa Anda harapkan dari kami." },
    stats: { label: "Statistik dan angka", title: "Angka besar, fakta singkat, dan baris bukti." },
    milestones: { label: "Perjalanan kami", title: "Dari 2022 hingga hari ini." },
    potentia: { label: "Pita Potentia", title: "Pita hangat, dalam bahasa Indonesia di kedua bahasa." },
    forms: { label: "Kontrol formulir", title: "Kolom lembut yang berubah putih saat difokuskan." },
    segmented: { label: "Tab tersegmentasi", title: "Pengalih singkat dalam bentuk pil navigasi." },
    faq: { label: "Pertanyaan umum", title: "Pertanyaan yang biasanya diajukan tim HR." },
    tables: { label: "Tabel data", title: "Harga, daftar game, dan matriks kebutuhan." },
    stories: { label: "Kartu cerita dan kartu tautan", title: "Program nyata, hasil nyata, dan cerita yang bisa dibaca." },
    quotes: { label: "Kartu kutipan", title: "Dalam kata-kata mereka sendiri." },
    logos: { label: "Dinding logo", title: "Dipercaya lebih dari 40 merek di seluruh Indonesia." },
    placeholder: { label: "Gambar sementara", title: "Ubin langit sampai tangkapan layarnya tiba." },
    status: { label: "404 dan galat", title: "Panel untuk halaman yang tidak ditemukan." },
  },
  buttons: {
    primary: "Jadwalkan panggilan 30 menit",
    secondary: "Chat dengan kami di WhatsApp",
    small: "Minta demo produk",
    text: "Jelajahi solusi kami",
    icon: "Buka menu",
    disabled: "Kirim pesan Anda",
  },
  links: {
    next: "Baca kisah lengkap Telkom Group",
    external: "Kunjungi situs Potentia (bahasa Indonesia)",
    down: "Lihat bagaimana cara kerjanya",
    inlineBefore: "Baca ",
    inline: "kebijakan privasi kami",
    inlineAfter: " untuk melihat data apa yang kami simpan dan alasannya.",
  },
  pills: {
    label: "Di mana kami membantu",
    tags: ["Desain kerangka KPI", "Kalibrasi penilaian", "Tautan bonus dan kenaikan gaji"],
    chips: ["DEUS Enhance", "Game-Based Assessment", "Belum yakin"],
  },
  sectionHeader: {
    label: "Mengapa DEUS ada",
    title: ["Sebagian besar keputusan tentang manusia", "masih berjalan di atas bukti yang tipis."],
    lede: "Perusahaan bilang manusia adalah aset terpenting mereka. Lalu mereka mengambil keputusan tentang manusia dengan data paling lemah yang mereka miliki.",
  },
  journey: {
    ...normal.journey,
    caption: "Satu orang, dari permainan pertama hingga bonus pertama",
    label: "Contoh: satu kandidat dari asesmen hingga bonus pertama",
    when: ["**Maret 2025**, menjalani asesmen", "**April 2025**, diterima bekerja", "**Maret 2026**, dinilai kinerjanya"],
    play: { title: "Memainkan DEUS Discover", meta: "22 menit", alt: "Game cerita DEUS Discover" },
    profile: {
      ...normal.journey.profile,
      label: "Profil kandidat",
      traits: [
        { label: "Rasional", value: 94 },
        { label: "Empati", value: 75 },
        { label: "Diplomatis", value: 60 },
      ],
      footer: "Direkomendasikan untuk angkatan MT 2025",
    },
    appraisal: {
      label: "Penilaian kinerja Q1 2026, DEUS Enhance",
      score: "3,05",
      rating: "Di atas ekspektasi",
      split: [
        { label: "KPI", value: "2,96" },
        { label: "Kompetensi", value: "3,40" },
      ],
      bonus: { label: "Golongan bonus B", status: "Disetujui" },
    },
  },
  tabs: {
    label: "Dari rekrutmen hingga remunerasi",
    items: [
      {
        ...normal.tabs.items[0]!,
        title: "Pilih orang yang tepat untuk tim Anda",
        body: "Asesmen berbasis game mengukur kepribadian, kemampuan kognitif, perilaku di bawah tekanan, dan penilaian bisnis, sehingga Anda tidak hanya bergantung pada CV dan firasat.",
        alt: "Game penalaran numerik",
      },
      {
        ...normal.tabs.items[1]!,
        title: "Temukan potensi yang sudah Anda miliki",
        body: "Asesmen yang sama memetakan kompetensi di seluruh tim, menemukan calon pemimpin, dan menunjukkan di mana pelatihan paling berdampak.",
        product: "Asesmen Berbasis Game",
        placeholder: "TODO: Tangkapan layar peta kompetensi",
      },
      {
        ...normal.tabs.items[2]!,
        title: "Bayar untuk kinerja yang bisa Anda buktikan",
        body: "Satu kerangka untuk KPI, penilaian kinerja, dan kalibrasi, terhubung ke keputusan bonus, insentif, dan kenaikan gaji yang mengikutinya.",
        alt: "Dasbor penilaian kinerja DEUS Enhance",
      },
    ],
    result: { label: "Penalaran numerik", value: "82", unit: "persentil, norma Indonesia", bar: 82 },
  },
  scroll: [
    {
      title: "Tetapkan kerangka kinerja",
      body: "Sesuaikan KPI, kompetensi, bobot, rumus, periode, dan ukuran penilaian berdasarkan peran dan level jabatan.",
      placeholder: "TODO: Tangkapan layar ikhtisar produk Enhance",
    },
    {
      title: "Pantau kinerja di setiap level",
      body: "Pantau kinerja mulai dari tingkat perusahaan hingga ke tim dan setiap individu di dalamnya.",
      placeholder: "TODO: Tangkapan layar ikhtisar produk Enhance",
    },
    {
      title: "Lakukan penilaian kinerja",
      body: "Satu proses penilaian diri dan penilaian kinerja yang terstruktur dan sama untuk semua karyawan.",
      alt: "Dasbor penilaian kinerja DEUS Enhance",
    },
    {
      title: "Kalibrasi hasil penilaian",
      body: "Tinjau hasil evaluasi lintas manajer atau unit kerja agar penilaiannya tetap konsisten dan adil.",
      alt: "Matriks kalibrasi DEUS Enhance",
    },
    {
      title: "Pemetaan talenta",
      body: "Lihat dengan jelas posisi setiap orang berdasarkan kinerja dan potensinya dalam satu peta talenta.",
      alt: "Peta talenta DEUS Enhance",
    },
  ],
  products: {
    lead: {
      title: "DEUS Enhance",
      subtitle: "Manajemen kinerja dan remunerasi",
      body: "KPI, penilaian kinerja, dan kalibrasi dalam satu tempat, terhubung ke keputusan bonus, insentif, dan kenaikan gaji. Bekerja berdampingan dengan sistem HR yang sudah Anda miliki.",
      tags: ["Desain kerangka KPI", "Kalibrasi penilaian", "Tautan bonus dan kenaikan gaji"],
      link: "Lihat DEUS Enhance selengkapnya",
    },
    discover: {
      title: "DEUS Discover",
      subtitle: "Kepribadian dan kompetensi",
      body: "Game berbasis cerita yang memetakan 32 subtrait kepribadian dan 24 kompetensi kandidat Anda.",
      link: "Lihat DEUS Discover selengkapnya",
    },
    nextChapter: {
      title: "Kognitif, Neurosains, dan Simulasi",
      subtitle: "Modul Game-Based Assessment",
      body: "Game kognitif, neurosains, dan simulasi bisnis yang menunjukkan cara seseorang berpikir, menghadapi risiko, dan mengambil keputusan di bawah tekanan waktu.",
      link: "Lihat modulnya",
    },
    potentia: {
      ...normal.products.potentia,
      chip: "Untuk orang tua dan sekolah, dalam bahasa Indonesia",
      body: "Asesmen kognitif berbasis gamifikasi yang membantu orang tua dan sekolah memahami cara terbaik anak usia 7–15 tahun belajar.",
      link: "Kunjungi Potentia",
    },
  },
  games: {
    log: {
      title: "Merekam adegan ini",
      rows: [
        { time: "00:43.8", action: "Membaca kedua pilihan dengan saksama" },
        { time: "00:45.0", action: "Mengarahkan kursor ke “ikuti jadwal”" },
        { time: "00:45.4", action: "Berpindah ke pilihan yang lain" },
        { time: "00:46.1", action: "Memilih “ikuti jadwal”" },
      ],
    },
    tiles: [
      { title: "Kepribadian", caption: "Pilihan dalam cerita", alt: "Game cerita DEUS Discover" },
      { title: "Kognitif", caption: "Kategorisasi", alt: "Game kategorisasi" },
      { title: "Neurosains", caption: "Kecepatan dan stamina", alt: "Game kecepatan" },
    ],
    note: "Gunakan satu modul atau keempatnya sekaligus. Laporan dibuat otomatis, jadi hasilnya siap begitu kandidat selesai bermain.",
    stats: [
      { title: "Cukup lewat browser", body: "Ponsel atau laptop, tidak perlu memasang apa pun" },
      { title: "Norma Indonesia", body: "Dibandingkan dengan orang-orang yang serupa dengan mereka" },
    ],
    list: [
      { title: "Objective Shooter", caption: "Kecepatan dan ketepatan memproses informasi" },
      { title: "Reverse Retention", caption: "Memori kerja jangka pendek" },
      { title: "Odd One Out", caption: "Pengenalan pola visual" },
    ],
  },
  why: [
    { icon: "flask", title: "Bukti, bukan sekadar firasat", body: "Asesmen kami dibangun di atas Big Five, riset neurosains, dan kerangka kognitif yang mapan, dikembangkan bersama psikometrikus dan peneliti psikologi industri dan organisasi." },
    { icon: "map-pin", title: "Dibuat khusus untuk Indonesia", body: "Asesmen kami dinormakan pada populasi Indonesia, sehingga kandidat Anda dibandingkan dengan orang-orang seperti mereka, bukan dengan tolok ukur Barat." },
    { icon: "users", title: "Siap untuk volume besar", body: "Unggah ribuan peserta dari spreadsheet, kirim undangan secara otomatis, dan lihat siapa yang sudah selesai secara langsung." },
    { icon: "refresh", title: "Mitra, bukan sekadar vendor", body: "Mulai dengan uji coba gratis atau pilot di satu divisi, tanpa kontrak jangka panjang. Untuk Enhance, kami ikut merancang kerangka KPI-nya." },
  ],
  values: [
    { icon: "lightbulb", title: "Contoh nilai pertama kami", body: "Panel tiga kolom, seperti yang akan dipakai 6 I di halaman Tentang. Dua kolom dari 600 sampai 900px." },
    { icon: "target", title: "Contoh nilai kedua kami", body: "Di bagian Cloud, panel berubah menjadi putih dengan garis tipis di tepinya." },
    { icon: "shield", title: "Contoh nilai ketiga kami", body: "Ikon berada di atas teks saat tiga panel berbagi satu baris." },
  ],
  bigStats: [
    { value: "32", label: "subtrait kepribadian yang diukur" },
    { value: "24", label: "kompetensi yang dipetakan" },
    { value: "40+", label: "merek dari enam industri berbeda" },
  ],
  proof: {
    line: "Dipercaya oleh **lebih dari 40 merek** dari enam industri di seluruh Indonesia",
    industries: ["Ritel", "Telekomunikasi", "Pendidikan", "FMCG", "Makanan dan minuman", "Elektronik"],
  },
  milestones: {
    label: "DEUS dari 2022 hingga hari ini",
    items: [
      { year: "2022", label: "DEUS Discover diluncurkan" },
      { year: "2023", label: "Startup Studio Indonesia; DEUS Enhance diluncurkan" },
      { year: "2024", label: "Innovfest by NUS x AsiaTech, Singapura" },
      { year: "2025", label: "Potentia diluncurkan di Jakarta" },
      { year: "2026", label: "Game kognitif, neurosains, dan simulasi bisnis" },
    ],
  },
  forms: {
    ...normal.forms,
    states: { rest: "Diam", focus: "Fokus (klik salah satu kolom)", error: "Galat", disabled: "Nonaktif", filled: "Terisi" },
    sampleMessage: "Kami akan merekrut 300 Management Trainee pada bulan Maret.",
    selectPlaceholder: "Pilih salah satu",
  },
  segmented: {
    label: "Jenis laporan",
    items: [
      { value: "individual", label: "Laporan individu", body: "Profil satu kandidat, siap begitu mereka selesai." },
      { value: "batch", label: "Laporan angkatan", body: "Semua kandidat dalam satu angkatan, berdampingan." },
      { value: "interactive", label: "Dasbor interaktif", body: "Saring, bandingkan, dan buat daftar pendek di dasbor." },
    ],
  },
  faq: [
    { question: "Apakah kandidat perlu memasang aplikasi atau perangkat lunak apa pun?", answer: "Tidak. Asesmen berjalan di browser ponsel atau komputer. Kandidat hanya memerlukan koneksi internet yang stabil." },
    { question: "Seberapa cepat kami mendapatkan hasil asesmennya?", answer: "Skor dan laporan dibuat begitu setiap kandidat selesai. Profil kepribadian siap pada hari yang sama atau keesokan harinya." },
    { question: "Bisakah kandidat berbuat curang selama asesmen?", answer: "Setiap sesi dimulai dengan pemeriksaan perangkat dan logika anti-curang. Karena game mengukur perilaku, bukan jawaban, hampir tidak ada yang bisa dicari atau dihafal." },
  ],
  tables: {
    pricing: {
      caption: "Game kognitif",
      columns: [
        { key: "game", label: "Game" },
        { key: "measures", label: "Apa yang diukur" },
      ],
      rows: [
        { game: "Objective Shooter", measures: "Kecepatan dan ketepatan memproses informasi" },
        { game: "Reverse Retention", measures: "Memori kerja jangka pendek" },
        { game: "Odd One Out", measures: "Pengenalan pola visual" },
        { game: "Mallet Math", measures: "Aritmetika dan pemecahan masalah" },
      ],
    },
    matrix: {
      caption: "Modul yang direkomendasikan per kebutuhan",
      columns: [
        { key: "useCase", label: "Kebutuhan" },
        { key: "personality", label: "Kepribadian" },
        { key: "cognitive", label: "Kognitif" },
        { key: "neuro", label: "Neurosains" },
        { key: "simulation", label: "Simulasi bisnis" },
      ],
      rows: [
        { useCase: "Rekrutmen Management Trainee", personality: false, cognitive: true, neuro: true, simulation: true },
        { useCase: "Rekrutmen kampus", personality: true, cognitive: true, neuro: false, simulation: false },
        { useCase: "Identifikasi calon pemimpin", personality: true, cognitive: false, neuro: true, simulation: false },
        { useCase: "Pemetaan talenta internal", personality: true, cognitive: true, neuro: false, simulation: false },
      ],
    },
  },
  stories: {
    cards: [
      { product: "Asesmen Berbasis Game", client: "Sebuah grup telekomunikasi nasional", result: "Lebih dari 1.000 kandidat Management Trainee di lebih dari 30 provinsi, dengan hasil yang siap dalam satu hari saja.", placeholder: "TODO: Foto cerita atau tangkapan layar laporan" },
      { product: "Potentia", client: "Sebuah sekolah dasar di Indonesia", result: "Lebih dari 200 siswa sekolah dasar, dan gambaran yang lebih jelas bagi para guru tentang cara belajar setiap anak.", note: "Cerita ini ditulis dalam bahasa Indonesia." },
    ],
    link: { line: "Sebuah grup telekomunikasi nasional: lebih dari 1.000 kandidat Management Trainee, hasil dalam 1 hari" },
  },
  quotes: {
    main: { quote: "Senang sekali bisa bekerja sama dengan tim DEUS dalam penyiapan seleksi untuk karyawan perusahaan kami. Kami sangat terbantu dengan profesionalitas sepanjang persiapan hingga proses akhirnya. Semoga kerja sama kami tetap berjalan dengan baik.", translation: "It was a real pleasure working with the DEUS team on the selection for our employees. Their professionalism helped us a great deal, from preparation right through to the end of the process. We hope to keep working together.", name: "Tim seleksi", role: "Sebuah grup telekomunikasi nasional" },
    participants: [
      { quote: "Bagus sekali idenya, saya pertama kali menjalankan psikotest dengan metode seperti ini dan tidak terasa seperti psikotest. Sangat menyenangkan!", translation: "Such a great idea. It was my first psychotest like this, and it didn't feel like a psychotest at all. Really fun!" },
      { quote: "Tidak pernah disangka tes psikologi dapat dilakukan dengan cara yang sangat menyenangkan.", translation: "I never imagined a psychological test could be this enjoyable." },
      { quote: "Semoga lebih banyak tes-tes gamifikasi yang luar biasa ke depan.", translation: "I hope there are more great gamified tests like this in the future." },
    ],
  },
  logos: { line: "Dipercaya **lebih dari 40 merek** di enam industri di seluruh Indonesia", names: ["Contoh logo 1","Contoh logo 2","Contoh logo 3","Contoh logo 4","Contoh logo 5","Contoh logo 6","Contoh logo 7","Contoh logo 8","Contoh logo 9","Contoh logo 10","Contoh logo 11","Contoh logo 12"] },
  placeholder: "TODO: Tangkapan layar matriks kalibrasi penilaian kinerja",
};

export const styleguideCopy = { normal, long } as const;

// Labels for the styleguide's own scaffolding (swatch names, state names). English only;
// the long-text toggle doesn't change them. Swatch classes are listed in full so Tailwind sees them.
export const styleguideLabels = {
  toggleHint: "Long text swaps in strings about 30% longer, as Indonesian runs.",
  swatches: [
    { name: "Ink", value: "#101B3D", role: "Headings, primary buttons", className: "bg-ink" },
    { name: "Ink 2", value: "#26315A", role: "Nav, chips, dates", className: "bg-ink-2" },
    { name: "Slate", value: "#5B6785", role: "Body copy", className: "bg-slate" },
    { name: "Slate 2", value: "#8790A8", role: "Non-essential meta, field border", className: "bg-slate-2" },
    { name: "Line", value: "#E6EAF2", role: "Hairlines", className: "bg-line" },
    { name: "Cloud", value: "#F7F9FC", role: "Alternate sections", className: "bg-cloud" },
    { name: "Sky 1", value: "#EAF3FF", role: "Label pills, tags", className: "bg-sky-1" },
    { name: "Sky 2", value: "#CFE2FF", role: "Thumbnails", className: "bg-sky-2" },
    { name: "Sky 3", value: "#A9CBFF", role: "Bars, closing panel", className: "bg-sky-3" },
    { name: "Azure", value: "#2563EB", role: "Focus, data, icons", className: "bg-azure" },
    { name: "Azure ink", value: "#1D4FC4", role: "Links, label text", className: "bg-azure-ink" },
    { name: "Ember", value: "#FF6B3D", role: "“Now” marker only", className: "bg-ember" },
  ],
  gradients: [
    { name: "Sky window", className: "bg-[image:var(--grad-sky-window)]" },
    { name: "Closing panel", className: "bg-[image:var(--grad-closing)]" },
    { name: "Stage tile", className: "bg-[image:var(--grad-stage)]" },
    { name: "Thumbnail tile", className: "bg-[image:var(--grad-thumb)]" },
    { name: "Potentia warm", className: "bg-[image:var(--grad-warm)]" },
  ],
  type: [
    { name: "Display 80 / 46", className: "text-display" },
    { name: "Closing H2 60 / 34", className: "text-closing" },
    { name: "H2 52 / 34", className: "text-h2" },
    { name: "H3 lead tile 34 / 28", className: "text-h3-lead" },
    { name: "H3 tile 24", className: "text-h3" },
    { name: "H3 panel 22", className: "text-h3-panel" },
    { name: "Title 20", className: "text-title" },
    { name: "Lede 20 / 17", className: "text-lede text-slate" },
    { name: "Body 17", className: "text-body text-slate" },
    { name: "Label 14", className: "text-label font-semibold text-azure-ink" },
  ],
  sub: {
    swatches: "Palette",
    gradients: "Gradients",
    buttons: "Buttons: primary, secondary, small, text, icon only, busy, disabled",
    links: "Links: next, external, in-page, inline",
    label: "Label pill, on white and on sky",
    tags: "Tags (information)",
    chips: "Chips (controls)",
    cards: "Floating cards on white: play, profile, appraisal, result",
    gameList: "Games list (GBA modules)",
    statTiles: "Stat tiles",
    whyThree: "Three columns, on Cloud (The 6 I's)",
    bigPanel: "Big numbers on a panel (White section)",
    proof: "Proof row",
    fields: "Fields",
    choice: "Choice chips and select",
    consent: "Consent checkbox",
    formError: "Form-level error and busy button",
    success: "Success panel",
    tableCards: "List: stacked cards on a phone",
    linkCard: "Client story link card (product pages)",
    quoteCloud: "Quote card on White (Cloud card, no border)",
    logoWall: "Client logos",
    storyGrid: "Story cards (Clients hub): with a thumbnail tile, and without",
    quoteMain: "Main client quote, original language with translation",
    quoteGrid: "Participant quotes on Cloud (white cards)",
    logoRaster: "Raster logo: greyscale, 70%",
    tableScroll: "Matrix: scrolls sideways on a phone, first column pinned",
  },
} as const;
