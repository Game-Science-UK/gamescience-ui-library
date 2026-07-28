import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface DisplayHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  eyebrow?: string;
}

function DisplayHeading({
  as: Comp = "h1",
  eyebrow,
  className,
  children,
  ...props
}: DisplayHeadingProps) {
  return (
    <div className={cn("space-y-2 text-center", className)}>
      {eyebrow ? <p className="gs-label text-muted-foreground">{eyebrow}</p> : null}
      <Comp className="gs-display text-foreground" {...props}>
        {children}
      </Comp>
    </div>
  );
}

DisplayHeading.displayName = "DisplayHeading";

export { DisplayHeading };
