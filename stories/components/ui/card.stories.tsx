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
