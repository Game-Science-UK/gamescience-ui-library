import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Panel,
} from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <Button intent="outline">Toggle briefing detail</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        <Panel>
          <p className="gs-body">Additional context, hidden until the facilitator reveals it.</p>
        </Panel>
      </CollapsibleContent>
    </Collapsible>
  ),
} satisfies Preview;
