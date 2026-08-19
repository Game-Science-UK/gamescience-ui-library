import { Toggle } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Toggle defaultPressed>Anonymous</Toggle>
      <Toggle>Show timer</Toggle>
    </div>
  ),
} satisfies Preview;
