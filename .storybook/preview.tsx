import type { Preview } from "@storybook/react-vite";
import { GameScienceProvider } from "../src/providers";
import type { ExperienceContext, GameTheme } from "../src/themes/theme-contract";
import "../src/foundations/index.css";
import "../src/themes/index.css";

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
  },
  initialGlobals: {
    theme: "gamescience",
    context: "participant",
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Global Theme and Context toolbar controls wrap stories in GameScienceProvider, which syncs data-theme/data-context onto document.documentElement so portals inherit tokens.",
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

      return (
        <GameScienceProvider theme={theme} context={experience}>
          <Story />
        </GameScienceProvider>
      );
    },
  ],
};

export default preview;
