import { ChevronDown } from "lucide-react";
import * as React from "react";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";

export interface RolePanelRole {
  title: string;
  subtitle?: string;
}

export interface RolePanelObjective {
  title: string;
  goal?: string;
}

export interface RolePanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  role: RolePanelRole;
  priorities?: string[];
  objective?: RolePanelObjective;
  identity?: React.ReactNode;
  privateLabel?: string;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

function RolePanel({
  role,
  priorities = [],
  objective,
  identity,
  privateLabel = "Private objective",
  defaultExpanded = false,
  expanded: expandedProp,
  onExpandedChange,
  className,
  ...props
}: RolePanelProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultExpanded);
  const expanded = expandedProp ?? uncontrolled;
  const setExpanded = (next: boolean) => {
    if (expandedProp === undefined) setUncontrolled(next);
    onExpandedChange?.(next);
  };

  return (
    <div className={cn("gs-role-panel", className)} {...props}>
      <Panel elevation="raised" padding="md">
        <PanelHeader className="flex flex-row items-start gap-3">
          {identity ? <div className="shrink-0">{identity}</div> : null}
          <div className="min-w-0 flex-1">
            <PanelTitle>{role.title}</PanelTitle>
            {role.subtitle ? <PanelDescription>{role.subtitle}</PanelDescription> : null}
          </div>
        </PanelHeader>

        {priorities.length > 0 ? (
          <div className="mt-2">
            <button
              type="button"
              className="gs-pressable gs-touch-target inline-flex items-center gap-2 rounded-control px-1 py-1 text-left focus-visible:shadow-focus"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              <span className="gs-label text-muted-foreground">Priorities</span>
              <ChevronDown
                className={cn(
                  "size-4 text-muted-foreground transition-transform duration-[var(--duration-fast)] motion-reduce:transition-none",
                  expanded && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            {expanded ? (
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                {priorities.map((item) => (
                  <li key={item} className="gs-body text-foreground">
                    {item}
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        ) : null}

        {objective ? (
          <>
            <Separator treatment="hairline" className="my-4" />
            <div className="rounded-control border border-border bg-surface-subtle p-3">
              <p className="gs-label gs-eyebrow text-accent">{privateLabel}</p>
              <p className="gs-title mt-1 text-foreground">{objective.title}</p>
              {objective.goal ? (
                <p className="gs-body mt-1 text-muted-foreground">{objective.goal}</p>
              ) : null}
            </div>
          </>
        ) : null}
      </Panel>
    </div>
  );
}

RolePanel.displayName = "RolePanel";

export { RolePanel };
