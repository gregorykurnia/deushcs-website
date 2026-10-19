import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Pages that became sections of another page (F10 in task R2, F28 in R6). They redirect permanently,
// with or without the locale; a path without one lands on the locale-less target, and the locale
// proxy then adds the visitor's locale (the browser keeps the #fragment through that second redirect).
const gba = "/solutions/game-based-assessment";
const movedPages = [
  { from: "/solutions/discover", to: `${gba}#personality` },
  { from: "/solutions/next-chapter", to: `${gba}#cognitive` },
  { from: "/science", to: `${gba}#science` },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return movedPages.flatMap(({ from, to }) => [
      { source: `/:locale(en|id)${from}`, destination: `/:locale${to}`, permanent: true },
      { source: from, destination: to, permanent: true },
    ]);
  },
  partialPrefetching: true,
  images: {
    // AVIF first: browsers that accept it get the smaller file (DESIGN-GUIDE.md §8.4).
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
