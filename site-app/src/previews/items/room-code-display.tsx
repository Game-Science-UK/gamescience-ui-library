import { RoomCodeDisplay } from "@/components/display";
import type { Preview } from "@site/previews";

export default {
  context: "shared-display",
  viewport: "full",
  render: () => <RoomCodeDisplay code="4KZ9" />,
} satisfies Preview;
