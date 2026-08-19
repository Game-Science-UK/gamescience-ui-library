import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  syncsDocument: true,
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button intent="outline">Why am I seeing this?</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="gs-body">Your role gives you access to this evidence.</p>
      </PopoverContent>
    </Popover>
  ),
} satisfies Preview;
