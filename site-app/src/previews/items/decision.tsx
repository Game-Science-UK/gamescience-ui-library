import { Decision } from "@/patterns";
import { sealedDecisionFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => <Decision {...sealedDecisionFixture} />,
} satisfies Preview;
