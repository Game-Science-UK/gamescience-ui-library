import { AttentionTakeover } from "@/patterns";
import { attentionTakeoverFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

export default {
  render: () => <AttentionTakeover {...attentionTakeoverFixture} onAcknowledge={() => undefined} />,
} satisfies Preview;
