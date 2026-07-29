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
  buildVersionJson,
  latestRegistryTemplate,
  versionedCatalogueUrl,
  versionedRegistryTemplate,
} from "./pages-config.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registrySource = path.join(root, "public/registry");
const pagesDist = path.join(root, "pages-dist");
const releasesDir = path.join(root, "releases");

/**
 * PAGES_STAGE=versioned (default) — write/restore version trees + lock; do not refresh unversioned latest.
 * PAGES_STAGE=latest — copy validated current version tree into unversioned latest + root metadata.
 * PAGES_STAGE=all — legacy one-shot (versioned then latest); prefer staged CI.
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

function writeIndexHtml(targetPath: string, versionJson: ReturnType<typeof buildVersionJson>) {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>GameScience UI Registry</title>
    <style>
      :root { color-scheme: light dark; font-family: ui-sans-serif, system-ui, sans-serif; }
      body { margin: 0; padding: 2rem; line-height: 1.5; max-width: 48rem; }
      code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      pre { padding: 1rem; overflow: auto; background: color-mix(in srgb, CanvasText 8%, Canvas); border-radius: 0.5rem; }
      a { color: inherit; }
    </style>
  </head>
  <body>
    <h1>GameScience UI Registry</h1>
    <p>Current version: <strong>${versionJson.version}</strong></p>
    <ul>
      <li>Latest registry base: <code>${versionJson.latestRegistryBase}</code></li>
      <li>Versioned registry base: <code>${versionJson.registryBase}</code></li>
      <li>Agent catalogue: <a href="./versions/${versionJson.version}/agent-catalogue.json"><code>${versionedCatalogueUrl(versionJson.version)}</code></a></li>
      <li>Version metadata: <a href="./version.json"><code>./version.json</code></a></li>
    </ul>
    <h2>Install example</h2>
    <pre>// components.json
{
  "registries": {
    "@gamescience": "${versionJson.registryBase}"
  }
}

npx shadcn@latest add @gamescience/base
npx shadcn@latest add @gamescience/theme-gamescience
npx shadcn@latest add @gamescience/join-flow</pre>
    <p>Prefer the versioned registry URL in production consumers. See repository docs for Lovable setup.</p>
  </body>
</html>
`;
  writeFileSync(targetPath, html);
}

function writeDocsPage(targetPath: string) {
  mkdirSync(path.dirname(targetPath), { recursive: true });
  writeFileSync(
    targetPath,
    `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>GameScience registry usage</title></head>
  <body>
    <h1>Registry usage</h1>
    <p>Pin <code>@gamescience</code> to the versioned URL in <code>components.json</code>.</p>
    <p>Full documentation lives in the source repository under <code>docs/</code>.</p>
    <p><a href="../">Back to registry index</a></p>
  </body>
</html>
`,
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

function preservePriorVersions() {
  const versionsDir = path.join(pagesDist, "versions");
  if (!existsSync(versionsDir)) {
    return null as string | null;
  }

  const staging = path.join(root, ".tmp-pages-prior-versions");
  rmSync(staging, { recursive: true, force: true });
  mkdirSync(staging, { recursive: true });

  for (const entry of readdirSync(versionsDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === PAGES_VERSION) continue;
    cpSync(path.join(versionsDir, entry.name), path.join(staging, entry.name), {
      recursive: true,
    });
  }

  return staging;
}

function restorePriorVersions(staging: string | null) {
  if (!staging || !existsSync(staging)) return;

  const versionsDir = path.join(pagesDist, "versions");
  mkdirSync(versionsDir, { recursive: true });

  for (const entry of readdirSync(staging, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const target = path.join(versionsDir, entry.name);
    const marker = path.join(target, "version.json");
    // Restore when missing or incomplete (e.g. empty directory left after a failed fetch).
    if (existsSync(marker)) {
      continue;
    }
    rmSync(target, { recursive: true, force: true });
    cpSync(path.join(staging, entry.name), target, { recursive: true });
    console.log(`[pages:build] preserved prior version tree versions/${entry.name}`);
  }

  rmSync(staging, { recursive: true, force: true });
}

function writeVersionedCandidate() {
  ensureRegistryBuilt();

  const priorVersionsStaging = preservePriorVersions();
  const versionJson = buildVersionJson();
  const versionRoot = path.join(pagesDist, "versions", PAGES_VERSION);

  mkdirSync(pagesDist, { recursive: true });
  mkdirSync(path.join(pagesDist, "versions"), { recursive: true });

  // Replace only the current version tree; preserve others via staging.
  rmSync(versionRoot, { recursive: true, force: true });
  mkdirSync(versionRoot, { recursive: true });
  copyRegistryTree(versionRoot);
  writeFileSync(path.join(versionRoot, "version.json"), JSON.stringify(versionJson, null, 2));
  restorePriorVersions(priorVersionsStaging);

  // Ensure prior trees survive even if pages-dist was empty of other versions.
  // (restore only copies from staging captured before wipe of current version)

  mkdirSync(releasesDir, { recursive: true });
  const lockPath = path.join(releasesDir, `${PAGES_VERSION}.lock.json`);
  const lock = buildReleaseLock(versionRoot);
  if (!existsSync(lockPath) || process.env.UPDATE_RELEASE_LOCK === "1") {
    writeFileSync(lockPath, JSON.stringify(lock, null, 2));
    console.log(`[pages:build] wrote release lock ${path.relative(root, lockPath)}`);
  } else {
    console.log(`[pages:build] kept existing release lock ${path.relative(root, lockPath)}`);
  }

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
  console.log(`[pages:build] run pages:validate then PAGES_STAGE=latest npm run pages:build`);
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
  writeIndexHtml(path.join(pagesDist, "index.html"), versionJson);
  writeDocsPage(path.join(pagesDist, "docs/index.html"));
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
