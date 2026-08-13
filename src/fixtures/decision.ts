import type { DecisionOption, DecisionPhase } from "@/patterns/decision";

export const decisionOptionsFixture: DecisionOption[] = [
  { id: "a", title: "Contain and observe", description: "Watch the situation before acting" },
  { id: "b", title: "Escalate immediately", description: "Raise it now" },
  { id: "c", title: "Request more intelligence", description: "Gather more first" },
];

export const sealedDecisionFixture = {
  phase: "sealed" as DecisionPhase,
  directive: "Commit privately. Your choice stays hidden until reveal.",
  options: decisionOptionsFixture,
  selectedOptionId: "b",
  intensity: 2,
  maxIntensity: 3,
  hasCommitted: false,
};

export const committedDecisionFixture = {
  phase: "sealed" as DecisionPhase,
  directive: "Commit privately. Your choice stays hidden until reveal.",
  options: decisionOptionsFixture,
  selectedOptionId: "b",
  intensity: 2,
  maxIntensity: 3,
  hasCommitted: true,
};

export const declarationDecisionFixture = {
  phase: "declaration" as DecisionPhase,
  directive: "Choices are now public.",
  options: decisionOptionsFixture,
  declaration: [
    { participantId: "Team Alpha", optionId: "a" },
    { participantId: "Team Bravo", optionId: "b" },
    { participantId: "Team Charlie", optionId: "b" },
    { participantId: "Team Delta", optionId: "c" },
  ],
};

export const resolvedDecisionFixture = {
  phase: "resolved" as DecisionPhase,
  directive: "The room has resolved.",
  options: decisionOptionsFixture,
  result: {
    winningOptionId: "b",
    totals: { a: 6, b: 9, c: 3 },
    tie: false,
  },
};

export const tiedDecisionFixture = {
  phase: "resolved" as DecisionPhase,
  directive: "The room has resolved.",
  options: decisionOptionsFixture,
  result: {
    winningOptionId: "",
    totals: { a: 9, b: 9 },
    tie: true,
  },
};
