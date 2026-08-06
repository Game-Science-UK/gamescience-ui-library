import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DateRange } from "react-day-picker";
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

export const RangeSelection: Story = {
  render: function Render() {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: undefined,
    });

    return (
      <StoryFrame>
        <Calendar
          mode="range"
          required={false}
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
        />
      </StoryFrame>
    );
  },
};

export const DisabledDates: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>();

    return (
      <StoryFrame>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </StoryFrame>
    );
  },
};
