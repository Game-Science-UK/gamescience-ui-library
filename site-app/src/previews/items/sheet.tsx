import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  syncsDocument: true,
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button intent="outline">Open evidence</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Evidence</SheetTitle>
          <SheetDescription>Three sources available to your table.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
} satisfies Preview;
