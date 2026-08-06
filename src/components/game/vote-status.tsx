import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/cn";

/** Use pips when total is at or below this threshold; otherwise Progress bar. */
export const VOTE_STATUS_PIP_THRESHOLD = 8;

export interface VoteStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  voted: number;
  total: number;
  anonymous?: boolean;
  locked?: boolean;
  treatment?: "bare" | "framed";
  progress?: "pips" | "bar" | "auto";
  size?: "sm" | "md";
  label?: string;
}

function VoteStatus({
  voted,
  total,
  anonymous = false,
  locked = false,
  treatment = "bare",
  progress = "auto",
  size = "md",
  label,
  className,
  ...props
}: VoteStatusProps) {
  const safeTotal = Math.max(0, total);
  const safeVoted = Math.min(Math.max(0, voted), safeTotal || voted);
  const mode =
    progress === "auto"
      ? safeTotal > 0 && safeTotal <= VOTE_STATUS_PIP_THRESHOLD
        ? "pips"
        : "bar"
      : progress;
  const percent = safeTotal > 0 ? Math.round((safeVoted / safeTotal) * 100) : 0;
  const summary = [
    `${safeVoted} of ${safeTotal} votes received`,
    anonymous ? "anonymous voting" : null,
    locked ? "voting locked" : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      role="status"
      aria-live="polite"
      data-locked={locked ? "true" : "false"}
      data-anonymous={anonymous ? "true" : "false"}
      data-progress={mode}
      className={cn(
        "gs-vote-status space-y-2",
        treatment === "framed" && "rounded-panel border border-border bg-surface p-panel-sm",
        className,
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p
          className={cn(
            "gs-label text-foreground",
            size === "sm" && "text-[length:var(--type-scale-micro)]",
          )}
        >
          {label ?? `${safeVoted} / ${safeTotal}`}
          {anonymous ? <span className="ms-2 text-muted-foreground">Anonymous</span> : null}
          {locked ? <span className="ms-2 text-warning">Locked</span> : null}
        </p>
      </div>

      {mode === "pips" ? (
        <ul className="flex flex-wrap gap-1.5" aria-hidden="true">
          {Array.from({ length: safeTotal }, (_, index) => {
            const filled = index < safeVoted;
            return (
              <li
                key={index}
                className={cn(
                  "size-2.5 rounded-full border",
                  filled ? "border-primary bg-primary" : "border-border bg-muted",
                )}
              />
            );
          })}
        </ul>
      ) : (
        <Progress value={percent} aria-label={`${safeVoted} of ${safeTotal} votes`} />
      )}

      <p className="sr-only">{summary}</p>
    </div>
  );
}

VoteStatus.displayName = "VoteStatus";

export { VoteStatus };
