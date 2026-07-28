import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { Progress } from "@/components/ui/progress";
import { ParticipantStatus } from "@/components/game/participant-status";
import { RoomCodeDisplay } from "@/components/display/room-code-display";
import { cn } from "@/lib/cn";
import type { ParticipantSummary, SessionSummary, StageStatus } from "@/types/game";

export interface FacilitatorLobbyProps {
  session: SessionSummary;
  participants: ParticipantSummary[];
  status: StageStatus;
  startDisabledReason?: string;
  showStartConfirm?: boolean;
  onStart: () => void;
  onCancelStart?: () => void;
  onConfirmStart?: () => void;
  className?: string;
}

function FacilitatorLobby({
  session,
  participants,
  status,
  startDisabledReason,
  showStartConfirm = false,
  onStart,
  onCancelStart,
  onConfirmStart,
  className,
}: FacilitatorLobbyProps) {
  const expected = session.expectedParticipantCount ?? participants.length;
  const readyCount = participants.filter((participant) => participant.readiness === "ready").length;
  const disconnectedCount = participants.filter(
    (participant) => participant.connection !== "connected",
  ).length;
  const progressValue = expected > 0 ? Math.round((participants.length / expected) * 100) : 0;
  const canStart = status === "ready" && !startDisabledReason;

  return (
    <div className={cn("grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]", className)}>
      <Panel elevation="raised" className="space-y-4">
        <PanelHeader>
          <PanelTitle>Session control</PanelTitle>
          <PanelDescription>
            Participants currently see the join/lobby screens. The shared display shows the room
            code.
          </PanelDescription>
        </PanelHeader>

        <RoomCodeDisplay code={session.code} label="Room code" />
        <div className="flex flex-wrap gap-2">
          <Badge intent="information">Stage: Lobby</Badge>
          <Badge intent={status === "ready" ? "success" : "default"}>Status: {status}</Badge>
        </div>

        <Progress value={progressValue} label={`Joined ${participants.length} of ${expected}`} />

        {disconnectedCount > 0 ? (
          <Alert intent="warning" title={`${disconnectedCount} participant connection issue`}>
            Review the participant list before advancing. Disconnected participants may miss the
            start cue.
          </Alert>
        ) : null}

        {showStartConfirm ? (
          <Alert intent="warning" title="Start the session?">
            This advances every interface out of the lobby. Confirm only when the room is ready.
            <ButtonGroup className="mt-3">
              <Button type="button" intent="primary" onClick={onConfirmStart}>
                Confirm start
              </Button>
              <Button type="button" intent="ghost" onClick={onCancelStart}>
                Cancel
              </Button>
            </ButtonGroup>
          </Alert>
        ) : (
          <ButtonGroup orientation="vertical">
            <Button type="button" intent="primary" size="lg" disabled={!canStart} onClick={onStart}>
              Start session
            </Button>
            {!canStart ? (
              <p className="text-[length:var(--type-scale-label)] text-muted-foreground">
                {startDisabledReason ?? "Start becomes available when the lobby status is ready."}
              </p>
            ) : null}
          </ButtonGroup>
        )}
      </Panel>

      <Panel elevation="subtle" padding="md">
        <PanelHeader>
          <PanelTitle>Participants</PanelTitle>
          <PanelDescription>
            {readyCount} ready · {participants.length} joined
          </PanelDescription>
        </PanelHeader>

        {participants.length === 0 ? (
          <Alert intent="information" title="No participants connected">
            Share the room code on the shared display. New joiners will appear here.
          </Alert>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {participants.map((participant) => (
              <li key={participant.id}>
                <ParticipantStatus
                  displayName={participant.displayName}
                  connection={participant.connection}
                  readiness={participant.readiness}
                />
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

FacilitatorLobby.displayName = "FacilitatorLobby";

export { FacilitatorLobby };
