import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  [
    "gs-pressable gs-touch-target inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-control border border-transparent font-label text-[length:var(--type-scale-label)]",
    "shadow-control focus-visible:outline-none focus-visible:shadow-focus",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      intent: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active",
        danger: "bg-danger text-danger-foreground hover:opacity-90 active:opacity-80",
        ghost: "bg-transparent text-foreground shadow-none hover:bg-muted",
        outline: "border-border-strong bg-surface text-foreground hover:bg-surface-subtle",
      },
      size: {
        sm: "h-control-sm px-[var(--control-padding-inline-sm)]",
        md: "h-control-md px-[var(--control-padding-inline-md)]",
        lg: "h-control-lg px-[var(--control-padding-inline-lg)]",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, intent, size, asChild = false, loading = false, disabled, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(buttonVariants({ intent, size }), className)}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
