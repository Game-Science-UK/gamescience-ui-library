import { useState } from "react";

import { ParticipantIdentity } from "@/components/game";
import type { Preview } from "@site/previews";

function ParticipantIdentityPreview() {
  const [name, setName] = useState("Amara");
  return (
    <div className="space-y-4">
      <ParticipantIdentity value={name} onChange={setName} hint="Shown to the whole room." />
      <ParticipantIdentity value="" onChange={() => undefined} error="Enter a display name." />
    </div>
  );
}

export default { render: ParticipantIdentityPreview } satisfies Preview;
