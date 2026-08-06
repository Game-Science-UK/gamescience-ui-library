import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Command",
  component: Command,
  tags: ["autodocs"],
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  render: () => (
    <StoryFrame>
      <Command className="max-w-md rounded-control border shadow-md">
        <CommandInput placeholder="Search participants..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Participants">
            <CommandItem>Alex Morgan</CommandItem>
            <CommandItem>Jordan Lee</CommandItem>
            <CommandItem>Sam Patel</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem>Export results</CommandItem>
            <CommandItem>End session</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </StoryFrame>
  ),
};

export const CommandPalette: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);

    return (
      <StoryFrame>
        <Button intent="outline" onClick={() => setOpen(true)}>
          Open command palette
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => setOpen(false)}>Go to lobby</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Go to vote stage</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </StoryFrame>
    );
  },
};
