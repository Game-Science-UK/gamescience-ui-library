import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";
import { cn } from "@/lib/cn";

export interface ProgressProps extends React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> {
  label?: string;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value = 0, label, ...props }, ref) => (
    <div className="w-full space-y-2">
      {label ? (
        <div className="flex items-center justify-between gap-2 text-[length:var(--type-scale-label)]">
          <span className="gs-label text-muted-foreground">{label}</span>
          <span className="font-mono text-foreground">{Math.round(value ?? 0)}%</span>
        </div>
      ) : null}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-pill bg-muted", className)}
        value={value}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-primary"
          style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  ),
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
