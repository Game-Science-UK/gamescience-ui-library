import { useState } from "react";

import { Briefing } from "@/patterns";
import { briefingSlidesFixture } from "@/fixtures";
import type { Preview } from "@site/previews";

function BriefingPreview() {
  const [active, setActive] = useState(briefingSlidesFixture[0]?.id ?? "");
  const index = briefingSlidesFixture.findIndex((slide) => slide.id === active);
  const move = (delta: number) =>
    setActive(
      briefingSlidesFixture[Math.min(Math.max(0, index + delta), briefingSlidesFixture.length - 1)]
        ?.id ?? active,
    );

  return (
    <Briefing
      slides={briefingSlidesFixture}
      activeSlideId={active}
      eyebrow="Round 2"
      title="Briefing"
      onPrevious={() => move(-1)}
      onNext={() => move(1)}
    />
  );
}

export default { viewport: "full", render: BriefingPreview } satisfies Preview;
