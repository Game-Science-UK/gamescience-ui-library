import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-control border border-dashed text-sm text-muted-foreground">
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy link</ContextMenuItem>
          <ContextMenuItem>Pin participant</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Remove from session</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </StoryFrame>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <StoryFrame>
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-control border border-dashed text-sm text-muted-foreground">
          Right-click for nested actions
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy session link</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Move participant</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>North sector</ContextMenuItem>
              <ContextMenuItem>South sector</ContextMenuItem>
              <ContextMenuItem>East sector</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Mute participant</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </StoryFrame>
  ),
};
