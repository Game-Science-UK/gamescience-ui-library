import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", invalid, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "gs-touch-target flex h-control-md w-full rounded-control border bg-surface px-[var(--control-padding-inline-md)]",
        "text-[length:var(--type-scale-body)] text-foreground shadow-control",
        "placeholder:text-muted-foreground",
        "focus-visible:shadow-focus focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        invalid ? "border-danger" : "border-border",
        className,
      )}
      ref={ref}
      aria-invalid={invalid || undefined}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
