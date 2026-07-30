import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConnectionStatus } from "@/components/game/connection-status";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Game/ConnectionStatus",
  component: ConnectionStatus,
  tags: ["autodocs"],
} satisfies Meta<typeof ConnectionStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {
  args: { state: "connected" },
  render: (args) => (
    <StoryFrame>
      <ConnectionStatus {...args} />
    </StoryFrame>
  ),
};

export const Reconnecting: Story = {
  args: { state: "reconnecting", attempt: 2 },
  render: (args) => (
    <StoryFrame>
      <ConnectionStatus {...args} />
    </StoryFrame>
  ),
};

export const Offline: Story = {
  args: { state: "offline", onRetry: () => undefined },
  render: (args) => (
    <StoryFrame>
      <ConnectionStatus {...args} />
    </StoryFrame>
  ),
};
