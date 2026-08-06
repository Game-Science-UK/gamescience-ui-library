import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export interface PhaseProgressStep {
  id: string;
  label: string;
  shortLabel?: string;
  groupLabel?: string;
  status?: "complete" | "active" | "pending" | "blocked";
}

export interface PhaseProgressProps extends React.HTMLAttributes<HTMLElement> {
  steps: PhaseProgressStep[];
  activeId?: string;
  label?: string;
  trailingStatus?: React.ReactNode;
  density?: "compact" | "default" | "display";
}

function resolveStatus(
  step: PhaseProgressStep,
  activeId?: string,
): NonNullable<PhaseProgressStep["status"]> {
  if (step.status) return step.status;
  if (activeId && step.id === activeId) return "active";
  return "pending";
}

const statusClass: Record<NonNullable<PhaseProgressStep["status"]>, string> = {
  complete: "border-success bg-success text-success-foreground",
  active: "border-primary bg-primary text-primary-foreground",
  pending: "border-border bg-muted text-muted-foreground",
  blocked: "border-danger bg-danger/15 text-danger",
};

const PhaseProgress = React.forwardRef<HTMLElement, PhaseProgressProps>(
  ({ steps, activeId, label, trailingStatus, density = "default", className, ...props }, ref) => {
    const completeCount = steps.filter((s) => resolveStatus(s, activeId) === "complete").length;
    const activeStep = steps.find((s) => resolveStatus(s, activeId) === "active");

    return (
      <nav
        ref={ref}
        aria-label={label ?? "Phase progress"}
        data-density={density}
        className={cn(
          "gs-phase-progress w-full rounded-panel border border-border bg-surface-raised p-panel-md",
          density === "compact" && "p-panel-sm",
          density === "display" && "p-panel-lg",
          className,
        )}
        {...props}
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          {label ? <p className="gs-label text-muted-foreground">{label}</p> : null}
          {trailingStatus}
        </div>
        <ol className="flex flex-wrap items-center gap-2">
          {steps.map((step, index) => {
            const status = resolveStatus(step, activeId);
            const text = density === "compact" ? (step.shortLabel ?? step.label) : step.label;
            return (
              <li key={step.id} className="flex items-center gap-2">
                {index > 0 ? (
                  <span
                    className={cn(
                      "gs-phase-progress-connector h-px w-4 bg-border",
                      status === "complete" && "bg-success",
                      status === "active" && "bg-primary",
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                <div className="flex flex-col items-start gap-1">
                  {step.groupLabel ? (
                    <span className="gs-micro text-muted-foreground">{step.groupLabel}</span>
                  ) : null}
                  <span
                    className={cn(
                      "inline-flex size-7 items-center justify-center rounded-full border text-[length:var(--type-scale-micro)] font-label",
                      statusClass[status],
                    )}
                    aria-current={status === "active" ? "step" : undefined}
                  >
                    {index + 1}
                  </span>
                  <Badge
                    intent={
                      status === "complete"
                        ? "success"
                        : status === "blocked"
                          ? "danger"
                          : status === "active"
                            ? "primary"
                            : "default"
                    }
                    treatment="outlined"
                    className="max-w-[10rem] truncate"
                  >
                    <span className="sr-only">{status}: </span>
                    {text}
                  </Badge>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="sr-only">
          {completeCount} of {steps.length} steps complete
          {activeStep ? `. Current step: ${activeStep.label}` : ""}
        </p>
      </nav>
    );
  },
);
PhaseProgress.displayName = "PhaseProgress";

export { PhaseProgress };
