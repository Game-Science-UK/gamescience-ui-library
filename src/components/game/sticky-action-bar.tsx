import * as React from "react";
import { cn } from "@/lib/cn";

export interface StickyActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: React.ReactNode;
  children: React.ReactNode;
  intent?: "neutral" | "information" | "warning" | "critical";
  sticky?: boolean;
}

const intentBorder: Record<NonNullable<StickyActionBarProps["intent"]>, string> = {
  neutral: "border-border",
  information: "border-information/40",
  warning: "border-warning/40",
  critical: "border-danger/40",
};

function StickyActionBar({
  status,
  children,
  intent = "neutral",
  sticky = true,
  className,
  ...props
}: StickyActionBarProps) {
  return (
    <div
      data-intent={intent}
      data-sticky={sticky ? "true" : "false"}
      className={cn(
        "gs-sticky-action-bar w-full max-w-content border-t bg-background/95",
        intentBorder[intent],
        sticky && "sticky bottom-0 z-30",
        className,
      )}
      {...props}
    >
      <div className="px-4 pb-[var(--action-bar-safe-bottom,1rem)] pt-[var(--action-bar-pad-top,1rem)]">
        {status ? <div className="mb-3">{status}</div> : null}
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
}

StickyActionBar.displayName = "StickyActionBar";

export { StickyActionBar };
