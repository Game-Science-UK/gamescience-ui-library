import type { ComponentType } from "react";

import type { ExperienceContext, GameTheme } from "@/themes/theme-contract";

/**
 * A preview is a real usage example, rendered inside a real GameScienceProvider
 * so the theme / context / register switcher genuinely re-themes it.
 *
 * `context` declares the environment the example is meant to be seen in, which
 * seeds the switcher — a shared-display pattern should not open in a 390px
 * participant frame.
 *
 * `viewport` overrides the preview frame width where the default for that
 * context would misrepresent the component.
 */
export interface Preview {
  /** Rendered inside the provider. Must be self-contained and stateless-safe. */
  render: ComponentType;
  /** Seeds the context switcher. Defaults to `participant`. */
  context?: ExperienceContext;
  /**
   * Seeds the theme switcher. Theme items derive this from their own name, so
   * set it only when a preview is meaningless outside one particular theme.
   */
  theme?: GameTheme;
  /** Frame width in px, or "full" to fill the available column. */
  viewport?: number | "full";
  /**
   * Previews containing portalled overlays need the provider to sync document
   * attributes, otherwise the portal escapes the theme. Only one preview on a
   * page may claim this, so it is opt-in rather than the default.
   */
  syncsDocument?: boolean;
}

const modules = import.meta.glob<{ default: Preview }>("./items/*.tsx", { eager: true });

/** Registry item name → preview, keyed by filename. */
export const previews: Record<string, Preview> = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => [
    path.replace("./items/", "").replace(".tsx", ""),
    module.default,
  ]),
);

export function preview(name: string): Preview | undefined {
  return previews[name];
}

export const previewNames = Object.keys(previews).sort();
