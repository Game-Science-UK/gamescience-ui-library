import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-control bg-muted", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

Skeleton.displayName = "Skeleton";

export { Skeleton };
