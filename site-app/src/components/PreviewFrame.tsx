import { useState } from "react";

import { GameScienceProvider } from "@/providers";
import {
  SUPPORTED_CONTEXTS,
  SUPPORTED_REGISTERS,
  SUPPORTED_THEMES,
  THEME_DEFAULT_REGISTERS,
  type ExperienceContext,
  type GameTheme,
  type ThemeRegister,
} from "@/themes/theme-contract";

import type { Preview } from "@site/previews";

/**
 * A theme item previews itself. `theme-sentinel` opens on Sentinel rather than
 * on the house theme, which would show the visitor everything except the thing
 * they navigated to. Derived from the item name so a theme added later needs no
 * change here — `theme:new` always names the item `theme-<slug>`.
 */
function seedTheme(item: string, explicit: GameTheme | undefined): GameTheme {
  if (explicit) return explicit;

  const slug = item.startsWith("theme-") ? item.slice("theme-".length) : undefined;
  if (slug && (SUPPORTED_THEMES as readonly string[]).includes(slug)) {
    return slug as GameTheme;
  }
  return "gamescience";
}

const CONTEXT_WIDTH: Record<ExperienceContext, number | "full"> = {
  participant: 390,
  facilitator: "full",
  "shared-display": "full",
};

const LABEL: Record<string, string> = {
  gamescience: "GameScience",
  citadel: "Citadel",
  sentinel: "Sentinel",
  participant: "Participant",
  facilitator: "Facilitator",
  "shared-display": "Shared display",
  cinematic: "Cinematic",
  restrained: "Restrained",
};

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-site-dim text-[11px] uppercase tracking-wider">{label}</span>
      <div className="border-site-border bg-site-bg flex rounded-md border p-0.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={option === value}
            className={`rounded px-2.5 py-1 text-xs transition-colors ${
              option === value
                ? "bg-site-accent text-site-accent-fg"
                : "text-site-muted hover:text-site-fg"
            }`}
          >
            {LABEL[option] ?? option}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Renders a preview inside a real provider.
 *
 * `syncDocumentAttributes` is off by default: several previews share one page,
 * and each syncing `data-theme` onto `documentElement` would make the last one
 * mounted win and re-theme the site chrome. Previews that portal opt in.
 */
export function PreviewFrame({ item, spec }: { item: string; spec: Preview }) {
  const initialTheme = seedTheme(item, spec.theme);
  const [theme, setTheme] = useState<GameTheme>(initialTheme);
  const [context, setContext] = useState<ExperienceContext>(spec.context ?? "participant");
  const [register, setRegister] = useState<ThemeRegister | undefined>(
    THEME_DEFAULT_REGISTERS[initialTheme],
  );

  const declaresRegister = THEME_DEFAULT_REGISTERS[theme] !== undefined;
  const width = spec.viewport ?? CONTEXT_WIDTH[context];
  const Render = spec.render;

  function selectTheme(next: GameTheme) {
    setTheme(next);
    setRegister(THEME_DEFAULT_REGISTERS[next]);
  }

  return (
    <div className="border-site-border bg-site-panel overflow-hidden rounded-lg border">
      <div className="border-site-border flex flex-wrap items-center gap-x-5 gap-y-2 border-b px-4 py-3">
        <Segmented label="Theme" value={theme} options={SUPPORTED_THEMES} onChange={selectTheme} />
        <Segmented
          label="Context"
          value={context}
          options={SUPPORTED_CONTEXTS}
          onChange={setContext}
        />
        {declaresRegister && register ? (
          <Segmented
            label="Register"
            value={register}
            options={SUPPORTED_REGISTERS}
            onChange={setRegister}
          />
        ) : null}
      </div>

      {/*
        The provider is the container, not the content column, so the theme's
        own `bg-background` bleeds to the edges of the preview area. The width
        constraint sits inside it — a 390px participant surface then reads as a
        column on the theme's field rather than a card on the site's chrome.
      */}
      <GameScienceProvider
        key={`${item}-${theme}-${context}-${register ?? "none"}`}
        theme={theme}
        context={context}
        register={register}
        syncDocumentAttributes={spec.syncsDocument ?? false}
        className="flex min-h-[280px] min-w-0 justify-center overflow-auto p-6"
      >
        <div
          style={width === "full" ? undefined : { width, maxWidth: "100%" }}
          className={width === "full" ? "w-full" : undefined}
        >
          <Render />
        </div>
      </GameScienceProvider>
    </div>
  );
}
