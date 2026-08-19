import { Checkbox, Label } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox id="ack" defaultChecked />
        <Label htmlFor="ack">I have read the brief</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="rehearse" />
        <Label htmlFor="rehearse">Run a rehearsal round</Label>
      </div>
    </div>
  ),
} satisfies Preview;
