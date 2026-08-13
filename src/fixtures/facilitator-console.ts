import { activeSessionFixture } from "./session";
import { joiningLobbyParticipants } from "./lobby";

export const facilitatorConsoleFixture = {
  session: activeSessionFixture,
  participants: joiningLobbyParticipants,
  status: "active" as const,
  phaseLabel: "Discussion",
  progressValue: 60,
  progressLabel: "Round progress",
};

export const pausedConsoleFixture = {
  session: activeSessionFixture,
  participants: joiningLobbyParticipants,
  status: "paused" as const,
  phaseLabel: "Discussion",
  progressValue: 60,
  progressLabel: "Round progress",
};
