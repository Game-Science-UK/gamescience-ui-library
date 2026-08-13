import type { ScriptedRevealStep } from "@/patterns/scripted-reveal";

export const scriptedRevealFixture = {
  step: "countdown" as ScriptedRevealStep,
  eyebrow: "Market event",
  headline: "Regulator intervenes",
  description: "A regulator announces new constraints mid-round.",
  countdown: { formattedTime: "00:10", accessibleLabel: "10 seconds remaining" },
};

export const announcedRevealFixture = {
  step: "announce" as ScriptedRevealStep,
  eyebrow: "Market event",
  headline: "Regulator intervenes",
  description: "A regulator announces new constraints mid-round.",
};

export const revealedFixture = {
  step: "revealed" as ScriptedRevealStep,
  eyebrow: "Market event",
  headline: "New constraints are live",
  description: "The round has been updated with the regulator's constraints.",
  intent: "success" as const,
};
