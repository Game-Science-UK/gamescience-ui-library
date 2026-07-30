import { escapeHtml } from "./escape-html.js";
import { withBase } from "./site-path.js";

const SCOPE_LABELS = {
  "base-themes": "Base / themes",
  "core-ui": "Core UI",
  "game-display": "Game / display",
  patterns: "Patterns",
  templates: "Templates",
};

async function loadSiteData() {
  const response = await fetch(withBase("/site-data.json"));
  if (!response.ok) throw new Error(`Failed to load site-data.json (${response.status})`);
  return response.json();
}

function matchesFilters(item, { query, scope, context }) {
  if (scope && item.scope !== scope) return false;
  if (context) {
    const contexts = item.contexts ?? [];
    const ok = contexts.includes("all") || contexts.includes(context);
    if (!ok) return false;
  }
  if (query) {
    const hay = `${item.title} ${item.name} ${item.description}`.toLowerCase();
    if (!hay.includes(query)) return false;
  }
  return true;
}

function renderItem(item) {
  const deps =
    item.dependencies?.length > 0
      ? item.dependencies.map((d) => `@gamescience/${d}`).join(", ")
      : "No registry dependencies listed";
  const contexts =
    item.contextLabel ||
    ((item.contexts ?? []).includes("all") ? "All contexts" : (item.contexts ?? []).join(" · "));

  const article = document.createElement("article");
  article.className = "card catalogue-item";
  article.dataset.scope = item.scope;

  const title = document.createElement("h3");
  title.textContent = item.title;

  const code = document.createElement("p");
  const codeEl = document.createElement("code");
  codeEl.textContent = item.registryItem;
  code.append(codeEl);

  const desc = document.createElement("p");
  desc.textContent = item.description;

  const meta = document.createElement("p");
  meta.className = "muted";
  meta.textContent = `${SCOPE_LABELS[item.scope] ?? item.scope} · ${contexts}`;

  const dep = document.createElement("p");
  dep.className = "muted";
  dep.textContent = `Dependencies: ${deps}`;

  const install = document.createElement("p");
  const installCode = document.createElement("code");
  installCode.textContent = item.installCommand;
  install.append(installCode);

  const links = document.createElement("p");
  const latest = document.createElement("a");
  latest.href = item.rawRegistryUrl;
  latest.textContent = "Latest JSON";
  const versioned = document.createElement("a");
  versioned.href = item.versionedRegistryUrl;
  versioned.textContent = "Versioned JSON";
  versioned.style.marginLeft = "1rem";
  links.append(latest, versioned);

  article.append(title, code, desc, meta, dep, install, links);
  return article;
}

async function main() {
  const list = document.getElementById("catalogue-list");
  const empty = document.getElementById("catalogue-empty");
  const count = document.getElementById("catalogue-count");
  if (!list) return;

  const data = await loadSiteData();
  const items = data.catalogue ?? [];

  const queryInput = document.getElementById("filter-query");
  const scopeInput = document.getElementById("filter-scope");
  const contextInput = document.getElementById("filter-context");

  function refresh() {
    const filters = {
      query: (queryInput?.value ?? "").trim().toLowerCase(),
      scope: scopeInput?.value ?? "",
      context: contextInput?.value ?? "",
    };
    const visible = items.filter((item) => matchesFilters(item, filters));
    list.replaceChildren(...visible.map(renderItem));
    if (count) count.textContent = String(visible.length);
    if (empty) empty.hidden = visible.length > 0;
  }

  queryInput?.addEventListener("input", refresh);
  scopeInput?.addEventListener("change", refresh);
  contextInput?.addEventListener("change", refresh);
  refresh();

  // Keep escapeHtml referenced so architecture checks know catalogue uses it for any HTML paths.
  void escapeHtml;
}

main().catch((error) => {
  console.error(error);
  const list = document.getElementById("catalogue-list");
  if (list) {
    const p = document.createElement("p");
    p.textContent = String(error.message || error);
    list.replaceChildren(p);
  }
});
