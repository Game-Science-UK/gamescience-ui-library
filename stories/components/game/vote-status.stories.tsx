import type { Meta, StoryObj } from "@storybook/react-vite";
import { VoteStatus } from "@/components/game/vote-status";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Game/VoteStatus",
  component: VoteStatus,
  tags: ["autodocs"],
} satisfies Meta<typeof VoteStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pips: Story = {
  args: { voted: 3, total: 5, progress: "pips" },
  render: (args) => (
    <StoryFrame>
      <VoteStatus {...args} />
    </StoryFrame>
  ),
};

export const Bar: Story = {
  args: { voted: 12, total: 20, progress: "bar", treatment: "framed" },
  render: (args) => (
    <StoryFrame>
      <VoteStatus {...args} />
    </StoryFrame>
  ),
};

export const AutomaticFallback: Story = {
  args: { voted: 4, total: 12, progress: "auto" },
  render: (args) => (
    <StoryFrame>
      <VoteStatus {...args} />
    </StoryFrame>
  ),
};

export const Anonymous: Story = {
  args: { voted: 2, total: 6, anonymous: true },
  render: (args) => (
    <StoryFrame>
      <VoteStatus {...args} />
    </StoryFrame>
  ),
};

export const Locked: Story = {
  args: { voted: 6, total: 6, locked: true },
  render: (args) => (
    <StoryFrame>
      <VoteStatus {...args} />
    </StoryFrame>
  ),
};

export const ZeroVotes: Story = {
  args: { voted: 0, total: 5 },
  render: (args) => (
    <StoryFrame>
      <VoteStatus {...args} />
    </StoryFrame>
  ),
};

export const Complete: Story = {
  args: { voted: 5, total: 5, progress: "pips" },
  render: (args) => (
    <StoryFrame>
      <VoteStatus {...args} />
    </StoryFrame>
  ),
};
