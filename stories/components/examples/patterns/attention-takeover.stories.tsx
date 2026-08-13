import type { Meta, StoryObj } from "@storybook/react-vite";
import { AttentionTakeover } from "@/patterns/attention-takeover";
import {
  attentionTakeoverFixture,
  urgentAttentionTakeoverFixture,
} from "@/fixtures/attention-takeover";
import { ParticipantShell } from "@/templates";

const meta = {
  title: "Components/Examples/Patterns/Attention Takeover",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Full-screen participant takeover redirecting attention to the shared display.",
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

export const Default: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <AttentionTakeover {...attentionTakeoverFixture} onAcknowledge={() => undefined} />
    </ParticipantShell>
  ),
};

export const Urgent: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <AttentionTakeover {...urgentAttentionTakeoverFixture} />
    </ParticipantShell>
  ),
};
