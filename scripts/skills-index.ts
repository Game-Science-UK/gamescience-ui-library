/**
 * Builds the skill index the documentation site reads.
 *
 * Shared by `build-pages` (which writes it into `pages-dist/skills/`) and the
 * site's dev server (which serves it from memory), so local development and the
 * deployed site read identical data.
 */

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
export const skillsDir = path.join(root, "skills");

export interface SkillSummary {
  slug: string;
  name: string;
  description: string;
  distribution: string;
  skillUpdated: string;
  libraryVersion: string;
}

/**
 * Reads a frontmatter value, following YAML folded scalars (`key: >-`) onto the
 * indented lines beneath — two skills declare their description that way.
 */
function field(frontmatter: string, key: string): string {
  const lines = frontmatter.split("\n");
  const start = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (start === -1) return "";

  const inline = lines[start]?.slice(key.length + 1).trim() ?? "";
  if (inline && inline !== ">-" && inline !== ">" && inline !== "|") return inline;

  const folded: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (!/^\s/.test(line)) break;
    folded.push(line.trim());
  }
  return folded.join(" ");
}

export function skillFiles(): string[] {
  return readdirSync(skillsDir)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

export function buildSkillsIndex(): SkillSummary[] {
  return skillFiles().map((file) => {
    const raw = readFileSync(path.join(skillsDir, file), "utf8");
    const frontmatter = /^---\n([\s\S]*?)\n---/.exec(raw)?.[1] ?? "";

    return {
      slug: file.replace(/\.md$/, ""),
      name: field(frontmatter, "name"),
      description: field(frontmatter, "description"),
      distribution: field(frontmatter, "distribution"),
      skillUpdated: field(frontmatter, "skillUpdated"),
      libraryVersion: field(frontmatter, "libraryVersion"),
    };
  });
}
