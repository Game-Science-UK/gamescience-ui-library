import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScriptedReveal } from "@/patterns/scripted-reveal";
import {
  announcedRevealFixture,
  revealedFixture,
  scriptedRevealFixture,
} from "@/fixtures/scripted-reveal";
import { SharedDisplayShell } from "@/templates";

const meta = {
  title: "Patterns/Scripted Reveal",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Timed mid-round announcement / reveal. The application drives the step and content.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const display = {
  parameters: { viewport: { defaultViewport: "sharedDisplay" } },
  globals: { context: "shared-display" },
};

export const Countdown: Story = {
  ...display,
  render: () => (
    <SharedDisplayShell>
      <ScriptedReveal {...scriptedRevealFixture} />
    </SharedDisplayShell>
  ),
};

export const Announce: Story = {
  ...display,
  render: () => (
    <SharedDisplayShell>
      <ScriptedReveal {...announcedRevealFixture} onAcknowledge={() => undefined} />
    </SharedDisplayShell>
  ),
};

export const Revealed: Story = {
  ...display,
  render: () => (
    <SharedDisplayShell>
      <ScriptedReveal {...revealedFixture} onAcknowledge={() => undefined} />
    </SharedDisplayShell>
  ),
};

export const Complete: Story = {
  ...display,
  render: () => (
    <SharedDisplayShell>
      <ScriptedReveal
        step="complete"
        eyebrow="Market event"
        headline="Constraints applied"
        description="The round resumes with the updated parameters."
        onAcknowledge={() => undefined}
      />
    </SharedDisplayShell>
  ),
};
