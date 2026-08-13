import type { Meta, StoryObj } from "@storybook/react-vite";
import { SharedDisplayLobby } from "@/patterns/lobby";
import { activeLobbyFixture, emptyLobbyFixture, readyLobbyFixture } from "@/fixtures/lobby";
import { SharedDisplayShell } from "@/templates";

const meta = {
  title: "Patterns/Shared Display Lobby",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Room-code lobby for shared displays. Use the Context toolbar set to shared-display.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const SharedDisplayJoin: Story = {
  parameters: { viewport: { defaultViewport: "sharedDisplay" } },
  globals: { context: "shared-display" },
  render: () => (
    <SharedDisplayShell>
      <SharedDisplayLobby session={emptyLobbyFixture.session} status="not-started" />
    </SharedDisplayShell>
  ),
};

export const SharedDisplayWaiting: Story = {
  parameters: { viewport: { defaultViewport: "sharedDisplay" } },
  globals: { context: "shared-display" },
  render: () => (
    <SharedDisplayShell>
      <SharedDisplayLobby session={activeLobbyFixture.session} status="active" />
    </SharedDisplayShell>
  ),
};

export const SharedDisplayReady: Story = {
  parameters: { viewport: { defaultViewport: "sharedDisplay" } },
  globals: { context: "shared-display" },
  render: () => (
    <SharedDisplayShell>
      <SharedDisplayLobby session={readyLobbyFixture.session} status="ready" />
    </SharedDisplayShell>
  ),
};

export const SharedDisplayCustomInstruction: Story = {
  parameters: { viewport: { defaultViewport: "sharedDisplay" } },
  globals: { context: "shared-display" },
  render: () => (
    <SharedDisplayShell>
      <SharedDisplayLobby
        session={activeLobbyFixture.session}
        status="active"
        instruction="Scan the QR code at your table, then enter this room code"
      />
    </SharedDisplayShell>
  ),
};
