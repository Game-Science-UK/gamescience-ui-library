import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "@/components/ui/alert";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["information", "success", "warning", "danger"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    intent: "information",
    title: "Session update",
    children: "Briefing materials are ready for participants.",
  },
};

export const Intents: Story = {
  render: () => (
    <StoryFrame className="grid max-w-lg gap-4">
      <Alert intent="information" title="Information">
        Additional context or guidance for the current step.
      </Alert>
      <Alert intent="success" title="Success">
        Your response was submitted successfully.
      </Alert>
      <Alert intent="warning" title="Warning">
        Time is running low for this round.
      </Alert>
      <Alert intent="danger" title="Danger">
        Connection lost. Retry to continue the session.
      </Alert>
    </StoryFrame>
  ),
};
