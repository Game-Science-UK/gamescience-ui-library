import { WaitingState } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-3">
      <WaitingState
        title="Waiting for the facilitator"
        description="The round starts shortly."
        loading
      />
      <WaitingState title="All caught up" description="Nothing to do right now." />
    </div>
  ),
} satisfies Preview;
