import { SharedDisplayGame } from "@/patterns";
import { sharedDisplayGameFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

export default {
  context: "shared-display",
  viewport: "full",
  render: () => <SharedDisplayGame {...sharedDisplayGameFixture} />,
} satisfies Preview;
