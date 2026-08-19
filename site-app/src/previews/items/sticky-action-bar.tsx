import { Button } from "@/components/ui";
import { StickyActionBar } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <StickyActionBar status="4 of 8 committed" sticky={false}>
      <Button intent="primary" className="w-full">
        Commit answer
      </Button>
    </StickyActionBar>
  ),
} satisfies Preview;
