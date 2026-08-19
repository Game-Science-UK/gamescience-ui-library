import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  syncsDocument: true,
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button intent="outline">Locked</Button>
        </TooltipTrigger>
        <TooltipContent>Opens when the facilitator starts the round</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Preview;
