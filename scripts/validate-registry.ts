import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registryItems } from "./registry-manifest.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/registry");

let failed = false;

function fail(message: string) {
  failed = true;
  console.error(`[registry:validate] ${message}`);
}

if (!existsSync(path.join(outDir, "registry.json"))) {
  fail("public/registry/registry.json missing — run npm run registry:build");
}

if (!existsSync(path.join(outDir, "agent-catalogue.json"))) {
  fail("public/registry/agent-catalogue.json missing");
}

const index = JSON.parse(readFileSync(path.join(outDir, "registry.json"), "utf8")) as {
  items: Array<{ name: string }>;
};
const catalogue = JSON.parse(
  readFileSync(path.join(outDir, "agent-catalogue.json"), "utf8"),
) as Record<string, unknown>;

const names = new Set(registryItems.map((item) => item.name));

for (const item of registryItems) {
  const itemPath = path.join(outDir, "r", `${item.name}.json`);
  if (!existsSync(itemPath)) {
    fail(`missing built item ${item.name}`);
    continue;
  }

  const built = JSON.parse(readFileSync(itemPath, "utf8")) as {
    files: Array<{ path: string; content?: string }>;
    registryDependencies?: string[];
  };

  if (!built.files?.length) {
    fail(`${item.name} has no files`);
  }

  for (const file of built.files) {
    if (!file.content || file.content.trim().length === 0) {
      fail(`${item.name} file ${file.path} has empty content`);
    }
    if (!existsSync(path.join(root, file.path))) {
      fail(`${item.name} references missing source ${file.path}`);
    }
  }

  for (const dep of item.registryDependencies ?? []) {
    if (!names.has(dep)) {
      fail(`${item.name} depends on unknown registry item ${dep}`);
    }
  }

  if (!(item.name in catalogue)) {
    fail(`agent-catalogue missing entry for ${item.name}`);
  }

  if (item.name === "theme-citadel") {
    const cssFile = built.files.find((file) => file.path.endsWith("citadel.css"));
    const css = cssFile?.content ?? "";
    if (!css.trim()) {
      fail("theme-citadel CSS payload is empty");
    } else {
      const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
      const importMatches = [...withoutComments.matchAll(/@import\b[^;]*;/g)];
      const firstImport = importMatches[0]?.[0];
      if (firstImport) {
        const lines = withoutComments.split(/\r?\n/);
        let sawNonImportRule = false;
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          if (trimmed.startsWith("@import")) {
            if (sawNonImportRule) {
              fail(
                "theme-citadel CSS has @import after non-import rules — keep all @import at the top of the generated payload",
              );
              break;
            }
            continue;
          }
          if (trimmed.startsWith("@charset")) {
            continue;
          }
          sawNonImportRule = true;
        }
      }
    }
  }
}

if (index.items.length !== registryItems.length) {
  fail(
    `registry index item count (${index.items.length}) does not match manifest (${registryItems.length})`,
  );
}

if (failed) {
  process.exit(1);
}

console.log(`[registry:validate] ${registryItems.length} items and agent catalogue are valid`);
