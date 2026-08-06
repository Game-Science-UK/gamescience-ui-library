import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <div className="w-full max-w-xl">
        <AspectRatio ratio={16 / 9}>
          <div className="flex h-full w-full items-center justify-center rounded-control bg-primary text-primary-foreground">
            16:9 shared display
          </div>
        </AspectRatio>
      </div>
    </StoryFrame>
  ),
};

export const SquareRatio: Story = {
  render: () => (
    <StoryFrame>
      <div className="w-full max-w-xs">
        <AspectRatio ratio={1}>
          <div className="flex h-full w-full items-center justify-center rounded-control bg-muted text-sm font-medium">
            1:1 participant tile
          </div>
        </AspectRatio>
      </div>
    </StoryFrame>
  ),
};

export const PortraitRatio: Story = {
  render: () => (
    <StoryFrame>
      <div className="w-full max-w-xs">
        <AspectRatio ratio={3 / 4}>
          <div className="flex h-full w-full items-center justify-center rounded-control border bg-surface-raised text-sm font-medium">
            3:4 briefing card
          </div>
        </AspectRatio>
      </div>
    </StoryFrame>
  ),
};
