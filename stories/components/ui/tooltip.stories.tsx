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

export const MultipleTooltips: Story = {
  render: () => (
    <StoryFrame>
      <TooltipProvider>
        <div className="flex flex-wrap gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button intent="outline" size="sm">
                Vote
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Submit your decision</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button intent="outline" size="sm">
                Timer
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>45 seconds remaining</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button intent="outline" size="sm">
                Help
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Message the facilitator</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </StoryFrame>
  ),
};
