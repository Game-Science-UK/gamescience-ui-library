import type { Meta, StoryObj } from "@storybook/react-vite";
import { DisplayHeading } from "@/components/display/display-heading";
import { activeSessionFixture } from "@/fixtures/session";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Display/DisplayHeading",
  component: DisplayHeading,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryFrame className="flex min-h-[12rem] items-center justify-center">
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof DisplayHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Levels: Story = {
  args: {
    children: activeSessionFixture.title,
  },
  render: () => (
    <div className="grid w-full max-w-2xl gap-8">
      <DisplayHeading as="h1">{activeSessionFixture.title}</DisplayHeading>
      <DisplayHeading as="h2">Lobby</DisplayHeading>
      <DisplayHeading as="h3">Waiting for participants</DisplayHeading>
    </div>
  ),
};

export const WithEyebrow: Story = {
  args: {
    eyebrow: "Strategy Simulation",
    children: activeSessionFixture.title,
  },
};
