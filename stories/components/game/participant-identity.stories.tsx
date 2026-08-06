import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ParticipantIdentity } from "@/components/game/participant-identity";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/ParticipantIdentity",
  component: ParticipantIdentity,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryFrame className="max-w-md">
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof ParticipantIdentity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value ?? "Team Alpha");
    return <ParticipantIdentity {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: "Team Alpha",
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
    value: "A",
    error: "Display name must be at least 2 characters",
    onChange: () => undefined,
  },
};

export const WithHint: Story = {
  args: {
    value: "Team Alpha",
    hint: "This name is visible to the facilitator and shared display",
    onChange: () => undefined,
  },
};
