import { Rating } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-4">
      <Rating value={4} label="How confident was the team?" />
      <Rating value={3} max={7} readOnly label="Recorded response" />
    </div>
  ),
} satisfies Preview;
