import * as React from "react";
import { OutcomeSummary, type OutcomeSummaryData } from "@/components/game/outcome-summary";
import { Stat, type StatIntent } from "@/components/game/stat";
import { cn } from "@/lib/cn";

export interface ResultsStat {
  label: string;
  value: React.ReactNode;
  intent?: StatIntent;
  hint?: string;
}

export interface ResultsProps extends React.HTMLAttributes<HTMLDivElement> {
  outcome: OutcomeSummaryData;
  stats?: ResultsStat[];
  actions?: React.ReactNode;
  density?: "participant" | "facilitator" | "shared-display";
}

/**
 * Staged outcome reveal: a headline OutcomeSummary plus a Stat grid for detailed,
 * public-safe metrics. Owning values stay application-side.
 */
function Results({
  outcome,
  stats = [],
  actions,
  density = "participant",
  className,
  ...props
}: ResultsProps) {
  return (
    <div
      data-density={density}
      className={cn("gs-results w-full max-w-content space-y-4", className)}
      {...props}
    >
      <OutcomeSummary outcome={outcome} actions={actions} density={density} />

      {stats.length > 0 ? (
        <dl
          className={cn(
            "grid gap-3",
            density === "shared-display" ? "sm:grid-cols-3" : "sm:grid-cols-2",
          )}
        >
          {stats.map((stat) => (
            <Stat
              key={stat.label}
              label={stat.label}
              value={stat.value}
              intent={stat.intent}
              hint={stat.hint}
              size={density === "shared-display" ? "lg" : "md"}
            />
          ))}
        </dl>
      ) : null}
    </div>
  );
}

Results.displayName = "Results";

export { Results };
