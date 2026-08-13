import type { Meta, StoryObj } from "@storybook/react-vite";
import { FacilitatorConsole } from "@/patterns/facilitator-console";
import { facilitatorConsoleFixture, pausedConsoleFixture } from "@/fixtures/facilitator-console";
import { FacilitatorShell } from "@/templates";

const meta = {
  title: "Patterns/Facilitator Console",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Facilitator session controls with pause/advance/end actions, participant status, and a privacy-safe hidden-state slot.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const facilitator = {
  parameters: { viewport: { defaultViewport: "facilitator" } },
  globals: { context: "facilitator" },
};

export const Active: Story = {
  ...facilitator,
  render: () => (
    <FacilitatorShell subtitle="Session · active">
      <FacilitatorConsole
        {...facilitatorConsoleFixture}
        onPause={() => undefined}
        onAdvance={() => undefined}
        onEnd={() => undefined}
      />
    </FacilitatorShell>
  ),
};

export const Paused: Story = {
  ...facilitator,
  render: () => (
    <FacilitatorShell subtitle="Session · paused">
      <FacilitatorConsole
        {...pausedConsoleFixture}
        onResume={() => undefined}
        onAdvance={() => undefined}
        onEnd={() => undefined}
      />
    </FacilitatorShell>
  ),
};

export const WithPrivateSlot: Story = {
  ...facilitator,
  render: () => (
    <FacilitatorShell subtitle="Session · active">
      <FacilitatorConsole
        {...facilitatorConsoleFixture}
        onPause={() => undefined}
        onAdvance={() => undefined}
        onEnd={() => undefined}
        privateSlot={
          <p className="gs-body text-foreground">
            This area is for facilitator-only state. The application owns what appears here.
          </p>
        }
      />
    </FacilitatorShell>
  ),
};
