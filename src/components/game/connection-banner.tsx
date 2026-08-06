import { Loader2, Wifi, WifiOff } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/cn";
import type { ConnectionState } from "@/types/game";

export interface ConnectionBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  state: ConnectionState;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  treatment?: "inline" | "banner";
}

const defaults: Record<
  ConnectionState,
  { title: string; description: string; intent: "success" | "information" | "warning" | "danger" }
> = {
  connected: {
    title: "Connected",
    description: "Live connection restored.",
    intent: "success",
  },
  restored: {
    title: "Connection restored",
    description: "You are back online.",
    intent: "success",
  },
  connecting: {
    title: "Connecting",
    description: "Establishing a live connection…",
    intent: "information",
  },
  reconnecting: {
    title: "Reconnecting",
    description: "Trying to restore your session…",
    intent: "warning",
  },
  degraded: {
    title: "Unstable connection",
    description: "Some updates may be delayed.",
    intent: "warning",
  },
  disconnected: {
    title: "Disconnected",
    description: "Live updates are paused until you reconnect.",
    intent: "danger",
  },
  offline: {
    title: "Offline",
    description: "Check your network, then retry.",
    intent: "danger",
  },
  paused: {
    title: "Connection paused",
    description: "Updates are paused.",
    intent: "danger",
  },
};

const intentSurface: Record<(typeof defaults)[ConnectionState]["intent"], string> = {
  success: "border-success/40 bg-success/10 text-foreground",
  information: "border-information/40 bg-information/10 text-foreground",
  warning: "border-warning/40 bg-warning/10 text-foreground",
  danger: "border-danger/40 bg-danger/10 text-foreground",
};

function ConnectionBanner({
  state,
  title,
  description,
  action,
  treatment = "banner",
  className,
  ...props
}: ConnectionBannerProps) {
  const preset = defaults[state];
  const resolvedTitle = title ?? preset.title;
  const resolvedDescription = description ?? preset.description;
  const spinning = state === "connecting" || state === "reconnecting";
  const Icon = state === "connected" || state === "restored" ? Wifi : spinning ? Loader2 : WifiOff;

  return (
    <div
      role="status"
      aria-live="polite"
      data-state={state}
      data-intent={preset.intent}
      data-treatment={treatment}
      className={cn(
        "gs-connection-banner gs-alert flex flex-wrap items-start gap-3 rounded-panel border p-panel-sm",
        intentSurface[preset.intent],
        treatment === "inline" && "rounded-control p-2",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "gs-connection-marker mt-1 size-2.5 shrink-0 rounded-full",
          preset.intent === "success" && "bg-success",
          preset.intent === "information" && "bg-information",
          preset.intent === "warning" && "bg-warning",
          preset.intent === "danger" && "bg-danger",
        )}
        aria-hidden="true"
      />
      <Icon
        className={cn("mt-0.5 size-4 shrink-0", spinning && "animate-spin")}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="gs-label">{resolvedTitle}</p>
        <p className="gs-body text-muted-foreground">{resolvedDescription}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

ConnectionBanner.displayName = "ConnectionBanner";

export { ConnectionBanner };
