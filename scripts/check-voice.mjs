#!/usr/bin/env node
// Checks the site's copy against content/VOICE.md (Task V1, revisions4.0/round4-implementation-plan.md §S8).
// Prints `file:line  phrase` for each hit, then a count per file. Exits 1 with --strict if there is any hit.
//
//   node scripts/check-voice.mjs                     every content file
//   node scripts/check-voice.mjs --strict a.md b.ts  only those files; exit 1 on a hit
//
// The word lists live in content/VOICE.md (see `loadLists`). A hit that is right in context goes in
// scripts/check-voice-allow.txt as `file | phrase | why`. Forced threes, punchlines and slide-speak are
// the writer's job: a script can't see them.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");

/** Where the scan looks, relative to the repo root. */
export const SCAN_DIRS = ["content/en", "content/id", "src/content", "messages"];

// ---- Lists (read from content/VOICE.md) ----

/** One list entry as plain text: no label, quotes or parenthetical. Patterns ("X", "Y", "…") return null. */
export function cleanEntry(raw) {
  let e = raw.replace(/\([^)]*\)/g, " ").replace(/[“”"]/g, "").replace(/’/g, "'").replace(/\s+/g, " ").trim();
  if (!e || /…|\.\.\./.test(e) || /(^|\s)[XY](\s|,|$)/.test(e)) return null;
  return e.toLowerCase();
}

/** The entries on one line: `- **Label:** a · b · "c d"` gives a, b, c d. */
function lineEntries(line) {
  if (!line.includes(" · ")) return [];
  const body = line.replace(/^\s*-\s+/, "").replace(/^\*\*[^*]*\*\*\s*/, "");
  return body.split(" · ").map(cleanEntry).filter(Boolean);
}

/**
 * Reads the three lists from VOICE.md's text: English "don't use" words (the section "Words and phrases we
 * don't use", before its "### Indonesian" subsection), Indonesian ones (that subsection), and the phrases
 * allowed once per page (the line starting `**Once per page:**`).
 */
export function loadLists(voiceText) {
  /** @type {{ en: string[], id: string[], oncePerPage: string[] }} */
  const lists = { en: [], id: [], oncePerPage: [] };
  let where = null;
  for (const line of voiceText.split("\n")) {
    if (/^##\s+Words and phrases we don't use/i.test(line)) where = "en";
    else if (/^###\s+Indonesian/i.test(line) && where) where = "id";
    else if (/^##\s/.test(line)) where = null;
    if (/^\*\*Once per page:\*\*/.test(line)) lists.oncePerPage.push(...lineEntries(line));
    else if (where) lists[where].push(...lineEntries(line));
  }
  return lists;
}

// ---- Allow list ----

/** `file | phrase | why` per line; `#` starts a comment. Returns a Set of `file|phrase`. */
export function parseAllow(text) {
  const allowed = new Set();
  for (const line of text.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const [file, phrase] = line.split("|").map((x) => x.trim());
    if (file && phrase) allowed.add(`${file}|${phrase.toLowerCase()}`);
  }
  return allowed;
}

// ---- Segments: the visible text of a file, each with its line ----

/** Markdown: every line except `> Note:` lines (and the `>` lines continuing one), minus link targets and code. */
export function markdownSegments(text) {
  const segments = [];
  let inNote = false;
  text.split("\n").forEach((raw, i) => {
    if (/^>\s*Note:/i.test(raw)) { inNote = true; return; }
    if (inNote && /^>/.test(raw)) return;
    inNote = false;
    const line = raw
      .replace(/\]\([^)]*\)/g, "]")
      .replace(/`[^`]*`/g, " ")
      .replace(/→\s*\S+/g, "→")
      .replace(/<!--.*?-->/g, " ");
    segments.push({ text: line, line: i + 1 });
  });
  return segments;
}

/**
 * TypeScript and JSON: the string literals only, so identifiers, import paths and comments never count.
 * `json` also skips object keys. Template literals are scanned as one string.
 */
export function codeSegments(text, { json = false } = {}) {
  const segments = [];
  let line = 1;
  let i = 0;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    if (c === "\n") { line++; i++; continue; }
    if (!json && c === "/" && text[i + 1] === "/") {
      while (i < n && text[i] !== "\n") i++;
      continue;
    }
    if (!json && c === "/" && text[i + 1] === "*") {
      i += 2;
      while (i < n && !(text[i] === "*" && text[i + 1] === "/")) { if (text[i] === "\n") line++; i++; }
      i += 2;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      const start = line;
      const before = text.slice(Math.max(0, i - 40), i);
      let j = i + 1;
      let s = "";
      while (j < n && text[j] !== c) {
        if (text[j] === "\\") { s += text[j + 1] ?? ""; if (text[j + 1] === "\n") line++; j += 2; continue; }
        if (text[j] === "\n") { if (c !== "`") break; line++; }
        s += text[j];
        j++;
      }
      i = j + 1;
      const isImport = /(\bfrom|\bimport\(?|\brequire\(?)\s*$/.test(before);
      const isKey = json && /^\s*:/.test(text.slice(i, i + 20));
      const isPath = !/\s/.test(s) && (/^(@\/|\.\/|\.\.\/|https?:|mailto:)/.test(s) || s.includes("/"));
      if (!isImport && !isKey && !isPath && s.trim()) segments.push({ text: s, line: start });
      continue;
    }
    i++;
  }
  return segments;
}

// ---- Matching ----

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Case-insensitive, whole words: a letter or digit may not touch an edge that is itself a letter or digit. */
export function phraseRegex(phrase) {
  const body = phrase.split(/\s+/).map(escapeRe).join("\\s+");
  const left = /^[\p{L}\p{N}]/u.test(phrase) ? "(?<![\\p{L}\\p{N}])" : "";
  const right = /[\p{L}\p{N}]$/u.test(phrase) ? "(?![\\p{L}\\p{N}])" : "";
  return new RegExp(left + body + right, "giu");
}

export const isIndonesian = (file) => /(^|\/)id(\/|\.json$)/.test(file.split(sep).join("/"));
export const isSkipped = (file) => {
  const f = file.split(sep).join("/");
  return /(^|\/)VOICE\.md$/.test(f) || f.includes("content/not-used/") || /privacy/i.test(f);
};

/**
 * Hits in one file's segments. A banned phrase is a hit every time; a once-per-page phrase is a hit from its
 * second use in the file on. Returns `{ file, line, phrase, repeat }[]`, in file order, minus allowed ones.
 */
export function scanSegments(file, segments, lists, allowed = new Set()) {
  const id = isIndonesian(file);
  const banned = id ? lists.id : lists.en;
  const once = lists.oncePerPage.filter((p) => (id ? /^(bukan|tidak)/.test(p) : !/^(bukan|tidak)/.test(p)));
  const seen = new Map();
  const hits = [];
  for (const seg of segments) {
    const text = seg.text.replace(/’/g, "'");
    const found = [];
    for (const phrase of banned) {
      for (const m of text.matchAll(phraseRegex(phrase))) found.push({ at: m.index, phrase, repeat: false });
    }
    for (const phrase of once) {
      for (const m of text.matchAll(phraseRegex(phrase))) found.push({ at: m.index, phrase, once: true });
    }
    found.sort((a, b) => a.at - b.at);
    for (const f of found) {
      const lineNo = seg.line + (text.slice(0, f.at).match(/\n/g)?.length ?? 0);
      if (f.once) {
        const count = (seen.get(f.phrase) ?? 0) + 1;
        seen.set(f.phrase, count);
        if (count < 2) continue;
        f.repeat = true;
      }
      if (allowed.has(`${file.split(sep).join("/")}|${f.phrase}`)) continue;
      hits.push({ file, line: lineNo, phrase: f.phrase, repeat: f.repeat });
    }
  }
  return hits;
}

/** The segments for a file's text, by its extension. */
export function segmentsFor(file, text) {
  if (file.endsWith(".md")) return markdownSegments(text);
  if (file.endsWith(".json")) return codeSegments(text, { json: true });
  if (file.endsWith(".ts") || file.endsWith(".tsx")) return codeSegments(text);
  return [];
}

// ---- Files ----

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(md|ts|tsx|json)$/.test(name)) out.push(p);
  }
  return out;
}

/** Every file the scan covers, as paths relative to the repo root. */
export function scanFiles(root = ROOT) {
  return SCAN_DIRS.flatMap((d) => walk(join(root, d)))
    .map((p) => relative(root, p).split(sep).join("/"))
    .filter((f) => !isSkipped(f));
}

export function main(argv = process.argv.slice(2), root = ROOT) {
  const strict = argv.includes("--strict");
  const args = argv.filter((a) => !a.startsWith("--"));
  const lists = loadLists(readFileSync(join(root, "content/VOICE.md"), "utf8"));
  const allowPath = join(root, "scripts/check-voice-allow.txt");
  const allowed = existsSync(allowPath) ? parseAllow(readFileSync(allowPath, "utf8")) : new Set();
  const files = (args.length ? args.map((a) => relative(root, join(root, a)).split(sep).join("/")) : scanFiles(root)).filter(
    (f) => !isSkipped(f),
  );
  const counts = [];
  let total = 0;
  for (const file of files) {
    const hits = scanSegments(file, segmentsFor(file, readFileSync(join(root, file), "utf8")), lists, allowed);
    for (const h of hits) console.log(`${h.file}:${h.line}  ${h.phrase}${h.repeat ? " (repeat)" : ""}`);
    if (hits.length) counts.push([file, hits.length]);
    total += hits.length;
  }
  if (counts.length) console.log("");
  for (const [file, n] of counts) console.log(`${String(n).padStart(4)}  ${file}`);
  console.log(`${total} hit${total === 1 ? "" : "s"} in ${counts.length} of ${files.length} files`);
  return strict && total > 0 ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) process.exitCode = main();
