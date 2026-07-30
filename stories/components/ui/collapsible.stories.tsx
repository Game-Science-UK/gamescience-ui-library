import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <Collapsible className="w-full max-w-md space-y-2">
        <CollapsibleTrigger asChild>
          <Button intent="outline" className="w-full justify-between">
            Advanced settings
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="rounded-control border p-4 text-sm text-muted-foreground">
          Configure timer duration, anonymous voting, and facilitator overrides.
        </CollapsibleContent>
      </Collapsible>
    </StoryFrame>
  ),
};
