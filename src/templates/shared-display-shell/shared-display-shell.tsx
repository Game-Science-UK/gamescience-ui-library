import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SharedDisplayShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * Landscape-first shell for non-interactive shared displays.
 * Avoid placing private participant information in this shell.
 * Grid / vignette treatments are theme-owned (see theme CSS), not inline styles.
 */
function SharedDisplayShell({ children, className }: SharedDisplayShellProps) {
  return (
    <div
      className={cn(
        "gs-shell relative min-h-screen overflow-hidden bg-[image:var(--gs-shell-gradient)] text-foreground",
        className,
      )}
      data-interactive="false"
    >
      <main className="relative z-10 flex min-h-screen items-center justify-center p-8">
        {children}
      </main>
    </div>
  );
}

SharedDisplayShell.displayName = "SharedDisplayShell";

export { SharedDisplayShell };
