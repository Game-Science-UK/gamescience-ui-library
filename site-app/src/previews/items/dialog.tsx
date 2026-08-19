import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  syncsDocument: true,
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button intent="outline">Start the round</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start round 2?</DialogTitle>
          <DialogDescription>
            Every player device will move on. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button intent="ghost">Cancel</Button>
          <Button intent="primary">Start</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} satisfies Preview;
