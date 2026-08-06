import * as React from "react";
import { cn } from "@/lib/cn";

export interface PhaseHeaderProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: React.ReactNode;
  phase: React.ReactNode;
  trailing?: React.ReactNode;
  intent?: "neutral" | "information" | "warning" | "critical";
  sticky?: boolean;
}

const intentBorder: Record<NonNullable<PhaseHeaderProps["intent"]>, string> = {
  neutral: "border-border",
  information: "border-information/50",
  warning: "border-warning/50",
  critical: "border-danger/50",
};

function PhaseHeader({
  eyebrow,
  phase,
  trailing,
  intent = "neutral",
  sticky = false,
  className,
  ...props
}: PhaseHeaderProps) {
  return (
    <header
      data-intent={intent}
      data-sticky={sticky ? "true" : "false"}
      className={cn(
        "gs-phase-header flex w-full max-w-content items-center justify-between gap-3 border-b bg-background/90 px-4 py-3 backdrop-blur-sm",
        intentBorder[intent],
        sticky && "sticky top-0 z-30",
        className,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">{eyebrow}</div>
      <div className="shrink-0">{phase}</div>
      <div className="flex min-w-0 flex-1 justify-end">{trailing}</div>
    </header>
  );
}

PhaseHeader.displayName = "PhaseHeader";

export { PhaseHeader };
