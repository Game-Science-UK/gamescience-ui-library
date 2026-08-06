import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function Render() {
    const [showScores, setShowScores] = React.useState(true);
    const [view, setView] = React.useState("grid");

    return (
      <StoryFrame>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button intent="outline">Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Session</DropdownMenuLabel>
            <DropdownMenuItem>Export results</DropdownMenuItem>
            <DropdownMenuItem>Share link</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={showScores} onCheckedChange={setShowScores}>
              Show scores
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={view} onValueChange={setView}>
              <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </StoryFrame>
    );
  },
};

export const WithShortcuts: Story = {
  render: () => (
    <StoryFrame>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button intent="outline">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Session</DropdownMenuLabel>
          <DropdownMenuItem>
            New session
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Export results
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </StoryFrame>
  ),
};

export const CheckboxItems: Story = {
  render: function Render() {
    const [showScores, setShowScores] = React.useState(true);
    const [showNames, setShowNames] = React.useState(false);

    return (
      <StoryFrame>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button intent="outline">Display options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Visible data</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={showScores} onCheckedChange={setShowScores}>
              Show scores
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showNames} onCheckedChange={setShowNames}>
              Show participant names
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </StoryFrame>
    );
  },
};
