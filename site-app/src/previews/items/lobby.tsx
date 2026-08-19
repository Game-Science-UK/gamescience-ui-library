import { FacilitatorLobby } from "@/patterns";
import { activeLobbyFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

export default {
  context: "facilitator",
  viewport: "full",
  render: () => <FacilitatorLobby {...activeLobbyFixture} onStart={() => undefined} />,
} satisfies Preview;
