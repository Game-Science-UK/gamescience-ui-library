import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";
import { REGISTRY_VERSION, registryItems } from "./registry-manifest.ts";
import {
  versionedCatalogueUrl,
  versionedRegistryTemplate,
  PAGES_SITE_URL,
} from "./pages-config.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/registry");

/** Remote CSS @import allowlist — empty by default for 0.2.1+. */
const REMOTE_IMPORT_ALLOWLIST: string[] = [];

let failed = false;

function fail(message: string) {
  failed = true;
  console.error(`[registry:validate] ${message}`);
}

function stripCssComments(css: string) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function hasCircularThemeMapping(css: string) {
  const withoutComments = stripCssComments(css);
  const pattern = /(--([a-z0-9-]+))\s*:\s*var\(\s*\1\s*\)/gi;
  return pattern.test(withoutComments);
}

function assertNoRemoteImports(label: string, css: string) {
  const withoutComments = stripCssComments(css);
  const remotes = [...withoutComments.matchAll(/@import\s+(?:url\()?["'](https?:[^"']+)["']/gi)];
  for (const match of remotes) {
    const url = match[1] ?? "";
    if (!REMOTE_IMPORT_ALLOWLIST.includes(url)) {
      fail(`${label} contains remote @import (not allowlisted): ${url}`);
    }
  }
}

function assertImportsPrecedeRules(label: string, css: string) {
  const withoutComments = stripCssComments(css);
  const lines = withoutComments.split(/\r?\n/);
  let sawNonImportRule = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("@import")) {
      if (sawNonImportRule) {
        fail(`${label} has @import after non-import rules`);
        return;
      }
      continue;
    }
    if (trimmed.startsWith("@charset")) continue;
    sawNonImportRule = true;
  }
}

if (!existsSync(path.join(outDir, "registry.json"))) {
  fail("public/registry/registry.json missing — run npm run registry:build");
}

if (!existsSync(path.join(outDir, "agent-catalogue.json"))) {
  fail("public/registry/agent-catalogue.json missing");
}

const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8")) as {
  version: string;
};
if (packageJson.version !== GAMESCIENCE_UI_VERSION) {
  fail(
    `package.json version (${packageJson.version}) !== GAMESCIENCE_UI_VERSION (${GAMESCIENCE_UI_VERSION})`,
  );
}
if (REGISTRY_VERSION !== GAMESCIENCE_UI_VERSION) {
  fail(`REGISTRY_VERSION (${REGISTRY_VERSION}) !== GAMESCIENCE_UI_VERSION`);
}

const index = JSON.parse(readFileSync(path.join(outDir, "registry.json"), "utf8")) as {
  version?: string;
  items: Array<{ name: string }>;
};
const catalogue = JSON.parse(
  readFileSync(path.join(outDir, "agent-catalogue.json"), "utf8"),
) as Record<string, { version?: string }>;

if (index.version !== GAMESCIENCE_UI_VERSION) {
  fail(`registry.json version (${String(index.version)}) !== ${GAMESCIENCE_UI_VERSION}`);
}

const names = new Set(registryItems.map((item) => item.name));
const expectedRegistryUrl = versionedRegistryTemplate(GAMESCIENCE_UI_VERSION, PAGES_SITE_URL);
const expectedCatalogueUrl = versionedCatalogueUrl(GAMESCIENCE_UI_VERSION, PAGES_SITE_URL);

const foundationPartials = [
  "src/foundations/tokens.css",
  "src/foundations/typography.css",
  "src/foundations/motion.css",
  "src/foundations/responsive.css",
  "src/foundations/index.css",
];

for (const item of registryItems) {
  const itemPath = path.join(outDir, "r", `${item.name}.json`);
  if (!existsSync(itemPath)) {
    fail(`missing built item ${item.name}`);
    continue;
  }

  const built = JSON.parse(readFileSync(itemPath, "utf8")) as {
    files: Array<{ path: string; target?: string; content?: string }>;
    registryDependencies?: string[];
    meta?: { version?: string };
  };

  if (built.meta?.version !== GAMESCIENCE_UI_VERSION) {
    fail(`${item.name} meta.version !== ${GAMESCIENCE_UI_VERSION}`);
  }

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

    if (file.path.endsWith(".css") && file.content) {
      assertNoRemoteImports(`${item.name}:${file.path}`, file.content);
      if (hasCircularThemeMapping(file.content)) {
        fail(`${item.name}:${file.path} contains circular custom-property mapping`);
      }
      if (
        file.path.includes("foundations/") &&
        /@tailwind\b/.test(stripCssComments(file.content))
      ) {
        fail(`${item.name}:${file.path} must not contain @tailwind (TW4-safe foundations)`);
      }
    }
  }

  for (const dep of item.registryDependencies ?? []) {
    if (!names.has(dep)) {
      fail(`${item.name} depends on unknown registry item ${dep}`);
    }
  }

  if (!(item.name in catalogue)) {
    fail(`agent-catalogue missing entry for ${item.name}`);
  } else if (catalogue[item.name]?.version !== GAMESCIENCE_UI_VERSION) {
    fail(`agent-catalogue ${item.name} version !== ${GAMESCIENCE_UI_VERSION}`);
  }

  if (item.name === "base") {
    const targets = new Set(built.files.map((f) => f.target ?? f.path));
    for (const partial of foundationPartials) {
      if (!targets.has(partial)) {
        fail(`base registry item missing foundation file target ${partial}`);
      }
    }

    const indexFile = built.files.find((f) =>
      (f.target ?? f.path).endsWith("foundations/index.css"),
    );
    if (!indexFile?.content) {
      fail("base missing foundations/index.css content");
    } else {
      assertImportsPrecedeRules("base foundations/index.css", indexFile.content);
      const withoutComments = stripCssComments(indexFile.content);
      const imports = [...withoutComments.matchAll(/@import\s+["'](\.\/[^"']+)["']/g)].map(
        (m) => m[1],
      );
      for (const rel of imports) {
        const expectedTarget = `src/foundations/${rel?.replace("./", "")}`;
        if (!targets.has(expectedTarget)) {
          fail(`foundations/index.css imports ${rel} but base does not install ${expectedTarget}`);
        }
      }
    }

    const guidanceFile = built.files.find((f) =>
      (f.target ?? f.path).endsWith("gamescience-ui-guidance.md"),
    );
    const jsonFile = built.files.find((f) => (f.target ?? f.path).endsWith("gamescience-ui.json"));
    const versionFile = built.files.find((f) => (f.target ?? f.path).endsWith("lib/version.ts"));

    if (!guidanceFile?.content || !jsonFile?.content || !versionFile?.content) {
      fail("base missing guidance, json, or version.ts payload");
    } else {
      if (!versionFile.content.includes(`"${GAMESCIENCE_UI_VERSION}"`)) {
        fail("base version.ts payload does not export current GAMESCIENCE_UI_VERSION");
      }

      const metadata = JSON.parse(jsonFile.content) as {
        version?: string;
        registryUrl?: string;
        catalogueUrl?: string;
      };
      if (metadata.version !== GAMESCIENCE_UI_VERSION) {
        fail(`base gamescience-ui.json version !== ${GAMESCIENCE_UI_VERSION}`);
      }
      if (metadata.registryUrl !== expectedRegistryUrl) {
        fail(`base gamescience-ui.json registryUrl mismatch`);
      }
      if (metadata.catalogueUrl !== expectedCatalogueUrl) {
        fail(`base gamescience-ui.json catalogueUrl mismatch`);
      }

      const guidance = guidanceFile.content;
      if (!guidance.includes(`**${GAMESCIENCE_UI_VERSION}**`)) {
        fail("generated guidance missing current version emphasis");
      }
      if (!guidance.includes(expectedRegistryUrl)) {
        fail("generated guidance missing versioned registry URL");
      }
      if (!guidance.includes(expectedCatalogueUrl)) {
        fail("generated guidance missing versioned catalogue URL");
      }
      for (const stale of ["0.1.0", "0.2.0"]) {
        if (stale === GAMESCIENCE_UI_VERSION) continue;
        if (guidance.includes(stale) || jsonFile.content.includes(stale)) {
          fail(`generated consumer metadata still references stale version ${stale}`);
        }
      }
    }
  }
}

const bridgePath = path.join(root, "consumer/tailwind-v4-bridge.css");
if (existsSync(bridgePath)) {
  const bridge = readFileSync(bridgePath, "utf8");
  assertNoRemoteImports("consumer/tailwind-v4-bridge.css", bridge);
  if (hasCircularThemeMapping(bridge)) {
    fail("consumer/tailwind-v4-bridge.css contains circular custom-property mapping");
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
