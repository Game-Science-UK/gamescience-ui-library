import type { Meta, StoryObj } from "@storybook/react-vite";
import { PhaseDirective } from "@/components/game/phase-directive";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Game/PhaseDirective",
  component: PhaseDirective,
  tags: ["autodocs"],
  args: {
    children: "Review the brief with your team, then prepare one recommendation.",
    eyebrow: "Current task",
  },
} satisfies Meta<typeof PhaseDirective>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {
  args: { treatment: "plain" },
  render: (args) => (
    <StoryFrame>
      <PhaseDirective {...args} />
    </StoryFrame>
  ),
};

export const Strip: Story = {
  args: { treatment: "strip", intent: "information" },
  render: (args) => (
    <StoryFrame>
      <PhaseDirective {...args} />
    </StoryFrame>
  ),
};

export const Panel: Story = {
  args: { treatment: "panel", intent: "information" },
  render: (args) => (
    <StoryFrame>
      <PhaseDirective {...args} />
    </StoryFrame>
  ),
};

export const WarningIntent: Story = {
  args: { treatment: "strip", intent: "warning" },
  render: (args) => (
    <StoryFrame>
      <PhaseDirective {...args} />
    </StoryFrame>
  ),
};

export const CriticalIntent: Story = {
  args: { treatment: "panel", intent: "critical" },
  render: (args) => (
    <StoryFrame>
      <PhaseDirective {...args} />
    </StoryFrame>
  ),
};

export const LongBodyCopy: Story = {
  args: {
    treatment: "panel",
    children:
      "Coordinate across procurement, security, and legal. Capture assumptions, surface conflicting incentives, and keep private objectives private while the shared display remains aggregate-safe.",
  },
  render: (args) => (
    <StoryFrame>
      <PhaseDirective {...args} />
    </StoryFrame>
  ),
};
