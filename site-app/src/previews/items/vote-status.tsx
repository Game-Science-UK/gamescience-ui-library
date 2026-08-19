import { VoteStatus } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-3">
      <VoteStatus voted={4} total={8} treatment="framed" />
      <VoteStatus voted={8} total={8} locked treatment="framed" />
      <VoteStatus voted={11} total={24} anonymous progress="bar" treatment="framed" />
    </div>
  ),
} satisfies Preview;
