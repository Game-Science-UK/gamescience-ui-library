import { ToggleGroup, ToggleGroupItem } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <ToggleGroup type="single" defaultValue="12">
      <ToggleGroupItem value="8">8 min</ToggleGroupItem>
      <ToggleGroupItem value="12">12 min</ToggleGroupItem>
      <ToggleGroupItem value="20">20 min</ToggleGroupItem>
    </ToggleGroup>
  ),
} satisfies Preview;
