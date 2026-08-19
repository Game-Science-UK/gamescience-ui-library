import { PhaseHeader } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <div className="space-y-3">
      <PhaseHeader eyebrow="Round 2" phase="Discussion" trailing="2:30" />
      <PhaseHeader eyebrow="Round 3" phase="Final vote" intent="warning" trailing="0:20" />
    </div>
  ),
} satisfies Preview;
