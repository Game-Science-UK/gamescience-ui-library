import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConnectionStatus } from "@/components/game/connection-status";

const meta = {
  title: "Components/Game/ConnectionStatus",
  component: ConnectionStatus,
  tags: ["autodocs"],
} satisfies Meta<typeof ConnectionStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {
  args: { state: "connected" },
};

export const Reconnecting: Story = {
  args: { state: "reconnecting", attempt: 2 },
};

export const Offline: Story = {
  args: { state: "offline", onRetry: () => undefined },
};
