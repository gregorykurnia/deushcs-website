import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { ogTitleSize } from "./og";

// The Open Graph image template (Task 7.2, DESIGN-GUIDE §7.28): 1200×630, the sky-window gradient with its
// two highlights, the logo tile and "DEUS" top left, the page's H1, "deushcs.com" bottom left. All text is
// ink (it's read small in chat previews), no ember. `ImageResponse` can't read CSS variables or
// `next/font`, so the token values are repeated here: keep them equal to `src/styles/tokens.css`.

const INK = "#101B3D"; // --ink
const INK_2 = "#26315A"; // --ink-2
const SKY_WINDOW = "linear-gradient(180deg, #8DBAF7 0%, #B6D3FB 38%, #E3EEFD 74%, #F7F9FC 100%)"; // --grad-sky-window
const HIGHLIGHTS = [
  "radial-gradient(600px 300px at 18% 30%, rgba(255,255,255,.5), transparent 70%)",
  "radial-gradient(700px 320px at 84% 22%, rgba(255,255,255,.4), transparent 70%)",
]; // --grad-sky-highlights

export const OG_SIZE = { width: 1200, height: 630 } as const;


export async function renderOgImage(title: string): Promise<ImageResponse> {
  const [semiBold, bold, logo] = await Promise.all([
    readFile(path.join(process.cwd(), "src/assets/fonts/Manrope-SemiBold.ttf")),
    readFile(path.join(process.cwd(), "src/assets/fonts/Manrope-Bold.ttf")),
    readFile(path.join(process.cwd(), "public/assets/deus-logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "Manrope",
          color: INK,
          backgroundImage: [...HIGHLIGHTS, SKY_WINDOW].join(", "),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain elements */}
          <img src={logoSrc} width={64} height={64} alt="" style={{ borderRadius: 18 }} />
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>DEUS</div>
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 960,
            fontSize: ogTitleSize(title),
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: INK_2 }}>deushcs.com</div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Manrope", data: semiBold, weight: 600, style: "normal" },
        { name: "Manrope", data: bold, weight: 700, style: "normal" },
        // the footer line is 500; satori picks the nearest loaded weight
      ],
    },
  );
}
