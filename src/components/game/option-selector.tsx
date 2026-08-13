import * as React from "react";
import { cn } from "@/lib/cn";

export interface OptionSelectorOption {
  id: string;
  title: string;
  description?: string;
  detail?: string;
}

export interface OptionSelectorProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  options: OptionSelectorOption[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  label?: string;
  disabled?: boolean;
  layout?: "list" | "grid";
}

/**
 * Single-choice option list for decision and vote compositions.
 * Owns only selection presentation; commit, scoring, and reveal stay application-owned.
 */
function OptionSelector({
  options,
  selectedId,
  onSelect,
  label = "Choose an option",
  disabled = false,
  layout = "list",
  className,
  ...props
}: OptionSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      data-layout={layout}
      className={cn(
        "gs-option-selector",
        layout === "grid" ? "grid gap-3 sm:grid-cols-2" : "flex flex-col gap-3",
        className,
      )}
      {...props}
    >
      {options.map((option) => {
        const selected = option.id === selectedId;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onSelect?.(option.id)}
            className={cn(
              "gs-pressable gs-touch-target rounded-panel border p-panel-md text-left focus-visible:shadow-focus focus-visible:outline-none",
              selected
                ? "border-primary bg-surface-raised shadow-card"
                : "border-border bg-surface hover:bg-surface-subtle",
              disabled && "cursor-not-allowed opacity-50",
            )}
            data-selected={selected ? "true" : "false"}
          >
            <span className="flex items-start justify-between gap-3">
              <span className="gs-label gs-eyebrow-dotted text-primary">{option.id}</span>
              {selected ? (
                <span className="gs-micro shrink-0 text-primary" aria-hidden="true">
                  Selected
                </span>
              ) : null}
            </span>
            <span className="gs-title mt-1 block text-foreground">{option.title}</span>
            {option.description ? (
              <span className="gs-body mt-1 block text-muted-foreground">{option.description}</span>
            ) : null}
            {option.detail ? (
              <span className="gs-micro mt-2 block text-muted-foreground">{option.detail}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

OptionSelector.displayName = "OptionSelector";

export { OptionSelector };
