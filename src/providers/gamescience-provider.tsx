import type { ReactNode } from "react";
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

export function GameScienceProvider({
  theme,
  context,
  children,
  className,
}: GameScienceProviderProps) {
  assertTheme(theme);
  assertContext(context);

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
