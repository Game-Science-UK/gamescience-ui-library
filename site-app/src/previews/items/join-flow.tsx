import { useState } from "react";

import { ParticipantJoinFlow } from "@/patterns";
import type { Preview } from "@site/previews";

function JoinFlowPreview() {
  const [code, setCode] = useState("4KZ9");
  const [name, setName] = useState("");
  return (
    <ParticipantJoinFlow
      step="enter-identity"
      code={code}
      displayName={name}
      sessionTitle="Cascade"
      onCodeChange={setCode}
      onDisplayNameChange={setName}
      onSubmitCode={() => undefined}
      onSubmitIdentity={() => undefined}
    />
  );
}

export default { render: JoinFlowPreview } satisfies Preview;
