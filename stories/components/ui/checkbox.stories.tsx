import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-playground" {...args} />
      <Label htmlFor="checkbox-playground">Accept terms</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <StoryFrame className="grid gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-unchecked" />
        <Label htmlFor="checkbox-unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-checked" defaultChecked />
        <Label htmlFor="checkbox-checked">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-disabled" disabled />
        <Label htmlFor="checkbox-disabled">Disabled</Label>
      </div>
    </StoryFrame>
  ),
};
