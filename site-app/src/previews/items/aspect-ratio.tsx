import { AspectRatio } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <AspectRatio ratio={16 / 9} className="rounded-card border">
      <div className="gs-label flex h-full items-center justify-center">16 : 9 media slot</div>
    </AspectRatio>
  ),
} satisfies Preview;
