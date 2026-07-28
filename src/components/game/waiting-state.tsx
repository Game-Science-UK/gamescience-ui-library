import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

export interface WaitingStateProps {
  title: string;
  description?: string;
  className?: string;
  loading?: boolean;
}

function WaitingState({ title, description, className, loading = true }: WaitingStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3 text-center", className)}
      role="status"
      aria-live="polite"
    >
      {loading ? <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" /> : null}
      <div className="space-y-1">
        <p className="gs-title text-foreground">{title}</p>
        {description ? <p className="max-w-prose text-muted-foreground">{description}</p> : null}
      </div>
    </div>
  );
}

WaitingState.displayName = "WaitingState";

export { WaitingState };
