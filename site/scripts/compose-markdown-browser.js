import {
  composeMigrationBrief,
  composeStartBrief,
  composeUpgradeBrief,
} from "./compose-markdown-core.js";
import { withBase } from "./site-path.js";

let cachedConfig = null;

export async function loadMigrationConfig() {
  if (cachedConfig) return cachedConfig;
  const response = await fetch(withBase("/docs/migration-config.json"));
  if (!response.ok) {
    throw new Error(`Failed to load migration-config.json (${response.status})`);
  }
  cachedConfig = await response.json();
  return cachedConfig;
}

export function setStatus(el, message) {
  if (!el) return;
  el.textContent = message;
}

export function renderPreview(preEl, markdown) {
  if (!preEl) return;
  preEl.textContent = markdown;
}

export async function copyText(text, statusEl) {
  try {
    await navigator.clipboard.writeText(text);
    setStatus(statusEl, "Copied to clipboard");
    return true;
  } catch {
    setStatus(statusEl, "Clipboard blocked — select the preview text and copy manually");
    return false;
  }
}

export function downloadMarkdown(filename, text) {
  const safe = filename.replace(/[^a-z0-9._-]+/gi, "-");
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = safe;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function todayIsoDate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export { composeMigrationBrief, composeStartBrief, composeUpgradeBrief };
