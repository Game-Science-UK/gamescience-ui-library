import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Decision } from "@/patterns/decision";
import { TimedRound } from "@/patterns/timed-round";
import { decisionOptionsFixture, sealedDecisionFixture } from "@/fixtures/decision";
import { roundStepsFixture, timedRoundFixture } from "@/fixtures/round";
import { ParticipantShell } from "@/templates";

const meta = {
  title: "Patterns/Timed Round",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Round-lifecycle container wrapping a beat (Decision) with phase header, countdown, phase progress, and directive. Optional slots degrade cleanly.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const participant = {
  parameters: { viewport: { defaultViewport: "participant" } },
  globals: { context: "participant" },
};

export const ActiveDecision: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <TimedRound
        eyebrow={
          <span className="gs-label text-muted-foreground">{timedRoundFixture.eyebrow}</span>
        }
        phase={<Badge intent="primary">{timedRoundFixture.phase}</Badge>}
        phaseIntent="information"
        countdown={timedRoundFixture.countdown}
        steps={timedRoundFixture.steps}
        activeStepId={timedRoundFixture.activeStepId}
        directive={timedRoundFixture.directive}
        footer={<Button className="w-full">Submit round</Button>}
      >
        <Decision
          {...sealedDecisionFixture}
          onSelectOption={() => undefined}
          onCommit={() => undefined}
        />
      </TimedRound>
    </ParticipantShell>
  ),
};

export const WarningCountdown: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <TimedRound
        eyebrow={<span className="gs-label">Round 2 of 5</span>}
        phase={<Badge intent="warning">Decision</Badge>}
        phaseIntent="warning"
        countdown={{
          formattedTime: "00:30",
          state: "running",
          accessibleLabel: "30 seconds remaining",
        }}
        steps={roundStepsFixture}
        activeStepId="decide"
        directive="Lock your choice — time is almost up."
        footer={
          <Button intent="danger" className="w-full">
            Lock in
          </Button>
        }
      >
        <Decision
          phase="negotiation"
          options={decisionOptionsFixture}
          selectedOptionId="b"
          onSelectOption={() => undefined}
          onLock={() => undefined}
        />
      </TimedRound>
    </ParticipantShell>
  ),
};

export const Degenerate: Story = {
  ...participant,
  name: "Degenerate (no intensity, no steps)",
  render: () => (
    <ParticipantShell>
      <TimedRound
        phase={<Badge intent="primary">Vote</Badge>}
        countdown={{ formattedTime: "00:42", state: "running" }}
        footer={<Button className="w-full">Confirm</Button>}
      >
        <Decision
          phase="sealed"
          options={decisionOptionsFixture}
          selectedOptionId="a"
          onSelectOption={() => undefined}
          onCommit={() => undefined}
        />
      </TimedRound>
    </ParticipantShell>
  ),
};
