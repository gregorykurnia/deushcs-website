# Kasus penggunaan: Asesmen rekrutmen kampus

Route: `/id/solutions/campus-recruitment-assessment` · Status: Draf v1 (2026-10-23), dari `content/en/use-cases/campus-recruitment-assessment.md`, menunggu pembacaan penutur asli (Q14) · Struktur: `SEO/geo-implementation-plan.md` §S8 dan §S12 · Produk: Game-Based Assessment

**SEO title:** Asesmen Rekrutmen Kampus: Menyaring Lulusan dalam Jumlah Besar | DEUS
**SEO description:** Saring lulusan dari banyak universitas lewat game Personality dan Cognitive di browser. Peringkat yang jelas dan bisa dipertanggungjawabkan, dinilai otomatis dan dinormakan pada populasi Indonesia.

> Note: ditulis untuk pencarian dalam bahasa Indonesia. Frasa pencarian (§S12): **rekrutmen kampus**, dipakai di H1 dan di paragraf jawaban. Fakta sama persis dengan versi Inggris; tidak ada klien kampus yang disebut karena tidak ada di sumber. Halaman ini berpusat pada rekrutmen kampus dan menyebut bahwa pasangan modul yang sama berlaku untuk posisi apa pun.

> Note: putaran 4 (V8, 2026-10-27) merapikan kalimat yang terdengar seperti tulisan mesin (`content/VOICE.md`), tanpa mengubah fakta. Judul dan pertanyaan FAQ yang berubah ada di `revisions4.0/copy-changes.md`.

---

## 1. Hero

Eyebrow: Kasus penggunaan · Game-Based Assessment

# Asesmen rekrutmen kampus

DEUS menjalankan asesmen rekrutmen kampus untuk perusahaan di Indonesia yang merekrut lulusan dalam jumlah besar. Pelamar dari banyak universitas memainkan game Personality dan Cognitive yang singkat di browser ponsel atau laptop, tanpa aplikasi untuk dipasang. Hasilnya berupa peringkat yang jelas dan bisa dipertanggungjawabkan untuk kandidat yang CV-nya mirip. Penilaian berjalan otomatis, dan setiap skor dinormakan pada populasi Indonesia.

> Note: paragraf jawaban (§S2), berdiri sendiri supaya bisa dikutip AI.

[Minta uji coba gratis] → `/contact?product=gba`

Layar: "Memainkan DEUS Discover" · "Memainkan game kognitif" (keduanya kartu hero GBA)

---

## 2. Masalahnya

Eyebrow: Masalahnya

## Ratusan lulusan, dan CV yang mirip satu sama lain.

Rekrutmen kampus mendatangkan pelamar dalam jumlah besar dari banyak universitas. Di atas kertas, banyak dari mereka tampak sama, dan alat penyaringan yang biasa dipakai tidak membedakan mereka dengan baik.

**1. CV tidak membedakan mereka**
Jurusan, IPK, dan kegiatannya sering mirip, jadi CV saja nyaris tak memberi dasar untuk meranking.

**2. Kandidat belajar untuk psikotes**
Jawaban tes kepribadian yang umum mudah dicari di internet. Hasilnya akhirnya mengukur seberapa baik seseorang berlatih, bukan siapa dia sebenarnya.

**3. Kandidat yang bagus berhenti di tengah jalan**
Asesmen yang panjang dan monoton membuat orang menyerah sebelum selesai.

**4. Menilai manual memperlambat rekrutmen**
Tim HR Anda menghabiskan berhari-hari untuk menilai, merekap, dan merapikan hasil, sementara kandidat menunggu.

---

## 3. Cara DEUS bekerja

Eyebrow: Cara DEUS bekerja

## Personality dan Cognitive, untuk peringkat yang bisa Anda jelaskan.

Untuk rekrutmen kampus, kami memasangkan dua modul. Bersama-sama keduanya menunjukkan siapa setiap lulusan dan bagaimana ia berpikir, sehingga daftar pendek bertumpu pada lebih dari sekadar CV.

**Personality · DEUS Discover**
Kandidat mengambil keputusan di dalam cerita bergaya RPG. Pilihan mereka membentuk profil 32 subtrait kepribadian dan 24 trait kompetensi berdasarkan model Big Five (OCEAN), diukur terhadap kompetensi yang dibutuhkan tiap posisi. Tidak ada jawaban benar yang jelas untuk dikejar.
[Modul Personality →] *(→ /solutions/game-based-assessment#personality)*

**Cognitive**
Tujuh game singkat berwaktu tentang kecepatan pemrosesan, memori kerja, penalaran, dan lainnya. Game ini mengukur akurasi dan kecepatan secara real time, memberi Anda tolok ukur learning agility, dan bisa dijalankan untuk sebanyak apa pun kandidat yang Anda butuhkan sekaligus.
[Modul Cognitive →] *(→ /solutions/game-based-assessment#cognitive)*

Pasangan yang sama berlaku untuk posisi apa pun dengan pelamar dalam jumlah besar. Sedang menyeleksi program Management Trainee? [Asesmen Management Trainee →] *(→ /solutions/management-trainee-assessment)*

---

## 4. Cara menjalankannya

Eyebrow: Cara menjalankannya

## Satu unggahan untuk setiap universitas di daftar Anda.

**1. Undang**
Tambahkan semua pelamar dari satu file CSV, dari kampus mana pun mereka melamar. Undangan bermerek terkirim otomatis, dan kandidat yang belum mulai menerima pengingat.

**2. Mulai dengan aman**
Pengecekan perangkat dan logika anti-curang berjalan sebelum game pertama. Kandidat bermain di ponsel atau laptop mereka sendiri, di browser, tanpa perlu mengunduh apa pun.

**3. Main**
Mereka mengerjakan cerita dan game kognitif. Kandidat pulang dengan kesan bahwa perusahaan Anda modern dan serius soal talenta.

**4. Putuskan**
Laporan siap begitu kandidat selesai. Batch report meranking setiap pelamar dan menandai yang berada di bawah skor batas Anda, dan lewat dashboard interaktif, komite rekrutmen Anda bisa menyaring berdasarkan rentang skor dan membuka profil lengkap kandidat mana pun.

---

## 5. Bukti

Dipercaya **40+ merek** di seluruh Indonesia.

[Dinding logo, seperti di Beranda: `ProofRow` dengan `LogoWall`]

> Note: selama `showStories` mati (seperti sekarang), hanya dinding logo dan kalimat "40+ merek", tanpa tautan cerita. Setelah menyala, tautan "Baca cerita klien" ada di sini: tidak ada cerita tentang rekrutmen kampus, jadi tidak ada kartu cerita.

---

## 6. Penawaran unduhan

> Note: blok `DownloadOffer` bersama, dengan teks dari `messages/id.json`. Tampil hanya selama `showSampleReport` menyala; tidak punya teks sendiri di sini.

---

## 7. FAQ

Eyebrow: FAQ

## Pertanyaan seputar asesmen rekrutmen kampus.

**Asesmen apa yang paling cocok untuk rekrutmen kampus?**
Personality dan Cognitive bersama-sama. Rekrutmen kampus mendatangkan pelamar dalam jumlah besar dari banyak universitas, dengan CV yang mirip. Personality menunjukkan bagaimana perilaku tiap lulusan dan kompetensi apa yang ia bawa, sedangkan Cognitive mengukur kecepatan, akurasi, dan learning agility. Keduanya memberi Anda peringkat yang jelas dan bisa dipertanggungjawabkan. Anda bisa mulai dari satu modul dan menambahkan yang lain nanti.

**Apakah lulusan perlu memasang sesuatu?**
Tidak. Asesmen berjalan di browser ponsel atau desktop, jadi kandidat mengerjakannya di ponsel atau laptop mereka sendiri. Mereka hanya perlu koneksi internet yang stabil. Pengecekan perangkat dan logika anti-curang berjalan sebelum game pertama, dan tidak ada yang perlu diunduh.

**Berapa banyak pelamar yang bisa ditangani sekaligus?**
Sebanyak yang Anda butuhkan. Sebuah grup telekomunikasi nasional memakai DEUS untuk menilai lebih dari 1.000 kandidat Management Trainee di 30+ provinsi sekaligus, dengan hasil dalam sehari. Platform mengirim undangan dan pengingat, memantau siapa yang sudah selesai, dan membuat setiap laporan, jadi rekrutmen kampus berskala besar tidak berarti menambah orang di tim HR Anda.

**Apakah kandidat akan menikmatinya?**
Game memang dibuat untuk itu: lebih cepat dan menarik daripada kuesioner panjang, yang sering ditinggalkan kandidat di tengah jalan. Kandidat pulang dengan kesan bahwa perusahaan Anda modern dan serius soal talenta, dan peserta pernah mengatakan kepada kami bahwa rasanya sama sekali tidak seperti psikotes.

---

## 8. Penutup

Eyebrow: Sedang menyiapkan rekrutmen?

# Menjalankan rekrutmen MT atau rekrutmen kampus?

Kami akan tunjukkan setiap langkah rekrutmen skala nasional di DEUS, sampai daftar akhir berperingkat.

[Minta demo] [Chat via WhatsApp]

Contact bar: Hubungi kami · admin@deushcs.com

> Note: penutup yang disetujui dari cerita Telkom (`clients-telkom-group.md` §8, R17 F86), diterjemahkan, sama dengan halaman Management Trainee.

---

## Sumber

> Note: tidak tampil di halaman. Semua fakta sama dengan versi Inggris dan berasal dari sumber yang sama; lihat bagian Sources di `content/en/use-cases/campus-recruitment-assessment.md`. Tidak ada angka, klien, atau kutipan baru.
