import {
  composeUpgradeBrief,
  copyText,
  downloadMarkdown,
  loadMigrationConfig,
  renderPreview,
  setStatus,
  todayIsoDate,
} from "./compose-markdown-browser.js";
import { versionedRegistryTemplate } from "./site-path.js";

async function main() {
  const form = document.getElementById("upgrade-form");
  const preview = document.getElementById("brief-preview");
  const status = document.getElementById("brief-status");
  if (!form || !preview) return;

  const config = await loadMigrationConfig();
  const versions = config.availableVersions ?? [config.version];

  for (const select of [form.fromVersion, form.toVersion]) {
    select.replaceChildren();
    for (const version of versions) {
      const option = document.createElement("option");
      option.value = version;
      option.textContent = version;
      select.append(option);
    }
  }
  if (versions.includes("0.2.0")) form.fromVersion.value = "0.2.0";
  form.toVersion.value = config.version;

  let latest = "";

  function refresh(generatedAt) {
    const toVersion = form.toVersion.value;
    const contextModelStatus =
      form.querySelector('input[name="contextModelStatus"]:checked')?.value ?? "unknown";
    latest = composeUpgradeBrief({
      modules: config.modules,
      fromVersion: form.fromVersion.value,
      toVersion,
      registryUrl: `https://game-science-uk.github.io${versionedRegistryTemplate(toVersion)}`,
      theme: form.theme.value,
      contextModelStatus,
      comparisonHarness: form.comparisonHarness.checked,
      affectedItems: form.affectedItems.value
        ? form.affectedItems.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      generatedAt,
    });
    renderPreview(preview, latest);
    setStatus(status, "Upgrade brief updated");
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
    downloadMarkdown(
      `gamescience-ui-upgrade-${form.fromVersion.value}-to-${form.toVersion.value}.md`,
      latest,
    );
    setStatus(status, "Download started");
  });

  refresh("preview");
}

main().catch((error) => {
  console.error(error);
  setStatus(document.getElementById("brief-status"), String(error.message || error));
});
