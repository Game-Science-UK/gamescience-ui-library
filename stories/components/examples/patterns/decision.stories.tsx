import type { Meta, StoryObj } from "@storybook/react-vite";
import { Decision } from "@/patterns/decision";
import {
  committedDecisionFixture,
  declarationDecisionFixture,
  decisionOptionsFixture,
  resolvedDecisionFixture,
  sealedDecisionFixture,
  tiedDecisionFixture,
} from "@/fixtures/decision";
import { ParticipantShell } from "@/templates";

const meta = {
  title: "Components/Examples/Patterns/Decision",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Game-agnostic decision loop: sealed private commit → declaration → negotiation → lock → resolved. Citadel's vote is the degenerate sealed → resolved case.",
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

export const Sealed: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <Decision
        {...sealedDecisionFixture}
        onSelectOption={() => undefined}
        onCommit={() => undefined}
      />
    </ParticipantShell>
  ),
};

export const SealedCommitted: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <Decision {...committedDecisionFixture} onSelectOption={() => undefined} />
    </ParticipantShell>
  ),
};

export const DegenerateVote: Story = {
  ...participant,
  name: "Degenerate vote (sealed → resolved)",
  render: () => (
    <ParticipantShell>
      <Decision
        phase="sealed"
        directive="Select one option. Your choice stays private until reveal."
        options={decisionOptionsFixture}
        selectedOptionId="b"
        onSelectOption={() => undefined}
        onCommit={() => undefined}
      />
    </ParticipantShell>
  ),
};

export const Declaration: Story = {
  parameters: { viewport: { defaultViewport: "facilitator" } },
  globals: { context: "facilitator" },
  render: () => (
    <ParticipantShell>
      <Decision {...declarationDecisionFixture} onLock={() => undefined} />
    </ParticipantShell>
  ),
};

export const Locked: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <Decision phase="lock" options={decisionOptionsFixture} />
    </ParticipantShell>
  ),
};

export const Resolved: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <Decision {...resolvedDecisionFixture} />
    </ParticipantShell>
  ),
};

export const ResolvedTie: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <Decision {...tiedDecisionFixture} />
    </ParticipantShell>
  ),
};
