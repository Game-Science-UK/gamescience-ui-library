import * as React from "react";
import { cn } from "@/lib/cn";

export interface IntensitySelectorProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  unitLabel?: string;
  zeroLabel?: string;
  disabled?: boolean;
}

/**
 * Discrete 0..max intensity/conviction selector for sealed commitments.
 * Owns only the value presentation; token economy and validity stay application-owned.
 */
function IntensitySelector({
  value,
  max = 3,
  onChange,
  label = "Intensity",
  unitLabel = "tokens",
  zeroLabel = "None",
  disabled = false,
  className,
  ...props
}: IntensitySelectorProps) {
  const safeMax = Math.max(0, Math.floor(max));

  return (
    <div
      role="radiogroup"
      aria-label={label}
      data-value={value}
      className={cn("gs-intensity-selector", className)}
      {...props}
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="gs-label text-muted-foreground">{label}</p>
        <p className="gs-micro text-muted-foreground" aria-hidden="true">
          {value} {unitLabel}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: safeMax + 1 }, (_, step) => {
          const selected = step === value;
          return (
            <button
              key={step}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${step === 0 ? zeroLabel : `${step} ${unitLabel}`}`}
              disabled={disabled}
              onClick={() => onChange?.(step)}
              className={cn(
                "gs-pressable gs-touch-target inline-flex min-w-[2.5rem] items-center justify-center rounded-control border px-3 py-2 text-[length:var(--type-scale-label)] font-label focus-visible:shadow-focus focus-visible:outline-none",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-foreground hover:bg-surface-subtle",
                disabled && "cursor-not-allowed opacity-50",
              )}
              data-selected={selected ? "true" : "false"}
            >
              {step === 0 ? zeroLabel : step}
            </button>
          );
        })}
      </div>
    </div>
  );
}

IntensitySelector.displayName = "IntensitySelector";

export { IntensitySelector };
