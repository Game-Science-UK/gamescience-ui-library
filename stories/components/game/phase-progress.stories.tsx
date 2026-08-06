import type { Meta, StoryObj } from "@storybook/react-vite";
import { PhaseProgress } from "@/components/game/phase-progress";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/PhaseProgress",
  component: PhaseProgress,
  tags: ["autodocs"],
} satisfies Meta<typeof PhaseProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  { id: "1", label: "Briefing", status: "complete" as const },
  { id: "2", label: "Discussion", status: "active" as const },
  { id: "3", label: "Vote", status: "pending" as const },
  { id: "4", label: "Results", status: "pending" as const },
];

export const Default: Story = {
  args: { steps: defaultSteps, label: "Session phases" },
  render: (args) => (
    <StoryFrame>
      <PhaseProgress {...args} />
    </StoryFrame>
  ),
};

export const Compact: Story = {
  args: {
    density: "compact",
    steps: defaultSteps.map((step) => ({
      ...step,
      shortLabel: step.label.slice(0, 3),
    })),
  },
  render: (args) => (
    <StoryFrame>
      <PhaseProgress {...args} />
    </StoryFrame>
  ),
};

export const Display: Story = {
  args: { density: "display", steps: defaultSteps, trailingStatus: "Live" },
  render: (args) => (
    <StoryFrame>
      <PhaseProgress {...args} />
    </StoryFrame>
  ),
};

export const GroupedPhases: Story = {
  args: {
    steps: [
      { id: "a1", label: "Read", groupLabel: "Round 1", status: "complete" },
      { id: "a2", label: "Talk", groupLabel: "Round 1", status: "complete" },
      { id: "b1", label: "Read", groupLabel: "Round 2", status: "active" },
      { id: "b2", label: "Talk", groupLabel: "Round 2", status: "pending" },
    ],
  },
  render: (args) => (
    <StoryFrame>
      <PhaseProgress {...args} />
    </StoryFrame>
  ),
};

export const BlockedState: Story = {
  args: {
    steps: [
      { id: "1", label: "Open", status: "complete" },
      { id: "2", label: "Awaiting host", status: "blocked" },
      { id: "3", label: "Close", status: "pending" },
    ],
  },
  render: (args) => (
    <StoryFrame>
      <PhaseProgress {...args} />
    </StoryFrame>
  ),
};

export const LongLabels: Story = {
  args: {
    steps: [
      {
        id: "1",
        label: "Extended operational briefing with vendor context",
        status: "active",
      },
      {
        id: "2",
        label: "Collaborative discussion across distributed teams",
        status: "pending",
      },
    ],
  },
  render: (args) => (
    <StoryFrame>
      <PhaseProgress {...args} />
    </StoryFrame>
  ),
};
