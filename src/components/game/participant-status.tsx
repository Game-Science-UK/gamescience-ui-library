import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { ConnectionState, ReadinessState } from "@/types/game";
import { toCompactConnectionState } from "@/lib/connection";
import { ConnectionStatus } from "./connection-status";

export interface ParticipantStatusProps {
  displayName: string;
  connection: ConnectionState;
  readiness: ReadinessState;
  className?: string;
  compact?: boolean;
}

const readinessIntent: Record<ReadinessState, "default" | "success" | "warning" | "information"> = {
  "not-ready": "default",
  ready: "success",
  submitted: "information",
  waiting: "warning",
};

const readinessLabel: Record<ReadinessState, string> = {
  "not-ready": "Not ready",
  ready: "Ready",
  submitted: "Submitted",
  waiting: "Waiting",
};

function ParticipantStatus({
  displayName,
  connection,
  readiness,
  className,
  compact = false,
}: ParticipantStatusProps) {
  const compactConnection = toCompactConnectionState(connection);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-card border border-border bg-surface-subtle p-3",
        compact && "p-2",
        className,
      )}
      data-connection={connection}
      data-readiness={readiness}
    >
      <div className="min-w-0">
        <p className="truncate font-label text-foreground">{displayName}</p>
        <div className="mt-1">
          <ConnectionStatus state={compactConnection} />
        </div>
      </div>
      <Badge intent={readinessIntent[readiness]}>{readinessLabel[readiness]}</Badge>
    </div>
  );
}

ParticipantStatus.displayName = "ParticipantStatus";

export { ParticipantStatus };
