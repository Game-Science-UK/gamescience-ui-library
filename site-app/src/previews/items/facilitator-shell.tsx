import { Button, Panel } from "@/components/ui";
import { FacilitatorShell } from "@/templates";
import type { Preview } from "@site/previews";

export default {
  context: "facilitator",
  viewport: "full",
  render: () => (
    <FacilitatorShell
      title="Session 4KZ9"
      subtitle="Round 2 · Discussion"
      actions={<Button intent="outline">Advance</Button>}
    >
      <Panel>
        <p className="gs-body">Operational surface for the person running the room.</p>
      </Panel>
    </FacilitatorShell>
  ),
} satisfies Preview;
