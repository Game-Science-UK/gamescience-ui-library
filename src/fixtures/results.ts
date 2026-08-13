export const resultsFixture = {
  outcome: {
    label: "Outcome",
    title: "Contained exposure",
    description: "The room converged on a response that contained the cascade.",
    intent: "success" as const,
  },
  stats: [
    { label: "Agreement", value: "72%", intent: "success" as const },
    { label: "Rooms contained", value: "5 / 5" },
    { label: "Avg conviction", value: "2.4" },
  ],
  density: "facilitator" as const,
};

export const sharedDisplayResultsFixture = {
  outcome: {
    label: "Cohort result",
    title: "Elevated risk",
    description: "Aggregate impact across the cohort.",
    intent: "warning" as const,
  },
  stats: [
    { label: "Cohort result", value: "Elevated", intent: "warning" as const },
    { label: "Agreement", value: "68%" },
    { label: "Rooms", value: "6" },
  ],
  density: "shared-display" as const,
};
