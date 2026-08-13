import * as React from "react";
import { cn } from "@/lib/cn";

export type StatIntent = "neutral" | "information" | "success" | "warning" | "critical";

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  hint?: string;
  intent?: StatIntent;
  size?: "sm" | "md" | "lg";
}

const intentClass: Record<StatIntent, string> = {
  neutral: "text-foreground",
  information: "text-information",
  success: "text-success",
  warning: "text-warning",
  critical: "text-danger",
};

const sizeClass: Record<NonNullable<StatProps["size"]>, string> = {
  sm: "text-[length:var(--type-scale-code)]",
  md: "text-[length:var(--type-scale-title)]",
  lg: "text-[length:var(--type-scale-display)]",
};

/**
 * Single metric tile for score, viability, and aggregate grids.
 * Owning value is the application's responsibility; this presents it with semantic intent.
 */
function Stat({
  label,
  value,
  hint,
  intent = "neutral",
  size = "md",
  className,
  ...props
}: StatProps) {
  return (
    <div
      data-intent={intent}
      data-size={size}
      className={cn(
        "gs-stat rounded-panel border border-border bg-surface-subtle p-panel-md",
        className,
      )}
      {...props}
    >
      <p className="gs-label text-muted-foreground">{label}</p>
      <p className={cn("gs-data mt-1 tabular-nums", sizeClass[size], intentClass[intent])}>
        {value}
      </p>
      {hint ? <p className="gs-micro mt-1 text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

Stat.displayName = "Stat";

export { Stat };
