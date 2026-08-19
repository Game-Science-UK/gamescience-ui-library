import { PhaseProgress } from "@/components/game";
import type { Preview } from "@site/previews";

const STEPS = [
  { id: "join", label: "Join", status: "complete" as const },
  { id: "brief", label: "Briefing", status: "complete" as const },
  { id: "round", label: "Round 2", status: "active" as const },
  { id: "vote", label: "Vote", status: "pending" as const },
  { id: "debrief", label: "Debrief", status: "pending" as const },
];

export default {
  viewport: "full",
  render: () => (
    <div className="space-y-6">
      <PhaseProgress steps={STEPS} activeId="round" label="Session progress" />
      <PhaseProgress steps={STEPS} activeId="round" density="compact" />
    </div>
  ),
} satisfies Preview;
