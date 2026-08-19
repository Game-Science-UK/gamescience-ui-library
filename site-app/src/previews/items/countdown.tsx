import { Countdown } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-3">
      <Countdown formattedTime="2:30" label="Discussion" treatment="contained" />
      <Countdown formattedTime="0:24" label="Closing" intent="warning" treatment="contained" />
      <Countdown
        formattedTime="0:00"
        label="Time"
        intent="critical"
        state="expired"
        treatment="contained"
      />
    </div>
  ),
} satisfies Preview;
