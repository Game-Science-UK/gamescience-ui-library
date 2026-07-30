import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <Popover>
        <PopoverTrigger asChild>
          <Button intent="outline">Session info</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Briefing stage</p>
            <p className="text-sm text-muted-foreground">
              12 participants connected. Voting opens in 2 minutes.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </StoryFrame>
  ),
};
