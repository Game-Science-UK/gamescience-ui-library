import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";

export interface GameCodeInputProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Input>,
  "onChange" | "value" | "type"
> {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
}

const GameCodeInput = React.forwardRef<HTMLInputElement, GameCodeInputProps>(
  (
    {
      value,
      onChange,
      label = "Game code",
      error,
      hint = "Enter the room code shown on the shared display",
      maxLength = 6,
      id = "game-code",
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
          ref={ref}
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          invalid={Boolean(error)}
          disabled={disabled}
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          inputMode="text"
          maxLength={maxLength}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={cn(
            "text-center font-mono uppercase tracking-[0.35em]",
            "text-[length:var(--type-scale-code)]",
            className,
          )}
          {...props}
        />
        {error ? (
          <p
            id={errorId}
            className="text-[length:var(--type-scale-label)] text-danger"
            role="alert"
          >
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-[length:var(--type-scale-label)] text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
GameCodeInput.displayName = "GameCodeInput";

export { GameCodeInput };
