import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <Select defaultValue="12">
      <SelectTrigger>
        <SelectValue placeholder="Round length" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="8">8 minutes</SelectItem>
        <SelectItem value="12">12 minutes</SelectItem>
        <SelectItem value="20">20 minutes</SelectItem>
      </SelectContent>
    </Select>
  ),
} satisfies Preview;
