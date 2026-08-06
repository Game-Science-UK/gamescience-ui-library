import type { Meta, StoryObj } from "@storybook/react-vite";
import { OutcomeSummary } from "@/components/game/outcome-summary";
import { Button } from "@/components/ui/button";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Game/OutcomeSummary",
  component: OutcomeSummary,
  tags: ["autodocs"],
} satisfies Meta<typeof OutcomeSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

const base = {
  label: "Outcome",
  title: "Contained exposure",
  description: "Aggregate impact across the cohort.",
} as const;

export const Information: Story = {
  args: { outcome: { ...base, intent: "information" } },
  render: (args) => (
    <StoryFrame>
      <OutcomeSummary {...args} />
    </StoryFrame>
  ),
};

export const Success: Story = {
  args: { outcome: { ...base, title: "Stable path", intent: "success" } },
  render: (args) => (
    <StoryFrame>
      <OutcomeSummary {...args} />
    </StoryFrame>
  ),
};

export const Warning: Story = {
  args: { outcome: { ...base, title: "Elevated risk", intent: "warning" } },
  render: (args) => (
    <StoryFrame>
      <OutcomeSummary {...args} />
    </StoryFrame>
  ),
};

export const Critical: Story = {
  args: { outcome: { ...base, title: "Critical cascade", intent: "critical" } },
  render: (args) => (
    <StoryFrame>
      <OutcomeSummary {...args} />
    </StoryFrame>
  ),
};

export const Participant: Story = {
  args: {
    density: "participant",
    outcome: { ...base, intent: "success" },
    metrics: [{ label: "Votes", value: "5/5" }],
  },
  render: (args) => (
    <StoryFrame>
      <OutcomeSummary {...args} />
    </StoryFrame>
  ),
};

export const Facilitator: Story = {
  args: {
    density: "facilitator",
    outcome: { ...base, intent: "information" },
    metrics: [
      { label: "Rooms", value: "3" },
      { label: "Avg time", value: "4:12" },
    ],
  },
  render: (args) => (
    <StoryFrame>
      <OutcomeSummary {...args} />
    </StoryFrame>
  ),
};

export const SharedDisplay: Story = {
  args: {
    density: "shared-display",
    outcome: { ...base, intent: "warning" },
    metrics: [{ label: "Cohort result", value: "Elevated" }],
  },
  render: (args) => (
    <StoryFrame>
      <OutcomeSummary {...args} />
    </StoryFrame>
  ),
};

export const WithActions: Story = {
  args: {
    outcome: { ...base, intent: "success" },
    actions: <Button type="button">Continue</Button>,
  },
  render: (args) => (
    <StoryFrame>
      <OutcomeSummary {...args} />
    </StoryFrame>
  ),
};

export const LongContent: Story = {
  args: {
    outcome: {
      label: "Summary",
      title: "Extended narrative outcome with multi-clause explanation",
      description:
        "This description remains aggregate and public-safe. Applications must not pass participant-private metrics into shared-display density.",
      intent: "information",
    },
  },
  render: (args) => (
    <StoryFrame>
      <OutcomeSummary {...args} />
    </StoryFrame>
  ),
};
