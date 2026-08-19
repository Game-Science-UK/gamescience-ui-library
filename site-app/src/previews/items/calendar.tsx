import { Calendar } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  context: "facilitator",
  viewport: "full",
  render: () => <Calendar mode="single" selected={new Date(2026, 8, 14)} />,
} satisfies Preview;
