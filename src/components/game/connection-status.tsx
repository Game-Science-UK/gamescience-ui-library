import { Loader2, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { ConnectionState } from "@/types/game";

type ConnectionStatusProps =
  | {
      state: "connected";
      label?: string;
      className?: string;
    }
  | {
      state: "reconnecting";
      label?: string;
      attempt?: number;
      className?: string;
    }
  | {
      state: "offline";
      label?: string;
      onRetry?: () => void;
      className?: string;
    };

const defaultLabels: Record<ConnectionState, string> = {
  connected: "Connected",
  reconnecting: "Reconnecting",
  offline: "Disconnected",
};

function ConnectionStatus(props: ConnectionStatusProps) {
  const { state, label, className } = props;
  const resolvedLabel = label ?? defaultLabels[state];

  const intent =
    state === "connected" ? "success" : state === "reconnecting" ? "warning" : "danger";

  const Icon = state === "connected" ? Wifi : state === "reconnecting" ? Loader2 : WifiOff;

  const detail =
    state === "reconnecting" && "attempt" in props && props.attempt
      ? `Attempt ${props.attempt}`
      : null;

  return (
    <div
      className={cn("inline-flex items-center gap-2", className)}
      role="status"
      aria-live="polite"
      data-state={state}
    >
      <span
        className={cn(
          "gs-connection-marker shrink-0",
          state === "connected" && "bg-success text-success",
          state === "reconnecting" && "bg-warning text-warning",
          state === "offline" && "bg-danger text-danger",
        )}
        aria-hidden="true"
      />
      <Badge intent={intent} treatment="outlined" className="gap-1.5">
        <Icon
          className={cn("size-3.5", state === "reconnecting" && "animate-spin")}
          aria-hidden="true"
        />
        <span>{resolvedLabel}</span>
        {detail ? <span className="opacity-80">· {detail}</span> : null}
      </Badge>
      {state === "offline" && "onRetry" in props && props.onRetry ? (
        <Button
          type="button"
          intent="outline"
          size="sm"
          onClick={props.onRetry}
          aria-label="Retry connection"
        >
          <RefreshCw className="size-3.5" aria-hidden="true" />
          Retry
        </Button>
      ) : null}
      <span className="sr-only">
        Connection status: {resolvedLabel}
        {detail ? `, ${detail}` : ""}
      </span>
    </div>
  );
}

ConnectionStatus.displayName = "ConnectionStatus";

export { ConnectionStatus, type ConnectionStatusProps };
