import { Slider } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-6 py-2">
      <Slider defaultValue={[40]} max={100} step={1} />
      <Slider defaultValue={[25, 75]} max={100} step={5} />
    </div>
  ),
} satisfies Preview;
