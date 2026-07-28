import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-pill border px-2.5 py-0.5 font-label text-[length:var(--type-scale-label)]",
  {
    variants: {
      intent: {
        default: "border-transparent bg-secondary text-secondary-foreground",
        primary: "border-transparent bg-primary text-primary-foreground",
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        danger: "border-transparent bg-danger text-danger-foreground",
        information: "border-transparent bg-information text-information-foreground",
        outline: "border-border-strong bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, intent, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ intent }), className)} {...props} />;
}

Badge.displayName = "Badge";

export { Badge, badgeVariants };
