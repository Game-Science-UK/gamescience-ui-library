import { Separator } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-3">
      <p className="gs-body">Round 1 summary</p>
      <Separator />
      <p className="gs-body">Round 2 summary</p>
    </div>
  ),
} satisfies Preview;
