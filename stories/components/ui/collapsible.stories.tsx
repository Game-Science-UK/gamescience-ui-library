import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Collapsible",
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

export const OpenByDefault: Story = {
  render: () => (
    <StoryFrame>
      <Collapsible defaultOpen className="w-full max-w-md space-y-2">
        <CollapsibleTrigger asChild>
          <Button intent="outline" className="w-full justify-between">
            Session details
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="rounded-control border p-4 text-sm text-muted-foreground">
          Stage: Briefing · Code: GS-4821 · Facilitator: Jordan Lee
        </CollapsibleContent>
      </Collapsible>
    </StoryFrame>
  ),
};
