import type { Meta, StoryObj } from "@storybook/react-vite";
import { WaitingState } from "@/components/game/waiting-state";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/WaitingState",
  component: WaitingState,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryFrame className="flex items-center justify-center py-8">
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof WaitingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    title: "Waiting for the session to start",
    loading: true,
  },
};

export const Idle: Story = {
  args: {
    title: "Session paused",
    loading: false,
  },
};

export const WithDescription: Story = {
  args: {
    title: "Waiting for the session to start",
    description: "You are in the lobby. Keep this screen open until the facilitator begins.",
    loading: true,
  },
};
