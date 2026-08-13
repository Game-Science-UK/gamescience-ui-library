import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { GameCodeInput } from "@/components/game/game-code-input";
import { RoomCodeDisplay } from "@/components/display/room-code-display";
import { ParticipantJoinFlow } from "@/patterns/join/participant-join-flow";
import { ParticipantShell } from "@/templates/participant-shell/participant-shell";
import { FacilitatorShell } from "@/templates/facilitator-shell/facilitator-shell";
import { SharedDisplayShell } from "@/templates/shared-display-shell/shared-display-shell";

/**
 * Development-only theme comparison.
 * Use the Storybook Theme toolbar to switch the single root theme.
 * Do not nest GameScienceProvider instances or render both themes concurrently.
 */
const meta = {
  title: "Foundations/Across themes",
  parameters: {
    docs: {
      description: {
        component:
          "Compare GameScience, Citadel, and Sentinel via the toolbar Theme control. Sentinel also uses the Register control (cinematic / restrained). Only one theme is active at the application root. Production apps should install and use a single theme.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const CorePrimitives: Story = {
  render: () => (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <Panel elevation="raised" emphasis="strong" className="space-y-4">
        <PanelHeader>
          <PanelTitle>Panel + actions</PanelTitle>
          <PanelDescription>Scope corners and strong CTAs under Citadel</PanelDescription>
        </PanelHeader>
        <div className="space-y-2">
          <Label htmlFor="across-name">Callsign</Label>
          <Input id="across-name" placeholder="Enter callsign" />
        </div>
        <Button intent="primary" emphasis="strong" size="lg" className="w-full">
          Continue
        </Button>
        <div className="flex flex-wrap gap-2">
          <Badge intent="information" treatment="outlined">
            Information
          </Badge>
          <Badge intent="warning" treatment="outlined">
            Warning
          </Badge>
          <Badge intent="success" treatment="subtle">
            Ready
          </Badge>
        </div>
      </Panel>
      <Panel elevation="raised" className="space-y-4">
        <PanelHeader>
          <PanelTitle>Code surfaces</PanelTitle>
          <PanelDescription>Game code and room code hierarchy</PanelDescription>
        </PanelHeader>
        <GameCodeInput value="AB12" onChange={() => undefined} />
        <RoomCodeDisplay code="AB12" />
      </Panel>
    </div>
  ),
};

export const ParticipantShellJoin: Story = {
  parameters: {
    globals: { context: "participant" },
    viewport: { defaultViewport: "participant" },
  },
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

export const FacilitatorShellSurface: Story = {
  parameters: {
    globals: { context: "facilitator" },
    viewport: { defaultViewport: "facilitator" },
  },
  render: () => (
    <FacilitatorShell title="Facilitator console" subtitle="Lobby operations">
      <Panel elevation="raised" className="space-y-3">
        <PanelHeader>
          <PanelTitle>Operational panel</PanelTitle>
          <PanelDescription>Dense facilitator treatment under the active theme</PanelDescription>
        </PanelHeader>
        <Button intent="primary" emphasis="strong">
          Start session
        </Button>
      </Panel>
    </FacilitatorShell>
  ),
};

export const SharedDisplayShellSurface: Story = {
  parameters: {
    globals: { context: "shared-display" },
    viewport: { defaultViewport: "sharedDisplay" },
  },
  render: () => (
    <SharedDisplayShell>
      <Panel elevation="raised" emphasis="strong" padding="lg" className="space-y-6">
        <RoomCodeDisplay code="K7M2" />
        <Button intent="primary" emphasis="strong" className="gs-interactive-only">
          Hidden on shared display
        </Button>
      </Panel>
    </SharedDisplayShell>
  ),
};
