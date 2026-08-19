import { Progress } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-4">
      <Progress value={30} />
      <Progress value={72} />
      <Progress value={100} />
    </div>
  ),
} satisfies Preview;
