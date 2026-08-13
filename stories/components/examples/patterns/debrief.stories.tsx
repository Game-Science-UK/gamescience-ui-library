import type { Meta, StoryObj } from "@storybook/react-vite";
import { Debrief } from "@/patterns/debrief";
import { debriefFixture, debriefSectionsFixture } from "@/fixtures/debrief";
import { ParticipantShell } from "@/templates";

const meta = {
  title: "Patterns/Debrief",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Facilitated reflection using the What / So What / Now What structure with rating and response capture.",
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

export const Default: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <Debrief
        {...debriefFixture}
        sections={debriefSectionsFixture.map((section) => ({
          ...section,
          onResponseChange: () => undefined,
        }))}
      />
    </ParticipantShell>
  ),
};

export const WithoutRating: Story = {
  ...participant,
  render: () => (
    <ParticipantShell>
      <Debrief
        sections={debriefSectionsFixture.map((section) => ({
          ...section,
          onResponseChange: () => undefined,
        }))}
      />
    </ParticipantShell>
  ),
};
