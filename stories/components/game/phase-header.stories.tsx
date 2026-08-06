import type { Meta, StoryObj } from "@storybook/react-vite";
import { Countdown } from "@/components/game/countdown";
import { PhaseHeader } from "@/components/game/phase-header";
import { Badge } from "@/components/ui/badge";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Game/PhaseHeader",
  component: PhaseHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof PhaseHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: {
    eyebrow: <span className="gs-label text-muted-foreground">GameScience</span>,
    phase: <Badge intent="primary">Discussion</Badge>,
    intent: "neutral",
  },
  render: (args) => (
    <StoryFrame className="p-0">
      <PhaseHeader {...args} />
    </StoryFrame>
  ),
};

export const Warning: Story = {
  args: {
    eyebrow: <span className="gs-label">Session</span>,
    phase: <Badge intent="warning">Decision</Badge>,
    intent: "warning",
    trailing: (
      <Countdown formattedTime="00:18" intent="warning" state="running" treatment="inline" />
    ),
  },
  render: (args) => (
    <StoryFrame className="p-0">
      <PhaseHeader {...args} />
    </StoryFrame>
  ),
};

export const Critical: Story = {
  args: {
    eyebrow: <span className="gs-label">Session</span>,
    phase: <Badge intent="danger">Vote</Badge>,
    intent: "critical",
    trailing: (
      <Countdown formattedTime="00:05" intent="critical" state="running" treatment="inline" />
    ),
  },
  render: (args) => (
    <StoryFrame className="p-0">
      <PhaseHeader {...args} />
    </StoryFrame>
  ),
};

export const LongPhaseLabel: Story = {
  args: {
    eyebrow: <span className="gs-label">Brand</span>,
    phase: <Badge intent="information">Collaborative vendor risk discussion</Badge>,
  },
  render: (args) => (
    <StoryFrame className="p-0">
      <PhaseHeader {...args} />
    </StoryFrame>
  ),
};

export const MobileWidth: Story = {
  args: {
    eyebrow: <span className="gs-label">GS</span>,
    phase: <Badge>Lobby</Badge>,
    trailing: <Countdown formattedTime="05:00" state="idle" size="sm" />,
    sticky: true,
  },
  render: (args) => (
    <StoryFrame className="mx-auto max-w-[390px] p-0">
      <PhaseHeader {...args} />
    </StoryFrame>
  ),
};
