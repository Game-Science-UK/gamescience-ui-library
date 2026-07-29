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
    if (existsSync(target)) {
      // Never overwrite an already-present immutable prior version tree.
      continue;
    }
    cpSync(path.join(staging, entry.name), target, { recursive: true });
    console.log(`[pages:build] preserved prior version tree versions/${entry.name}`);
  }

  rmSync(staging, { recursive: true, force: true });
}

function main() {
  ensureRegistryBuilt();

  const priorVersionsStaging = preservePriorVersions();

  rmSync(pagesDist, { recursive: true, force: true });
  mkdirSync(pagesDist, { recursive: true });

  const versionJson = buildVersionJson();
  const versionRoot = path.join(pagesDist, "versions", PAGES_VERSION);

  // Latest (unversioned) tree — tracks current GAMESCIENCE_UI_VERSION only after a successful cut.
  copyRegistryTree(pagesDist);
  writeFileSync(path.join(pagesDist, "version.json"), JSON.stringify(versionJson, null, 2));
  writeIndexHtml(path.join(pagesDist, "index.html"), versionJson);
  writeDocsPage(path.join(pagesDist, "docs/index.html"));
  writeFileSync(path.join(pagesDist, ".nojekyll"), "");

  // Immutable versioned tree for the current release
  mkdirSync(versionRoot, { recursive: true });
  copyRegistryTree(versionRoot);
  writeFileSync(path.join(versionRoot, "version.json"), JSON.stringify(versionJson, null, 2));

  // Keep previously published version trees (e.g. 0.1.0) intact in pages-dist.
  restorePriorVersions(priorVersionsStaging);

  // Release lock: create if missing, or refresh only when explicitly requested.
  mkdirSync(releasesDir, { recursive: true });
  const lockPath = path.join(releasesDir, `${PAGES_VERSION}.lock.json`);
  const lock = buildReleaseLock(versionRoot);
  if (!existsSync(lockPath) || process.env.UPDATE_RELEASE_LOCK === "1") {
    writeFileSync(lockPath, JSON.stringify(lock, null, 2));
    console.log(`[pages:build] wrote release lock ${path.relative(root, lockPath)}`);
  }

  console.log(`[pages:build] wrote ${pagesDist}`);
  console.log(`[pages:build] latest: ${latestRegistryTemplate(PAGES_SITE_URL)}`);
  console.log(
    `[pages:build] versioned: ${versionedRegistryTemplate(PAGES_VERSION, PAGES_SITE_URL)}`,
  );
}

main();
