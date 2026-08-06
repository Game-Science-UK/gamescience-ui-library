import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Drawer",
  component: Drawer,
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Join session</DrawerTitle>
            <DrawerDescription>
              Enter your display name to join the briefing stage.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Continue</Button>
            <DrawerClose asChild>
              <Button intent="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </StoryFrame>
  ),
};

export const OpenByDefault: Story = {
  render: () => (
    <StoryFrame>
      <Drawer defaultOpen>
        <DrawerTrigger asChild>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Session lobby</DrawerTitle>
            <DrawerDescription>
              Waiting for the facilitator to start the briefing stage.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Ready</Button>
            <DrawerClose asChild>
              <Button intent="outline">Leave</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </StoryFrame>
  ),
};
