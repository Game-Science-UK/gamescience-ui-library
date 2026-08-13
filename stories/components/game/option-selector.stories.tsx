import type { Meta, StoryObj } from "@storybook/react-vite";
import { OptionSelector } from "@/components/game/option-selector";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/OptionSelector",
  component: OptionSelector,
  tags: ["autodocs"],
} satisfies Meta<typeof OptionSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { id: "a", title: "Contain and observe", description: "Watch the situation before acting" },
  { id: "b", title: "Escalate immediately", description: "Raise it now" },
  { id: "c", title: "Request more intelligence", description: "Gather more first" },
];

export const List: Story = {
  args: { options, label: "Choose a response" },
  render: (args) => (
    <StoryFrame>
      <OptionSelector {...args} />
    </StoryFrame>
  ),
};

export const Selected: Story = {
  args: { options, selectedId: "b", label: "Choose a response" },
  render: (args) => (
    <StoryFrame>
      <OptionSelector {...args} />
    </StoryFrame>
  ),
};

export const Grid: Story = {
  args: { options, layout: "grid", label: "Choose a response" },
  render: (args) => (
    <StoryFrame>
      <OptionSelector {...args} />
    </StoryFrame>
  ),
};

export const Disabled: Story = {
  args: { options, selectedId: "a", disabled: true, label: "Choose a response" },
  render: (args) => (
    <StoryFrame>
      <OptionSelector {...args} />
    </StoryFrame>
  ),
};
