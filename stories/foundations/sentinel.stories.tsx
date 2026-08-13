import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Toaster, toast } from "@/components/ui/sonner";
import { Countdown } from "@/components/game/countdown";
import { DisplayHeading } from "@/components/display/display-heading";
import { RoomCodeDisplay } from "@/components/display/room-code-display";
import { FacilitatorShell, ParticipantShell, SharedDisplayShell } from "@/templates";
import { StoryFrame } from "../_utils/story-frame";

const meta = {
  title: "Foundations/Sentinel",
  parameters: {
    docs: {
      description: {
        component:
          "Sentinel theme coverage. Use the Theme toolbar (Sentinel) and Register toolbar (cinematic default / restrained). No theme-specific component forks.",
      },
    },
  },
  globals: { theme: "sentinel", register: "cinematic" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const CinematicPrimitives: Story = {
  globals: { theme: "sentinel", register: "cinematic", context: "participant" },
  render: () => (
    <StoryFrame className="grid max-w-md gap-6">
      <Panel elevation="raised" emphasis="strong">
        <PanelHeader>
          <p className="gs-label gs-eyebrow">Cinematic register</p>
          <PanelTitle>Panel + wash</PanelTitle>
          <PanelDescription>Square surface, strong ice border, cinematic wash.</PanelDescription>
        </PanelHeader>
        <div className="space-y-3">
          <div className="grid gap-1">
            <Label htmlFor="sentinel-callsign">Callsign</Label>
            <Input id="sentinel-callsign" placeholder="Enter callsign" />
          </div>
          <Input placeholder="Invalid code" invalid defaultValue="??" />
          <Input placeholder="Disabled" disabled />
          <ButtonGroup>
            <Button intent="primary" emphasis="strong">
              Commit
            </Button>
            <Button intent="secondary">Hold</Button>
            <Button intent="outline">Ghost</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button intent="danger">Overrun</Button>
          </ButtonGroup>
        </div>
      </Panel>
      <Separator />
      <Progress value={62} label="Heat" />
      <Progress value={18} />
      <Progress value={100} />
    </StoryFrame>
  ),
};

export const RestrainedPrimitives: Story = {
  globals: { theme: "sentinel", register: "restrained", context: "participant" },
  render: () => (
    <StoryFrame className="grid max-w-md gap-6">
      <Panel elevation="raised">
        <PanelHeader>
          <p className="gs-label gs-eyebrow">Restrained register</p>
          <PanelTitle>Quiet void</PanelTitle>
          <PanelDescription>Indigo secondary, no wash, quieter borders.</PanelDescription>
        </PanelHeader>
        <div className="space-y-3">
          <Input placeholder="Display name" />
          <Button intent="primary" className="w-full">
            Continue
          </Button>
          <Button intent="secondary" className="w-full">
            Secondary indigo
          </Button>
        </div>
      </Panel>
      <Progress value={48} label="Phase" />
    </StoryFrame>
  ),
};

export const ButtonStates: Story = {
  globals: { theme: "sentinel", register: "cinematic" },
  render: () => (
    <StoryFrame className="grid gap-3">
      <ButtonGroup>
        <Button intent="primary">Default</Button>
        <Button intent="primary" emphasis="strong">
          Strong
        </Button>
        <Button intent="outline">Outline</Button>
        <Button intent="ghost">Ghost</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button intent="danger">Overrun</Button>
      </ButtonGroup>
    </StoryFrame>
  ),
};

export const RailCardAndBreached: Story = {
  globals: { theme: "sentinel", register: "cinematic" },
  render: () => (
    <StoryFrame className="grid max-w-md gap-4">
      <Card>
        <CardHeader>
          <p className="gs-label gs-eyebrow">Rail</p>
          <CardTitle className="gs-title-section">Sector brief</CardTitle>
          <CardDescription>Aliases to panel geometry under Sentinel.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="gs-body text-muted-foreground">
            Square card, raised void surface, strong border, no shadow.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Open</Button>
        </CardFooter>
      </Card>
      <Card data-state="breached">
        <CardHeader>
          <p className="gs-label gs-eyebrow">Breached</p>
          <CardTitle className="gs-title-section">Ash surface</CardTitle>
          <CardDescription>Semantic breached state — ashen treatment.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="gs-mono">LINK SEVERED</p>
        </CardContent>
      </Card>
    </StoryFrame>
  ),
};

export const OverlayAndCountdown: Story = {
  globals: { theme: "sentinel", register: "cinematic" },
  render: () => (
    <StoryFrame className="grid max-w-md gap-4">
      <Panel elevation="overlay" padding="lg" className="space-y-4">
        <PanelHeader>
          <PanelTitle>Countdown overlay</PanelTitle>
          <PanelDescription>Dashed overlay border on a dim void scrim.</PanelDescription>
        </PanelHeader>
        <Countdown
          formattedTime="00:12"
          state="running"
          intent="warning"
          treatment="contained"
          size="lg"
          accessibleLabel="12 seconds remaining"
        />
      </Panel>
      <Dialog>
        <DialogTrigger asChild>
          <Button intent="outline">Open overlay</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dispatch confirm</DialogTitle>
            <DialogDescription>Portal inherits data-theme and data-register.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button intent="outline">Abort</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
      <Button intent="secondary" onClick={() => toast("Signal received")}>
        Toast
      </Button>
    </StoryFrame>
  ),
};

export const ParticipantVoid: Story = {
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "participant" } },
  globals: { theme: "sentinel", register: "cinematic", context: "participant" },
  render: () => (
    <ParticipantShell>
      <Panel elevation="raised" emphasis="strong" className="space-y-4">
        <PanelHeader>
          <p className="gs-label gs-eyebrow">Join</p>
          <PanelTitle>Enter code</PanelTitle>
          <PanelDescription>Centered max-w-sm panel on void.</PanelDescription>
        </PanelHeader>
        <Input placeholder="Room code" />
        <Button className="w-full" emphasis="strong">
          Join session
        </Button>
      </Panel>
    </ParticipantShell>
  ),
};

export const FacilitatorShellDense: Story = {
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "facilitator" } },
  globals: { theme: "sentinel", register: "restrained", context: "facilitator" },
  render: () => (
    <FacilitatorShell title="Host console" subtitle="Restrained register · compact labels">
      <Panel elevation="raised" className="space-y-3">
        <PanelHeader>
          <PanelTitle>Operations</PanelTitle>
          <PanelDescription>Centered max-w-3xl high-density column.</PanelDescription>
        </PanelHeader>
        <div className="flex flex-wrap gap-2">
          <Badge intent="information" treatment="outlined">
            Live
          </Badge>
          <Badge intent="warning" treatment="outlined">
            Holding
          </Badge>
        </div>
        <Button intent="primary" emphasis="strong">
          Advance phase
        </Button>
      </Panel>
    </FacilitatorShell>
  ),
};

export const SharedDisplayVoid: Story = {
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "sharedDisplay" } },
  globals: { theme: "sentinel", register: "cinematic", context: "shared-display" },
  render: () => (
    <SharedDisplayShell>
      <div className="flex w-full max-w-[26.25rem] flex-col gap-6">
        <DisplayHeading eyebrow="Room">K7M2</DisplayHeading>
        <RoomCodeDisplay code="K7M2" />
        <p className="gs-body text-center text-muted-foreground">
          Full-bleed void. Side panel ~420px. No private player names.
        </p>
        <Countdown
          formattedTime="04:00"
          state="running"
          size="lg"
          treatment="contained"
          accessibleLabel="4 minutes remaining"
        />
      </div>
    </SharedDisplayShell>
  ),
};
