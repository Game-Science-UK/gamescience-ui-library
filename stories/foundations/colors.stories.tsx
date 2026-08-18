import type { Meta, StoryObj } from "@storybook/react-vite";
import { SemanticColorPalette } from "./color-palette";

const meta = {
  title: "Foundations/Colors",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "GameScience UI uses semantic OKLCH token channels. Themes (`gamescience`, `citadel`) implement the same contract — switch the **Theme** toolbar to compare live. Prefer utilities like `bg-primary` and `text-muted-foreground`; never hardcode hex inside shared components.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Palette: Story = {
  render: () => <SemanticColorPalette />,
};
