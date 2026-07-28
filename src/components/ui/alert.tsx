import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/cn";

const alertVariants = cva(
  "relative flex w-full gap-3 rounded-card border p-panel-md text-[length:var(--type-scale-body)]",
  {
    variants: {
      intent: {
        information: "border-information/40 bg-information/10 text-foreground",
        success: "border-success/40 bg-success/10 text-foreground",
        warning: "border-warning/40 bg-warning/15 text-foreground",
        danger: "border-danger/40 bg-danger/10 text-foreground",
      },
    },
    defaultVariants: {
      intent: "information",
    },
  },
);

const intentIcon = {
  information: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, intent = "information", title, children, ...props }, ref) => {
    const Icon = intentIcon[intent ?? "information"];
    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ intent }), className)} {...props}>
        <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div className="min-w-0 flex-1 space-y-1">
          {title ? <p className="font-label">{title}</p> : null}
          {children ? <div className="text-muted-foreground">{children}</div> : null}
        </div>
      </div>
    );
  },
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
