import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeCatalogue, SCOPE_LABELS } from "./catalogue-normalize.ts";
import {
  PAGES_SITE_PATH,
  PAGES_SITE_URL,
  PAGES_VERSION,
  PUBLIC_PAGES_BRIDGE_CSS,
  PUBLIC_PAGES_DOCS,
  PUBLIC_PAGES_DOC_MARKERS,
  versionedRegistryTemplate,
} from "./pages-config.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(root, "site");
const modulesRoot = path.join(siteRoot, "migration-modules");

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function readModule(relative: string) {
  const full = path.join(modulesRoot, relative);
  if (!existsSync(full)) throw new Error(`Missing migration module ${relative}`);
  return readFileSync(full, "utf8");
}

function listImmutableVersions(pagesDist: string) {
  const versionsDir = path.join(pagesDist, "versions");
  if (!existsSync(versionsDir)) return [PAGES_VERSION];
  return readdirSync(versionsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function compileMigrationConfig(availableVersions: string[]) {
  return {
    version: PAGES_VERSION,
    registryUrlTemplate: versionedRegistryTemplate(PAGES_VERSION, PAGES_SITE_URL),
    availableVersions,
    modules: {
      core: readModule("core.md"),
      architectureRules: readModule("architecture-rules.md"),
      contextModel: readModule("context-model.md"),
      fileOwnership: readModule("file-ownership.md"),
      auditOutput: readModule("audit-output.md"),
      validation: readModule("validation.md"),
      cleanup: readModule("cleanup.md"),
      overwritePolicy: readModule("overwrite-policy.md"),
      finalReport: readModule("final-report.md"),
      start: readModule("start/start.md"),
      startFinalReport: readModule("start/final-report.md"),
      upgrade: readModule("upgrade/upgrade.md"),
      upgradeFinalReport: readModule("upgrade/final-report.md"),
      modes: {
        audit: readModule("modes/audit.md"),
        incremental: readModule("modes/incremental.md"),
        full: readModule("modes/full.md"),
      },
      themes: {
        gamescience: readModule("themes/gamescience.md"),
        citadel: readModule("themes/citadel.md"),
      },
      stacks: {
        "lovable-tailwind4": readModule("stacks/lovable-tailwind4.md"),
        tailwind3: readModule("stacks/tailwind3.md"),
        unknown: readModule("stacks/unknown.md"),
      },
      contexts: {
        participant: readModule("contexts/participant.md"),
        facilitator: readModule("contexts/facilitator.md"),
        "shared-display": readModule("contexts/shared-display.md"),
        "multi-context": readModule("contexts/multi-context.md"),
      },
    },
  };
}

function copyMigrationModules(docsOut: string) {
  const target = path.join(docsOut, "migration");
  mkdirSync(target, { recursive: true });
  cpSync(modulesRoot, target, { recursive: true });
}

function shellLayout(options: {
  title: string;
  currentPath: string;
  body: string;
  scripts?: string[];
  version?: string;
}) {
  const version = options.version ?? PAGES_VERSION;
  const nav = [
    ["/", "Home"],
    ["/catalogue/", "Catalogue"],
    ["/start/", "Start"],
    ["/upgrade/", "Upgrade"],
    ["/migrate/", "Migrate"],
    ["/docs/", "Docs"],
  ]
    .map(([href, label]) => {
      const current = options.currentPath === href ? ' aria-current="page"' : "";
      return `<a href="${PAGES_SITE_PATH}${href}"${current}>${label}</a>`;
    })
    .join("\n          ");

  const scripts = (options.scripts ?? [])
    .map((src) => `<script type="module" src="${PAGES_SITE_PATH}/assets/${src}"></script>`)
    .join("\n    ");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(options.title)} · GameScience UI</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700&family=Nunito+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="${PAGES_SITE_PATH}/assets/site.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="${PAGES_SITE_PATH}/"
        ><span class="brand-game">Game</span><span class="brand-science">Science</span> UI</a
      >
      <nav class="nav" aria-label="Primary">
          ${nav}
      </nav>
    </header>
    <main id="main" class="site-main">
${options.body}
    </main>
    <footer class="site-footer">
      <p>GameScience UI registry · pinned consumers should use immutable <code>/versions/${escapeHtml(version)}/</code> URLs.</p>
    </footer>
    ${scripts}
  </body>
</html>
`;
}

function writeHomepage(pagesDist: string, version: string, itemCount: number) {
  const body = `
      <section class="hero" id="hero">
        <h1>GameScience® <span class="accent">UI Design Library</span></h1>
        <p class="lede">Reusable interface foundations, components and game patterns for GameScience Lovable projects. Install approved source into your app, compose with the Lovable build agent, and pin an immutable registry version.</p>
        <div class="actions">
          <a class="button button-primary" href="${PAGES_SITE_PATH}/start/">Start a new project</a>
          <a class="button button-secondary" href="${PAGES_SITE_PATH}/migrate/">Migrate an existing project</a>
          <a class="button button-secondary" href="${PAGES_SITE_PATH}/upgrade/">Upgrade a registry project</a>
          <a class="button button-secondary" href="${PAGES_SITE_PATH}/catalogue/">Browse components</a>
        </div>
        <div class="meta-strip" aria-label="Registry status">
          <div class="meta-pill"><strong>${escapeHtml(version)}</strong><span>Latest stable</span></div>
          <div class="meta-pill"><strong>${itemCount}</strong><span>Registry items</span></div>
          <div class="meta-pill"><strong>2</strong><span>Themes: Gamescience, Citadel</span></div>
          <div class="meta-pill"><strong>3</strong><span>Contexts: Participant, Facilitator, Shared display</span></div>
        </div>
      </section>

      <section class="section" id="what-is-a-registry">
        <h2>What is a registry?</h2>
        <p class="intro">GameScience publishes approved UI source. A Lovable project installs selected items. The files are copied into the project. Lovable composes those files into the game. The project pins a version and upgrades deliberately.</p>
        <div class="flow" aria-label="Registry flow">
          <div class="flow-step">GameScience library</div>
          <div class="flow-step">Versioned registry</div>
          <div class="flow-step">Lovable project</div>
          <div class="flow-step">Local source files</div>
          <div class="flow-step">Game experience</div>
        </div>
        <div class="panel" style="margin-top:1rem">
          <h3>What the registry is not</h3>
          <p>It is not a runtime dependency, hosted component service, CMS, visual iframe, or automatic updater. Installed source becomes part of your project. The registry does not run scoring, networking, or game logic.</p>
        </div>
      </section>

      <section class="section" id="mental-model">
        <h2>The GameScience UI mental model</h2>
        <p class="intro">Theme controls visual identity. Context controls the interface environment. Role controls what a person is authorised to do. Route controls where the surface is mounted.</p>
        <div class="distinction-grid" aria-label="Theme, context, role, and route">
          <article class="card">
            <h3>Theme</h3>
            <p>Visual identity — Gamescience or Citadel — selected once at the application root.</p>
          </article>
          <article class="card">
            <h3>Context</h3>
            <p>Interface environment — participant, facilitator, or shared display — for the active surface.</p>
          </article>
          <article class="card">
            <h3>Role</h3>
            <p>Authority — what an identity is permitted to do. Application-owned; not granted by context props.</p>
          </article>
          <article class="card">
            <h3>Route</h3>
            <p>Mount point — where the surface is mounted. Routes may imply context but are not the model itself.</p>
          </article>
        </div>
        <p class="intro" style="margin-top:1.25rem"><a href="${PAGES_SITE_PATH}/docs/context-model.md">Read the experience context model</a></p>
        <div class="card-grid" aria-label="Experience contexts">
          <article class="card">
            <h3>Participant</h3>
            <p>Typical device: personal / mobile-first. Interaction: touch, focused task. Sensitivity: may include private instructions. Shell: ParticipantShell. Patterns: join flow, waiting and status compositions.</p>
          </article>
          <article class="card">
            <h3>Facilitator</h3>
            <p>Typical device: desktop or tablet. Interaction: operational controls. Sensitivity: operational / session-private. Shell: FacilitatorShell. Patterns: facilitator lobby, operational panels and alerts.</p>
          </article>
          <article class="card">
            <h3>Shared display</h3>
            <p>Typical device: large screen. Interaction: non-interactive. Sensitivity: public room-safe only. Shell: SharedDisplayShell. Patterns: shared-display lobby, room code, participant count, display headings.</p>
          </article>
        </div>
        <p class="muted" style="margin-top:1rem">Games do not need to implement every context. Use only the surfaces the experience requires.</p>
        <div class="layer-stack" aria-label="UI layers" style="margin-top:1.5rem">
          <div class="layer">Template</div>
          <div class="layer">Pattern</div>
          <div class="layer">Game components</div>
          <div class="layer">Core components</div>
          <div class="layer">Theme</div>
          <div class="layer">Foundations</div>
        </div>
      </section>

      <section class="section" id="workflows">
        <h2>Choose a workflow</h2>
        <div class="card-grid">
          <article class="card">
            <h3>Start a new Lovable project</h3>
            <p>For projects that have not yet built significant UI. Install base, one theme, and high-level patterns.</p>
            <a href="${PAGES_SITE_PATH}/start/">Open start workflow</a>
          </article>
          <article class="card">
            <h3>Upgrade a registry project</h3>
            <p>For projects already using GameScience UI. Diff, re-pin an immutable version, and overwrite only reviewed upstream files.</p>
            <a href="${PAGES_SITE_PATH}/upgrade/">Open upgrade workflow</a>
          </article>
          <article class="card">
            <h3>Migrate an existing Lovable project</h3>
            <p>For projects with a local design system. Audit, map, migrate one vertical slice, preserve game logic.</p>
            <a href="${PAGES_SITE_PATH}/migrate/">Open migration composer</a>
          </article>
        </div>
      </section>

      <section class="section" id="versioning">
        <h2>How versioning works</h2>
        <p class="intro">Production consumers should pin immutable versioned URLs. Unversioned <code>/r/</code> tracks latest and is not recommended for production.</p>
        <pre class="preview" tabindex="0">{
  "registries": {
    "@gamescience": "${PAGES_SITE_URL}/versions/${version}/r/{name}.json"
  }
}</pre>
      </section>

      <section class="section" id="help">
        <h2>Help and documentation</h2>
        <ul>
          <li><a href="${PAGES_SITE_PATH}/docs/registry-usage.md">Registry usage</a></li>
          <li><a href="${PAGES_SITE_PATH}/docs/registry-update-policy.md">Update policy</a></li>
          <li><a href="${PAGES_SITE_PATH}/docs/tailwind-v4-integration.md">Tailwind 4 integration</a></li>
          <li><a href="${PAGES_SITE_PATH}/docs/font-loading.md">Font loading</a></li>
          <li><a href="${PAGES_SITE_PATH}/docs/theming.md">Theming</a></li>
          <li><a href="${PAGES_SITE_PATH}/docs/context-model.md">Experience context model</a></li>
          <li><a href="${PAGES_SITE_PATH}/docs/lovable-test-project.md">Lovable test project</a></li>
          <li><a href="${PAGES_SITE_PATH}/docs/migration-notes.md">Migration notes</a></li>
          <li><a href="${PAGES_SITE_PATH}/agent-catalogue.json">Agent catalogue</a></li>
          <li><a href="${PAGES_SITE_PATH}/version.json">Version metadata</a></li>
        </ul>
      </section>
`;

  writeFileSync(
    path.join(pagesDist, "index.html"),
    shellLayout({
      title: "Registry home",
      currentPath: "/",
      version,
      body,
    }),
  );
}

function writeCataloguePage(pagesDist: string) {
  const body = `
      <section class="hero">
        <h1>Component catalogue</h1>
        <p class="lede">Browse the current GameScience registry items. Source of truth: generated agent catalogue (normalized at Pages build time).</p>
        <p class="muted">Showing <strong id="catalogue-count">0</strong> items.</p>
      </section>
      <div class="catalogue-controls">
        <label>Search <input id="filter-query" type="text" placeholder="Button, join-flow…" /></label>
        <label>Category
          <select id="filter-scope">
            <option value="">All categories</option>
            ${Object.entries(SCOPE_LABELS)
              .map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`)
              .join("")}
          </select>
        </label>
        <label>Context
          <select id="filter-context">
            <option value="">All contexts</option>
            <option value="participant">Participant</option>
            <option value="facilitator">Facilitator</option>
            <option value="shared-display">Shared display</option>
          </select>
        </label>
      </div>
      <div id="catalogue-list" class="catalogue-list"></div>
      <p id="catalogue-empty" class="muted" hidden>No items match these filters.</p>
`;
  mkdirSync(path.join(pagesDist, "catalogue"), { recursive: true });
  writeFileSync(
    path.join(pagesDist, "catalogue/index.html"),
    shellLayout({
      title: "Catalogue",
      currentPath: "/catalogue/",
      body,
      scripts: ["catalogue.js"],
    }),
  );
}

function writeStartPage(pagesDist: string, version: string) {
  const body = `
      <section class="hero">
        <h1>Start a new Lovable project</h1>
        <p class="lede">Generate a clean-install brief for the current stable registry version only.</p>
        <p class="muted">Stable version: <strong id="stable-version">${escapeHtml(version)}</strong></p>
      </section>
      <form id="start-form" class="panel">
        <div class="form-grid">
          <fieldset>
            <legend>Theme</legend>
            <label><input type="radio" name="theme" value="gamescience" checked /> Gamescience</label>
            <label><input type="radio" name="theme" value="citadel" /> Citadel</label>
          </fieldset>
          <fieldset>
            <legend>Contexts</legend>
            <label><input type="checkbox" name="context" value="participant" checked /> Participant</label>
            <label><input type="checkbox" name="context" value="facilitator" /> Facilitator</label>
            <label><input type="checkbox" name="context" value="shared-display" /> Shared display</label>
          </fieldset>
        </div>
        <div class="actions" style="margin-top:1rem">
          <button type="button" class="button button-primary" id="generate-brief">Generate brief</button>
          <button type="button" class="button button-secondary" id="copy-brief">Copy Markdown</button>
          <button type="button" class="button button-secondary" id="download-brief">Download .md</button>
        </div>
        <p class="status" id="brief-status" aria-live="polite"></p>
      </form>
      <h2>Preview</h2>
      <pre class="preview" id="brief-preview" tabindex="0"></pre>
`;
  mkdirSync(path.join(pagesDist, "start"), { recursive: true });
  writeFileSync(
    path.join(pagesDist, "start/index.html"),
    shellLayout({
      title: "Start project",
      currentPath: "/start/",
      body,
      scripts: ["start.js"],
    }),
  );
}

function writeUpgradePage(pagesDist: string) {
  const body = `
      <section class="hero">
        <h1>Upgrade a registry project</h1>
        <p class="lede">Compose an upgrade brief between immutable registry versions. Never defaults to unversioned latest.</p>
      </section>
      <form id="upgrade-form" class="panel">
        <div class="form-grid">
          <label>Current version <select name="fromVersion" id="fromVersion"></select></label>
          <label>Target version <select name="toVersion" id="toVersion"></select></label>
          <fieldset>
            <legend>Installed theme</legend>
            <label><input type="radio" name="theme" value="gamescience" checked /> Gamescience</label>
            <label><input type="radio" name="theme" value="citadel" /> Citadel</label>
          </fieldset>
          <fieldset>
            <legend>Project currently has an explicit context model</legend>
            <label><input type="radio" name="contextModelStatus" value="yes" /> Yes</label>
            <label><input type="radio" name="contextModelStatus" value="partial" /> Partial</label>
            <label><input type="radio" name="contextModelStatus" value="no" /> No</label>
            <label><input type="radio" name="contextModelStatus" value="unknown" checked /> Unknown</label>
          </fieldset>
          <label><input type="checkbox" name="comparisonHarness" /> Comparison harness (may load both theme CSS files)</label>
          <label>Affected items (optional, comma-separated)
            <input type="text" name="affectedItems" placeholder="base, theme-citadel" />
          </label>
        </div>
        <div class="actions" style="margin-top:1rem">
          <button type="button" class="button button-primary" id="generate-brief">Generate brief</button>
          <button type="button" class="button button-secondary" id="copy-brief">Copy Markdown</button>
          <button type="button" class="button button-secondary" id="download-brief">Download .md</button>
        </div>
        <p class="status" id="brief-status" aria-live="polite"></p>
      </form>
      <h2>Preview</h2>
      <pre class="preview" id="brief-preview" tabindex="0"></pre>
`;
  mkdirSync(path.join(pagesDist, "upgrade"), { recursive: true });
  writeFileSync(
    path.join(pagesDist, "upgrade/index.html"),
    shellLayout({
      title: "Upgrade project",
      currentPath: "/upgrade/",
      body,
      scripts: ["upgrade.js"],
    }),
  );
}

function writeMigratePage(pagesDist: string, version: string) {
  const body = `
      <section class="hero">
        <h1>Migrate an existing Lovable project</h1>
        <p class="lede">Deterministic Markdown composer for Lovable build agents. No AI runs on this page — modules are assembled in your browser from approved, version-controlled fragments.</p>
        <p class="muted">Target stable version: <strong id="stable-version">${escapeHtml(version)}</strong></p>
      </section>
      <form id="migrate-form" class="panel">
        <div class="form-grid">
          <fieldset>
            <legend>Theme</legend>
            <label><input type="radio" name="theme" value="gamescience" checked /> Gamescience</label>
            <label><input type="radio" name="theme" value="citadel" /> Citadel</label>
          </fieldset>
          <fieldset>
            <legend>Contexts</legend>
            <label><input type="checkbox" name="context" value="participant" checked /> Participant</label>
            <label><input type="checkbox" name="context" value="facilitator" /> Facilitator</label>
            <label><input type="checkbox" name="context" value="shared-display" /> Shared display</label>
            <label><input type="checkbox" name="multiContext" /> Multiple / unknown (multi-context guidance)</label>
          </fieldset>
          <fieldset>
            <legend>Migration mode</legend>
            <label><input type="radio" name="mode" value="audit" /> Audit only</label>
            <label><input type="radio" name="mode" value="incremental" checked /> Safe incremental (default)</label>
            <label><input type="radio" name="mode" value="full" /> Full visual alignment</label>
          </fieldset>
          <fieldset>
            <legend>Consumer stack</legend>
            <label><input type="radio" name="stack" value="lovable-tailwind4" checked /> Lovable / Tailwind 4</label>
            <label><input type="radio" name="stack" value="tailwind3" /> Tailwind 3</label>
            <label><input type="radio" name="stack" value="unknown" /> Unknown</label>
          </fieldset>
          <label>Project type
            <select name="projectType">
              <option value="unknown">Unknown</option>
              <option value="participant-experience">Participant experience</option>
              <option value="facilitator-console">Facilitator console</option>
              <option value="shared-display">Shared display</option>
              <option value="full-multi-surface">Full multi-surface game</option>
            </select>
          </label>
        </div>
        <div class="actions" style="margin-top:1rem">
          <button type="button" class="button button-primary" id="generate-brief">Generate brief</button>
          <button type="button" class="button button-secondary" id="copy-brief">Copy Markdown</button>
          <button type="button" class="button button-secondary" id="download-brief">Download .md</button>
        </div>
        <p class="status" id="brief-status" aria-live="polite"></p>
      </form>
      <h2>Preview</h2>
      <pre class="preview" id="brief-preview" tabindex="0"></pre>
`;
  mkdirSync(path.join(pagesDist, "migrate"), { recursive: true });
  writeFileSync(
    path.join(pagesDist, "migrate/index.html"),
    shellLayout({
      title: "Migrate project",
      currentPath: "/migrate/",
      body,
      scripts: ["migrate.js"],
    }),
  );
}

function writeDocsIndex(docsOut: string, extraDocs: string[]) {
  const allDocs = [...PUBLIC_PAGES_DOCS, ...extraDocs];
  const listItems = allDocs
    .map((name) => {
      const title = PUBLIC_PAGES_DOC_MARKERS[name as keyof typeof PUBLIC_PAGES_DOC_MARKERS] ?? name;
      return `      <li><a href="./${name}"><code>${name}</code></a> — ${escapeHtml(title)}</li>`;
    })
    .join("\n");

  writeFileSync(
    path.join(docsOut, "index.html"),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>GameScience UI documentation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700&family=Nunito+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="${PAGES_SITE_PATH}/assets/site.css" />
  </head>
  <body>
    <main class="site-main">
      <h1>GameScience UI documentation</h1>
      <p><a href="${PAGES_SITE_PATH}/">Home</a> · <a href="${PAGES_SITE_PATH}/migrate/">Migration composer</a></p>
      <ul>
${listItems}
        <li><a href="./${PUBLIC_PAGES_BRIDGE_CSS}"><code>${PUBLIC_PAGES_BRIDGE_CSS}</code></a> — Tailwind 4 bridge</li>
        <li><a href="./migration-config.json"><code>migration-config.json</code></a> — compiled composer modules</li>
        <li><a href="./migration/"><code>migration/</code></a> — individual module inspection</li>
      </ul>
    </main>
  </body>
</html>
`,
  );
}

export function writeSitePages(pagesDist: string) {
  const cataloguePath = path.join(pagesDist, "agent-catalogue.json");
  if (!existsSync(cataloguePath)) {
    throw new Error("agent-catalogue.json missing from pages-dist — copy registry first");
  }

  const catalogue = JSON.parse(readFileSync(cataloguePath, "utf8")) as Record<
    string,
    Record<string, unknown>
  >;
  const normalized = normalizeCatalogue(catalogue);
  const availableVersions = listImmutableVersions(pagesDist);

  const siteData = {
    version: PAGES_VERSION,
    sitePath: PAGES_SITE_PATH,
    siteUrl: PAGES_SITE_URL,
    itemCount: normalized.length,
    themes: ["gamescience", "citadel"],
    contexts: ["participant", "facilitator", "shared-display"],
    registryUrlTemplate: versionedRegistryTemplate(PAGES_VERSION, PAGES_SITE_URL),
    availableVersions,
    catalogue: normalized,
    scopeLabels: SCOPE_LABELS,
  };
  writeFileSync(path.join(pagesDist, "site-data.json"), `${JSON.stringify(siteData, null, 2)}\n`);

  const assetsOut = path.join(pagesDist, "assets");
  mkdirSync(assetsOut, { recursive: true });
  cpSync(path.join(siteRoot, "styles/site.css"), path.join(assetsOut, "site.css"));
  for (const file of readdirSync(path.join(siteRoot, "scripts"))) {
    if (!file.endsWith(".js")) continue;
    cpSync(path.join(siteRoot, "scripts", file), path.join(assetsOut, file));
  }

  const docsOut = path.join(pagesDist, "docs");
  mkdirSync(docsOut, { recursive: true });
  const migrationConfig = compileMigrationConfig(availableVersions);
  writeFileSync(
    path.join(docsOut, "migration-config.json"),
    `${JSON.stringify(migrationConfig, null, 2)}\n`,
  );
  copyMigrationModules(docsOut);

  writeHomepage(pagesDist, PAGES_VERSION, normalized.length);
  writeCataloguePage(pagesDist);
  writeStartPage(pagesDist, PAGES_VERSION);
  writeUpgradePage(pagesDist);
  writeMigratePage(pagesDist, PAGES_VERSION);

  console.log(
    `[pages:build] wrote site pages + site-data.json (${normalized.length} items) + migration-config.json`,
  );

  return { normalized, migrationConfig, availableVersions, writeDocsIndex };
}
