import { Star } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/cn";

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  label?: string;
}

/**
 * Star rating for debrief and reflection compositions.
 * Owns only the star presentation; score semantics stay application-owned.
 */
function Rating({
  value = 0,
  max = 5,
  onChange,
  readOnly = false,
  label = "Rating",
  className,
  ...props
}: RatingProps) {
  const safeMax = Math.max(1, Math.floor(max));
  const safeValue = Math.min(Math.max(0, value), safeMax);

  if (readOnly) {
    return (
      <div
        role="img"
        aria-label={`${safeValue} out of ${safeMax}`}
        data-value={safeValue}
        className={cn("gs-rating inline-flex items-center gap-1", className)}
        {...props}
      >
        {Array.from({ length: safeMax }, (_, index) => {
          const filled = index < safeValue;
          return (
            <Star
              key={index}
              aria-hidden="true"
              className={cn(
                "size-5",
                filled ? "fill-warning text-warning" : "fill-transparent text-muted-foreground",
              )}
            />
          );
        })}
        <span className="sr-only">
          {label}: {safeValue} out of {safeMax}
        </span>
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      data-value={safeValue}
      className={cn("gs-rating inline-flex items-center gap-1", className)}
      {...props}
    >
      {Array.from({ length: safeMax }, (_, index) => {
        const step = index + 1;
        const filled = step <= safeValue;
        return (
          <button
            key={step}
            type="button"
            role="radio"
            aria-checked={filled}
            aria-label={`${step} out of ${safeMax}`}
            onClick={() => onChange?.(step)}
            className={cn(
              "gs-pressable focus-visible:shadow-focus focus-visible:outline-none",
              "rounded-sm",
            )}
          >
            <Star
              aria-hidden="true"
              className={cn(
                "size-6",
                filled ? "fill-warning text-warning" : "fill-transparent text-muted-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

Rating.displayName = "Rating";

export { Rating };
