import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  SUPPORTED_CONTEXTS,
  SUPPORTED_THEMES,
  type ExperienceContext,
  type GameTheme,
} from "@/themes/theme-contract";
import { ExperienceReactContext } from "./experience-context";
import { GameThemeContext } from "./game-theme-context";

export interface GameScienceProviderProps {
  theme: GameTheme;
  context: ExperienceContext;
  children: ReactNode;
  className?: string;
  /**
   * When true (default), syncs data-theme / data-context onto document.documentElement
   * so Radix portals, Sonner toasts, and body/html backgrounds inherit theme tokens.
   * Disable only in specialised test hosts that manage document attributes themselves.
   */
  syncDocumentAttributes?: boolean;
}

function assertTheme(theme: string): asserts theme is GameTheme {
  if (!(SUPPORTED_THEMES as readonly string[]).includes(theme)) {
    throw new Error(
      `Unsupported GameScience theme "${theme}". Supported themes: ${SUPPORTED_THEMES.join(", ")}`,
    );
  }
}

function assertContext(context: string): asserts context is ExperienceContext {
  if (!(SUPPORTED_CONTEXTS as readonly string[]).includes(context)) {
    throw new Error(
      `Unsupported experience context "${context}". Supported contexts: ${SUPPORTED_CONTEXTS.join(", ")}`,
    );
  }
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function syncDocumentTheme(theme: GameTheme, context: ExperienceContext) {
  if (typeof document === "undefined") {
    return () => undefined;
  }

  const root = document.documentElement;
  const previous = {
    theme: root.getAttribute("data-theme"),
    context: root.getAttribute("data-context"),
    gamescience: root.getAttribute("data-gamescience-ui"),
  };

  root.setAttribute("data-theme", theme);
  root.setAttribute("data-context", context);
  root.setAttribute("data-gamescience-ui", "");

  return () => {
    if (previous.theme == null) {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", previous.theme);
    }

    if (previous.context == null) {
      root.removeAttribute("data-context");
    } else {
      root.setAttribute("data-context", previous.context);
    }

    if (previous.gamescience == null) {
      root.removeAttribute("data-gamescience-ui");
    } else {
      root.setAttribute("data-gamescience-ui", previous.gamescience);
    }
  };
}

export function GameScienceProvider({
  theme,
  context,
  children,
  className,
  syncDocumentAttributes = true,
}: GameScienceProviderProps) {
  assertTheme(theme);
  assertContext(context);

  useIsomorphicLayoutEffect(() => {
    if (!syncDocumentAttributes) {
      return undefined;
    }
    return syncDocumentTheme(theme, context);
  }, [theme, context, syncDocumentAttributes]);

  return (
    <GameThemeContext.Provider value={{ theme }}>
      <ExperienceReactContext.Provider value={{ context }}>
        <div
          data-theme={theme}
          data-context={context}
          data-gamescience-ui
          className={cn("min-h-screen bg-background font-body text-foreground", className)}
        >
          {children}
        </div>
      </ExperienceReactContext.Provider>
    </GameThemeContext.Provider>
  );
}

GameScienceProvider.displayName = "GameScienceProvider";
