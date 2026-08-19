import { useState } from "react";

import { GameCodeInput } from "@/components/game";
import type { Preview } from "@site/previews";

function GameCodeInputPreview() {
  const [code, setCode] = useState("4KZ");
  return (
    <div className="space-y-4">
      <GameCodeInput value={code} onChange={setCode} />
      <GameCodeInput value="XXXX" onChange={() => undefined} error="That code is not active." />
    </div>
  );
}

export default { render: GameCodeInputPreview } satisfies Preview;
