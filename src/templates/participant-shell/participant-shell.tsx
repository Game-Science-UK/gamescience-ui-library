import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ParticipantShellProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

function ParticipantShell({ children, header, footer, className }: ParticipantShellProps) {
  return (
    <div
      className={cn(
        "gs-shell relative flex min-h-screen flex-col",
        "bg-[image:var(--gs-shell-gradient)]",
        className,
      )}
    >
      {header ? <header className="safe-area-top px-4 pb-2 pt-4">{header}</header> : null}
      <main className="mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-4 py-6">
        {children}
      </main>
      {footer ? (
        <footer className="safe-area-bottom px-4 pb-[var(--action-bar-safe-bottom,1.5rem)] pt-2">
          {footer}
        </footer>
      ) : null}
    </div>
  );
}

ParticipantShell.displayName = "ParticipantShell";

export { ParticipantShell };
