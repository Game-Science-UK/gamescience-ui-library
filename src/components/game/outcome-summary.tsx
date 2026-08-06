import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { cn } from "@/lib/cn";

export interface OutcomeSummaryData {
  label?: string;
  title: string;
  description?: string;
  intent: "information" | "success" | "warning" | "critical";
}

export interface OutcomeSummaryMetric {
  label: string;
  value: React.ReactNode;
  intent?: "neutral" | "information" | "success" | "warning" | "critical";
}

export interface OutcomeSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  outcome: OutcomeSummaryData;
  metrics?: OutcomeSummaryMetric[];
  actions?: React.ReactNode;
  density?: "participant" | "facilitator" | "shared-display";
}

const badgeIntent: Record<
  OutcomeSummaryData["intent"],
  "information" | "success" | "warning" | "danger"
> = {
  information: "information",
  success: "success",
  warning: "warning",
  critical: "danger",
};

function OutcomeSummary({
  outcome,
  metrics = [],
  actions,
  density = "participant",
  className,
  ...props
}: OutcomeSummaryProps) {
  return (
    <div
      data-intent={outcome.intent}
      data-density={density}
      className={cn("gs-outcome-summary", className)}
      {...props}
    >
      <Panel
        elevation="raised"
        emphasis="strong"
        padding={density === "shared-display" ? "lg" : "md"}
      >
        <PanelHeader>
          {outcome.label ? (
            <Badge intent={badgeIntent[outcome.intent]} treatment="outlined">
              {outcome.label}
            </Badge>
          ) : null}
          <PanelTitle className={cn(density === "shared-display" && "gs-display", "mt-2")}>
            {outcome.title}
          </PanelTitle>
          {outcome.description ? (
            <PanelDescription className="gs-body">{outcome.description}</PanelDescription>
          ) : null}
        </PanelHeader>

        {metrics.length > 0 ? (
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-control border border-border bg-surface-subtle p-3"
                data-intent={metric.intent ?? "neutral"}
              >
                <dt className="gs-label text-muted-foreground">{metric.label}</dt>
                <dd className="gs-data mt-1 text-foreground">{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
      </Panel>
    </div>
  );
}

OutcomeSummary.displayName = "OutcomeSummary";

export { OutcomeSummary };
