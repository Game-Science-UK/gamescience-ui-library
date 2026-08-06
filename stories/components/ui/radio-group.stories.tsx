import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="radio-a" />
        <Label htmlFor="radio-a">Option A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="radio-b" />
        <Label htmlFor="radio-b">Option B</Label>
      </div>
    </RadioGroup>
  ),
};

export const Options: Story = {
  render: () => (
    <StoryFrame>
      <RadioGroup defaultValue="north" className="gap-3">
        {[
          { value: "north", label: "North sector" },
          { value: "east", label: "East sector" },
          { value: "south", label: "South sector" },
          { value: "west", label: "West sector" },
        ].map(({ value, label }) => (
          <div key={value} className="flex items-center gap-2">
            <RadioGroupItem value={value} id={`radio-${value}`} />
            <Label htmlFor={`radio-${value}`}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </StoryFrame>
  ),
};
