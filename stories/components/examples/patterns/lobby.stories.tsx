import type { Meta, StoryObj } from "@storybook/react-vite";
import { FacilitatorLobby } from "@/patterns/lobby";
import { activeLobbyFixture, emptyLobbyFixture, readyLobbyFixture } from "@/fixtures/lobby";
import { FacilitatorShell, ParticipantShell } from "@/templates";
import { ParticipantJoinFlow } from "@/patterns/join";

const meta = {
  title: "Patterns/Lobby",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Facilitator and participant lobby states. Shared-display lobby lives under Shared Display Lobby.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ParticipantEnteringCode: Story = {
  parameters: { viewport: { defaultViewport: "participant" } },
  globals: { context: "participant" },
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow
        step="enter-code"
        code=""
        displayName=""
        onCodeChange={() => undefined}
        onDisplayNameChange={() => undefined}
        onSubmitCode={() => undefined}
        onSubmitIdentity={() => undefined}
      />
    </ParticipantShell>
  ),
};

export const ParticipantInvalidCode: Story = {
  parameters: { viewport: { defaultViewport: "participant" } },
  globals: { context: "participant" },
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow
        step="enter-code"
        code="XXXX"
        displayName=""
        codeError="That code was not recognised"
        onCodeChange={() => undefined}
        onDisplayNameChange={() => undefined}
        onSubmitCode={() => undefined}
        onSubmitIdentity={() => undefined}
      />
    </ParticipantShell>
  ),
};

export const ParticipantWaiting: Story = {
  parameters: { viewport: { defaultViewport: "participant" } },
  globals: { context: "participant" },
  render: () => (
    <ParticipantShell>
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

export const ParticipantReconnecting: Story = {
  parameters: { viewport: { defaultViewport: "participant" } },
  globals: { context: "participant" },
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow
        step="reconnecting"
        code="B7K2"
        displayName="Team Alpha"
        connection="reconnecting"
        onCodeChange={() => undefined}
        onDisplayNameChange={() => undefined}
        onSubmitCode={() => undefined}
        onSubmitIdentity={() => undefined}
      />
    </ParticipantShell>
  ),
};

export const FacilitatorEmpty: Story = {
  parameters: { viewport: { defaultViewport: "facilitator" } },
  globals: { context: "facilitator" },
  render: () => (
    <FacilitatorShell subtitle="Lobby · waiting for joins">
      <FacilitatorLobby
        session={emptyLobbyFixture.session}
        participants={emptyLobbyFixture.participants}
        status={emptyLobbyFixture.status}
        onStart={() => undefined}
      />
    </FacilitatorShell>
  ),
};

export const FacilitatorParticipantsJoining: Story = {
  parameters: { viewport: { defaultViewport: "facilitator" } },
  globals: { context: "facilitator" },
  render: () => (
    <FacilitatorShell subtitle="Lobby · participants joining">
      <FacilitatorLobby
        session={activeLobbyFixture.session}
        participants={activeLobbyFixture.participants}
        status={activeLobbyFixture.status}
        onStart={() => undefined}
      />
    </FacilitatorShell>
  ),
};

export const FacilitatorDisconnectedParticipant: Story = {
  parameters: { viewport: { defaultViewport: "facilitator" } },
  globals: { context: "facilitator" },
  render: () => (
    <FacilitatorShell subtitle="Lobby · connection issues">
      <FacilitatorLobby
        session={activeLobbyFixture.session}
        participants={activeLobbyFixture.participants.filter(
          (participant) =>
            participant.connection === "offline" || participant.connection === "reconnecting",
        )}
        status="active"
        onStart={() => undefined}
      />
    </FacilitatorShell>
  ),
};

export const FacilitatorReady: Story = {
  parameters: { viewport: { defaultViewport: "facilitator" } },
  globals: { context: "facilitator" },
  render: () => (
    <FacilitatorShell subtitle="Lobby · ready to start">
      <FacilitatorLobby
        session={readyLobbyFixture.session}
        participants={readyLobbyFixture.participants}
        status={readyLobbyFixture.status}
        onStart={() => undefined}
        showStartConfirm
        onConfirmStart={() => undefined}
        onCancelStart={() => undefined}
      />
    </FacilitatorShell>
  ),
};

export const FacilitatorStartDisabled: Story = {
  parameters: { viewport: { defaultViewport: "facilitator" } },
  globals: { context: "facilitator" },
  render: () => (
    <FacilitatorShell subtitle="Lobby · start blocked">
      <FacilitatorLobby
        session={readyLobbyFixture.session}
        participants={readyLobbyFixture.participants}
        status={readyLobbyFixture.status}
        startDisabledReason="Waiting for facilitator briefing to finish"
        onStart={() => undefined}
      />
    </FacilitatorShell>
  ),
};
