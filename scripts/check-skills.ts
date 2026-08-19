/**
 * Contract check for the agent skills in `skills/`.
 *
 * The consumer skills are distributed by hand into the Lovable workspace, so
 * nothing else keeps them honest. This check enforces:
 *
 * 1. Valid, complete frontmatter (including the revision stamp used to identify
 *    which copy is loaded in a workspace).
 * 2. A matching body-level revision line, so the stamp survives a host that
 *    strips or rewrites frontmatter.
 * 3. Theme and register vocabulary that matches the theme contract, checked at
 *    every selection list rather than once per file — a whole-file presence
 *    check passes while a list elsewhere still offers only two themes.
 * 4. No hardcoded registry version pins; skills resolve the version from
 *    published metadata at run time.
 */

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { SUPPORTED_REGISTERS, SUPPORTED_THEMES } from "../src/themes/theme-contract.ts";
import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";

const repoRoot = path.resolve(import.meta.dirname, "..");
const skillsDir = path.join(repoRoot, "skills");

const REQUIRED_KEYS = ["name", "description", "skillUpdated", "libraryVersion", "distribution"];
const VALID_DISTRIBUTIONS = new Set(["lovable-workspace", "repo-maintainer"]);

/**
 * Skills that reason about theme selection must name every supported theme.
 * Maintainer skills (release/update) never select a theme.
 */
const THEME_AWARE = new Set([
  "adopt-gamescience-ui",
  "audit-gamescience-ui",
  "migrate-gamescience-ui",
  "validate-gamescience-ui",
]);

/**
 * Splits markdown into blank-line-separated blocks, keeping the 1-based line
 * number of each. A block is the unit an enumeration lives in — whether it is a
 * bulleted list, a table, or a single pipe-separated sentence.
 */
function blocks(body: string): Array<{ text: string; line: number }> {
  const lines = body.split("\n");
  const out: Array<{ text: string; line: number }> = [];
  let current: string[] = [];
  let start = 1;

  lines.forEach((line, index) => {
    if (line.trim() === "") {
      if (current.length > 0) out.push({ text: current.join("\n"), line: start });
      current = [];
      start = index + 2;
    } else {
      if (current.length === 0) start = index + 1;
      current.push(line);
    }
  });
  if (current.length > 0) out.push({ text: current.join("\n"), line: start });
  return out;
}

const errors: string[] = [];

const files = readdirSync(skillsDir)
  .filter((file) => file.endsWith(".md"))
  .sort();

if (files.length === 0) {
  console.error("[skills:check] no skills found");
  process.exit(1);
}

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const raw = readFileSync(path.join(skillsDir, file), "utf8");
  const fail = (message: string) => errors.push(`${file}: ${message}`);

  const match = /^---\n([\s\S]*?)\n---\n/.exec(raw);
  const frontmatter = match?.[1];
  if (!match || frontmatter === undefined) {
    fail("missing YAML frontmatter");
    continue;
  }

  const body = raw.slice(match[0].length);
  const keys = new Map<string, string>();
  for (const line of frontmatter.split("\n")) {
    const kv = /^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (kv?.[1] !== undefined && kv[2] !== undefined) keys.set(kv[1], kv[2].trim());
  }

  for (const key of REQUIRED_KEYS) {
    if (!keys.has(key)) fail(`frontmatter missing "${key}"`);
  }

  if (keys.get("name") !== slug) {
    fail(`frontmatter name "${keys.get("name")}" does not match filename "${slug}"`);
  }

  const updated = keys.get("skillUpdated");
  if (updated && !/^\d{4}-\d{2}-\d{2}$/.test(updated)) {
    fail(`skillUpdated "${updated}" is not an ISO date (YYYY-MM-DD)`);
  }

  const distribution = keys.get("distribution");
  if (distribution && !VALID_DISTRIBUTIONS.has(distribution)) {
    fail(`distribution "${distribution}" must be one of ${[...VALID_DISTRIBUTIONS].join(", ")}`);
  }

  const libraryVersion = keys.get("libraryVersion");
  if (libraryVersion && !/^\d+\.\d+\.\d+$/.test(libraryVersion)) {
    fail(`libraryVersion "${libraryVersion}" is not a semver version`);
  }

  // The body stamp must agree with the frontmatter stamp.
  if (updated && libraryVersion) {
    const expected = `\`skillUpdated: ${updated}\` · \`libraryVersion: ${libraryVersion}\``;
    if (!body.includes(expected)) {
      fail(`body revision line missing or out of sync (expected ${expected})`);
    }
  }

  // Theme-selecting skills must name every supported theme and register.
  if (THEME_AWARE.has(slug)) {
    for (const theme of SUPPORTED_THEMES) {
      if (!body.includes(`\`${theme}\``)) {
        fail(`theme-aware skill does not mention supported theme \`${theme}\``);
      }
    }
    for (const register of SUPPORTED_REGISTERS) {
      if (!body.includes(`\`${register}\``)) {
        fail(`theme-aware skill does not mention supported register \`${register}\``);
      }
    }
  }

  // A whole-file presence check is too weak: a skill can name every theme once
  // in a vocabulary block while a *selection list* elsewhere still offers only
  // two. Target selection lists specifically — a bulleted list whose items are
  // bare theme names, or a pipe-separated vocabulary line. Prose that names
  // particular themes for a reason ("`gamescience` and `citadel` ignore the
  // register") is deliberately not matched; adding a theme there would be wrong.
  const bodyOffset = match[0].split("\n").length - 1;
  const bare = (theme: string) => new RegExp(`^\\s*[-*]\\s*\`?${theme}\`?\\s*$`, "im");
  const piped = (theme: string) => new RegExp(`(?:\\||^|:)\\s*\`?${theme}\`?\\s*(?:\\||$)`, "im");

  const allBlocks = blocks(body);
  for (const [index, block] of allBlocks.entries()) {
    // Accept the marker inside the block or in the one directly above it, so a
    // `<!-- theme-list-exempt -->` comment preceding a list behaves as expected.
    const previous = index > 0 ? (allBlocks[index - 1]?.text ?? "") : "";
    if (block.text.includes("theme-list-exempt") || previous.includes("theme-list-exempt")) {
      continue;
    }

    const listed = SUPPORTED_THEMES.filter((theme) => bare(theme).test(block.text));
    const pipedNames = block.text.includes("|")
      ? SUPPORTED_THEMES.filter((theme) => piped(theme).test(block.text))
      : [];
    const named = listed.length >= 2 ? listed : pipedNames;

    if (named.length < 2 || named.length === SUPPORTED_THEMES.length) continue;
    const missing = SUPPORTED_THEMES.filter((theme) => !named.includes(theme));
    fail(
      `line ${block.line + bodyOffset}: theme selection list offers ${named.join(", ")} ` +
        `but omits ${missing.join(", ")} — add it, or mark the block "theme-list-exempt"`,
    );
  }

  // Skills resolve the version at run time; a literal pin will silently rot.
  for (const pin of body.matchAll(/versions\/(\d+\.\d+\.\d+)/g)) {
    fail(
      `hardcoded registry pin "versions/${pin[1]}" — use the {version} placeholder ` +
        `and resolve from published metadata`,
    );
  }
}

// Maintainer skills are mirrored into `.cursor/skills/<name>/SKILL.md` so Cursor
// can discover them. The mirror must not drift from the source of truth.
const cursorSkillsDir = path.join(repoRoot, ".cursor", "skills");
for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const mirror = path.join(cursorSkillsDir, slug, "SKILL.md");
  let mirrored: string;
  try {
    mirrored = readFileSync(mirror, "utf8");
  } catch {
    continue; // Only maintainer skills are mirrored; absence is expected.
  }
  if (mirrored !== readFileSync(path.join(skillsDir, file), "utf8")) {
    errors.push(
      `.cursor/skills/${slug}/SKILL.md has drifted from skills/${file} — re-copy the source`,
    );
  }
}

if (errors.length > 0) {
  console.error(`[skills:check] ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

console.log(
  `[skills:check] ${files.length} skills valid ` +
    `(themes: ${SUPPORTED_THEMES.join(", ")}; registers: ${SUPPORTED_REGISTERS.join(", ")}; ` +
    `library ${GAMESCIENCE_UI_VERSION})`,
);
