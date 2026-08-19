import { ConnectionBanner } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <div className="space-y-3">
      <ConnectionBanner state="reconnecting" treatment="banner" />
      <ConnectionBanner
        state="disconnected"
        treatment="banner"
        description="Check your connection."
      />
    </div>
  ),
} satisfies Preview;
