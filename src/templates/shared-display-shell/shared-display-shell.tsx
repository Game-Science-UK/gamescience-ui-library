import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SharedDisplayShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * Landscape-first shell for non-interactive shared displays.
 * Avoid placing private participant information in this shell.
 */
function SharedDisplayShell({ children, className }: SharedDisplayShellProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden bg-[image:var(--gs-shell-gradient)] text-foreground",
        className,
      )}
      data-interactive="false"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--border) / 0.35) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <main className="relative z-10 flex min-h-screen items-center justify-center p-8">
        {children}
      </main>
    </div>
  );
}

SharedDisplayShell.displayName = "SharedDisplayShell";

export { SharedDisplayShell };
