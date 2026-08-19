import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  context: "facilitator",
  viewport: "full",
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-44 rounded-panel border">
      <ResizablePanel defaultSize={60}>
        <div className="gs-body p-4">Cue panel</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40}>
        <div className="gs-body p-4">Roster</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
} satisfies Preview;
