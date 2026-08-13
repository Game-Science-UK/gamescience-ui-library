export const attentionTakeoverFixture = {
  eyebrow: "Look up",
  headline: "Watch the shared display",
  description: "The room is revealing results on the main screen.",
  intent: "information" as const,
};

export const urgentAttentionTakeoverFixture = {
  eyebrow: "Time check",
  headline: "Final decision window",
  description: "Lock your choice on the shared display before the timer ends.",
  intent: "warning" as const,
  countdown: { formattedTime: "00:30", accessibleLabel: "30 seconds remaining" },
};
