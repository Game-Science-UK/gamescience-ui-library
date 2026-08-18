import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  SUPPORTED_CONTEXTS,
  SUPPORTED_REGISTERS,
  SUPPORTED_THEMES,
  THEME_DEFAULT_REGISTERS,
  type ExperienceContext,
  type GameTheme,
  type ThemeRegister,
} from "@/themes/theme-contract";
import { ExperienceReactContext } from "./experience-context";
import { GameThemeContext } from "./game-theme-context";

export interface GameScienceProviderProps {
  theme: GameTheme;
  context: ExperienceContext;
  /**
   * Optional visual register within a theme, for themes that ship more than
   * one intensity. A theme with no declared register ignores the attribute.
   * See THEME_DEFAULT_REGISTERS in the theme contract.
   */
  register?: ThemeRegister;
  children: ReactNode;
  className?: string;
  /**
   * When true (default), syncs data-theme / data-context / data-register onto
   * document.documentElement so Radix portals, Sonner toasts, and body/html
   * backgrounds inherit theme tokens.
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

function assertRegister(register: string): asserts register is ThemeRegister {
  if (!(SUPPORTED_REGISTERS as readonly string[]).includes(register)) {
    throw new Error(
      `Unsupported GameScience register "${register}". Supported registers: ${SUPPORTED_REGISTERS.join(", ")}`,
    );
  }
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function resolveRegister(
  theme: GameTheme,
  register: ThemeRegister | undefined,
): ThemeRegister | undefined {
  if (register) return register;
  return THEME_DEFAULT_REGISTERS[theme];
}

function syncDocumentTheme(
  theme: GameTheme,
  context: ExperienceContext,
  register: ThemeRegister | undefined,
) {
  if (typeof document === "undefined") {
    return () => undefined;
  }

  const root = document.documentElement;
  const previous = {
    theme: root.getAttribute("data-theme"),
    context: root.getAttribute("data-context"),
    register: root.getAttribute("data-register"),
    gamescience: root.getAttribute("data-gamescience-ui"),
  };

  root.setAttribute("data-theme", theme);
  root.setAttribute("data-context", context);
  root.setAttribute("data-gamescience-ui", "");
  if (register) {
    root.setAttribute("data-register", register);
  } else {
    root.removeAttribute("data-register");
  }

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

    if (previous.register == null) {
      root.removeAttribute("data-register");
    } else {
      root.setAttribute("data-register", previous.register);
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
  register: registerProp,
  children,
  className,
  syncDocumentAttributes = true,
}: GameScienceProviderProps) {
  assertTheme(theme);
  assertContext(context);
  if (registerProp) assertRegister(registerProp);
  const register = resolveRegister(theme, registerProp);

  useIsomorphicLayoutEffect(() => {
    if (!syncDocumentAttributes) {
      return undefined;
    }
    return syncDocumentTheme(theme, context, register);
  }, [theme, context, register, syncDocumentAttributes]);

  return (
    <GameThemeContext.Provider value={{ theme }}>
      <ExperienceReactContext.Provider value={{ context }}>
        <div
          data-theme={theme}
          data-context={context}
          data-register={register}
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
