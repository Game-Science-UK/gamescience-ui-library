import { OutcomeSummary } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <div className="space-y-3">
      <OutcomeSummary
        outcome={{
          label: "Round 2",
          title: "Contained",
          description: "Your table acted before the deadline.",
          intent: "success",
        }}
        metrics={[
          { label: "Time used", value: "8:42" },
          { label: "Agreement", value: "6 of 8", intent: "information" },
        ]}
      />
      <OutcomeSummary
        outcome={{ label: "Round 3", title: "Breached", intent: "critical" }}
        metrics={[{ label: "Time used", value: "12:00", intent: "critical" }]}
      />
    </div>
  ),
} satisfies Preview;
