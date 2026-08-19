import { Button, Panel } from "@/components/ui";
import { PhaseHeader } from "@/components/game";
import { ParticipantShell } from "@/templates";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <ParticipantShell
      header={<PhaseHeader eyebrow="Round 2" phase="Discussion" trailing="2:30" />}
      footer={
        <Button intent="primary" className="w-full">
          Commit answer
        </Button>
      }
    >
      <Panel>
        <p className="gs-body">Agree a single recommendation with your table.</p>
      </Panel>
    </ParticipantShell>
  ),
} satisfies Preview;
