import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { Progress } from "@/components/ui/progress";
import { ConnectionStatus } from "@/components/game/connection-status";
import { ParticipantStatus } from "@/components/game/participant-status";
import { cn } from "@/lib/cn";
import type { ParticipantSummary, SessionSummary, StageStatus } from "@/types/game";

export interface FacilitatorConsoleProps extends React.HTMLAttributes<HTMLDivElement> {
  session: SessionSummary;
  participants: ParticipantSummary[];
  status: StageStatus;
  phaseLabel?: string;
  progressValue?: number;
  progressLabel?: string;
  onPause?: () => void;
  onResume?: () => void;
  onAdvance?: () => void;
  onEnd?: () => void;
  /** Privacy-safe facilitator-only slot. The application injects its own hidden state. */
  privateSlot?: React.ReactNode;
}

function FacilitatorConsole({
  session,
  participants,
  status,
  phaseLabel = "In session",
  progressValue,
  progressLabel,
  onPause,
  onResume,
  onAdvance,
  onEnd,
  privateSlot,
  className,
  ...props
}: FacilitatorConsoleProps) {
  const isPaused = status === "paused";
  const isComplete = status === "complete" || status === "locked";
  const connectedCount = participants.filter(
    (participant) => participant.connection === "connected",
  ).length;

  return (
    <div
      data-status={status}
      className={cn(
        "gs-facilitator-console grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]",
        className,
      )}
      {...props}
    >
      <Panel elevation="raised" className="space-y-4">
        <PanelHeader>
          <PanelTitle>{session.title ?? "Session control"}</PanelTitle>
          <PanelDescription>
            {session.code} · Advance, pause, or end the room. Hidden state below stays
            facilitator-only.
          </PanelDescription>
        </PanelHeader>

        <div className="flex flex-wrap items-center gap-2">
          <Badge intent="information" treatment="outlined">
            {phaseLabel}
          </Badge>
          <Badge
            intent={isComplete ? "default" : isPaused ? "warning" : "success"}
            treatment="outlined"
          >
            {status}
          </Badge>
          <ConnectionStatus state="connected" label={`${connectedCount} connected`} />
        </div>

        {progressValue !== undefined ? (
          <Progress value={progressValue} label={progressLabel ?? "Round progress"} />
        ) : null}

        <ButtonGroup orientation="vertical">
          {onPause && !isPaused && !isComplete ? (
            <Button type="button" intent="outline" onClick={onPause}>
              Pause
            </Button>
          ) : null}
          {onResume && isPaused ? (
            <Button type="button" intent="primary" onClick={onResume}>
              Resume
            </Button>
          ) : null}
          {onAdvance && !isComplete ? (
            <Button type="button" intent="primary" emphasis="strong" onClick={onAdvance}>
              Advance
            </Button>
          ) : null}
          {onEnd ? (
            <Button type="button" intent="danger" onClick={onEnd}>
              End session
            </Button>
          ) : null}
        </ButtonGroup>

        {privateSlot ? (
          <div className="rounded-panel border border-dashed border-border bg-surface-subtle p-panel-sm">
            <p className="gs-micro text-muted-foreground">Facilitator-only</p>
            {privateSlot}
          </div>
        ) : null}
      </Panel>

      <Panel elevation="subtle" padding="md">
        <PanelHeader>
          <PanelTitle>Participants</PanelTitle>
          <PanelDescription>
            {connectedCount} connected · {participants.length} joined
          </PanelDescription>
        </PanelHeader>
        {participants.length === 0 ? (
          <p className="gs-body text-muted-foreground">No participants connected.</p>
        ) : (
          <ul className="grid gap-2">
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

FacilitatorConsole.displayName = "FacilitatorConsole";

export { FacilitatorConsole };
