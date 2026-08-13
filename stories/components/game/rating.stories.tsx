import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rating } from "@/components/game/rating";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadOnly: Story = {
  args: { value: 4, max: 5, readOnly: true },
  render: (args) => (
    <StoryFrame>
      <Rating {...args} />
    </StoryFrame>
  ),
};

export const Interactive: Story = {
  args: { value: 3, max: 5 },
  render: (args) => (
    <StoryFrame>
      <Rating {...args} />
    </StoryFrame>
  ),
};

export const Empty: Story = {
  args: { value: 0, max: 5, readOnly: true },
  render: (args) => (
    <StoryFrame>
      <Rating {...args} />
    </StoryFrame>
  ),
};
