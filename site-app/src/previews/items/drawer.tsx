import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  syncsDocument: true,
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button intent="outline">Open notes</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your notes</DrawerTitle>
          <DrawerDescription>Private to you, kept for the debrief.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  ),
} satisfies Preview;
