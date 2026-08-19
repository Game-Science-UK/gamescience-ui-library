import { Stat } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  context: "facilitator",
  viewport: "full",
  render: () => (
    <div className="grid gap-3 sm:grid-cols-3">
      <Stat label="Players" value="18" hint="of 20 joined" />
      <Stat label="Contained" value="7" intent="success" />
      <Stat label="Breached" value="2" intent="critical" />
    </div>
  ),
} satisfies Preview;
