import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  [
    "gs-button gs-pressable gs-touch-target inline-flex items-center justify-center gap-2 whitespace-nowrap",
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
        icon: "h-control-md w-control-md px-0",
      },
      emphasis: {
        default: "",
        strong: "",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
      emphasis: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const loadingIndicator = (
  <Loader2 className="relative z-[2] size-4 animate-spin" aria-hidden="true" data-slot="loading" />
);

function requireSingleElement(
  children: React.ReactNode,
  componentName: string,
): React.ReactElement {
  const list = React.Children.toArray(children).filter((child) => {
    if (child === null || child === undefined || typeof child === "boolean") return false;
    return true;
  });

  if (list.length !== 1 || !React.isValidElement(list[0])) {
    throw new Error(
      `${componentName}: asChild requires exactly one valid React element child. ` +
        `Received ${list.length} child(ren). Wrap the interactive element (for example \`<a>\` or \`<Link>\`) as the only child.`,
    );
  }

  return list[0];
}

function composeEventHandlers<E extends React.SyntheticEvent>(
  theirs?: ((event: E) => void) | undefined,
  ours?: ((event: E) => void) | undefined,
) {
  return (event: E) => {
    ours?.(event);
    if (!event.defaultPrevented) {
      theirs?.(event);
    }
  };
}

function preventActivationWhenInactive(isInactive: boolean) {
  return (event: React.SyntheticEvent) => {
    if (!isInactive) return;
    event.preventDefault();
    event.stopPropagation();
  };
}

function preventKeyboardActivationWhenInactive(isInactive: boolean) {
  return (event: React.KeyboardEvent) => {
    if (!isInactive) return;
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      event.stopPropagation();
    }
  };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      size,
      emphasis = "default",
      asChild = false,
      loading = false,
      disabled,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const isInactive = Boolean(disabled || loading);
    const classes = cn(buttonVariants({ intent, size, emphasis }), className);

    if (asChild) {
      const child = requireSingleElement(children, "Button") as React.ReactElement<{
        children?: React.ReactNode;
        onClick?: React.MouseEventHandler;
        onKeyDown?: React.KeyboardEventHandler;
        className?: string;
      }>;
      const childProps = child.props;

      // Slot must receive exactly one element. Inject the spinner into that
      // element's children — never as a sibling of the Slot child.
      // Guard activation on the child itself so it runs before the child's
      // original handlers (Radix Slot composes child handlers first).
      const slotted = React.cloneElement(child, {
        children: (
          <>
            {loading ? loadingIndicator : null}
            {childProps.children}
          </>
        ),
        onClick: composeEventHandlers(
          childProps.onClick,
          preventActivationWhenInactive(isInactive),
        ),
        onKeyDown: composeEventHandlers(
          childProps.onKeyDown,
          preventKeyboardActivationWhenInactive(isInactive),
        ),
      });

      return (
        <Slot
          className={cn(classes, isInactive && "pointer-events-none opacity-50")}
          ref={ref as React.Ref<HTMLElement>}
          aria-busy={loading || undefined}
          aria-disabled={isInactive || undefined}
          data-disabled={isInactive ? "" : undefined}
          data-emphasis={emphasis ?? "default"}
          data-size={size ?? "md"}
          onClick={onClick}
          onKeyDown={onKeyDown}
          {...props}
        >
          {slotted}
        </Slot>
      );
    }

    return (
      <button
        className={classes}
        ref={ref}
        disabled={isInactive}
        aria-busy={loading || undefined}
        data-emphasis={emphasis ?? "default"}
        data-size={size ?? "md"}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...props}
      >
        {loading ? loadingIndicator : null}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
