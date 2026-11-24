// long-roast-lawmakers: writes one satirical sentence about lawmakers who
// regulate AI, crypto, and the internet but cannot convert a file to PDF.
// Deterministic: no clock reads, no randomness, no network, no secrets.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The lawmakers who wrote a 400-page bill regulating AI, crypto, and the internet just emailed it to their own staff as final_FINAL_v2.pdf.docx and asked why nobody can open it.";

// The gate requires 1-320 characters of UTF-8 text, not only whitespace,
// and the entry must be a single sentence that stands alone.
const length = [...ENTRY].length;
if (length < 1 || length > 320) {
  throw new Error(`entry must be 1-320 characters, got ${length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
// One sentence only: it ends with a period and contains no sentence break
// before it. Dots inside the mangled filename (final_FINAL_v2.pdf.docx)
// are not sentence breaks, so only ". " , "?" and "!" count as breaks.
const body = ENTRY.slice(0, -1);
if (!ENTRY.endsWith(".") || body.includes(". ") || body.includes("?") || body.includes("!")) {
  throw new Error("entry must be exactly one sentence");
}
// The roast must name its target and the file it cannot convert.
if (!ENTRY.includes("lawmakers") || !ENTRY.includes(".pdf.docx")) {
  throw new Error("entry must roast lawmakers and the file they cannot convert");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${length} characters to ${join(outDir, "entry.txt")}`);
