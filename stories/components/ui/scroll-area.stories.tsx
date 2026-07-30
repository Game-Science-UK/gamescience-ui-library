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
