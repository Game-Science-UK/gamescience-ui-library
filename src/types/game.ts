export type GameStage =
  | "join"
  | "lobby"
  | "role-allocation"
  | "briefing"
  | "information"
  | "discussion"
  | "decision"
  | "vote"
  | "event"
  | "results"
  | "debrief";

export type StageStatus = "not-started" | "ready" | "active" | "paused" | "complete" | "locked";

export type ConnectionState = "connected" | "reconnecting" | "offline";

export type ReadinessState = "not-ready" | "ready" | "submitted" | "waiting";

export interface ParticipantSummary {
  id: string;
  displayName: string;
  connection: ConnectionState;
  readiness: ReadinessState;
}

export interface SessionSummary {
  code: string;
  title?: string;
  participantCount: number;
  expectedParticipantCount?: number;
  stage: GameStage;
  status: StageStatus;
}
