import { SharedDisplayLobby } from "@/patterns";
import { activeSessionFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

export default {
  context: "shared-display",
  viewport: "full",
  render: () => <SharedDisplayLobby session={activeSessionFixture} status="active" />,
} satisfies Preview;
