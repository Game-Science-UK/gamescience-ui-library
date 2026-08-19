import { PhaseDirective } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <div className="space-y-3">
      <PhaseDirective eyebrow="Now" treatment="panel">
        Agree a single recommendation with your table.
      </PhaseDirective>
      <PhaseDirective eyebrow="Careful" treatment="strip" intent="warning">
        You cannot change your answer once submitted.
      </PhaseDirective>
    </div>
  ),
} satisfies Preview;
