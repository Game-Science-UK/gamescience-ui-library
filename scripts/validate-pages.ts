import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registryItems } from "./registry-manifest.ts";
import { PAGES_SITE_PATH, PAGES_SITE_URL, PAGES_VERSION } from "./pages-config.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDist = path.join(root, "pages-dist");
const versionRoot = path.join(pagesDist, "versions", PAGES_VERSION);
const lockPath = path.join(root, "releases", `${PAGES_VERSION}.lock.json`);

let failed = false;

function fail(message: string) {
  failed = true;
  console.error(`[pages:validate] ${message}`);
}

function hashFile(filePath: string) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function walkFiles(dir: string, acc: string[] = [], prefix = ""): string[] {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const key = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) walkFiles(full, acc, key);
    else acc.push(key);
  }
  return acc;
}

function assertExists(filePath: string, label: string) {
  if (!existsSync(filePath)) fail(`missing ${label}: ${path.relative(root, filePath)}`);
}

function assertJson(filePath: string, label: string) {
  assertExists(filePath, label);
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as Record<string, unknown>;
  } catch {
    fail(`invalid JSON: ${label}`);
    return null;
  }
}

function scanForForbidden(content: string, fileLabel: string) {
  if (/localhost|127\.0\.0\.1/i.test(content)) {
    fail(`${fileLabel} contains localhost/127.0.0.1`);
  }
  if (/\/Users\/|\/home\/|file:\/\//i.test(content)) {
    fail(`${fileLabel} contains absolute local path`);
  }
}

function main() {
  if (!existsSync(pagesDist)) {
    fail("pages-dist missing — run npm run pages:build");
    process.exit(1);
  }

  assertExists(path.join(pagesDist, "index.html"), "index.html");
  assertExists(path.join(pagesDist, ".nojekyll"), ".nojekyll");
  assertExists(path.join(pagesDist, "version.json"), "version.json");
  assertExists(path.join(pagesDist, "agent-catalogue.json"), "agent-catalogue.json");
  assertExists(versionRoot, `versions/${PAGES_VERSION}`);

  const versionJson = assertJson(path.join(pagesDist, "version.json"), "version.json");
  const versionedVersionJson = assertJson(
    path.join(versionRoot, "version.json"),
    `versions/${PAGES_VERSION}/version.json`,
  );
  const catalogue = assertJson(
    path.join(pagesDist, "agent-catalogue.json"),
    "agent-catalogue.json",
  );
  assertJson(
    path.join(versionRoot, "agent-catalogue.json"),
    `versions/${PAGES_VERSION}/agent-catalogue.json`,
  );

  if (versionJson) {
    if (versionJson.version !== PAGES_VERSION) {
      fail(`version.json version mismatch: ${String(versionJson.version)} !== ${PAGES_VERSION}`);
    }
    const registryBase = String(versionJson.registryBase ?? "");
    const latestBase = String(versionJson.latestRegistryBase ?? "");
    if (!registryBase.includes(`${PAGES_SITE_PATH}/versions/${PAGES_VERSION}/r/`)) {
      fail("version.json registryBase missing versioned Pages subpath");
    }
    if (!latestBase.includes(`${PAGES_SITE_PATH}/r/`)) {
      fail("version.json latestRegistryBase missing Pages subpath");
    }
    if (!String(versionJson.siteUrl ?? "").startsWith(PAGES_SITE_URL)) {
      fail("version.json siteUrl does not match expected Pages URL");
    }
    scanForForbidden(JSON.stringify(versionJson), "version.json");
  }

  if (versionedVersionJson) {
    scanForForbidden(JSON.stringify(versionedVersionJson), "versioned version.json");
  }

  if (catalogue) {
    for (const item of registryItems) {
      if (!(item.name in catalogue)) fail(`agent-catalogue missing ${item.name}`);
    }
    scanForForbidden(JSON.stringify(catalogue), "agent-catalogue.json");
  }

  for (const item of registryItems) {
    const latestItem = path.join(pagesDist, "r", `${item.name}.json`);
    const versionedItem = path.join(versionRoot, "r", `${item.name}.json`);
    assertExists(latestItem, `r/${item.name}.json`);
    assertExists(versionedItem, `versions/${PAGES_VERSION}/r/${item.name}.json`);

    const latestJson = assertJson(latestItem, `r/${item.name}.json`);
    const versionedJson = assertJson(
      versionedItem,
      `versions/${PAGES_VERSION}/r/${item.name}.json`,
    );

    for (const [label, json] of [
      [`r/${item.name}.json`, latestJson],
      [`versions/${PAGES_VERSION}/r/${item.name}.json`, versionedJson],
    ] as const) {
      if (!json) continue;
      scanForForbidden(JSON.stringify(json), label);
      const deps = (json.registryDependencies as string[] | undefined) ?? [];
      for (const dep of deps) {
        if (!dep.startsWith("@gamescience/")) {
          fail(`${label} has non-namespaced registryDependency: ${dep}`);
        }
        if (/\/versions\/|https?:\/\/|localhost|latest/i.test(dep)) {
          fail(`${label} registryDependency must stay namespaced, found: ${dep}`);
        }
      }
    }
  }

  // Prohibited artefacts
  const prohibitedNames = [".env", ".env.local", ".env.production", "credentials.json"];
  for (const name of prohibitedNames) {
    if (existsSync(path.join(pagesDist, name))) fail(`prohibited file present: ${name}`);
  }

  const allFiles = walkFiles(pagesDist);
  for (const relative of allFiles) {
    if (relative.includes("node_modules") || relative.includes("tmp/")) {
      fail(`prohibited path in pages-dist: ${relative}`);
    }
    if (relative.endsWith(".map")) fail(`source map published: ${relative}`);
    const full = path.join(pagesDist, relative);
    if (statSync(full).isFile() && (relative.endsWith(".json") || relative.endsWith(".html"))) {
      scanForForbidden(readFileSync(full, "utf8"), relative);
    }
  }

  // Immutable release lock check
  if (existsSync(lockPath)) {
    const lock = JSON.parse(readFileSync(lockPath, "utf8")) as {
      version: string;
      files: Record<string, string>;
    };
    if (lock.version !== PAGES_VERSION) {
      fail(`release lock version mismatch: ${lock.version}`);
    }
    for (const [relative, expectedHash] of Object.entries(lock.files)) {
      const full = path.join(versionRoot, relative);
      if (!existsSync(full)) {
        fail(`locked file missing from versioned output: ${relative}`);
        continue;
      }
      const actual = hashFile(full);
      if (actual !== expectedHash) {
        fail(
          `immutable version ${PAGES_VERSION} content drift for ${relative}. Bump GAMESCIENCE_UI_VERSION or regenerate lock with UPDATE_RELEASE_LOCK=1 only when intentionally re-cutting the same version.`,
        );
      }
    }
  } else {
    fail(
      `missing release lock releases/${PAGES_VERSION}.lock.json — run pages:build once to create it`,
    );
  }

  // Subpath sanity in index
  const indexHtml = readFileSync(path.join(pagesDist, "index.html"), "utf8");
  if (!indexHtml.includes(PAGES_SITE_PATH)) {
    fail("index.html does not reference the repository Pages subpath");
  }

  if (failed) process.exit(1);
  console.log(
    `[pages:validate] pages-dist valid for ${PAGES_VERSION} (${registryItems.length} items, latest + versioned)`,
  );
}

main();
