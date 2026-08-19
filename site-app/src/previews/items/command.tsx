import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  context: "facilitator",
  viewport: "full",
  render: () => (
    <Command className="rounded-panel border">
      <CommandInput placeholder="Jump to a phase…" />
      <CommandList>
        <CommandEmpty>No phase found.</CommandEmpty>
        <CommandGroup heading="Phases">
          <CommandItem>Lobby</CommandItem>
          <CommandItem>Briefing</CommandItem>
          <CommandItem>Round 2</CommandItem>
          <CommandItem>Debrief</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
} satisfies Preview;
