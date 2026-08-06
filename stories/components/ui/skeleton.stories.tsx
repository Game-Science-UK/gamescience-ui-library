import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@/components/ui/skeleton";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => (
    <StoryFrame className="grid max-w-sm gap-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
      <Skeleton className="h-24 w-full rounded-panel" />
      <div className="flex gap-2">
        <Skeleton className="h-9 w-20 rounded-control" />
        <Skeleton className="h-9 w-20 rounded-control" />
      </div>
    </StoryFrame>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <StoryFrame className="max-w-sm">
      <div className="space-y-3 rounded-panel border p-4">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-24 w-full rounded-panel" />
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1 rounded-control" />
          <Skeleton className="h-9 flex-1 rounded-control" />
        </div>
      </div>
    </StoryFrame>
  ),
};
