/**
 * Every registry item must have a live preview on the documentation site.
 *
 * Mirrors `storybook:coverage`. Without it a new registry item ships with an
 * item page that can only show source and prose, which is the state the site
 * rewrite existed to fix.
 */

import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import { registryItems } from "./registry-manifest.ts";

const repoRoot = path.resolve(import.meta.dirname, "..");
const previewsDir = path.join(repoRoot, "site-app/src/previews/items");

if (!existsSync(previewsDir)) {
  console.error(`[previews:coverage] missing ${path.relative(repoRoot, previewsDir)}`);
  process.exit(1);
}

const previews = new Set(
  readdirSync(previewsDir)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.replace(/\.tsx$/, "")),
);

const missing = registryItems.map((item) => item.name).filter((name) => !previews.has(name));

// A preview with no registry item is dead weight the sidebar will never link to.
const orphaned = [...previews].filter((name) => !registryItems.some((item) => item.name === name));

if (missing.length > 0 || orphaned.length > 0) {
  if (missing.length > 0) {
    console.error(`[previews:coverage] ${missing.length} registry item(s) have no preview:`);
    for (const name of missing) console.error(`  - ${name}`);
    console.error(`\n  Add site-app/src/previews/items/<name>.tsx exporting a Preview.`);
  }
  if (orphaned.length > 0) {
    console.error(`[previews:coverage] ${orphaned.length} preview(s) match no registry item:`);
    for (const name of orphaned) console.error(`  - ${name}`);
  }
  process.exit(1);
}

console.log(`[previews:coverage] ${registryItems.length} registry items all have a live preview`);
