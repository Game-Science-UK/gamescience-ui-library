import { IntensitySelector } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <IntensitySelector value={3} max={5} label="How confident are you?" unitLabel="confidence" />
  ),
} satisfies Preview;
