import type { ConnectionState } from "@/types/game";

export type CompactConnectionState = "connected" | "reconnecting" | "offline";

/** Map banner-capable connection states onto compact ConnectionStatus props. */
export function toCompactConnectionState(state: ConnectionState): CompactConnectionState {
  switch (state) {
    case "connected":
    case "restored":
      return "connected";
    case "connecting":
    case "reconnecting":
    case "degraded":
      return "reconnecting";
    default:
      return "offline";
  }
}
