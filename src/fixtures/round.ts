import type { PhaseProgressStep } from "@/components/game/phase-progress";

export const sampleRoundFixture = {
  current: 1,
  total: 5,
  status: "active" as const,
  label: "Round 1 of 5",
};

export const roundStepsFixture: PhaseProgressStep[] = [
  { id: "brief", label: "Brief", status: "complete" },
  { id: "decide", label: "Decide", status: "active" },
  { id: "resolve", label: "Resolve", status: "pending" },
];

export const timedRoundFixture = {
  eyebrow: "Round 2 of 5",
  phase: "Decision",
  countdown: {
    formattedTime: "02:30",
    state: "running" as const,
    accessibleLabel: "2 minutes 30 seconds remaining",
  },
  steps: roundStepsFixture,
  activeStepId: "decide",
  directive: "Choose your response before the timer ends.",
};
