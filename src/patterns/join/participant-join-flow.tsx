import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { ConnectionStatus } from "@/components/game/connection-status";
import { GameCodeInput } from "@/components/game/game-code-input";
import { ParticipantIdentity } from "@/components/game/participant-identity";
import { WaitingState } from "@/components/game/waiting-state";
import { cn } from "@/lib/cn";
import { toCompactConnectionState } from "@/lib/connection";
import type { ConnectionState } from "@/types/game";

export type ParticipantJoinStep =
  "enter-code" | "enter-identity" | "submitting" | "waiting" | "reconnecting" | "disconnected";

export interface ParticipantJoinFlowProps {
  step: ParticipantJoinStep;
  code: string;
  displayName: string;
  codeError?: string;
  identityError?: string;
  connection?: ConnectionState;
  sessionTitle?: string;
  onCodeChange: (value: string) => void;
  onDisplayNameChange: (value: string) => void;
  onSubmitCode: () => void;
  onSubmitIdentity: () => void;
  onRetry?: () => void;
  className?: string;
}

function ParticipantJoinFlow({
  step,
  code,
  displayName,
  codeError,
  identityError,
  connection = "connected",
  sessionTitle = "Join the session",
  onCodeChange,
  onDisplayNameChange,
  onSubmitCode,
  onSubmitIdentity,
  onRetry,
  className,
}: ParticipantJoinFlowProps) {
  const isSubmitting = step === "submitting";

  return (
    <div className={cn("mx-auto w-full max-w-md", className)}>
      <Panel elevation="raised">
        <PanelHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <PanelTitle>{sessionTitle}</PanelTitle>
              <PanelDescription>
                Enter the code from the shared display, then choose how you appear in the room.
              </PanelDescription>
            </div>
            {step !== "enter-code" ? (
              <ConnectionStatus state={toCompactConnectionState(connection)} />
            ) : null}
          </div>
        </PanelHeader>

        {step === "enter-code" || (step === "submitting" && !displayName) ? (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmitCode();
            }}
          >
            <GameCodeInput
              value={code}
              onChange={onCodeChange}
              error={codeError}
              disabled={isSubmitting}
            />
            {codeError ? (
              <Alert intent="danger" title="Unable to join">
                Check the code and try again. Codes are usually four to six characters.
              </Alert>
            ) : null}
            <ButtonGroup>
              <Button
                type="submit"
                intent="primary"
                emphasis="strong"
                size="lg"
                loading={isSubmitting}
                className="w-full"
              >
                Continue
              </Button>
            </ButtonGroup>
          </form>
        ) : null}

        {step === "enter-identity" || (step === "submitting" && Boolean(displayName)) ? (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmitIdentity();
            }}
          >
            <GameCodeInput
              value={code}
              onChange={onCodeChange}
              disabled
              hint="Room code confirmed"
            />
            <ParticipantIdentity
              value={displayName}
              onChange={onDisplayNameChange}
              error={identityError}
              disabled={isSubmitting}
            />
            <ButtonGroup>
              <Button
                type="submit"
                intent="primary"
                emphasis="strong"
                size="lg"
                loading={isSubmitting}
                className="w-full"
              >
                Join lobby
              </Button>
            </ButtonGroup>
          </form>
        ) : null}

        {step === "waiting" ? (
          <WaitingState
            title="Waiting for the session to start"
            description="You are in the lobby. Keep this screen open until the facilitator begins."
          />
        ) : null}

        {step === "reconnecting" ? (
          <div className="space-y-4">
            <ConnectionStatus state="reconnecting" attempt={2} />
            <WaitingState
              title="Reconnecting to the session"
              description="Your place in the lobby is preserved while we reconnect."
            />
          </div>
        ) : null}

        {step === "disconnected" ? (
          <div className="space-y-4">
            <Alert intent="warning" title="Connection lost">
              You are offline. Retry when your network is available.
            </Alert>
            <ConnectionStatus state="offline" onRetry={onRetry} />
          </div>
        ) : null}
      </Panel>
    </div>
  );
}

ParticipantJoinFlow.displayName = "ParticipantJoinFlow";

export { ParticipantJoinFlow };
