import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Alex Morgan" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
      </div>
    </StoryFrame>
  ),
};

export const FallbackOnly: Story = {
  render: () => (
    <StoryFrame>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </div>
    </StoryFrame>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryFrame>
      <div className="flex items-end gap-4">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="Small avatar" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="Default avatar" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar className="size-14">
          <AvatarImage src="https://github.com/shadcn.png" alt="Large avatar" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
      </div>
    </StoryFrame>
  ),
};
