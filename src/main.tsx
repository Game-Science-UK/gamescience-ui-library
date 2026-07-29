import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameScienceProvider } from "@/providers";
import { ParticipantShell } from "@/templates";
import { ParticipantJoinFlow } from "@/patterns";
import { Toaster } from "@/components/ui";
import "@/dev/tailwind3-entry.css";
import "@/foundations/index.css";
import "@/themes/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameScienceProvider theme="gamescience" context="participant">
      <ParticipantShell>
        <ParticipantJoinFlow
          step="enter-code"
          code=""
          displayName=""
          onCodeChange={() => undefined}
          onDisplayNameChange={() => undefined}
          onSubmitCode={() => undefined}
          onSubmitIdentity={() => undefined}
        />
      </ParticipantShell>
      <Toaster />
    </GameScienceProvider>
  </StrictMode>,
);
