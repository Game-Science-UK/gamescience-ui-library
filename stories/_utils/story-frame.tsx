import * as React from "react";
import { cn } from "@/lib/cn";

type StoryFrameVariant = "fitted" | "full";

/**
 * Layout helper for Storybook stories.
 * Surface colour belongs on the Storybook docs/canvas chrome (see `.storybook/storybook.css`),
 * not on this wrapper — keep this content-sized with no background fill.
 * - `fitted` (default): optional max-width constraint for component docs
 * - `full`: full-bleed layout for shells, patterns, and reference screens
 */
export function StoryFrame({
  children,
  className,
  variant = "fitted",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: StoryFrameVariant;
}) {
  if (variant === "full") {
    return <div className={cn("w-full text-foreground", className)}>{children}</div>;
  }

  return (
    <div className={cn("w-full max-w-3xl text-foreground", className)}>{children}</div>
  );
}
