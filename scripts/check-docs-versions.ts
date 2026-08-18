/**
 * Fails when human-facing documentation pins a registry version other than the
 * current `GAMESCIENCE_UI_VERSION`.
 *
 * Machine-generated surfaces (version.json, consumer/gamescience-ui.json, the
 * agent catalogue) are already derived from the version constant, and the
 * skills resolve the version dynamically from published metadata. Prose docs
 * are the only surface that drifts silently, so they are checked here.
 *
 * Exemptions:
 * - Historical changelogs listed in `HISTORICAL_DOCS` keep their original pins.
 * - Any single line containing `pin-exempt` is skipped.
 */

import { readFileSync } from "node:fs";
import path from "node:path";

import { PUBLIC_PAGES_DOCS } from "./pages-config.ts";
import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";

const repoRoot = path.resolve(import.meta.dirname, "..");

/** Per-version migration notes legitimately reference the version they describe. */
const HISTORICAL_DOCS = new Set<string>([
  "docs/migration-notes.md",
  ...PUBLIC_PAGES_DOCS.filter((doc) => doc.startsWith("migrations/")).map((doc) => `docs/${doc}`),
]);

/** Human-facing files that must always advertise the current pin. */
const CHECKED_FILES = [
  "README.md",
  "AGENTS.md",
  ...PUBLIC_PAGES_DOCS.map((doc) => `docs/${doc}`),
].filter((file) => !HISTORICAL_DOCS.has(file));

const PIN_PATTERN = /versions\/(\d+\.\d+\.\d+)/g;
const EXEMPT_MARKER = "pin-exempt";

type Failure = {
  file: string;
  line: number;
  found: string;
  text: string;
};

const failures: Failure[] = [];

for (const file of CHECKED_FILES) {
  let contents: string;
  try {
    contents = readFileSync(path.join(repoRoot, file), "utf8");
  } catch {
    console.error(`[docs:check] missing file: ${file}`);
    process.exitCode = 1;
    continue;
  }

  contents.split("\n").forEach((text, index) => {
    if (text.includes(EXEMPT_MARKER)) return;

    for (const match of text.matchAll(PIN_PATTERN)) {
      const found = match[1];
      if (found === undefined || found === GAMESCIENCE_UI_VERSION) continue;
      failures.push({ file, line: index + 1, found, text: text.trim() });
    }
  });
}

if (failures.length > 0) {
  console.error(
    `[docs:check] ${failures.length} stale version pin(s); expected ${GAMESCIENCE_UI_VERSION}:\n`,
  );
  for (const failure of failures) {
    console.error(`  ${failure.file}:${failure.line} → ${failure.found}`);
    console.error(`    ${failure.text}`);
  }
  console.error(
    `\n[docs:check] Update the pin to ${GAMESCIENCE_UI_VERSION}, or add a "${EXEMPT_MARKER}" ` +
      `comment on the line when the reference is deliberately historical.`,
  );
  process.exit(1);
}

console.log(
  `[docs:check] ${CHECKED_FILES.length} docs pin ${GAMESCIENCE_UI_VERSION} ` +
    `(${HISTORICAL_DOCS.size} historical docs skipped)`,
);
