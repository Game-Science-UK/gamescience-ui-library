import {
  composeMigrationBrief,
  copyText,
  downloadMarkdown,
  loadMigrationConfig,
  renderPreview,
  setStatus,
  todayIsoDate,
} from "./compose-markdown-browser.js";
import { versionedRegistryTemplate } from "./site-path.js";

function selectedContexts(form) {
  return [...form.querySelectorAll('input[name="context"]:checked')].map((el) => el.value);
}

function buildBrief(config, form, generatedAt) {
  const theme = form.theme.value;
  const mode = form.mode.value;
  const stack = form.stack.value;
  const projectType = form.projectType.value;
  let contexts = selectedContexts(form);
  if (form.multiContext.checked || contexts.length > 1) {
    contexts = contexts.length ? contexts : ["participant", "facilitator", "shared-display"];
  }
  if (contexts.length === 0) contexts = ["participant"];

  const version = config.version;
  const registryUrl = `https://game-science-uk.github.io${versionedRegistryTemplate(version)}`;

  return composeMigrationBrief({
    modules: config.modules,
    version,
    registryUrl,
    theme,
    mode,
    stack,
    contexts,
    projectType,
    generatedAt,
  });
}

async function main() {
  const form = document.getElementById("migrate-form");
  const preview = document.getElementById("brief-preview");
  const status = document.getElementById("brief-status");
  const versionEl = document.getElementById("stable-version");
  if (!form || !preview) return;

  const config = await loadMigrationConfig();
  if (versionEl) versionEl.textContent = config.version;

  let latest = "";

  function refresh(generatedAt) {
    latest = buildBrief(config, form, generatedAt);
    renderPreview(preview, latest);
    setStatus(status, "Migration brief updated");
  }

  document.getElementById("generate-brief")?.addEventListener("click", () => {
    refresh(todayIsoDate());
  });

  document.getElementById("copy-brief")?.addEventListener("click", async () => {
    if (!latest) refresh(todayIsoDate());
    const ok = await copyText(latest, status);
    if (!ok) {
      const range = document.createRange();
      range.selectNodeContents(preview);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  });

  document.getElementById("download-brief")?.addEventListener("click", () => {
    if (!latest) refresh(todayIsoDate());
    const theme = form.theme.value;
    downloadMarkdown(`gamescience-ui-migration-${theme}.md`, latest);
    setStatus(status, "Download started");
  });

  refresh("preview");
}

main().catch((error) => {
  console.error(error);
  const status = document.getElementById("brief-status");
  setStatus(status, String(error.message || error));
});
