import { Button } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button intent="primary">Commit</Button>
        <Button intent="secondary">Review</Button>
        <Button intent="outline">Details</Button>
        <Button intent="ghost">Skip</Button>
        <Button intent="danger">End round</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button loading>Submitting</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
} satisfies Preview;
