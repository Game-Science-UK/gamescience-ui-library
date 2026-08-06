import * as React from "react";
import { cn } from "@/lib/cn";

export type CountdownIntent = "neutral" | "information" | "warning" | "critical";
export type CountdownState = "idle" | "running" | "paused" | "expired";

export interface CountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pre-formatted time string from the application (component does not compute time). */
  formattedTime: string;
  label?: string;
  intent?: CountdownIntent;
  state?: CountdownState;
  treatment?: "inline" | "contained";
  size?: "sm" | "md" | "lg";
  /** Full accessible phrase, e.g. "1 minute 24 seconds remaining". */
  accessibleLabel?: string;
}

const intentClass: Record<CountdownIntent, string> = {
  neutral: "text-muted-foreground",
  information: "text-information",
  warning: "text-warning",
  critical: "text-danger",
};

const stateIntentFallback: Record<CountdownState, CountdownIntent> = {
  idle: "neutral",
  running: "information",
  paused: "warning",
  expired: "critical",
};

const sizeClass: Record<NonNullable<CountdownProps["size"]>, string> = {
  sm: "text-[length:var(--type-scale-label)]",
  md: "text-[length:var(--type-scale-code)]",
  lg: "text-[length:var(--type-scale-title)]",
};

const Countdown = React.forwardRef<HTMLDivElement, CountdownProps>(
  (
    {
      formattedTime,
      label,
      intent,
      state = "idle",
      treatment = "inline",
      size = "md",
      accessibleLabel,
      className,
      ...props
    },
    ref,
  ) => {
    const resolvedIntent = intent ?? stateIntentFallback[state];

    return (
      <div
        ref={ref}
        role="timer"
        aria-live="off"
        aria-label={accessibleLabel ?? (label ? `${formattedTime}, ${label}` : formattedTime)}
        data-intent={resolvedIntent}
        data-state={state}
        data-treatment={treatment}
        className={cn(
          "gs-countdown inline-flex items-center gap-2",
          intentClass[resolvedIntent],
          treatment === "contained" &&
            "rounded-control border border-border bg-surface px-3 py-1.5 shadow-control",
          className,
        )}
        {...props}
      >
        {state === "running" ? (
          <span
            className="gs-countdown-marker size-1.5 shrink-0 rounded-full bg-current motion-safe:animate-pulse"
            aria-hidden="true"
          />
        ) : null}
        <span className={cn("gs-data tabular-nums", sizeClass[size])}>{formattedTime}</span>
        {label ? <span className="gs-micro text-muted-foreground">{label}</span> : null}
      </div>
    );
  },
);
Countdown.displayName = "Countdown";

export { Countdown };
