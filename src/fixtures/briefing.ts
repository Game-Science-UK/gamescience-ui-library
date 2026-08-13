import type { BriefingSlide } from "@/patterns/briefing";

export const briefingSlidesFixture: BriefingSlide[] = [
  {
    id: "context",
    title: "Context",
    body: "A critical system is showing signs of instability and the room must agree on a response.",
  },
  {
    id: "mission",
    title: "Mission",
    body: "Align on a single recommendation that contains the cascade risk before the deadline.",
  },
  {
    id: "roles",
    title: "Roles",
    body: "Each team holds private priorities. Balance your own objective with the shared outcome.",
  },
  {
    id: "rules",
    title: "Rules",
    body: "Choices stay private until reveal. The shared display reflects the aggregate only.",
  },
];

export const briefingFixture = {
  eyebrow: "Mission briefing",
  title: "Briefing",
  slides: briefingSlidesFixture,
  activeSlideId: "context",
};

export const lastBriefingSlideId = briefingSlidesFixture[briefingSlidesFixture.length - 1]!.id;
