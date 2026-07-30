import type { Meta, StoryObj } from "@storybook/react-vite";
import { ParticipantStatus } from "@/components/game/participant-status";
import type { ConnectionState, ReadinessState } from "@/types/game";
import { StoryFrame } from "../../_utils/story-frame";

const keyStates: Array<{ connection: ConnectionState; readiness: ReadinessState; label: string }> =
  [
    { connection: "connected", readiness: "ready", label: "Connected · Ready" },
    { connection: "connected", readiness: "not-ready", label: "Connected · Not ready" },
    { connection: "connected", readiness: "submitted", label: "Connected · Submitted" },
    { connection: "connected", readiness: "waiting", label: "Connected · Waiting" },
    { connection: "reconnecting", readiness: "waiting", label: "Reconnecting · Waiting" },
    { connection: "offline", readiness: "not-ready", label: "Offline · Not ready" },
  ];

const meta = {
  title: "Components/Game/ParticipantStatus",
  component: ParticipantStatus,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryFrame className="max-w-md">
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof ParticipantStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KeyStates: Story = {
  args: {
    displayName: "Team Alpha",
    connection: "connected",
    readiness: "ready",
  },
  render: () => (
    <div className="grid gap-3">
      {keyStates.map(({ connection, readiness, label }) => (
        <ParticipantStatus
          key={label}
          displayName={label}
          connection={connection}
          readiness={readiness}
        />
      ))}
    </div>
  ),
};

export const Compact: Story = {
  args: {
    displayName: "Team Alpha",
    connection: "connected",
    readiness: "ready",
    compact: true,
  },
};
