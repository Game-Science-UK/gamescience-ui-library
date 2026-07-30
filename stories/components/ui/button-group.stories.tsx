import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <StoryFrame>
      <ButtonGroup>
        <Button intent="primary">Start</Button>
        <Button intent="secondary">Pause</Button>
        <Button intent="outline">Reset</Button>
      </ButtonGroup>
    </StoryFrame>
  ),
};

export const Vertical: Story = {
  render: () => (
    <StoryFrame>
      <ButtonGroup orientation="vertical" className="w-full max-w-xs">
        <Button className="w-full">Option A</Button>
        <Button intent="secondary" className="w-full">
          Option B
        </Button>
        <Button intent="outline" className="w-full">
          Option C
        </Button>
      </ButtonGroup>
    </StoryFrame>
  ),
};
