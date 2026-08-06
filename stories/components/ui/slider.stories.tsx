import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: "w-64",
  },
};

export const WithLabel: Story = {
  render: () => (
    <StoryFrame className="max-w-sm space-y-2">
      <Label htmlFor="slider-confidence">Confidence level</Label>
      <Slider id="slider-confidence" defaultValue={[65]} max={100} step={1} />
    </StoryFrame>
  ),
};
