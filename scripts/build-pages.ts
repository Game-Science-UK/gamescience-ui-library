import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registryItems } from "./registry-manifest.ts";
import {
  PAGES_SITE_URL,
  PAGES_VERSION,
  PUBLIC_PAGES_BRIDGE_CSS,
  PUBLIC_PAGES_DOCS,
  buildReleaseManifest,
  buildVersionJson,
  latestRegistryTemplate,
  versionedRegistryTemplate,
} from "./pages-config.ts";
import { writeSitePages } from "./write-site-pages.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registrySource = path.join(root, "public/registry");
const pagesDist = path.join(root, "pages-dist");
const releasesDir = path.join(root, "releases");
const snapshotsDir = path.join(releasesDir, "snapshots");

/**
 * PAGES_STAGE=versioned (default) — write/restore version trees + lock; do not refresh unversioned latest.
 * PAGES_STAGE=latest — copy validated current version tree into unversioned latest + root metadata.
 * PAGES_STAGE=all — versioned then latest (still requires pages:validate between stages in CI).
 *
 * Prior immutable trees are seeded from committed `releases/snapshots/{version}/`
 * (pages-dist is gitignored and empty on CI).
 */
const stage = (process.env.PAGES_STAGE ?? "versioned").toLowerCase();

function ensureRegistryBuilt() {
  const sample = path.join(registrySource, "r", "base.json");
  if (!existsSync(sample)) {
    throw new Error("public/registry is missing. Run npm run registry:build first.");
  }
}

function hashFile(filePath: string) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function listRegistryItemNames() {
  return registryItems.map((item) => item.name).sort();
}

function copyRegistryTree(targetRoot: string) {
  mkdirSync(path.join(targetRoot, "r"), { recursive: true });
  for (const name of listRegistryItemNames()) {
    cpSync(
      path.join(registrySource, "r", `${name}.json`),
      path.join(targetRoot, "r", `${name}.json`),
    );
  }
  cpSync(
    path.join(registrySource, "agent-catalogue.json"),
    path.join(targetRoot, "agent-catalogue.json"),
  );
  if (existsSync(path.join(registrySource, "registry.json"))) {
    cpSync(path.join(registrySource, "registry.json"), path.join(targetRoot, "registry.json"));
  }
}

function writePublicDocs(writeDocsIndex: (docsOut: string, extraDocs: string[]) => void) {
  const docsOut = path.join(pagesDist, "docs");
  mkdirSync(docsOut, { recursive: true });

  for (const name of PUBLIC_PAGES_DOCS) {
    const sourcePath = path.join(root, "docs", name);
    if (!existsSync(sourcePath)) {
      throw new Error(`Missing public doc source docs/${name}`);
    }
    let content = readFileSync(sourcePath, "utf8");
    if (name === "tailwind-v4-integration.md") {
      // Published copy resolves the bridge beside this file; source keeps the repo path.
      content = content.replaceAll(
        "](../consumer/tailwind-v4-bridge.css)",
        "](./tailwind-v4-bridge.css)",
      );
    }
    const outPath = path.join(docsOut, name);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, content);
  }

  const bridgeSource = path.join(root, "consumer/tailwind-v4-bridge.css");
  if (!existsSync(bridgeSource)) {
    throw new Error("Missing consumer/tailwind-v4-bridge.css");
  }
  cpSync(bridgeSource, path.join(docsOut, PUBLIC_PAGES_BRIDGE_CSS));
  writeDocsIndex(docsOut, []);

  console.log(
    `[pages:build] published ${PUBLIC_PAGES_DOCS.length} docs + ${PUBLIC_PAGES_BRIDGE_CSS}`,
  );
}

function buildReleaseLock(versionRoot: string) {
  const files: Record<string, string> = {};
  const walk = (dir: string, prefix = "") => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const key = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(full, key);
      else files[key] = hashFile(full);
    }
  };
  walk(versionRoot);
  return {
    version: PAGES_VERSION,
    generatedAt: new Date().toISOString(),
    files,
  };
}

function listLockedVersions() {
  if (!existsSync(releasesDir)) return [] as string[];
  return readdirSync(releasesDir)
    .filter((entry) => entry.endsWith(".lock.json"))
    .map((entry) => entry.replace(/\.lock\.json$/, ""))
    .sort();
}

/**
 * Seed every non-current locked version from committed snapshots.
 * Required on CI where pages-dist is empty.
 */
function seedPriorVersionsFromSnapshots() {
  const versionsDir = path.join(pagesDist, "versions");
  mkdirSync(versionsDir, { recursive: true });

  for (const version of listLockedVersions()) {
    if (version === PAGES_VERSION) continue;

    const snapshot = path.join(snapshotsDir, version);
    const marker = path.join(snapshot, "version.json");
    if (!existsSync(marker)) {
      throw new Error(
        `Missing releases/snapshots/${version} for releases/${version}.lock.json. ` +
          `Commit the immutable version tree under releases/snapshots/${version}.`,
      );
    }

    const target = path.join(versionsDir, version);
    rmSync(target, { recursive: true, force: true });
    cpSync(snapshot, target, { recursive: true });
    console.log(`[pages:build] seeded versions/${version} from releases/snapshots/${version}`);
  }
}

function syncCurrentSnapshot(versionRoot: string) {
  const snapshot = path.join(snapshotsDir, PAGES_VERSION);
  rmSync(snapshot, { recursive: true, force: true });
  mkdirSync(snapshotsDir, { recursive: true });
  cpSync(versionRoot, snapshot, { recursive: true });
  console.log(`[pages:build] synced releases/snapshots/${PAGES_VERSION}`);
}

function writeVersionedCandidate() {
  ensureRegistryBuilt();

  const versionJson = buildVersionJson();
  const versionRoot = path.join(pagesDist, "versions", PAGES_VERSION);

  mkdirSync(pagesDist, { recursive: true });
  mkdirSync(path.join(pagesDist, "versions"), { recursive: true });

  // Seed priors first so empty CI checkouts still revalidate historical locks.
  seedPriorVersionsFromSnapshots();

  // Replace only the current version tree from the built registry.
  rmSync(versionRoot, { recursive: true, force: true });
  mkdirSync(versionRoot, { recursive: true });
  copyRegistryTree(versionRoot);
  writeFileSync(path.join(versionRoot, "version.json"), JSON.stringify(versionJson, null, 2));
  writeFileSync(
    path.join(versionRoot, "release-manifest.json"),
    JSON.stringify(buildReleaseManifest(), null, 2),
  );

  mkdirSync(releasesDir, { recursive: true });
  const lockPath = path.join(releasesDir, `${PAGES_VERSION}.lock.json`);
  const lock = buildReleaseLock(versionRoot);
  if (!existsSync(lockPath) || process.env.UPDATE_RELEASE_LOCK === "1") {
    writeFileSync(lockPath, JSON.stringify(lock, null, 2));
    console.log(`[pages:build] wrote release lock ${path.relative(root, lockPath)}`);
  } else {
    // Current cut must still match its committed lock (no silent drift).
    const existing = JSON.parse(readFileSync(lockPath, "utf8")) as {
      files: Record<string, string>;
    };
    for (const [relative, expectedHash] of Object.entries(existing.files)) {
      const full = path.join(versionRoot, relative);
      if (!existsSync(full) || hashFile(full) !== expectedHash) {
        throw new Error(
          `versions/${PAGES_VERSION}/${relative} drifted from ${path.relative(root, lockPath)}. ` +
            `Set UPDATE_RELEASE_LOCK=1 only when intentionally re-cutting the current lock.`,
        );
      }
    }
    console.log(`[pages:build] kept existing release lock ${path.relative(root, lockPath)}`);
  }

  // Keep committed snapshot aligned with the locked current tree for future CI seeds.
  syncCurrentSnapshot(versionRoot);

  // Placeholder root so pages-dist is not empty before latest promotion.
  writeFileSync(path.join(pagesDist, ".nojekyll"), "");
  if (!existsSync(path.join(pagesDist, "version.json"))) {
    writeFileSync(
      path.join(pagesDist, "version.json"),
      `${JSON.stringify({ ...versionJson, latestPending: true }, null, 2)}\n`,
    );
  }

  console.log(`[pages:build] stage=versioned wrote versions/${PAGES_VERSION}`);
  console.log(
    `[pages:build] versioned: ${versionedRegistryTemplate(PAGES_VERSION, PAGES_SITE_URL)}`,
  );
  console.log(`[pages:build] run pages:validate:versioned then npm run pages:build:latest`);
}

function promoteLatestFromVersioned() {
  const versionRoot = path.join(pagesDist, "versions", PAGES_VERSION);
  if (!existsSync(versionRoot)) {
    throw new Error(
      `versions/${PAGES_VERSION} missing — run PAGES_STAGE=versioned pages:build first`,
    );
  }

  const versionJson = buildVersionJson();

  // Refresh unversioned latest from the immutable candidate tree.
  rmSync(path.join(pagesDist, "r"), { recursive: true, force: true });
  copyRegistryTree(pagesDist);
  writeFileSync(path.join(pagesDist, "version.json"), JSON.stringify(versionJson, null, 2));
  // Replace any prior docs/site tree so stale stubs cannot linger.
  rmSync(path.join(pagesDist, "docs"), { recursive: true, force: true });
  rmSync(path.join(pagesDist, "catalogue"), { recursive: true, force: true });
  rmSync(path.join(pagesDist, "start"), { recursive: true, force: true });
  rmSync(path.join(pagesDist, "upgrade"), { recursive: true, force: true });
  rmSync(path.join(pagesDist, "migrate"), { recursive: true, force: true });
  rmSync(path.join(pagesDist, "assets"), { recursive: true, force: true });

  const { writeDocsIndex } = writeSitePages(pagesDist);
  writePublicDocs(writeDocsIndex);
  writeFileSync(path.join(pagesDist, ".nojekyll"), "");

  console.log(`[pages:build] stage=latest promoted unversioned /r from versions/${PAGES_VERSION}`);
  console.log(`[pages:build] latest: ${latestRegistryTemplate(PAGES_SITE_URL)}`);
}

function main() {
  if (stage === "latest") {
    promoteLatestFromVersioned();
    return;
  }

  if (stage === "all") {
    writeVersionedCandidate();
    promoteLatestFromVersioned();
    return;
  }

  // default: versioned
  writeVersionedCandidate();
}

main();
