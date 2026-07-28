import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";

export interface ParticipantIdentityProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Input>,
  "onChange" | "value"
> {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  hint?: string;
}

const ParticipantIdentity = React.forwardRef<HTMLInputElement, ParticipantIdentityProps>(
  (
    {
      value,
      onChange,
      label = "Display name",
      error,
      hint = "This name is visible to the facilitator and shared display",
      id = "participant-identity",
      className,
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
          onChange={(event) => onChange(event.target.value)}
          invalid={Boolean(error)}
          autoComplete="nickname"
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={cn(className)}
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
ParticipantIdentity.displayName = "ParticipantIdentity";

export { ParticipantIdentity };
