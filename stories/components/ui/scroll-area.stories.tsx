import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const participants = Array.from({ length: 20 }, (_, index) => `Participant ${index + 1}`);

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <ScrollArea className="h-48 w-full max-w-sm rounded-control border">
        <div className="p-4">
          {participants.map((name) => (
            <div key={name} className="border-b py-2 text-sm last:border-0">
              {name}
            </div>
          ))}
        </div>
      </ScrollArea>
    </StoryFrame>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <StoryFrame>
      <ScrollArea className="w-full max-w-sm whitespace-nowrap rounded-control border">
        <div className="flex w-max gap-4 p-4">
          {["Briefing", "Vote", "Debrief", "Results", "Archive"].map((stage) => (
            <div
              key={stage}
              className="flex h-24 w-32 shrink-0 items-center justify-center rounded-control border bg-muted text-sm font-medium"
            >
              {stage}
            </div>
          ))}
        </div>
      </ScrollArea>
    </StoryFrame>
  ),
};
