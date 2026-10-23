// Where every URL of the old WordPress site goes on the new one (Task 7.3b). `docs/seo/old-urls.txt`
// lists the old paths (from the site's own wp-sitemap.xml files); `redirects()` in next.config.ts turns
// each entry here into a permanent redirect, with and without the trailing slash. Destinations carry
// `/en` so each old URL is one hop. Indonesian pages go where their English twin goes (Phase 6 is on
// hold), and a blog article goes to the product page its topic matches, else Home.

const home = "/en";
const solutions = "/en/solutions";
const gba = "/en/solutions/game-based-assessment";
const enhance = "/en/solutions/enhance";
const about = "/en/about";
const contact = "/en/contact";

/** Old paths (no trailing slash) grouped by destination. */
const byDestination: Record<string, string[]> = {
  [home]: [
    "/deus-home-page",
    "/blog",
    // Blog articles with no product page of their own.
    "/hr-digitalization/hr-landscape",
    "/talent-and-workplace-trends-in-2023/hr-landscape",
    "/digital-hr-trends-indonesia-2025/hr-landscape",
    "/beat-fasting-fatigue/hr-landscape",
    "/the-critical-importance-of-employee-well-being-in-the-modern-workplace/hr-landscape",
    "/impact-of-ihsg-decline-on-the-job-sector-in-indonesia/hr-landscape",
    "/stock-loss-prevention-strategies-to-improve-inventory-management/organizational-growth",
    "/employee-monitoring-solutions/organizational-growth",
    "/remote-store-operation/organizational-growth",
    "/employee-orientation/insight",
    "/hris-software-hotel-industries/talent-acquisition",
    "/attendance-application-benefits/hr-landscape",
    "/retail-industry-in-indonesia/industry-updates",
    "/retail-business-management-modern-strategies-for-managing-operations-and-increasing-sales/hr-landscape",
    "/tesen/talent-acquisition",
    "/tesen-2/hr-landscape",
    "/tesen-3/hr-landscape",
    "/pengembangan-karier-en-2/uncategorized-en",
    "/the-importance-of-career-development-for-employees-in-improving-performance-and-retention/employee-performance-and-growth",
    "/employee-training-strategies/uncategorized-en",
    "/id/aplikasi-absen/all",
    "/id/pentingnya-kerja-cerdas/uncategorized-en",
    "/id/digitalisasi-untuk-umkm/uncategorized-en",
    "/id/software-hris-di-industri-perhotelan/uncategorized-en",
    "/id/strategi-manajemen-sdm/uncategorized-en",
    "/id/industri-ritel-di-indonesia/uncategorized-en",
    "/id/orientasi-karyawan-baru-langkah-strategis-menyambut-talenta-berkualitas/uncategorized-en",
    "/id/manajemen-operasional-kunci-efisiensi-dan-produktivitas-dalam-bisnis-modern/all",
    "/id/manajemen-bisnis-ritel-strategi-modern-manajemen-operasional-dan-meningkatkan-penjualan/uncategorized-en",
    "/id/pentingnya-pengembangan-karir-bagi-karyawan-dalam-meningkatkan-kinerja-dan-retensi-2/uncategorized-en",
    "/id/strategi-pelatihan-karyawan/uncategorized-en",
    "/id/digitalisasi-bisnis-indonesia/uncategorized-en",
    "/id/on-the-job-training-ojt-pengertian-manfaat-dan-cara-efektif-menerapkannya/uncategorized-en",
    "/id/manfaat-aplikasi-absensi-karyawan-untuk-industri-logistik/uncategorized-en",
    // Categories on no product topic, and the page-builder's header templates (never public pages).
    "/category/insight",
    "/category/hr-landscape",
    "/category/organizational-growth",
    "/category/industry-updates",
    "/category/uncategorized-en",
    "/id/category/all",
    "/id/category/hr-landscape-id",
    "/elementor-hf/elementor-6326",
    "/id/elementor-hf/header-id",
  ],
  [solutions]: [
    // Services the new site doesn't offer.
    "/training-program",
    "/development-program",
    "/training-and-development",
    "/operational-management-strategies",
    "/operational-management-strategies-2",
    "/eagle-vision",
    "/hr-services-english",
    "/hr-services-english-2",
    "/id/hr-services-bahasa-indonesia",
    "/id/layanan-manajemen-sdm-kami",
    "/id/strategi-operational-management",
  ],
  [about]: ["/about-us-human-resource-management", "/why-deus", "/our-journey", "/id/tentang-layanan-manajemen-sdm-kami"],
  [contact]: ["/get-started"],
  [gba]: [
    "/gamified-assessment",
    "/personality-and-competency-gamified-assessment",
    "/id/sistem-gamifikasi-untuk-rekrutmen",
    // Blog articles on recruitment, assessment and gamification.
    "/how-can-gamification-be-used-to-attract-young-talents/insight",
    "/how-does-gamification-help-your-company-win-the-talent-war/insight",
    "/predict-workforce-success-with-a-game/hr-landscape",
    "/gamification-employee-development-indonesia/talent-acquisition",
    "/hiring-mistakes/talent-acquisition",
    "/quiet-hiring-strategy-for-indonesian-businesses/talent-acquisition",
    "/strategies-for-recruiting-in-high-growth-organizations/talent-acquisition",
    "/gamification-for-recruitment/employee-performance-and-growth",
    "/understanding-cost-per-hire/talent-acquisition",
    "/recruitment-strategy/employee-performance-and-growth",
    "/id/strategi-rekrutmen-karyawan/all",
    "/id/apa-itu-cost-per-hire/uncategorized-en",
    "/id/candidate-experience-rekrutmen/uncategorized-en",
    "/id/gamifikasi-pengertian-tujuan-dan-manfaat-dalam-rekrutmen/hr-landscape-id",
    "/category/talent-acquisition",
    "/id/category/talent-acquisition-id",
  ],
  [`${gba}#personality`]: [
    "/gamification-and-personality-how-does-it-work/insight",
    "/personality-test-in-the-recruitment-process/talent-acquisition",
    "/id/11-jenis-tes-kepribadian/uncategorized-en",
  ],
  [`${gba}#cognitive`]: ["/learn-more-about-cognitive-assessments/insight"],
  [`${gba}#science`]: ["/our-science"],
  [`${gba}#reports`]: ["/our-outputs", "/individual-report", "/mass-dashboard"],
  [`${gba}#faq`]: ["/frequently-asked-questions"],
  [enhance]: [
    "/deus-enhance-kpi-management",
    "/key-performance-indicator",
    "/performance-appraisal",
    "/remuneration",
    "/talent-map",
    "/talent-gap-analysis",
    "/id/sistem-kpi-perusahaan",
    // Blog articles on KPIs, performance and compensation.
    "/why-kpis-are-your-secret-weapon-for-staying-ahead-in-a-competitive-market/employee-performance-and-growth",
    "/performance-evaluation-systems/employee-performance-and-growth",
    "/11-types-of-employee-benefits/employee-compensation",
    "/7-smart-kpi-management-tips/employee-performance-and-growth",
    "/performance-management-system/uncategorized-en",
    "/id/11-jenis-benefit-karyawan/uncategorized-en",
    "/id/smart-goals-method/uncategorized-en",
    "/id/perbedaan-insentif-dan-bonus/uncategorized-en",
    "/category/employee-compensation",
    "/category/employee-performance-and-growth",
    "/id/category/employee-performance-growth-strategies",
  ],
};

export type OldSiteRedirect = { from: string; to: string };

export const oldSiteRedirects: readonly OldSiteRedirect[] = Object.entries(byDestination).flatMap(([to, paths]) =>
  paths.map((from) => ({ from, to })),
);

/** `redirects()` entries for one mapping: permanent, with and without the trailing slash. */
export function oldSiteRedirectRules({ from, to }: OldSiteRedirect) {
  return [
    { source: from, destination: to, permanent: true as const },
    { source: `${from}/`, destination: to, permanent: true as const },
  ];
}
