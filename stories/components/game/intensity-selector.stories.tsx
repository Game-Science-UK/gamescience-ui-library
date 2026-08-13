import type { Meta, StoryObj } from "@storybook/react-vite";
import { IntensitySelector } from "@/components/game/intensity-selector";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/IntensitySelector",
  component: IntensitySelector,
  tags: ["autodocs"],
} satisfies Meta<typeof IntensitySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 2, max: 3, label: "Conviction" },
  render: (args) => (
    <StoryFrame>
      <IntensitySelector {...args} />
    </StoryFrame>
  ),
};

export const Zero: Story = {
  args: { value: 0, max: 3, zeroLabel: "Abstain" },
  render: (args) => (
    <StoryFrame>
      <IntensitySelector {...args} />
    </StoryFrame>
  ),
};

export const Disabled: Story = {
  args: { value: 3, max: 3, disabled: true },
  render: (args) => (
    <StoryFrame>
      <IntensitySelector {...args} />
    </StoryFrame>
  ),
};
