import type { SharedDisplayGameState } from "@/patterns/shared-display-game";
import { roundStepsFixture } from "./round";

export const sharedDisplayGameFixture = {
  state: "active" as SharedDisplayGameState,
  eyebrow: "GameScience session",
  heading: "Decision in progress",
  description: "Follow the room as decisions resolve.",
  steps: roundStepsFixture,
  activeStepId: "decide",
  progressLabel: "Round progress",
};

export const waitingDisplayGameFixture = {
  state: "waiting" as SharedDisplayGameState,
  eyebrow: "GameScience session",
  heading: "Stand by",
  description: "The facilitator will advance the room shortly.",
};
