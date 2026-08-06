import { useEffect, useState, type PropsWithChildren } from "react";
import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import type { ExperienceContext, GameTheme } from "../src/themes/theme-contract";

function syncDocumentAttributes(theme: GameTheme, context: ExperienceContext) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.setAttribute("data-context", context);
  root.setAttribute("data-gamescience-ui", "");
}

function readGlobals(context: DocsContainerProps["context"]): {
  theme: GameTheme;
  context: ExperienceContext;
} {
  try {
    const story = context.storyById();
    const globals = context.getStoryContext(story).globals;
    return {
      theme: (globals.theme as GameTheme) ?? "gamescience",
      context: (globals.context as ExperienceContext) ?? "participant",
    };
  } catch {
    const storeGlobals =
      // Storybook store shape differs across versions; prefer live channel payloads.
      (context as { store?: { userGlobals?: { globals?: Record<string, unknown> } } }).store
        ?.userGlobals?.globals ?? {};
    return {
      theme: (storeGlobals.theme as GameTheme) ?? "gamescience",
      context: (storeGlobals.context as ExperienceContext) ?? "participant",
    };
  }
}

/**
 * Unattached MDX (Colors, Introduction, …) does not run story decorators.
 * Sync Theme/Context toolbar globals onto documentElement so CSS tokens update live.
 */
export function GameScienceDocsContainer({
  children,
  ...props
}: PropsWithChildren<DocsContainerProps>) {
  const [globals, setGlobals] = useState(() => readGlobals(props.context));

  useEffect(() => {
    const channel = props.context.channel;
    const onGlobalsUpdated = (payload: { globals?: Record<string, unknown> }) => {
      const next = payload.globals ?? {};
      setGlobals((prev) => ({
        theme: (next.theme as GameTheme) ?? prev.theme,
        context: (next.context as ExperienceContext) ?? prev.context,
      }));
    };

    channel.on(GLOBALS_UPDATED, onGlobalsUpdated);
    setGlobals(readGlobals(props.context));
    return () => {
      channel.off(GLOBALS_UPDATED, onGlobalsUpdated);
    };
  }, [props.context]);

  useEffect(() => {
    syncDocumentAttributes(globals.theme, globals.context);
  }, [globals.theme, globals.context]);

  return <DocsContainer {...props}>{children}</DocsContainer>;
}
