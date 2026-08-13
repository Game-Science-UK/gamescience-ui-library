import type { Preview } from "@storybook/react-vite";
import { GameScienceProvider } from "../src/providers";
import type { ExperienceContext, GameTheme, ThemeRegister } from "../src/themes/theme-contract";
import "../src/dev/tailwind3-entry.css";
import "../src/foundations/index.css";
import "../src/themes/index.css";
import { GameScienceDocsContainer } from "./docs-container";
import "./storybook.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "GameScience visual theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "gamescience", title: "GameScience" },
          { value: "citadel", title: "Citadel" },
          { value: "sentinel", title: "Sentinel" },
        ],
        dynamicTitle: true,
      },
    },
    context: {
      description: "Experience context",
      toolbar: {
        title: "Context",
        icon: "browser",
        items: [
          { value: "participant", title: "Participant" },
          { value: "facilitator", title: "Facilitator" },
          { value: "shared-display", title: "Shared display" },
        ],
        dynamicTitle: true,
      },
    },
    register: {
      description: "Theme register (Sentinel cinematic / restrained)",
      toolbar: {
        title: "Register",
        icon: "mirror",
        items: [
          { value: "cinematic", title: "Cinematic" },
          { value: "restrained", title: "Restrained" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "gamescience",
    context: "participant",
    register: "cinematic",
  },
  parameters: {
    layout: "centered",
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Introduction",
          "Foundations",
          ["Colors", "Themes", "Typography", "Animations", "Across themes"],
          "Patterns",
          [
            "Create Session",
            "Join Flow",
            "Lobby",
            "Shared Display Lobby",
            "Briefing",
            "Decision",
            "Timed Round",
            "Scripted Reveal",
            "Results",
            "Debrief",
            "Facilitator Console",
            "Shared Display Game",
            "Attention Takeover",
          ],
          "Components",
          ["Examples", ["All Components", "Shells", "Forms", "Cards", "Game Surfaces"], "*"],
          "Templates",
        ],
      },
    },
    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "oklch(var(--background))" },
        { name: "muted", value: "oklch(var(--muted))" },
      ],
    },
    docs: {
      toc: true,
      container: GameScienceDocsContainer,
      description: {
        component:
          "Use the Theme, Context, and Register toolbar controls. Stories wrap in GameScienceProvider, which syncs data-theme/data-context/data-register onto document.documentElement so portals inherit tokens.",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        participant: {
          name: "Participant 375×812",
          styles: { width: "375px", height: "812px" },
        },
        facilitator: {
          name: "Facilitator 1440×900",
          styles: { width: "1440px", height: "900px" },
        },
        sharedDisplay: {
          name: "Shared display 1920×1080",
          styles: { width: "1920px", height: "1080px" },
        },
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as GameTheme) ?? "gamescience";
      const experience = (context.globals.context as ExperienceContext) ?? "participant";
      const register = (context.globals.register as ThemeRegister) ?? "cinematic";

      return (
        <GameScienceProvider
          theme={theme}
          context={experience}
          register={register}
          // Provider defaults include min-h-screen + bg-background for apps; docs/canvas
          // chrome owns the surface colour and must hug content height.
          className="min-h-0 bg-transparent"
        >
          <Story />
        </GameScienceProvider>
      );
    },
  ],
};

export default preview;
