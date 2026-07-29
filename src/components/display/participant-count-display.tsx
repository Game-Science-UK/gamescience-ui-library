import { cn } from "@/lib/cn";

export interface ParticipantCountDisplayProps {
  count: number;
  expected?: number;
  label?: string;
  className?: string;
}

function ParticipantCountDisplay({
  count,
  expected,
  label = "Participants connected",
  className,
}: ParticipantCountDisplayProps) {
  const value = expected != null ? `${count} / ${expected}` : String(count);

  return (
    <div className={cn("text-center", className)} aria-live="polite">
      <p className="gs-label text-muted-foreground">{label}</p>
      <p className="gs-mono mt-1 text-[length:var(--type-scale-display)] tabular-nums text-foreground">
        {value}
      </p>
    </div>
  );
}

ParticipantCountDisplay.displayName = "ParticipantCountDisplay";

export { ParticipantCountDisplay };
