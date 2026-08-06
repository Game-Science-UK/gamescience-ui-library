import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/sonner";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Sonner",
  component: Toaster,
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("Vote submitted")}>Success</Button>
        <Button intent="danger" onClick={() => toast.error("Session expired")}>
          Error
        </Button>
        <Button intent="outline" onClick={() => toast.info("Facilitator advanced the stage")}>
          Info
        </Button>
      </div>
    </StoryFrame>
  ),
};

export const SuccessAndError: Story = {
  render: () => (
    <StoryFrame>
      <Toaster />
      <div className="flex max-w-xs flex-col gap-3">
        <Button
          onClick={() =>
            toast.success("Vote recorded", {
              description: "Your decision was submitted to the facilitator.",
            })
          }
        >
          Trigger success toast
        </Button>
        <Button
          intent="danger"
          onClick={() =>
            toast.error("Connection lost", {
              description: "Reconnect to continue participating in the session.",
            })
          }
        >
          Trigger error toast
        </Button>
      </div>
    </StoryFrame>
  ),
};
