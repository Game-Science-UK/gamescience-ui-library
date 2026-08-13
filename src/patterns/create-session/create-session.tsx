import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { RoomCodeDisplay } from "@/components/display/room-code-display";
import { cn } from "@/lib/cn";

export interface CreateSessionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled session name. The application owns the value. */
  sessionName: string;
  onSessionNameChange: (value: string) => void;
  /** Optional facilitator display name. Render the field only when this handler is provided. */
  hostName?: string;
  onHostNameChange?: (value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitDisabledReason?: string;
  /** Presence switches the form to the ready state showing the shareable code. */
  createdCode?: string;
  /** Application-owned game-specific configuration (duration, naming, rehearsal tools, etc.). */
  configSlot?: React.ReactNode;
}

/**
 * Facilitator-facing create-session form. Owns presentation only — code generation,
 * persistence, and game-specific setup are application-owned and injected via props.
 */
function CreateSession({
  sessionName,
  onSessionNameChange,
  hostName,
  onHostNameChange,
  onSubmit,
  isSubmitting = false,
  submitDisabledReason,
  createdCode,
  configSlot,
  className,
  ...props
}: CreateSessionProps) {
  const ready = createdCode !== undefined && createdCode !== "";

  return (
    <Panel
      elevation="raised"
      padding="md"
      data-state={ready ? "ready" : "editing"}
      className={cn("gs-create-session space-y-5", className)}
      {...props}
    >
      <PanelHeader>
        <PanelTitle>Create session</PanelTitle>
        <PanelDescription>
          Create a room and share the generated code. Game-specific setup stays in your application.
        </PanelDescription>
      </PanelHeader>

      {ready ? (
        <div className="space-y-4">
          <RoomCodeDisplay code={createdCode} label="Share this code to join" />
          <p className="gs-body text-center text-muted-foreground">
            Session ready. Share the code with participants to begin.
          </p>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (!isSubmitting && !submitDisabledReason) onSubmit();
          }}
        >
          {onHostNameChange ? (
            <div className="space-y-2">
              <Label htmlFor="create-session-host-name">Your name</Label>
              <Input
                id="create-session-host-name"
                placeholder="Facilitator name (optional)"
                value={hostName ?? ""}
                onChange={(event) => onHostNameChange(event.target.value)}
                disabled={isSubmitting}
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="create-session-name">Session name</Label>
            <Input
              id="create-session-name"
              placeholder="e.g. Team Alpha training"
              value={sessionName}
              onChange={(event) => onSessionNameChange(event.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {configSlot ? <div className="gs-create-session-config">{configSlot}</div> : null}

          <Button
            type="submit"
            intent="primary"
            emphasis="strong"
            size="lg"
            loading={isSubmitting}
            disabled={Boolean(submitDisabledReason)}
            className="w-full"
          >
            {isSubmitting ? "Creating…" : "Create session"}
          </Button>

          {submitDisabledReason ? (
            <p className="gs-body text-muted-foreground">{submitDisabledReason}</p>
          ) : null}
        </form>
      )}
    </Panel>
  );
}

CreateSession.displayName = "CreateSession";

export { CreateSession };
