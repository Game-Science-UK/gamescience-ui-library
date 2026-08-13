import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stat } from "@/components/game/stat";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Stat",
  component: Stat,
  tags: ["autodocs"],
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: { label: "Deal viability", value: "78%" },
  render: (args) => (
    <StoryFrame>
      <Stat {...args} />
    </StoryFrame>
  ),
};

export const Success: Story = {
  args: { label: "Contained rooms", value: "5/5", intent: "success", hint: "of total" },
  render: (args) => (
    <StoryFrame>
      <Stat {...args} />
    </StoryFrame>
  ),
};

export const Critical: Story = {
  args: { label: "Cascade risk", value: "High", intent: "critical" },
  render: (args) => (
    <StoryFrame>
      <Stat {...args} />
    </StoryFrame>
  ),
};

export const Large: Story = {
  args: { label: "Cohort result", value: "Elevated", intent: "warning", size: "lg" },
  render: (args) => (
    <StoryFrame>
      <Stat {...args} />
    </StoryFrame>
  ),
};
