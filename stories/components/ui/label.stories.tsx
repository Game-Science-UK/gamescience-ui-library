import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Participant name",
  },
};

export const WithControl: Story = {
  render: () => (
    <StoryFrame className="grid max-w-sm gap-4">
      <div className="grid gap-1">
        <Label htmlFor="label-input">Display name</Label>
        <Input id="label-input" placeholder="Alex Chen" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="label-checkbox" />
        <Label htmlFor="label-checkbox">Ready to join</Label>
      </div>
    </StoryFrame>
  ),
};
