import { FacilitatorConsole } from "@/patterns";
import { facilitatorConsoleFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

export default {
  context: "facilitator",
  viewport: "full",
  render: () => <FacilitatorConsole {...facilitatorConsoleFixture} />,
} satisfies Preview;
