import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No players yet</EmptyTitle>
        <EmptyDescription>Share the room code to begin.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
} satisfies Preview;
