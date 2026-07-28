import { createContext, useContext } from "react";
import type { GameTheme } from "@/themes/theme-contract";

export interface GameThemeContextValue {
  theme: GameTheme;
}

export const GameThemeContext = createContext<GameThemeContextValue | null>(null);

export function useGameTheme(): GameThemeContextValue {
  const value = useContext(GameThemeContext);
  if (!value) {
    throw new Error("useGameTheme must be used within GameScienceProvider");
  }
  return value;
}
