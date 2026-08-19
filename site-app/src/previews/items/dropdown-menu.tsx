import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  syncsDocument: true,
  context: "facilitator",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button intent="outline">Session actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Round 2</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Pause round</DropdownMenuItem>
        <DropdownMenuItem>Extend by 2 minutes</DropdownMenuItem>
        <DropdownMenuItem>Skip to vote</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
} satisfies Preview;
