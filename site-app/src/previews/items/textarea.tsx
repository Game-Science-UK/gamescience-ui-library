import { Textarea } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-3">
      <Textarea placeholder="What did your table decide, and why?" rows={4} />
      <Textarea placeholder="Disabled" rows={2} disabled />
    </div>
  ),
} satisfies Preview;
