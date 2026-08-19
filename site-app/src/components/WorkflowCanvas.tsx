import { useEffect, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Panel,
  Handle,
  Position,
  ReactFlow,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/**
 * The management workflow, transcribed from the decision map Tom drew for the
 * GameScience team.
 *
 * Kept verbatim rather than paraphrased: the team already knows this diagram,
 * and the value of putting it here is that it stops being a file someone has to
 * find. Pan and zoom because it is wider than any page column.
 */

type Kind = "start" | "prompt" | "step" | "decision" | "note" | "done" | "lane";

interface Data extends Record<string, unknown> {
  label: string;
  detail?: string;
  kind: Kind;
  accent?: "green" | "purple" | "orange" | "blue";
}

const ACCENT: Record<string, string> = {
  green: "border-emerald-500/60",
  purple: "border-violet-500/60",
  orange: "border-amber-500/60",
  blue: "border-sky-500/60",
};

function FlowNode({ data }: NodeProps) {
  const { label, detail, kind, accent } = data as Data;

  if (kind === "lane") {
    return (
      <div className="text-site-fg whitespace-nowrap text-[15px] font-semibold tracking-tight">
        {label} →
      </div>
    );
  }

  if (kind === "note") {
    return (
      <div
        className={`bg-site-raised w-[190px] rounded-md border-l-2 p-3 ${
          ACCENT[accent ?? "purple"]
        }`}
      >
        <p className="text-site-muted text-[11px] leading-relaxed">{label}</p>
        <p className="text-site-dim mt-2 text-[10px]">Tom Rumble</p>
      </div>
    );
  }

  if (kind === "decision") {
    return (
      <>
        <Handle
          type="target"
          id="l"
          position={Position.Left}
          className="!pointer-events-none !opacity-0"
        />
        <div className="border-site-border-strong bg-site-panel text-site-fg flex h-24 w-24 rotate-45 items-center justify-center border">
          <span className="-rotate-45 text-center text-[11px] leading-tight">{label}</span>
        </div>
        <Handle
          type="source"
          id="r"
          position={Position.Right}
          className="!pointer-events-none !opacity-0"
        />
        <Handle
          type="source"
          id="b"
          position={Position.Bottom}
          className="!pointer-events-none !opacity-0"
        />
      </>
    );
  }

  const border =
    kind === "done" ? "border-emerald-500/60" : accent ? ACCENT[accent] : "border-site-border";

  return (
    <>
      <Handle
        type="target"
        id="l"
        position={Position.Left}
        className="!pointer-events-none !opacity-0"
      />
      <Handle
        type="target"
        id="t"
        position={Position.Top}
        className="!pointer-events-none !opacity-0"
      />
      <div
        className={`bg-site-panel w-[190px] rounded-md border px-3 py-2.5 ${border} ${
          kind === "start" ? "text-center" : ""
        }`}
      >
        <p className="text-site-fg text-[11.5px] font-medium leading-snug">{label}</p>
        {detail ? (
          <p className="font-site-mono text-site-accent mt-1.5 text-[11px] leading-snug">
            {detail}
          </p>
        ) : null}
      </div>
      <Handle
        type="source"
        id="r"
        position={Position.Right}
        className="!pointer-events-none !opacity-0"
      />
      <Handle
        type="source"
        id="b"
        position={Position.Bottom}
        className="!pointer-events-none !opacity-0"
      />
    </>
  );
}

const nodeTypes = { flow: FlowNode };

/**
 * The layout below is authored on a compact grid; these scale it up so nodes
 * are not crowded. Adjust here rather than touching every coordinate.
 */
const X_SPACING = 1.35;
const Y_SPACING = 1.4;

function node(id: string, x: number, y: number, data: Data): Node<Data> {
  return {
    id,
    position: { x: Math.round(x * X_SPACING), y: Math.round(y * Y_SPACING) },
    data,
    type: "flow",
  };
}

const NODES: Node<Data>[] = [
  node("root", 0, 330, { label: "Lovable project", kind: "start" }),

  // ── Lane 1: create a project ───────────────────────────────────────────────
  node("l1", 250, 150, { label: "Create a project", kind: "lane" }),
  node("c1", 250, 200, {
    label: "Prompt",
    detail: "/adopt-gamescience-ui using [theme name]",
    kind: "prompt",
    accent: "green",
  }),
  node("c2", 500, 200, {
    label: "Choose the contexts your game needs: participant, facilitator, shared display",
    kind: "step",
  }),
  node("c3", 750, 200, {
    label:
      "Build as usual. Occasionally run /audit-gamescience-ui to catch non-registry components",
    kind: "step",
  }),
  node("c4", 1010, 130, {
    label: "New component — the agent will advise that no registry version exists",
    kind: "step",
  }),
  node("c5", 1010, 260, {
    label: "Existing component — the agent aligns it to the registry version",
    kind: "step",
  }),
  node("note1", 1010, -10, {
    label:
      "This should be rare, but if a custom component is built in Lovable (maybe a chart or graph) it will not exist in the registry by default.",
    kind: "note",
    accent: "green",
  }),
  node("d1", 1290, 140, { label: "Reusable?", kind: "decision" }),
  node("c6", 1290, 280, {
    label: "Leave it as a local component in that project",
    kind: "step",
  }),

  // ── Lane 2: add a new component ────────────────────────────────────────────
  node("l2", 1450, -70, { label: "Add a new component", kind: "lane" }),
  node("a1", 1450, -20, { label: "Add it to the registry", kind: "step" }),
  node("a2", 1700, -20, {
    label: "In Lovable, use Select Elements to select the finished component you built",
    kind: "step",
  }),
  node("a3", 1950, -20, {
    label: "Put the selection at the top left of the input field, then type:",
    detail: "/extract-selected-component",
    kind: "prompt",
  }),
  node("a4", 2200, -20, {
    label: "The agent replies with a full structure and style definition. Copy it",
    kind: "step",
  }),
  node("a5", 2450, -20, {
    label: "Paste into Claude Code or Cursor with the library repo open, and send",
    kind: "step",
  }),
  node("a6", 2700, -20, {
    label: "Verify the component in Storybook",
    detail: "npm run storybook",
    kind: "step",
  }),
  node("l3", 2950, -70, { label: "Publish UI library", kind: "lane" }),
  node("a7", 2950, -20, {
    label: "Publish the registry using skill",
    detail: "/release-registry",
    kind: "done",
  }),
  node("a8", 3200, -20, {
    label: "Back inside Lovable, pull the new component into the game",
    detail: "/sync-gamescience-ui",
    kind: "prompt",
  }),

  // ── Lane 3: migrate a project ──────────────────────────────────────────────
  node("l4", 250, 430, { label: "Migrate a project to a theme", kind: "lane" }),
  node("m1", 250, 480, {
    label: "Prompt",
    detail: "/migrate-gamescience-ui",
    kind: "prompt",
    accent: "purple",
  }),
  node("m2", 500, 480, {
    label: "Choose: safe incremental, or full visual alignment",
    kind: "step",
  }),
  node("m3", 750, 400, {
    label: "Safe incremental — changes applied in waves, with more stops",
    kind: "step",
  }),
  node("m4", 750, 540, {
    label: "Full visual alignment — changes applied in waves, with fewer stops",
    kind: "step",
  }),
  node("note2", 750, 660, {
    label:
      "Lovable's agent is cautious by default, so it will stage changes in runs instead of long work sessions.",
    kind: "note",
  }),
  node("m5", 1010, 470, {
    label: "Continue through. Once it claims completeness, run",
    detail: "/validate-gamescience-ui",
    kind: "prompt",
  }),
  node("d2", 1290, 460, { label: "Complete?", kind: "decision" }),
  node("m6", 1450, 600, {
    label: "Are there components in the project that do not exist in the registry?",
    kind: "step",
  }),
  node("note3", 1450, 720, {
    label:
      "It is perfectly fine to run /migrate-gamescience-ui as many times as you feel necessary to catch everything.",
    kind: "note",
  }),
  node("l7", 1750, 390, { label: "Migration complete", kind: "lane" }),
  node("m7", 1750, 440, { label: "Migration is complete", kind: "done" }),

  // ── Lane 4: define a new theme ─────────────────────────────────────────────
  node("l5", 250, 780, { label: "Define a new theme", kind: "lane" }),
  node("t1", 250, 830, {
    label: "Prompt",
    detail: "/extract-theme",
    kind: "prompt",
    accent: "orange",
  }),
  node("t2", 500, 830, {
    label: "Paste into Claude Code or Cursor with the library repo open, and send",
    kind: "step",
  }),
  node("t3", 750, 830, {
    label: "Verify the theme in Storybook",
    detail: "npm run storybook",
    kind: "step",
  }),
  node("l6", 1010, 780, { label: "Publish UI library", kind: "lane" }),
  node("t4", 1010, 830, {
    label: "Publish the registry using skill",
    detail: "/release-registry",
    kind: "done",
  }),
  node("t5", 1260, 830, {
    label: "Back inside Lovable",
    detail: "/sync-gamescience-ui",
    kind: "prompt",
  }),
];

function edge(
  id: string,
  source: string,
  target: string,
  label?: string,
  handles: { from?: "r" | "b"; to?: "l" | "t" } = {},
): Edge {
  return {
    id,
    source,
    target,
    label,
    // Both ends are named explicitly: these nodes expose a right/bottom source
    // and a left/top target, and React Flow 12 drops an edge it cannot resolve
    // to a specific handle.
    sourceHandle: handles.from ?? "r",
    targetHandle: handles.to ?? "l",
    style: { stroke: "hsl(240 5% 32%)", strokeWidth: 1.2 },
    labelStyle: { fill: "hsl(240 4% 64%)", fontSize: 10 },
    labelBgStyle: { fill: "hsl(240 5% 10%)" },
    labelBgPadding: [4, 2] as [number, number],
  };
}

const EDGES: Edge[] = [
  edge("e-root-c1", "root", "c1", "New project"),
  edge("e-root-m1", "root", "m1", "Existing project"),
  edge("e-root-t1", "root", "t1", "Existing project"),

  edge("e-c1", "c1", "c2"),
  edge("e-c2", "c2", "c3"),
  edge("e-c3a", "c3", "c4", "New component"),
  edge("e-c3b", "c3", "c5", "Existing component"),
  edge("e-c4", "c4", "d1"),
  edge("e-d1-yes", "d1", "a1", "Yes"),
  edge("e-d1-no", "d1", "c6", "No", { from: "b", to: "t" }),

  edge("e-a1", "a1", "a2"),
  edge("e-a2", "a2", "a3"),
  edge("e-a3", "a3", "a4"),
  edge("e-a4", "a4", "a5"),
  edge("e-a5", "a5", "a6"),
  edge("e-a6", "a6", "a7"),
  edge("e-a7", "a7", "a8"),

  edge("e-m1", "m1", "m2"),
  edge("e-m2a", "m2", "m3", "Safe"),
  edge("e-m2b", "m2", "m4", "Full"),
  edge("e-m3", "m3", "m5"),
  edge("e-m4", "m4", "m5"),
  edge("e-m5", "m5", "d2"),
  edge("e-d2-yes", "d2", "m7", "Yes"),
  edge("e-d2-no", "d2", "m6", "No", { from: "b", to: "t" }),
  edge("e-m6-yes", "m6", "a1", "Yes"),
  edge("e-m6-no", "m6", "m1", "No — run it again"),

  edge("e-t1", "t1", "t2"),
  edge("e-t2", "t2", "t3"),
  edge("e-t3", "t3", "t4"),
  edge("e-t4", "t4", "t5"),
];

/**
 * Zoom and fit controls, styled as site buttons.
 *
 * Replaces React Flow's default `<Controls />`, which ships its own white
 * chrome and would read as a foreign object on this page. Must render inside
 * `<ReactFlow>` so `useReactFlow` can reach the store.
 */
function CanvasControls({ container }: { container: React.RefObject<HTMLDivElement | null> }) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [isFullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const active = document.fullscreenElement === container.current;
      setFullscreen(active);
      // The viewport just changed size dramatically; at full screen the whole
      // map fits at a readable zoom, which it cannot do inline.
      window.setTimeout(() => fitView({ duration: 300, padding: 0.08 }), 120);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [container, fitView]);

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await container.current?.requestFullscreen();
    }
  }

  const button =
    "border-site-border bg-site-panel text-site-muted hover:border-site-border-strong hover:text-site-fg flex h-7 items-center justify-center rounded border text-sm transition-colors";

  return (
    <Panel position="bottom-left" className="!m-3 flex gap-1.5">
      <button
        type="button"
        onClick={() => zoomOut({ duration: 200 })}
        aria-label="Zoom out"
        className={`${button} w-7`}
      >
        −
      </button>
      <button
        type="button"
        onClick={() => zoomIn({ duration: 200 })}
        aria-label="Zoom in"
        className={`${button} w-7`}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => fitView({ duration: 300, padding: 0.1 })}
        aria-label="Fit the whole diagram in view"
        className={`${button} px-2.5 text-xs`}
      >
        Fit
      </button>
      <button
        type="button"
        onClick={() => void toggleFullscreen()}
        aria-label={isFullscreen ? "Exit full screen" : "View full screen"}
        className={`${button} px-2.5 text-xs`}
      >
        {isFullscreen ? "Exit" : "Full screen"}
      </button>
    </Panel>
  );
}

/**
 * Opens at a legible zoom on the entry point rather than fitting the whole map:
 * the diagram is wide enough that fitView clamps to minZoom and every label
 * becomes unreadable. The on-canvas controls include a fit-view button.
 */
const initialViewport = { x: 60, y: -190, zoom: 0.55 };

export function WorkflowCanvas() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      className="border-site-border bg-site-bg h-[640px] w-full overflow-hidden rounded-lg border [&:fullscreen]:h-screen [&:fullscreen]:rounded-none"
    >
      <ReactFlow
        nodes={NODES}
        edges={EDGES}
        nodeTypes={nodeTypes}
        defaultViewport={initialViewport}
        minZoom={0.15}
        maxZoom={1.6}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        edgesFocusable={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="hsl(240 5% 18%)" />
        <CanvasControls container={container} />
      </ReactFlow>
    </div>
  );
}
