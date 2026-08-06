import type { Meta, StoryObj } from "@storybook/react-vite";
import { ParticipantJoinFlow } from "@/patterns/join";
import { ParticipantShell } from "@/templates";

const joinFlowProps = {
  onCodeChange: () => undefined,
  onDisplayNameChange: () => undefined,
  onSubmitCode: () => undefined,
  onSubmitIdentity: () => undefined,
};

const meta = {
  title: "Components/Examples/Patterns/Join Flow",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Participant join flow steps from code entry through lobby waiting and connection recovery.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const participantStory = {
  parameters: { viewport: { defaultViewport: "participant" } },
  globals: { context: "participant" },
};

export const EnterCode: Story = {
  ...participantStory,
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow step="enter-code" code="" displayName="" {...joinFlowProps} />
    </ParticipantShell>
  ),
};

export const InvalidCode: Story = {
  ...participantStory,
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow
        step="enter-code"
        code="XXXX"
        displayName=""
        codeError="That code was not recognised"
        {...joinFlowProps}
      />
    </ParticipantShell>
  ),
};

export const SubmittingCode: Story = {
  ...participantStory,
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow step="submitting" code="B7K2" displayName="" {...joinFlowProps} />
    </ParticipantShell>
  ),
};

export const EnterIdentity: Story = {
  ...participantStory,
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow step="enter-identity" code="B7K2" displayName="" {...joinFlowProps} />
    </ParticipantShell>
  ),
};

export const IdentityError: Story = {
  ...participantStory,
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow
        step="enter-identity"
        code="B7K2"
        displayName="A"
        identityError="Display name must be at least 2 characters"
        {...joinFlowProps}
      />
    </ParticipantShell>
  ),
};

export const Submitting: Story = {
  ...participantStory,
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow
        step="submitting"
        code="B7K2"
        displayName="Team Alpha"
        {...joinFlowProps}
      />
    </ParticipantShell>
  ),
};

export const Waiting: Story = {
  ...participantStory,
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow step="waiting" code="B7K2" displayName="Team Alpha" {...joinFlowProps} />
    </ParticipantShell>
  ),
};

export const Reconnecting: Story = {
  ...participantStory,
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow
        step="reconnecting"
        code="B7K2"
        displayName="Team Alpha"
        connection="reconnecting"
        {...joinFlowProps}
      />
    </ParticipantShell>
  ),
};

export const Disconnected: Story = {
  ...participantStory,
  render: () => (
    <ParticipantShell>
      <ParticipantJoinFlow
        step="disconnected"
        code="B7K2"
        displayName="Team Alpha"
        connection="offline"
        onRetry={() => undefined}
        {...joinFlowProps}
      />
    </ParticipantShell>
  ),
};
