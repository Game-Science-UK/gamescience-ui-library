import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const sides = ["right", "left", "top", "bottom"] as const;

export const SidesGallery: Story = {
  render: () => (
    <StoryFrame>
      <div className="flex flex-wrap gap-2">
        {sides.map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button intent="outline">{side}</Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Sheet from {side}</SheetTitle>
                <SheetDescription>
                  Slide-over panel anchored to the {side} edge of the viewport.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </StoryFrame>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <StoryFrame>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open sheet with footer</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Join session</SheetTitle>
            <SheetDescription>
              Confirm your display name before entering the lobby.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button>Continue</Button>
            <Button intent="outline">Cancel</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </StoryFrame>
  ),
};
