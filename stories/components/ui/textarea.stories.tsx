import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    placeholder: "Add facilitator notes…",
  },
};

export const States: Story = {
  render: () => (
    <StoryFrame className="grid max-w-sm gap-4">
      <Textarea placeholder="Default" />
      <Textarea placeholder="Invalid value" aria-invalid defaultValue="Incomplete response" />
      <Textarea placeholder="Disabled" disabled />
      <div className="grid gap-1">
        <Label htmlFor="textarea-with-label">Reflection</Label>
        <Textarea id="textarea-with-label" placeholder="Share your reasoning…" />
      </div>
    </StoryFrame>
  ),
};
