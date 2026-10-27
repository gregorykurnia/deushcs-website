import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  codeSegments,
  isIndonesian,
  isSkipped,
  loadLists,
  markdownSegments,
  parseAllow,
  scanFiles,
  scanSegments,
} from "../../scripts/check-voice.mjs";

// Task V1: the voice checker (scripts/check-voice.mjs). The word lists come from content/VOICE.md.

const lists = {
  en: ["seamless", "journey", "in one place", "no more"],
  id: ["inovatif", "solusi"],
  oncePerPage: ["at a glance", ", not ", "not just", "bukan sekadar"],
};

const scanMd = (text: string, file = "content/en/page.md", allowed = new Set<string>()) =>
  scanSegments(file, markdownSegments(text), lists, allowed);

describe("loadLists", () => {
  const voice = readFileSync("content/VOICE.md", "utf8");
  const real = loadLists(voice);

  it("reads the English, Indonesian and once-per-page lists from VOICE.md", () => {
    expect(real.en).toEqual(expect.arrayContaining(["seamless", "journey", "in today's fast-paced world", "streamline", "here's what", "simply"]));
    expect(real.id).toEqual(expect.arrayContaining(["inovatif", "di era digital", "komprehensif"]));
    expect(real.oncePerPage).toEqual(
      expect.arrayContaining(["the moment they finish", "in one place", "one platform", "at a glance", "at scale", ", not", "not just", "bukan sekadar", "tidak hanya"]),
    );
  });

  it("keeps the Indonesian words out of the English list and the reverse", () => {
    expect(real.en).not.toContain("inovatif");
    expect(real.id).not.toContain("seamless");
  });

  it("drops patterns with X, Y or an ellipsis, and the text in brackets", () => {
    expect(real.en.some((e) => /\bx\b|\by\b|…/.test(e))).toBe(false);
    expect(real.en).toContain("journey");
    expect(real.en.some((e) => e.includes("("))).toBe(false);
  });

  it("parses a labelled bullet and strips quotes", () => {
    const parsed = loadLists(
      "## Words and phrases we don't use\n\n- **Hype:** \"here's what\" · imagine\n\n### Indonesian\n\n- **Words:** inovatif · \"di era digital\"\n\n## Other\n\nsimply · fine\n\n**Once per page:** \"at scale\" · \", not \"\n",
    );
    expect(parsed).toEqual({ en: ["here's what", "imagine"], id: ["inovatif", "di era digital"], oncePerPage: ["at scale", ", not"] });
  });
});

describe("scanSegments", () => {
  it("finds a banned word, with its line number", () => {
    const hits = scanMd("Fine line.\nA seamless start.\n");
    expect(hits).toEqual([{ file: "content/en/page.md", line: 2, phrase: "seamless", repeat: false }]);
  });

  it("matches case-insensitively and on whole words only", () => {
    expect(scanMd("SEAMLESS.")).toHaveLength(1);
    expect(scanMd("Seamlessly, a journeyman.")).toHaveLength(0);
    expect(scanMd("The journey.")).toHaveLength(1);
  });

  it("matches a curly apostrophe and a phrase split over spaces", () => {
    const lists2 = { ...lists, en: ["here's what"], oncePerPage: [] };
    expect(scanSegments("a.md", markdownSegments("Here’s what  you get"), lists2)).toHaveLength(1);
  });

  it("uses the Indonesian list for Indonesian files only", () => {
    expect(scanMd("Solusi inovatif.", "content/id/page.md").map((h) => h.phrase)).toEqual(["solusi", "inovatif"]);
    expect(scanMd("Solusi inovatif.", "content/en/page.md")).toHaveLength(0);
    expect(scanMd("A seamless day.", "content/id/page.md")).toHaveLength(0);
    expect(isIndonesian("src/content/id/contact.ts")).toBe(true);
    expect(isIndonesian("messages/id.json")).toBe(true);
    expect(isIndonesian("content/en/idea.md")).toBe(false);
  });

  it("allows a phrase once per page and reports each use after the first", () => {
    const hits = scanMd("All at a glance.\nMore at a glance.\nAnd not just this. Also not just that.\n");
    expect(hits).toEqual([
      { file: "content/en/page.md", line: 2, phrase: "at a glance", repeat: true },
      { file: "content/en/page.md", line: 3, phrase: "not just", repeat: true },
    ]);
  });

  it("counts a contrast line as a once-per-page phrase", () => {
    expect(scanMd("It is a tool, not a toy.\nIt is a map, not a trail.\n")).toHaveLength(1);
    expect(scanMd("Ini bukan sekadar alat.\nIni bukan sekadar peta.\n", "content/id/page.md")).toHaveLength(1);
  });

  it("skips a hit that is in the allow list", () => {
    const allowed = parseAllow("# comment\ncontent/en/page.md | Journey | a real sequence of steps\n");
    expect(scanMd("The journey.", "content/en/page.md", allowed)).toHaveLength(0);
    expect(scanMd("The journey.", "content/en/other.md", allowed)).toHaveLength(1);
    expect(scanMd("A seamless day.", "content/en/page.md", allowed)).toHaveLength(1);
  });
});

describe("what is scanned", () => {
  it("skips `> Note:` lines in Markdown, with the lines that continue them", () => {
    const text = "> Note: a seamless idea\n> and no more\nBody text.\n";
    expect(scanMd(text)).toEqual([]);
    expect(scanMd("> Note: x\n\nA seamless day.")).toHaveLength(1);
  });

  it("skips link targets, inline code and button targets in Markdown", () => {
    expect(scanMd("[Read on](/en/journey) and `journey`")).toHaveLength(0);
    expect(scanMd("[See the guide] → /en/journey")).toHaveLength(0);
  });

  it("skips code comments in TypeScript and scans string values", () => {
    const ts = [
      'import { journey } from "@/content/journey";',
      "// a seamless comment",
      "/* seamless",
      "   block */",
      'const a = { title: "A seamless start", href: "/en/journey" };',
      "const b = `one",
      "two journey`;",
    ].join("\n");
    const hits = scanSegments("src/content/en/x.ts", codeSegments(ts), lists);
    expect(hits.map((h) => [h.line, h.phrase])).toEqual([
      [5, "seamless"],
      [7, "journey"],
    ]);
  });

  it("skips JSON keys and scans values", () => {
    const json = '{\n  "journey": "Ours is a seamless one",\n  "nested": { "seamless": "ok" }\n}\n';
    const hits = scanSegments("messages/en.json", codeSegments(json, { json: true }), lists);
    expect(hits.map((h) => [h.line, h.phrase])).toEqual([[2, "seamless"]]);
  });

  it("skips VOICE.md, content/not-used, the privacy content and the styleguide showcase", () => {
    expect(isSkipped("content/VOICE.md")).toBe(true);
    expect(isSkipped("content/not-used/old.md")).toBe(true);
    expect(isSkipped("src/content/en/privacy.ts")).toBe(true);
    expect(isSkipped("src/content/styleguide.ts")).toBe(true);
    expect(isSkipped("content/en/home.md")).toBe(false);
  });

  it("covers every content file and none of the skipped ones", () => {
    const files = scanFiles();
    expect(files).toContain("content/en/home.md");
    expect(files).toContain("messages/id.json");
    expect(files).toContain("src/content/en/home.ts");
    expect(files.some((f) => isSkipped(f))).toBe(false);
  });
});
