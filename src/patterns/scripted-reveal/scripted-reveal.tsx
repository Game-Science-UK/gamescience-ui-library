import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { Countdown } from "@/components/game/countdown";
import { cn } from "@/lib/cn";

export type ScriptedRevealStep = "countdown" | "announce" | "revealed" | "complete";

export interface ScriptedRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  step: ScriptedRevealStep;
  eyebrow?: string;
  headline: string;
  description?: string;
  intent?: "information" | "success" | "warning" | "critical";
  countdown?: { formattedTime: string; accessibleLabel?: string };
  onAcknowledge?: () => void;
}

const stepIntent: Record<ScriptedRevealStep, NonNullable<ScriptedRevealProps["intent"]>> = {
  countdown: "information",
  announce: "information",
  revealed: "success",
  complete: "success",
};

const stepBadge: Record<ScriptedRevealStep, string> = {
  countdown: "Incoming",
  announce: "Announcement",
  revealed: "Revealed",
  complete: "Complete",
};

const badgeIntent: Record<
  NonNullable<ScriptedRevealProps["intent"]>,
  "information" | "success" | "warning" | "danger"
> = {
  information: "information",
  success: "success",
  warning: "warning",
  critical: "danger",
};

/**
 * Timed mid-round announcement / reveal. Owns only presentation and pacing hooks;
 * the application drives the step and the underlying content.
 */
function ScriptedReveal({
  step,
  eyebrow = "Event",
  headline,
  description,
  intent,
  countdown,
  onAcknowledge,
  className,
  ...props
}: ScriptedRevealProps) {
  const resolvedIntent = intent ?? stepIntent[step];

  return (
    <div
      data-step={step}
      data-intent={resolvedIntent}
      className={cn(
        "gs-scripted-reveal mx-auto flex w-full max-w-content flex-col items-center justify-center gap-[var(--section-gap)] text-center",
        className,
      )}
      {...props}
    >
      <Panel elevation="raised" emphasis="strong" padding="lg" className="w-full max-w-4xl">
        <PanelHeader>
          <div className="flex flex-col items-center gap-3">
            <Badge intent={badgeIntent[resolvedIntent]} treatment="outlined">
              {stepBadge[step]}
            </Badge>
            <p className="gs-label gs-eyebrow gs-eyebrow-dotted text-muted-foreground">{eyebrow}</p>
            <PanelTitle className="gs-display">{headline}</PanelTitle>
            {description ? (
              <PanelDescription className="gs-body">{description}</PanelDescription>
            ) : null}
          </div>
        </PanelHeader>

        {step === "countdown" && countdown ? (
          <div className="flex justify-center">
            <Countdown
              formattedTime={countdown.formattedTime}
              state="running"
              treatment="contained"
              size="lg"
              accessibleLabel={countdown.accessibleLabel}
            />
          </div>
        ) : null}

        {step !== "countdown" && onAcknowledge ? (
          <div className="mt-4 flex justify-center">
            <Button
              type="button"
              intent="primary"
              emphasis="strong"
              size="lg"
              onClick={onAcknowledge}
            >
              {step === "complete" ? "Continue" : "Acknowledge"}
            </Button>
          </div>
        ) : null}
      </Panel>
    </div>
  );
}

ScriptedReveal.displayName = "ScriptedReveal";

export { ScriptedReveal };
