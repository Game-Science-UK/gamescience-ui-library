import { OptionSelector } from "@/components/game";
import type { Preview } from "@site/previews";

const OPTIONS = [
  { id: "contain", title: "Contain", description: "Isolate the affected systems now." },
  { id: "escalate", title: "Escalate", description: "Brief the board before acting." },
  { id: "disclose", title: "Disclose", description: "Tell customers within the hour." },
];

export default {
  render: () => (
    <OptionSelector options={OPTIONS} selectedId="contain" label="Your recommendation" />
  ),
} satisfies Preview;
