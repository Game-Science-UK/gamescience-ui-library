import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "gs-badge inline-flex items-center rounded-pill border px-2.5 py-0.5 font-label text-[length:var(--type-scale-label)]",
  {
    variants: {
      intent: {
        default: "border-transparent bg-secondary text-secondary-foreground",
        primary: "border-transparent bg-primary text-primary-foreground",
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        danger: "border-transparent bg-danger text-danger-foreground",
        information: "border-transparent bg-information text-information-foreground",
        /**
         * @deprecated Prefer `treatment="outlined"` with a semantic `intent`.
         * Preserved through 0.2.0 for compatibility.
         */
        outline: "border-border-strong bg-transparent text-foreground",
      },
      treatment: {
        solid: "",
        subtle: "border-transparent bg-muted text-muted-foreground",
        outlined: "border-border-strong bg-transparent text-foreground",
      },
    },
    compoundVariants: [
      {
        treatment: "subtle",
        intent: "success",
        class: "bg-success/15 text-success border-transparent",
      },
      {
        treatment: "subtle",
        intent: "warning",
        class: "bg-warning/15 text-warning border-transparent",
      },
      {
        treatment: "subtle",
        intent: "danger",
        class: "bg-danger/15 text-danger border-transparent",
      },
      {
        treatment: "subtle",
        intent: "information",
        class: "bg-information/15 text-information border-transparent",
      },
      {
        treatment: "subtle",
        intent: "primary",
        class: "bg-primary/15 text-primary border-transparent",
      },
      {
        treatment: "outlined",
        intent: "success",
        class: "border-success/80 text-success bg-transparent",
      },
      {
        treatment: "outlined",
        intent: "warning",
        class: "border-warning/80 text-warning bg-transparent",
      },
      {
        treatment: "outlined",
        intent: "danger",
        class: "border-danger/80 text-danger bg-transparent",
      },
      {
        treatment: "outlined",
        intent: "information",
        class: "border-information/80 text-information bg-transparent",
      },
      {
        treatment: "outlined",
        intent: "primary",
        class: "border-primary/80 text-primary bg-transparent",
      },
    ],
    defaultVariants: {
      intent: "default",
      treatment: "solid",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function resolveBadgeAxes(
  intent: BadgeProps["intent"],
  treatment: BadgeProps["treatment"],
): { intent: NonNullable<BadgeProps["intent"]>; treatment: NonNullable<BadgeProps["treatment"]> } {
  const legacyOutline = intent === "outline";
  const resolvedIntent = legacyOutline ? "default" : (intent ?? "default");
  // Explicit treatment wins over legacy intent="outline".
  const resolvedTreatment = treatment ?? (legacyOutline ? "outlined" : "solid");

  return {
    intent: resolvedIntent,
    treatment: resolvedTreatment,
  };
}

function Badge({ className, intent, treatment, ...props }: BadgeProps) {
  const resolved = resolveBadgeAxes(intent, treatment);

  return (
    <div
      data-intent={resolved.intent}
      data-treatment={resolved.treatment}
      className={cn(
        badgeVariants({ intent: resolved.intent, treatment: resolved.treatment }),
        className,
      )}
      {...props}
    />
  );
}

Badge.displayName = "Badge";

export { Badge, badgeVariants };
