import { ScrollArea } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <ScrollArea className="h-40 rounded-panel border p-3">
      <div className="space-y-2">
        {Array.from({ length: 14 }, (_, index) => (
          <p key={index} className="gs-body">
            Intelligence update {index + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
} satisfies Preview;
