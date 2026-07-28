import { createContext, useContext } from "react";
import type { ExperienceContext } from "@/themes/theme-contract";

export interface ExperienceContextValue {
  context: ExperienceContext;
}

export const ExperienceReactContext = createContext<ExperienceContextValue | null>(null);

export function useExperienceContext(): ExperienceContextValue {
  const value = useContext(ExperienceReactContext);
  if (!value) {
    throw new Error("useExperienceContext must be used within GameScienceProvider");
  }
  return value;
}
