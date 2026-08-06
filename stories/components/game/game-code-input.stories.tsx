import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { GameCodeInput } from "@/components/game/game-code-input";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/GameCodeInput",
  component: GameCodeInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Collects a room/session code. Prefer this over assembling a raw Input for join flows.",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryFrame className="max-w-sm">
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof GameCodeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value ?? "B7K2");
    return <GameCodeInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: "B7K2",
    onChange: () => undefined,
  },
};

export const Empty: Story = {
  args: {
    value: "",
    onChange: () => undefined,
  },
};

export const Invalid: Story = {
  args: {
    value: "XXXX",
    error: "That code was not recognised",
    onChange: () => undefined,
  },
};
