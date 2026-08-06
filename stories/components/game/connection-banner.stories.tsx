import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConnectionBanner } from "@/components/game/connection-banner";
import { Button } from "@/components/ui/button";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Game/ConnectionBanner",
  component: ConnectionBanner,
  tags: ["autodocs"],
} satisfies Meta<typeof ConnectionBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {
  args: { state: "connected" },
  render: (args) => (
    <StoryFrame>
      <ConnectionBanner {...args} />
    </StoryFrame>
  ),
};

export const Reconnecting: Story = {
  args: { state: "reconnecting" },
  render: (args) => (
    <StoryFrame>
      <ConnectionBanner {...args} />
    </StoryFrame>
  ),
};

export const Degraded: Story = {
  args: { state: "degraded" },
  render: (args) => (
    <StoryFrame>
      <ConnectionBanner {...args} />
    </StoryFrame>
  ),
};

export const Disconnected: Story = {
  args: { state: "disconnected" },
  render: (args) => (
    <StoryFrame>
      <ConnectionBanner {...args} />
    </StoryFrame>
  ),
};

export const Restored: Story = {
  args: { state: "restored" },
  render: (args) => (
    <StoryFrame>
      <ConnectionBanner {...args} />
    </StoryFrame>
  ),
};

export const Paused: Story = {
  args: { state: "paused" },
  render: (args) => (
    <StoryFrame>
      <ConnectionBanner {...args} />
    </StoryFrame>
  ),
};

export const InlineTreatment: Story = {
  args: { state: "reconnecting", treatment: "inline" },
  render: (args) => (
    <StoryFrame>
      <ConnectionBanner {...args} />
    </StoryFrame>
  ),
};

export const BannerTreatment: Story = {
  args: { state: "offline", treatment: "banner" },
  render: (args) => (
    <StoryFrame>
      <ConnectionBanner {...args} />
    </StoryFrame>
  ),
};

export const WithAction: Story = {
  args: { state: "offline" },
  render: (args) => (
    <StoryFrame>
      <ConnectionBanner
        {...args}
        action={
          <Button type="button" intent="outline" size="sm">
            Retry
          </Button>
        }
      />
    </StoryFrame>
  ),
};

export const ReducedMotion: Story = {
  args: { state: "connecting" },
  render: (args) => (
    <StoryFrame>
      <div className="motion-reduce:[&_*]:animate-none">
        <ConnectionBanner {...args} />
      </div>
    </StoryFrame>
  ),
};
