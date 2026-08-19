import { Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  syncsDocument: true,
  context: "facilitator",
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button intent="ghost">Table 3</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="gs-body">6 players · all connected · committed at 4:12</p>
      </HoverCardContent>
    </HoverCard>
  ),
} satisfies Preview;
