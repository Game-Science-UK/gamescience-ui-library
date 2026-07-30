import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@/components/ui/separator";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Separator",
  component: Separator,
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <StoryFrame className="max-w-sm space-y-4">
      <p className="text-sm">Content above the separator.</p>
      <Separator />
      <p className="text-sm text-muted-foreground">Content below the separator.</p>
    </StoryFrame>
  ),
};

export const Vertical: Story = {
  render: () => (
    <StoryFrame>
      <div className="flex h-10 items-center gap-4">
        <span className="text-sm">Live</span>
        <Separator orientation="vertical" />
        <span className="text-sm">History</span>
        <Separator orientation="vertical" />
        <span className="text-sm">Archive</span>
      </div>
    </StoryFrame>
  ),
};
