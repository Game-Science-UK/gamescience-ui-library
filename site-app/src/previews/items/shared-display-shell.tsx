import { DisplayHeading } from "@/components/display";
import { SharedDisplayShell } from "@/templates";
import type { Preview } from "@site/previews";

export default {
  context: "shared-display",
  viewport: "full",
  render: () => (
    <SharedDisplayShell>
      <DisplayHeading eyebrow="Round 2">Discuss and decide</DisplayHeading>
    </SharedDisplayShell>
  ),
} satisfies Preview;
