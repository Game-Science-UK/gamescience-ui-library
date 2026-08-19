import { Skeleton } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-3">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-24 w-full" />
    </div>
  ),
} satisfies Preview;
