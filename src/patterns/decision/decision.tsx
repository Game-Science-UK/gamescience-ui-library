import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { IntensitySelector } from "@/components/game/intensity-selector";
import { OptionSelector, type OptionSelectorOption } from "@/components/game/option-selector";
import { OutcomeSummary } from "@/components/game/outcome-summary";
import { PhaseDirective } from "@/components/game/phase-directive";
import { WaitingState } from "@/components/game/waiting-state";
import { cn } from "@/lib/cn";

export type DecisionPhase = "sealed" | "declaration" | "negotiation" | "lock" | "resolved";

export type DecisionOption = OptionSelectorOption;

export interface DecisionDeclaration {
  participantId: string;
  optionId: string;
}

export interface DecisionResult {
  winningOptionId: string;
  totals: Record<string, number>;
  tie: boolean;
}

export interface DecisionProps extends React.HTMLAttributes<HTMLDivElement> {
  phase: DecisionPhase;
  directive?: string;
  options: DecisionOption[];
  selectedOptionId?: string;
  /** Hidden until resolved — the application keeps it private on shared surfaces. */
  intensity?: number;
  maxIntensity?: number;
  declaration?: DecisionDeclaration[];
  hasCommitted?: boolean;
  result?: DecisionResult;
  onSelectOption?: (id: string) => void;
  onSetIntensity?: (value: number) => void;
  onCommit?: () => void;
  onLock?: () => void;
}

function optionTitle(options: DecisionOption[], id: string) {
  return options.find((option) => option.id === id)?.title ?? id;
}

/**
 * Game-agnostic decision loop: sealed private commit → public declaration → optional
 * negotiation → lock → resolved. Citadel's vote is the degenerate `sealed → resolved` case.
 * Commit, scoring, and reveal authority remain application-owned.
 */
function Decision({
  phase,
  directive,
  options,
  selectedOptionId,
  intensity = 0,
  maxIntensity,
  declaration = [],
  hasCommitted = false,
  result,
  onSelectOption,
  onSetIntensity,
  onCommit,
  onLock,
  className,
  ...props
}: DecisionProps) {
  const showIntensity = maxIntensity !== undefined;
  const winningTitle = result?.winningOptionId
    ? optionTitle(options, result.winningOptionId)
    : undefined;

  return (
    <div
      data-phase={phase}
      className={cn("gs-decision w-full max-w-content space-y-4", className)}
      {...props}
    >
      {directive ? (
        <PhaseDirective treatment="strip" eyebrow="Directive" intent="information">
          {directive}
        </PhaseDirective>
      ) : null}

      {phase === "sealed" || phase === "negotiation" ? (
        <>
          <OptionSelector
            options={options}
            selectedId={selectedOptionId}
            onSelect={onSelectOption}
            disabled={hasCommitted}
            label={phase === "sealed" ? "Choose an option" : "Reconsider your choice"}
          />
          {showIntensity ? (
            <IntensitySelector
              value={intensity}
              max={maxIntensity}
              onChange={onSetIntensity}
              disabled={hasCommitted}
              label="Conviction"
            />
          ) : null}
          <div className="rounded-panel border border-border bg-surface p-panel-sm">
            {phase === "sealed" ? (
              hasCommitted ? (
                <Badge intent="success">Committed</Badge>
              ) : (
                <ButtonGroup orientation="vertical">
                  <Button
                    type="button"
                    intent="primary"
                    emphasis="strong"
                    size="lg"
                    className="w-full"
                    disabled={!selectedOptionId}
                    onClick={onCommit}
                  >
                    Commit selection
                  </Button>
                </ButtonGroup>
              )
            ) : (
              <ButtonGroup orientation="vertical">
                <Button
                  type="button"
                  intent="primary"
                  emphasis="strong"
                  size="lg"
                  className="w-full"
                  onClick={onLock}
                >
                  Lock in
                </Button>
              </ButtonGroup>
            )}
          </div>
        </>
      ) : null}

      {phase === "declaration" ? (
        <>
          <Panel elevation="raised">
            <PanelHeader>
              <PanelTitle>Declared choices</PanelTitle>
              <PanelDescription>
                {declaration.length > 0
                  ? `${declaration.length} participants have declared`
                  : "Waiting for declarations"}
              </PanelDescription>
            </PanelHeader>
            {declaration.length > 0 ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {declaration.map((entry) => (
                  <li
                    key={entry.participantId}
                    className="flex items-center justify-between gap-3 rounded-control border border-border bg-surface-subtle px-3 py-2"
                  >
                    <span className="truncate font-label text-foreground">
                      {entry.participantId}
                    </span>
                    <Badge intent="information" treatment="outlined">
                      {optionTitle(options, entry.optionId)}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <WaitingState
                title="No declarations yet"
                description="Choices become public once participants declare."
                loading={false}
              />
            )}
          </Panel>
          {onLock ? (
            <div className="rounded-panel border border-border bg-surface p-panel-sm">
              <ButtonGroup orientation="vertical">
                <Button
                  type="button"
                  intent="primary"
                  emphasis="strong"
                  size="lg"
                  className="w-full"
                  onClick={onLock}
                >
                  Lock the decision
                </Button>
              </ButtonGroup>
            </div>
          ) : null}
        </>
      ) : null}

      {phase === "lock" ? (
        <WaitingState
          title="Decision locked"
          description="The room is resolving. This screen will advance automatically."
        />
      ) : null}

      {phase === "resolved" ? (
        <OutcomeSummary
          outcome={{
            label: result?.tie ? "Tie" : "Resolved",
            title: result?.tie ? "No majority reached" : (winningTitle ?? "Resolved"),
            description: result?.tie
              ? "The room did not converge on a single option."
              : "The room converged on this option.",
            intent: result?.tie ? "warning" : "success",
          }}
          metrics={
            result
              ? options
                  .filter((option) => result.totals[option.id] !== undefined)
                  .map((option) => ({
                    label: option.title,
                    value: result.totals[option.id],
                    intent:
                      !result.tie && option.id === result.winningOptionId
                        ? ("success" as const)
                        : ("neutral" as const),
                  }))
              : []
          }
        />
      ) : null}
    </div>
  );
}

Decision.displayName = "Decision";

export { Decision };
