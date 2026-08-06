import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "default", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    "aria-label": "Toggle bold",
    children: <Bold />,
    variant: "default",
    size: "default",
  },
};

export const Variants: Story = {
  render: () => (
    <StoryFrame className="flex flex-wrap gap-2">
      <Toggle variant="default" aria-label="Bold">
        <Bold />
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        <Italic />
      </Toggle>
      <Toggle variant="outline" aria-label="Underline" defaultPressed>
        <Underline />
      </Toggle>
    </StoryFrame>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryFrame className="flex flex-wrap items-center gap-2">
      <Toggle size="sm" aria-label="Bold small">
        <Bold />
      </Toggle>
      <Toggle size="default" aria-label="Bold default">
        <Bold />
      </Toggle>
      <Toggle size="lg" aria-label="Bold large">
        <Bold />
      </Toggle>
    </StoryFrame>
  ),
};
