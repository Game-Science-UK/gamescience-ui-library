import type { Meta, StoryObj } from "@storybook/react-vite";
import { RoomCodeDisplay } from "@/components/display/room-code-display";
import { activeSessionFixture } from "@/fixtures/session";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Display/RoomCodeDisplay",
  component: RoomCodeDisplay,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryFrame className="flex min-h-[12rem] items-center justify-center">
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof RoomCodeDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    code: activeSessionFixture.code,
  },
};

export const CustomLabel: Story = {
  args: {
    code: activeSessionFixture.code,
    label: "Enter this code on your device",
  },
};
