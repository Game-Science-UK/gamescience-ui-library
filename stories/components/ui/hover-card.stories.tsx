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

export const WithRichContent: Story = {
  render: () => (
    <StoryFrame>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button intent="ghost">@jordan</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex gap-4">
            <div className="size-12 shrink-0 rounded-full bg-muted" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Jordan Lee</p>
              <p className="text-sm text-muted-foreground">Facilitator · Sector South</p>
              <p className="text-xs text-muted-foreground">
                Last active 2 minutes ago · 4 sessions hosted
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </StoryFrame>
  ),
};
