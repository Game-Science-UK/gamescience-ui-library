import type { ReactNode } from "react";
import { Countdown, type CountdownState } from "@/components/game/countdown";
import { PhaseDirective } from "@/components/game/phase-directive";
import { PhaseHeader } from "@/components/game/phase-header";
import { PhaseProgress, type PhaseProgressStep } from "@/components/game/phase-progress";
import { StickyActionBar } from "@/components/game/sticky-action-bar";
import { cn } from "@/lib/cn";

export interface TimedRoundCountdown {
  formattedTime: string;
  state?: CountdownState;
  label?: string;
  accessibleLabel?: string;
}

export interface TimedRoundProps {
  eyebrow?: ReactNode;
  /** Center phase pill content, e.g. a Badge. */
  phase: ReactNode;
  phaseIntent?: "neutral" | "information" | "warning" | "critical";
  countdown?: TimedRoundCountdown;
  steps?: PhaseProgressStep[];
  activeStepId?: string;
  progressLabel?: string;
  directive?: string;
  directiveEyebrow?: string;
  children: ReactNode;
  /** Round-level actions rendered in the bottom action region. */
  footer?: ReactNode;
  footerStatus?: ReactNode;
  className?: string;
}

/**
 * Round-lifecycle container that wraps a beat (e.g. Decision) with phase header,
 * countdown, phase progress, and directive. Every optional slot degrades cleanly so
 * a game can use only the beats it needs.
 */
function TimedRound({
  eyebrow,
  phase,
  phaseIntent = "neutral",
  countdown,
  steps,
  activeStepId,
  progressLabel,
  directive,
  directiveEyebrow,
  children,
  footer,
  footerStatus,
  className,
}: TimedRoundProps) {
  return (
    <div className={cn("gs-timed-round flex min-h-full w-full flex-col", className)}>
      <PhaseHeader
        sticky
        intent={phaseIntent}
        eyebrow={eyebrow}
        phase={phase}
        trailing={
          countdown ? (
            <Countdown
              formattedTime={countdown.formattedTime}
              state={countdown.state}
              label={countdown.label}
              accessibleLabel={countdown.accessibleLabel}
              intent={phaseIntent === "neutral" ? undefined : phaseIntent}
            />
          ) : undefined
        }
      />

      <main className="mx-auto w-full max-w-content flex-1 space-y-4 px-4 py-4">
        {steps && steps.length > 0 ? (
          <PhaseProgress steps={steps} activeId={activeStepId} label={progressLabel} />
        ) : null}

        {directive ? (
          <PhaseDirective treatment="panel" eyebrow={directiveEyebrow} intent="information">
            {directive}
          </PhaseDirective>
        ) : null}

        {children}
      </main>

      {footer ? (
        <StickyActionBar status={footerStatus} intent={phaseIntent}>
          {footer}
        </StickyActionBar>
      ) : null}
    </div>
  );
}

TimedRound.displayName = "TimedRound";

export { TimedRound };
