import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  syncsDocument: true,
  context: "facilitator",
  viewport: "full",
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Session</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Pause</MenubarItem>
          <MenubarItem>Extend</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>End session</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Display</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Show results</MenubarItem>
          <MenubarItem>Blank screen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
} satisfies Preview;
