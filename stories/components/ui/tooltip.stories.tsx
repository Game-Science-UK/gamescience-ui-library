import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button intent="outline">Hover for hint</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Submit your vote before the timer expires</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </StoryFrame>
  ),
};
