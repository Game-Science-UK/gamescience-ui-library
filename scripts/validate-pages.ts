import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";
import { registryItems } from "./registry-manifest.ts";
import { PAGES_SITE_PATH, PAGES_SITE_URL, PAGES_VERSION } from "./pages-config.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDist = path.join(root, "pages-dist");
const releasesDir = path.join(root, "releases");
const versionRoot = path.join(pagesDist, "versions", PAGES_VERSION);
const lockPath = path.join(root, "releases", `${PAGES_VERSION}.lock.json`);

/** versioned = candidate only; full = latest + all version trees (default after promote). */
const mode = (process.env.PAGES_VALIDATE_MODE ?? "full").toLowerCase();

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

function validateLock(version: string) {
  const versionTree = path.join(pagesDist, "versions", version);
  const lockFile = path.join(releasesDir, `${version}.lock.json`);
  if (!existsSync(lockFile)) {
    fail(`missing release lock releases/${version}.lock.json`);
    return;
  }
  if (!existsSync(versionTree)) {
    fail(`missing version tree versions/${version} for lock`);
    return;
  }

  const lock = JSON.parse(readFileSync(lockFile, "utf8")) as {
    version: string;
    files: Record<string, string>;
  };
  if (lock.version !== version) {
    fail(`release lock ${version} has mismatched version field ${lock.version}`);
  }

  for (const [relative, expectedHash] of Object.entries(lock.files)) {
    const full = path.join(versionTree, relative);
    if (!existsSync(full)) {
      fail(`locked file missing from versions/${version}: ${relative}`);
      continue;
    }
    const actual = hashFile(full);
    if (actual !== expectedHash) {
      fail(
        `immutable version ${version} content drift for ${relative}. Do not rewrite locked releases.`,
      );
    }
  }
}

function main() {
  if (!existsSync(pagesDist)) {
    fail("pages-dist missing — run npm run pages:build");
    process.exit(1);
  }

  if (PAGES_VERSION !== GAMESCIENCE_UI_VERSION) {
    fail(`PAGES_VERSION !== GAMESCIENCE_UI_VERSION`);
  }

  assertExists(versionRoot, `versions/${PAGES_VERSION}`);
  const versionedVersionJson = assertJson(
    path.join(versionRoot, "version.json"),
    `versions/${PAGES_VERSION}/version.json`,
  );
  assertJson(
    path.join(versionRoot, "agent-catalogue.json"),
    `versions/${PAGES_VERSION}/agent-catalogue.json`,
  );

  if (versionedVersionJson) {
    if (versionedVersionJson.version !== PAGES_VERSION) {
      fail(`versioned version.json mismatch`);
    }
    scanForForbidden(JSON.stringify(versionedVersionJson), "versioned version.json");
  }

  for (const item of registryItems) {
    const versionedItem = path.join(versionRoot, "r", `${item.name}.json`);
    assertExists(versionedItem, `versions/${PAGES_VERSION}/r/${item.name}.json`);
    const versionedJson = assertJson(
      versionedItem,
      `versions/${PAGES_VERSION}/r/${item.name}.json`,
    );
    if (versionedJson) {
      scanForForbidden(
        JSON.stringify(versionedJson),
        `versions/${PAGES_VERSION}/r/${item.name}.json`,
      );
      const meta = versionedJson.meta as { version?: string } | undefined;
      if (meta?.version && meta.version !== PAGES_VERSION) {
        fail(`versions/${PAGES_VERSION}/r/${item.name}.json meta.version mismatch`);
      }
    }
  }

  // Always revalidate every immutable release lock present on disk.
  if (existsSync(releasesDir)) {
    for (const entry of readdirSync(releasesDir)) {
      if (!entry.endsWith(".lock.json")) continue;
      const version = entry.replace(/\.lock\.json$/, "");
      validateLock(version);
    }
  }

  if (!existsSync(lockPath)) {
    fail(
      `missing release lock releases/${PAGES_VERSION}.lock.json — run pages:build (versioned stage) once to create it`,
    );
  }

  if (mode === "full") {
    assertExists(path.join(pagesDist, "index.html"), "index.html");
    assertExists(path.join(pagesDist, ".nojekyll"), ".nojekyll");
    assertExists(path.join(pagesDist, "version.json"), "version.json");
    assertExists(path.join(pagesDist, "agent-catalogue.json"), "agent-catalogue.json");

    const versionJson = assertJson(path.join(pagesDist, "version.json"), "version.json");
    const catalogue = assertJson(
      path.join(pagesDist, "agent-catalogue.json"),
      "agent-catalogue.json",
    );

    if (versionJson) {
      if (versionJson.version !== PAGES_VERSION) {
        fail(`version.json version mismatch: ${String(versionJson.version)} !== ${PAGES_VERSION}`);
      }
      if (versionJson.latestPending === true) {
        fail("version.json still marked latestPending — run PAGES_STAGE=latest pages:build");
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

    if (catalogue) {
      for (const item of registryItems) {
        if (!(item.name in catalogue)) fail(`agent-catalogue missing ${item.name}`);
      }
      scanForForbidden(JSON.stringify(catalogue), "agent-catalogue.json");
    }

    for (const item of registryItems) {
      const latestItem = path.join(pagesDist, "r", `${item.name}.json`);
      assertExists(latestItem, `r/${item.name}.json`);
      const latestJson = assertJson(latestItem, `r/${item.name}.json`);
      if (latestJson) {
        scanForForbidden(JSON.stringify(latestJson), `r/${item.name}.json`);
        const deps = (latestJson.registryDependencies as string[] | undefined) ?? [];
        for (const dep of deps) {
          if (!dep.startsWith("@gamescience/")) {
            fail(`r/${item.name}.json has non-namespaced registryDependency: ${dep}`);
          }
          if (/\/versions\/|https?:\/\/|localhost|latest/i.test(dep)) {
            fail(`r/${item.name}.json registryDependency must stay namespaced, found: ${dep}`);
          }
        }
      }
    }

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

    const indexHtml = readFileSync(path.join(pagesDist, "index.html"), "utf8");
    if (!indexHtml.includes(PAGES_SITE_PATH)) {
      fail("index.html does not reference the repository Pages subpath");
    }
  }

  if (failed) process.exit(1);
  console.log(
    `[pages:validate] pages-dist valid for ${PAGES_VERSION} (mode=${mode}, ${registryItems.length} items)`,
  );
}

main();
