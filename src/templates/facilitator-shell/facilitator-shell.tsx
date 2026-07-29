import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FacilitatorShellProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

function FacilitatorShell({
  children,
  title = "Facilitator console",
  subtitle,
  actions,
  className,
}: FacilitatorShellProps) {
  return (
    <div
      className={cn(
        "gs-shell min-h-screen bg-[image:var(--gs-shell-gradient)] text-foreground",
        className,
      )}
    >
      <header className="border-b border-border bg-surface/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-content items-start justify-between gap-4">
          <div>
            <h1 className="gs-title">{title}</h1>
            {subtitle ? <p className="mt-1 text-muted-foreground">{subtitle}</p> : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      </header>
      <main className="mx-auto max-w-content px-6 py-6">{children}</main>
    </div>
  );
}

FacilitatorShell.displayName = "FacilitatorShell";

export { FacilitatorShell };
