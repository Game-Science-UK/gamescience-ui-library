import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CreateSession } from "@/patterns/create-session";
import { createSessionReadyFixture } from "@/fixtures/create-session";
import { FacilitatorShell } from "@/templates";

const meta = {
  title: "Patterns/Create Session",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Facilitator-facing create-session form with optional host/session names, an application-owned configuration slot, and a ready state showing the generated code.",
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

function CreateSessionStory() {
  const [sessionName, setSessionName] = useState("");
  const [hostName, setHostName] = useState("");
  return (
    <FacilitatorShell subtitle="Session · create">
      <CreateSession
        sessionName={sessionName}
        onSessionNameChange={setSessionName}
        hostName={hostName}
        onHostNameChange={setHostName}
        onSubmit={() => undefined}
      />
    </FacilitatorShell>
  );
}

function CreateSessionConfiguredStory() {
  const [sessionName, setSessionName] = useState("Team Alpha training");
  const [hostName, setHostName] = useState("Facilitator");
  return (
    <FacilitatorShell subtitle="Session · create">
      <CreateSession
        sessionName={sessionName}
        onSessionNameChange={setSessionName}
        hostName={hostName}
        onHostNameChange={setHostName}
        onSubmit={() => undefined}
        configSlot={
          <p className="gs-body text-muted-foreground">
            Application-owned configuration goes here — duration, naming, rehearsal tools, and other
            game-specific options.
          </p>
        }
      />
    </FacilitatorShell>
  );
}

export const Default: Story = {
  ...facilitator,
  render: () => <CreateSessionStory />,
};

export const Configured: Story = {
  ...facilitator,
  render: () => <CreateSessionConfiguredStory />,
};

export const Ready: Story = {
  ...facilitator,
  render: () => (
    <FacilitatorShell subtitle="Session · created">
      <CreateSession
        sessionName={createSessionReadyFixture.sessionName}
        onSessionNameChange={() => undefined}
        hostName={createSessionReadyFixture.hostName}
        onHostNameChange={() => undefined}
        onSubmit={() => undefined}
        createdCode={createSessionReadyFixture.createdCode}
      />
    </FacilitatorShell>
  ),
};
