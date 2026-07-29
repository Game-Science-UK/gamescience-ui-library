import {
  composeStartBrief,
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

async function main() {
  const form = document.getElementById("start-form");
  const preview = document.getElementById("brief-preview");
  const status = document.getElementById("brief-status");
  const versionEl = document.getElementById("stable-version");
  if (!form || !preview) return;

  const config = await loadMigrationConfig();
  if (versionEl) versionEl.textContent = config.version;

  let latest = "";

  function refresh(generatedAt) {
    const contexts = selectedContexts(form);
    latest = composeStartBrief({
      modules: config.modules,
      version: config.version,
      registryUrl: `https://game-science-uk.github.io${versionedRegistryTemplate(config.version)}`,
      theme: form.theme.value,
      contexts: contexts.length ? contexts : ["participant"],
      generatedAt,
    });
    renderPreview(preview, latest);
    setStatus(status, "Start brief updated");
  }

  document
    .getElementById("generate-brief")
    ?.addEventListener("click", () => refresh(todayIsoDate()));
  document.getElementById("copy-brief")?.addEventListener("click", async () => {
    if (!latest) refresh(todayIsoDate());
    await copyText(latest, status);
  });
  document.getElementById("download-brief")?.addEventListener("click", () => {
    if (!latest) refresh(todayIsoDate());
    downloadMarkdown(`gamescience-ui-start-${form.theme.value}.md`, latest);
    setStatus(status, "Download started");
  });

  refresh("preview");
}

main().catch((error) => {
  console.error(error);
  setStatus(document.getElementById("brief-status"), String(error.message || error));
});
