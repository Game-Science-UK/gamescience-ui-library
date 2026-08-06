import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="switch-playground" {...args} />
      <Label htmlFor="switch-playground">Enable notifications</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <StoryFrame className="grid gap-3">
      <div className="flex items-center gap-2">
        <Switch id="switch-off" />
        <Label htmlFor="switch-off">Off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-on" defaultChecked />
        <Label htmlFor="switch-on">On</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-disabled" disabled />
        <Label htmlFor="switch-disabled">Disabled</Label>
      </div>
    </StoryFrame>
  ),
};
