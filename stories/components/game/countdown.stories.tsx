import type { Meta, StoryObj } from "@storybook/react-vite";
import { Countdown } from "@/components/game/countdown";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Countdown",
  component: Countdown,
  tags: ["autodocs"],
  args: {
    formattedTime: "01:24",
    accessibleLabel: "1 minute 24 seconds remaining",
  },
} satisfies Meta<typeof Countdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: { state: "idle", label: "remaining" },
  render: (args) => (
    <StoryFrame>
      <Countdown {...args} />
    </StoryFrame>
  ),
};

export const Running: Story = {
  args: { state: "running", intent: "information" },
  render: (args) => (
    <StoryFrame>
      <Countdown {...args} />
    </StoryFrame>
  ),
};

export const Warning: Story = {
  args: { formattedTime: "00:10", state: "running", intent: "warning" },
  render: (args) => (
    <StoryFrame>
      <Countdown {...args} />
    </StoryFrame>
  ),
};

export const Critical: Story = {
  args: { formattedTime: "00:00", state: "expired", intent: "critical" },
  render: (args) => (
    <StoryFrame>
      <Countdown {...args} />
    </StoryFrame>
  ),
};

export const Inline: Story = {
  args: { treatment: "inline", state: "running" },
  render: (args) => (
    <StoryFrame>
      <Countdown {...args} />
    </StoryFrame>
  ),
};

export const Contained: Story = {
  args: { treatment: "contained", state: "running", label: "left" },
  render: (args) => (
    <StoryFrame>
      <Countdown {...args} />
    </StoryFrame>
  ),
};

export const DisplaySize: Story = {
  args: { size: "lg", state: "running", treatment: "contained" },
  render: (args) => (
    <StoryFrame>
      <Countdown {...args} />
    </StoryFrame>
  ),
};

export const ReducedMotion: Story = {
  args: { state: "running" },
  parameters: { chromatic: { reducedMotion: "reduce" } },
  render: (args) => (
    <StoryFrame>
      <div className="motion-reduce:[&_*]:animate-none">
        <Countdown {...args} />
      </div>
    </StoryFrame>
  ),
};
