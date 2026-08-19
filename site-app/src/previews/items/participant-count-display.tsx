import { ParticipantCountDisplay } from "@/components/display";
import type { Preview } from "@site/previews";

export default {
  context: "shared-display",
  viewport: "full",
  render: () => (
    <div className="space-y-8">
      <ParticipantCountDisplay count={12} expected={20} />
      <ParticipantCountDisplay count={20} expected={20} label="Everyone is here" />
    </div>
  ),
} satisfies Preview;
