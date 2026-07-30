import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "@/components/ui/calendar";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <StoryFrame>
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </StoryFrame>
    );
  },
};
