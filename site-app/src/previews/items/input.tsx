import { Input } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-3">
      <Input placeholder="Display name" defaultValue="" />
      <Input placeholder="Invalid entry" aria-invalid defaultValue="AB12" />
      <Input placeholder="Disabled" disabled />
    </div>
  ),
} satisfies Preview;
