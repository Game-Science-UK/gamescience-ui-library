import { DisplayHeading } from "@/components/display";
import type { Preview } from "@site/previews";

export default {
  context: "shared-display",
  viewport: "full",
  render: () => (
    <div className="space-y-6">
      <DisplayHeading eyebrow="Round 2">Discuss and decide</DisplayHeading>
      <DisplayHeading as="h2" eyebrow="Next">
        Voting opens shortly
      </DisplayHeading>
    </div>
  ),
} satisfies Preview;
