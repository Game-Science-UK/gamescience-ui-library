import { Results } from "@/patterns";
import { resultsFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => <Results {...resultsFixture} />,
} satisfies Preview;
