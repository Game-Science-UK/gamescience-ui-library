import { ConnectionStatus } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-2">
      <ConnectionStatus state="connected" />
      <ConnectionStatus state="reconnecting" />
      <ConnectionStatus state="offline" />
    </div>
  ),
} satisfies Preview;
