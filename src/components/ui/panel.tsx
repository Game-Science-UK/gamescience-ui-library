import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/cn";

const panelVariants = cva("gs-panel rounded-panel border text-foreground", {
  variants: {
    elevation: {
      flat: "border-border bg-surface",
      subtle: "border-border bg-surface-subtle",
      raised: "border-border bg-surface-raised shadow-card",
      overlay: "border-border bg-surface-overlay shadow-overlay",
    },
    padding: {
      none: "p-0",
      sm: "p-panel-sm",
      md: "p-panel-md",
      lg: "p-panel-lg",
    },
  },
  defaultVariants: {
    elevation: "raised",
    padding: "md",
  },
});

export interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof panelVariants> {}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, elevation, padding, ...props }, ref) => (
    <div
      ref={ref}
      data-elevation={elevation ?? "raised"}
      className={cn(panelVariants({ elevation, padding }), className)}
      {...props}
    />
  ),
);
Panel.displayName = "Panel";

const PanelHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-3 flex flex-col gap-1", className)} {...props} />
  ),
);
PanelHeader.displayName = "PanelHeader";

const PanelTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("gs-title text-foreground", className)} {...props} />
  ),
);
PanelTitle.displayName = "PanelTitle";

const PanelDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-muted-foreground", className)} {...props} />
));
PanelDescription.displayName = "PanelDescription";

export { Panel, PanelDescription, PanelHeader, PanelTitle, panelVariants };
