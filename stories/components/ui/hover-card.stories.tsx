import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button intent="ghost">@alex</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Alex Morgan</p>
            <p className="text-sm text-muted-foreground">Joined 3 minutes ago · Sector North</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </StoryFrame>
  ),
};
