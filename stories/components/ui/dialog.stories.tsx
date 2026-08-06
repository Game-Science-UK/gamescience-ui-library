import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit decision</DialogTitle>
            <DialogDescription>
              Confirm your choice before the facilitator advances the stage.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button intent="outline">Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StoryFrame>
  ),
};

export const LongContent: Story = {
  render: () => (
    <StoryFrame>
      <Dialog>
        <DialogTrigger asChild>
          <Button intent="outline">View briefing pack</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Briefing pack</DialogTitle>
            <DialogDescription>
              Review all scenario materials before the vote stage opens.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            {Array.from({ length: 8 }, (_, index) => (
              <p key={index}>
                Section {index + 1}: Context for sector decisions, stakeholder constraints, and
                facilitator notes for this learning game.
              </p>
            ))}
          </div>
          <DialogFooter>
            <Button>Mark as read</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StoryFrame>
  ),
};

export const ControlledOpen: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);

    return (
      <StoryFrame>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setOpen(true)}>Open controlled dialog</Button>
          <Button intent="outline" onClick={() => setOpen(false)}>
            Close from outside
          </Button>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled dialog</DialogTitle>
              <DialogDescription>
                Open state is managed by the parent component via the open prop.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Dismiss</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </StoryFrame>
    );
  },
};
