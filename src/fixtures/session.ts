import type { SessionSummary } from "@/types/game";

export const emptySessionFixture: SessionSummary = {
  code: "B7K2",
  title: "Strategy Simulation",
  participantCount: 0,
  expectedParticipantCount: 24,
  stage: "lobby",
  status: "not-started",
};

export const activeSessionFixture: SessionSummary = {
  code: "B7K2",
  title: "Strategy Simulation",
  participantCount: 18,
  expectedParticipantCount: 24,
  stage: "lobby",
  status: "active",
};

export const readySessionFixture: SessionSummary = {
  code: "B7K2",
  title: "Strategy Simulation",
  participantCount: 24,
  expectedParticipantCount: 24,
  stage: "lobby",
  status: "ready",
};
