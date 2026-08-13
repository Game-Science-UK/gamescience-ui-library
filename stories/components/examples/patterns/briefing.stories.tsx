import type { Meta, StoryObj } from "@storybook/react-vite";
import { Briefing } from "@/patterns/briefing";
import { briefingFixture, lastBriefingSlideId } from "@/fixtures/briefing";
import { ParticipantShell } from "@/templates";

const meta = {
  title: "Patterns/Briefing",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Paced briefing / walkthrough with phase progress for slide position. Navigation callbacks stay application-owned.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const participant = {
  parameters: { viewport: { defaultViewport: "participant" } },
  globals: { context: "participant" },
};

export const FirstSlide: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <Briefing {...briefingFixture} onNext={() => undefined} />
    </ParticipantShell>
  ),
};

export const MiddleSlide: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <Briefing
        {...briefingFixture}
        activeSlideId="roles"
        onPrevious={() => undefined}
        onNext={() => undefined}
      />
    </ParticipantShell>
  ),
};

export const FinalSlide: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <Briefing
        {...briefingFixture}
        activeSlideId={lastBriefingSlideId}
        onPrevious={() => undefined}
        onComplete={() => undefined}
      />
    </ParticipantShell>
  ),
};
