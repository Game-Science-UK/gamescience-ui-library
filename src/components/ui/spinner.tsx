/** GameScience UI — adapted from shadcn/ui new-york (spinner). Theme via semantic tokens. */
import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/cn";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("gs-spinner size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
