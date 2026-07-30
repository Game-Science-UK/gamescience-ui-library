import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConnectionStatus } from "@/components/game/connection-status";
import { ParticipantJoinFlow } from "@/patterns/join";
import { SharedDisplayLobby } from "@/patterns/lobby";
import { activeSessionFixture, readySessionFixture } from "@/fixtures/session";
import { FacilitatorShell, ParticipantShell, SharedDisplayShell } from "@/templates";

const meta = {
  title: "Templates/Shells",
  parameters: {
    docs: {
      description: {
        component:
          "Context shells for participant, facilitator, and shared-display experiences. Theme and context come from Storybook globals.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ParticipantWithHeaderFooter: Story = {
  parameters: { viewport: { defaultViewport: "participant" } },
  globals: { context: "participant" },
  render: () => (
    <ParticipantShell
      header={
        <div className="flex items-center justify-between">
          <p className="gs-label text-muted-foreground">{activeSessionFixture.title}</p>
          <ConnectionStatus state="connected" />
        </div>
      }
      footer={
        <p className="text-center text-[length:var(--type-scale-label)] text-muted-foreground">
          Keep this screen open until the session starts
        </p>
      }
    >
      <ParticipantJoinFlow
        step="waiting"
        code={activeSessionFixture.code}
        displayName="Team Alpha"
        onCodeChange={() => undefined}
        onDisplayNameChange={() => undefined}
        onSubmitCode={() => undefined}
        onSubmitIdentity={() => undefined}
      />
    </ParticipantShell>
  ),
};

export const FacilitatorWithActions: Story = {
  parameters: { viewport: { defaultViewport: "facilitator" } },
  globals: { context: "facilitator" },
  render: () => (
    <FacilitatorShell
      title={activeSessionFixture.title}
      subtitle="Facilitator console · Lobby"
      actions={<ConnectionStatus state="connected" label="Room live" />}
    >
      <p className="text-muted-foreground">
        Main content area for facilitator patterns and operational panels.
      </p>
    </FacilitatorShell>
  ),
};

export const SharedDisplayBasic: Story = {
  parameters: { viewport: { defaultViewport: "sharedDisplay" } },
  globals: { context: "shared-display" },
  render: () => (
    <SharedDisplayShell>
      <SharedDisplayLobby session={readySessionFixture} status="ready" />
    </SharedDisplayShell>
  ),
};
