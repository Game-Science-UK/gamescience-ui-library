import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { direction: "horizontal" },
  render: (args) => (
    <StoryFrame>
      <ResizablePanelGroup {...args} className="min-h-48 max-w-2xl rounded-control border">
        <ResizablePanel defaultSize={50} minSize={25}>
          <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
            Facilitator panel
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={25}>
          <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
            Participant list
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </StoryFrame>
  ),
};
