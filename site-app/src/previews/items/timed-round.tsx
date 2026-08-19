import { Panel } from "@/components/ui";
import { TimedRound } from "@/patterns";
import { timedRoundFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <TimedRound {...timedRoundFixture}>
      <Panel>
        <p className="gs-body">Round content is supplied by the application.</p>
      </Panel>
    </TimedRound>
  ),
} satisfies Preview;
