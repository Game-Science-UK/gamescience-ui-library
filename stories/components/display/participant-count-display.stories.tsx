import type { Meta, StoryObj } from "@storybook/react-vite";
import { ParticipantCountDisplay } from "@/components/display/participant-count-display";
import { activeSessionFixture, emptySessionFixture } from "@/fixtures/session";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Display/ParticipantCountDisplay",
  component: ParticipantCountDisplay,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryFrame className="flex min-h-[12rem] items-center justify-center">
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof ParticipantCountDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CountOnly: Story = {
  args: {
    count: activeSessionFixture.participantCount,
  },
};

export const WithExpected: Story = {
  args: {
    count: activeSessionFixture.participantCount,
    expected: activeSessionFixture.expectedParticipantCount,
  },
};

export const Empty: Story = {
  args: {
    count: emptySessionFixture.participantCount,
    expected: emptySessionFixture.expectedParticipantCount,
  },
};
