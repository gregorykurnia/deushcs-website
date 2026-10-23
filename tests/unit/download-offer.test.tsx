import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import type { ComponentProps } from "react";
import { NextIntlClientProvider } from "next-intl";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";
import { downloadOffers } from "@/lib/leads/schema";

// The sample-report download (SEO/geo-implementation-plan.md §S11). While `showSampleReport` is off
// the block renders nowhere: `DownloadOffer` itself renders nothing, and pages use only it (the bare
// card is for the styleguide).

const flags = vi.hoisted(() => ({ showSampleReport: false }));
vi.mock("@/content/flags", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/content/flags")>();
  return {
    siteFlags: new Proxy(actual.siteFlags, {
      get: (target, key) => (key === "showSampleReport" ? flags.showSampleReport : target[key as keyof typeof target]),
    }),
  };
});
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, locale, ...props }: ComponentProps<"a"> & { locale?: string }) => (
    <a href={`/${locale ?? "en"}${href}`} {...props} />
  ),
  usePathname: () => "/solutions/game-based-assessment",
}));
vi.mock("@/lib/leads/actions", () => ({ submitLead: vi.fn() }));

const { DownloadOffer } = await import("@/components/blocks/DownloadOffer");
const { siteFlags: realFlags } = await vi.importActual<typeof import("@/content/flags")>("@/content/flags");

function render(node: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale="en" messages={messages}>
      {node}
    </NextIntlClientProvider>,
  );
}

/** Every .ts/.tsx file under a folder. */
function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sources(path);
    return /\.tsx?$/.test(name) ? [path] : [];
  });
}

describe("DownloadOffer (§S11)", () => {
  it("renders nothing while showSampleReport is off", () => {
    flags.showSampleReport = false;
    expect(render(<DownloadOffer />)).toBe("");
  });

  it("while on, renders the card with its title, line and the download form", () => {
    flags.showSampleReport = true;
    const html = render(<DownloadOffer />);
    flags.showSampleReport = false;
    expect(html).toContain("data-download-offer");
    expect(html).toMatch(/<h3[^>]*>See what a candidate report looks like\.<\/h3>/);
    expect(html).toContain("with sample data, not a real candidate");
    expect(html).toMatch(/<input[^>]*name="offer"[^>]*value="gba-sample-report"/);
    expect(html).toContain("Get the sample report");
  });

  it("stays off until the sample PDF is in public/", () => {
    const pdf = join(process.cwd(), "public", downloadOffers["gba-sample-report"]);
    if (!existsSync(pdf)) expect(realFlags.showSampleReport).toBe(false);
  });

  it("is placed on pages only through the switch-guarded DownloadOffer", () => {
    // the bare card skips the switch, so only the styleguide may use it
    const users = sources(join(process.cwd(), "src", "app")).filter((path) =>
      /\bDownloadOfferCard\b/.test(readFileSync(path, "utf8")),
    );
    expect(users.map((path) => path.replace(process.cwd(), ""))).toEqual(["/src/app/[locale]/styleguide/Styleguide.tsx"]);
    // the GBA page also checks the switch itself, so no empty spacing is left behind
    const gba = readFileSync(join(process.cwd(), "src/app/[locale]/solutions/game-based-assessment/page.tsx"), "utf8");
    expect(gba).toMatch(/siteFlags\.showSampleReport && \(\s*<Reveal[^>]*>\s*<DownloadOffer \/>/);
  });
});
