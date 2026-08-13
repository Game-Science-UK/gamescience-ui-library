import { Monitor } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/game/countdown";
import { cn } from "@/lib/cn";

export interface AttentionTakeoverProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  headline: string;
  description?: string;
  intent?: "information" | "warning" | "critical";
  countdown?: { formattedTime: string; accessibleLabel?: string };
  onAcknowledge?: () => void;
}

const intentBadge: Record<
  NonNullable<AttentionTakeoverProps["intent"]>,
  "information" | "warning" | "danger"
> = {
  information: "information",
  warning: "warning",
  critical: "danger",
};

const intentText: Record<NonNullable<AttentionTakeoverProps["intent"]>, string> = {
  information: "text-information",
  warning: "text-warning",
  critical: "text-danger",
};

/**
 * Full-screen "watch the display" takeover that redirects participant attention from
 * their device to the shared display. The application drives when it is shown.
 */
function AttentionTakeover({
  eyebrow = "Look up",
  headline,
  description = "Turn your attention to the shared display.",
  intent = "information",
  countdown,
  onAcknowledge,
  className,
  ...props
}: AttentionTakeoverProps) {
  return (
    <div
      role="status"
      aria-live="assertive"
      data-intent={intent}
      className={cn(
        "gs-attention-takeover flex min-h-screen w-full flex-col items-center justify-center gap-6 px-6 py-12 text-center",
        className,
      )}
      {...props}
    >
      <Monitor className={cn("size-12", intentText[intent])} aria-hidden="true" />
      <Badge intent={intentBadge[intent]} treatment="outlined">
        {eyebrow}
      </Badge>
      <h1 className="gs-display text-foreground">{headline}</h1>
      {description ? (
        <p className="gs-body max-w-prose text-muted-foreground">{description}</p>
      ) : null}

      {countdown ? (
        <Countdown
          formattedTime={countdown.formattedTime}
          state="running"
          treatment="contained"
          size="lg"
          accessibleLabel={countdown.accessibleLabel}
        />
      ) : null}

      {onAcknowledge ? (
        <Button type="button" intent="primary" emphasis="strong" size="lg" onClick={onAcknowledge}>
          I am watching
        </Button>
      ) : null}
    </div>
  );
}

AttentionTakeover.displayName = "AttentionTakeover";

export { AttentionTakeover };
