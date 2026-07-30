import * as React from "react";
import { cn } from "@/lib/cn";

/** Consistent padding surface for component stories under the global fullscreen layout. */
export function StoryFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-full bg-background p-6 text-foreground", className)}>{children}</div>
  );
}
