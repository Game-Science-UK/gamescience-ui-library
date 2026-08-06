import type { Meta, StoryObj } from "@storybook/react-vite";
import { ParticipantJoinFlow } from "@/patterns/join";
import { FacilitatorLobby, SharedDisplayLobby } from "@/patterns/lobby";
import { activeLobbyFixture, readyLobbyFixture } from "@/fixtures/lobby";
import { FacilitatorShell, ParticipantShell, SharedDisplayShell } from "@/templates";
import { ConnectionStatus } from "@/components/game/connection-status";

const meta = {
  title: "Templates/Reference Screens",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Reference compositions for participant (375×812), facilitator (1440×900), and shared display (1920×1080).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ParticipantReference: Story = {
  name: "Participant / Lobby waiting",
  parameters: { viewport: { defaultViewport: "participant" } },
  globals: { context: "participant", theme: "gamescience" },
  render: () => (
    <ParticipantShell
      header={
        <div className="flex items-center justify-between">
          <p className="gs-label text-muted-foreground">Strategy Simulation</p>
          <ConnectionStatus state="connected" />
        </div>
      }
    >
      <ParticipantJoinFlow
        step="waiting"
        code="B7K2"
        displayName="Team Alpha"
        onCodeChange={() => undefined}
        onDisplayNameChange={() => undefined}
        onSubmitCode={() => undefined}
        onSubmitIdentity={() => undefined}
      />
    </ParticipantShell>
  ),
};

export const FacilitatorReference: Story = {
  name: "Facilitator / Active lobby",
  parameters: { viewport: { defaultViewport: "facilitator" } },
  globals: { context: "facilitator", theme: "citadel" },
  render: () => (
    <FacilitatorShell
      title="Strategy Simulation"
      subtitle="Facilitator console · Lobby"
      actions={<ConnectionStatus state="connected" label="Room live" />}
    >
      <FacilitatorLobby
        session={activeLobbyFixture.session}
        participants={activeLobbyFixture.participants}
        status={activeLobbyFixture.status}
        onStart={() => undefined}
      />
    </FacilitatorShell>
  ),
};

export const SharedDisplayReference: Story = {
  name: "Shared display / Ready",
  parameters: { viewport: { defaultViewport: "sharedDisplay" } },
  globals: { context: "shared-display", theme: "citadel" },
  render: () => (
    <SharedDisplayShell>
      <SharedDisplayLobby session={readyLobbyFixture.session} status="ready" />
    </SharedDisplayShell>
  ),
};
