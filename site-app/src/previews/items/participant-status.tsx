import { ParticipantStatus } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-2">
      <ParticipantStatus displayName="Amara" connection="connected" readiness="ready" />
      <ParticipantStatus displayName="Jonah" connection="reconnecting" readiness="not-ready" />
      <ParticipantStatus displayName="Wei" connection="disconnected" readiness="not-ready" />
    </div>
  ),
} satisfies Preview;
