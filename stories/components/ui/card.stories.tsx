import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Session summary</CardTitle>
          <CardDescription>Briefing stage · 12 participants</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Average response time 42 seconds. Voting opens when the facilitator advances.
          </p>
        </CardContent>
        <CardFooter>
          <Button>View details</Button>
        </CardFooter>
      </Card>
    </StoryFrame>
  ),
};

export const Compact: Story = {
  render: () => (
    <StoryFrame>
      <Card className="w-full max-w-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">Vote timer</CardTitle>
          <CardDescription>45 seconds remaining</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground">Submit before the facilitator advances.</p>
        </CardContent>
      </Card>
    </StoryFrame>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <StoryFrame>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Participant snapshot</CardTitle>
          <CardDescription>12 connected · 3 ready to vote</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Facilitator can advance when all sectors have submitted.
          </p>
        </CardContent>
      </Card>
    </StoryFrame>
  ),
};
