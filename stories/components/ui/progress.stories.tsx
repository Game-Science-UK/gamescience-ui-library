import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "@/components/ui/progress";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: 42,
    className: "w-64",
  },
};

export const Values: Story = {
  render: () => (
    <StoryFrame className="grid max-w-sm gap-4">
      <Progress value={0} />
      <Progress value={42} />
      <Progress value={100} />
    </StoryFrame>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <StoryFrame className="max-w-sm">
      <Progress value={68} label="Session completion" />
    </StoryFrame>
  ),
};
