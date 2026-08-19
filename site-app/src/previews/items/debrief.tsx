import { Debrief } from "@/patterns";
import { debriefSectionsFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => <Debrief sections={debriefSectionsFixture} ratingValue={4} />,
} satisfies Preview;
