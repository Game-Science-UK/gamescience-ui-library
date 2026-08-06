import type { Meta, StoryObj } from "@storybook/react-vite";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Empty",
  component: Empty,
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StoryFrame>
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyTitle>No participants yet</EmptyTitle>
          <EmptyDescription>
            Share the join code to invite participants into the session.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button intent="primary">Copy join code</Button>
        </EmptyContent>
      </Empty>
    </StoryFrame>
  ),
};

export const WithIconMedia: Story = {
  render: () => (
    <StoryFrame>
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Inbox aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>Inbox empty</EmptyTitle>
          <EmptyDescription>
            Completed debriefs and facilitator notes will appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button intent="secondary">Refresh</Button>
        </EmptyContent>
      </Empty>
    </StoryFrame>
  ),
};
