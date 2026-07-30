import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    placeholder: "Enter participant name",
  },
};

export const States: Story = {
  render: () => (
    <StoryFrame className="grid max-w-sm gap-4">
      <Input placeholder="Default" />
      <Input placeholder="Invalid value" invalid defaultValue="bad-input" />
      <Input placeholder="Disabled" disabled />
      <div className="grid gap-1">
        <Label htmlFor="input-with-label">Display name</Label>
        <Input id="input-with-label" placeholder="Alex Chen" />
      </div>
    </StoryFrame>
  ),
};
