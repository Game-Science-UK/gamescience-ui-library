import * as React from "react";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/cn";

export interface PhaseDirectiveProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  children: React.ReactNode;
  treatment?: "plain" | "strip" | "panel";
  intent?: "information" | "warning" | "critical";
}

const intentRule: Record<NonNullable<PhaseDirectiveProps["intent"]>, string> = {
  information: "border-l-information",
  warning: "border-l-warning",
  critical: "border-l-danger",
};

function PhaseDirective({
  eyebrow,
  children,
  treatment = "plain",
  intent = "information",
  className,
  ...props
}: PhaseDirectiveProps) {
  const eyebrowNode = eyebrow ? (
    <p className="gs-label gs-eyebrow gs-eyebrow-dotted mb-2 text-muted-foreground">{eyebrow}</p>
  ) : null;

  const body = <div className="gs-body text-foreground">{children}</div>;

  if (treatment === "plain") {
    return (
      <div
        data-treatment={treatment}
        data-intent={intent}
        className={cn("gs-phase-directive", className)}
        {...props}
      >
        {eyebrowNode}
        {body}
      </div>
    );
  }

  if (treatment === "strip") {
    return (
      <div
        data-treatment={treatment}
        data-intent={intent}
        className={cn(
          "gs-phase-directive rounded-control border border-l-4 border-border bg-surface-subtle px-4 py-3",
          intentRule[intent],
          className,
        )}
        {...props}
      >
        {eyebrowNode}
        {body}
      </div>
    );
  }

  return (
    <div
      data-treatment={treatment}
      data-intent={intent}
      className={cn("gs-phase-directive", className)}
      {...props}
    >
      <Panel elevation="raised" padding="md" emphasis="strong">
        {eyebrowNode}
        {body}
      </Panel>
    </div>
  );
}

PhaseDirective.displayName = "PhaseDirective";

export { PhaseDirective };
