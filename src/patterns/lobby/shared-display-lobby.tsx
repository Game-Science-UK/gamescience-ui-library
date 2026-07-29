import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { WaitingState } from "@/components/game/waiting-state";
import { DisplayHeading } from "@/components/display/display-heading";
import { ParticipantCountDisplay } from "@/components/display/participant-count-display";
import { RoomCodeDisplay } from "@/components/display/room-code-display";
import { cn } from "@/lib/cn";
import type { SessionSummary, StageStatus } from "@/types/game";

export interface SharedDisplayLobbyProps {
  session: SessionSummary;
  status: StageStatus;
  instruction?: string;
  className?: string;
}

function SharedDisplayLobby({
  session,
  status,
  instruction = "Open the game on your phone and enter this code",
  className,
}: SharedDisplayLobbyProps) {
  const isReady = status === "ready";

  return (
    <div
      className={cn(
        "mx-auto flex min-h-[70vh] w-full max-w-content flex-col items-center justify-center gap-[var(--section-gap)] px-8",
        className,
      )}
    >
      <DisplayHeading eyebrow={session.title ?? "GameScience session"}>
        {isReady ? "Ready to begin" : "Join the session"}
      </DisplayHeading>

      <Panel
        elevation="raised"
        emphasis="strong"
        padding="lg"
        className="w-full max-w-4xl space-y-8"
      >
        <RoomCodeDisplay code={session.code} />
        <p className="text-center text-[length:var(--type-scale-body)] text-muted-foreground">
          {instruction}
        </p>
        <ParticipantCountDisplay
          count={session.participantCount}
          expected={session.expectedParticipantCount}
        />
        <div className="flex justify-center">
          <Badge intent={isReady ? "success" : "information"} treatment="outlined">
            {isReady ? "All participants ready" : "Waiting for participants"}
          </Badge>
        </div>
      </Panel>

      {!isReady ? (
        <WaitingState
          title="Waiting for players"
          description="Private participant details are never shown on this display."
          loading
        />
      ) : (
        <WaitingState
          title="Stand by for facilitator start"
          description="The shared display will advance with the room."
          loading={false}
        />
      )}
    </div>
  );
}

SharedDisplayLobby.displayName = "SharedDisplayLobby";

export { SharedDisplayLobby };
