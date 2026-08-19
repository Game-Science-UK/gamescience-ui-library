import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Panel,
} from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  syncsDocument: true,
  context: "facilitator",
  viewport: "full",
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Panel>
          <p className="gs-body">Right-click this panel</p>
        </Panel>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Mark as ready</ContextMenuItem>
        <ContextMenuItem>Send a nudge</ContextMenuItem>
        <ContextMenuItem>Remove from session</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
} satisfies Preview;
