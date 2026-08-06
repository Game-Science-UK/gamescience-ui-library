import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/ToggleGroup",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Grouped toggles for single or multiple selection. Use `type="single"` or `type="multiple"` — theme appearance comes from GameScienceProvider.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Single: Story = {
  render: () => (
    <StoryFrame>
      <ToggleGroup type="single" defaultValue="center" variant="outline">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight />
        </ToggleGroupItem>
      </ToggleGroup>
    </StoryFrame>
  ),
};

export const Multiple: Story = {
  render: () => (
    <StoryFrame>
      <ToggleGroup type="multiple" defaultValue={["bold"]} variant="outline">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          I
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          U
        </ToggleGroupItem>
      </ToggleGroup>
    </StoryFrame>
  ),
};
