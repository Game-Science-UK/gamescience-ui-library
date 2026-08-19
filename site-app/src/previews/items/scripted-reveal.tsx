import { ScriptedReveal } from "@/patterns";
import { scriptedRevealFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

export default {
  context: "shared-display",
  viewport: "full",
  render: () => <ScriptedReveal {...scriptedRevealFixture} />,
} satisfies Preview;
