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
