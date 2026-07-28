import type { ParticipantSummary } from "@/types/game";
import { activeSessionFixture, emptySessionFixture, readySessionFixture } from "./session";

export const emptyLobbyParticipants: ParticipantSummary[] = [];

export const joiningLobbyParticipants: ParticipantSummary[] = [
  {
    id: "p-1",
    displayName: "Team Alpha",
    connection: "connected",
    readiness: "ready",
  },
  {
    id: "p-2",
    displayName: "Team Bravo",
    connection: "connected",
    readiness: "not-ready",
  },
  {
    id: "p-3",
    displayName: "Team Charlie",
    connection: "reconnecting",
    readiness: "waiting",
  },
  {
    id: "p-4",
    displayName: "Team Delta",
    connection: "offline",
    readiness: "not-ready",
  },
];

export const readyLobbyParticipants: ParticipantSummary[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: `p-${index + 1}`,
    displayName: `Team ${String.fromCharCode(65 + index)}`,
    connection: "connected" as const,
    readiness: "ready" as const,
  }),
);

export const emptyLobbyFixture = {
  session: emptySessionFixture,
  participants: emptyLobbyParticipants,
  status: "not-started" as const,
};

export const activeLobbyFixture = {
  session: activeSessionFixture,
  participants: joiningLobbyParticipants,
  status: "active" as const,
};

export const readyLobbyFixture = {
  session: readySessionFixture,
  participants: readyLobbyParticipants,
  status: "ready" as const,
};
