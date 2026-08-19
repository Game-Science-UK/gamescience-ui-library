import { Badge } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Neutral</Badge>
      <Badge intent="success">Contained</Badge>
      <Badge intent="warning">Cooling</Badge>
      <Badge intent="danger">Breached</Badge>
    </div>
  ),
} satisfies Preview;
