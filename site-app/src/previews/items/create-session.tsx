import { CreateSession } from "@/patterns";
import { createSessionFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

export default {
  context: "facilitator",
  viewport: "full",
  render: () => (
    <CreateSession
      {...createSessionFixture}
      onSessionNameChange={() => undefined}
      onSubmit={() => undefined}
    />
  ),
} satisfies Preview;
