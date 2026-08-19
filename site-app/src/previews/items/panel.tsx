import { Panel } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <div className="grid gap-3 sm:grid-cols-3">
      <Panel elevation="subtle">
        <p className="gs-label">Subtle</p>
        <p className="gs-body mt-1">Recessed surface.</p>
      </Panel>
      <Panel>
        <p className="gs-label">Default</p>
        <p className="gs-body mt-1">Standard panel.</p>
      </Panel>
      <Panel elevation="raised">
        <p className="gs-label">Raised</p>
        <p className="gs-body mt-1">Lifted surface.</p>
      </Panel>
    </div>
  ),
} satisfies Preview;
