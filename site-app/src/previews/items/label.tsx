import { Input, Label } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="display-name">Display name</Label>
      <Input id="display-name" placeholder="How the room sees you" />
    </div>
  ),
} satisfies Preview;
