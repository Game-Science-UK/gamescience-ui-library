import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { DisplayHeading } from "@/components/display/display-heading";
import { PhaseProgress, type PhaseProgressStep } from "@/components/game/phase-progress";
import { cn } from "@/lib/cn";

export type SharedDisplayGameState = "waiting" | "active" | "reveal" | "results" | "debrief";

export interface SharedDisplayGameProps {
  state: SharedDisplayGameState;
  eyebrow?: string;
  heading: string;
  description?: string;
  steps?: PhaseProgressStep[];
  activeStepId?: string;
  progressLabel?: string;
  children?: ReactNode;
  className?: string;
}

const stateLabel: Record<SharedDisplayGameState, string> = {
  waiting: "Waiting",
  active: "Active",
  reveal: "Reveal",
  results: "Results",
  debrief: "Debrief",
};

const stateIntent: Record<
  SharedDisplayGameState,
  "information" | "primary" | "success" | "warning"
> = {
  waiting: "information",
  active: "primary",
  reveal: "warning",
  results: "success",
  debrief: "information",
};

/**
 * In-game shared display states. Privacy-safe by contract — pass only aggregate,
 * public content. State content is injected via children.
 */
function SharedDisplayGame({
  state,
  eyebrow = "GameScience session",
  heading,
  description,
  steps,
  activeStepId,
  progressLabel,
  children,
  className,
}: SharedDisplayGameProps) {
  return (
    <div
      data-state={state}
      className={cn(
        "gs-shared-display-game mx-auto flex min-h-[70vh] w-full max-w-content flex-col items-center justify-center gap-[var(--section-gap)] px-8",
        className,
      )}
    >
      <DisplayHeading eyebrow={eyebrow}>{heading}</DisplayHeading>
      {description ? (
        <p className="gs-body max-w-prose text-center text-muted-foreground">{description}</p>
      ) : null}

      {steps && steps.length > 0 ? (
        <PhaseProgress
          steps={steps}
          activeId={activeStepId}
          label={progressLabel}
          density="display"
        />
      ) : null}

      <div className="flex justify-center">
        <Badge intent={stateIntent[state]} treatment="outlined">
          {stateLabel[state]}
        </Badge>
      </div>

      {children ? <div className="w-full max-w-4xl">{children}</div> : null}
    </div>
  );
}

SharedDisplayGame.displayName = "SharedDisplayGame";

export { SharedDisplayGame };
