import { Alert } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <div className="space-y-3">
      <Alert intent="information" title="Round starting">
        The facilitator has opened the next round.
      </Alert>
      <Alert intent="warning" title="Connection unstable">
        Reconnecting to the session.
      </Alert>
    </div>
  ),
} satisfies Preview;
