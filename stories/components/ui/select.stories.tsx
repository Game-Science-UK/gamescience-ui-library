import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select sector" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="north">North</SelectItem>
        <SelectItem value="south">South</SelectItem>
        <SelectItem value="east">East</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <StoryFrame>
      <Select>
        <SelectTrigger className="w-72">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Participants</SelectLabel>
            <SelectItem value="analyst">Analyst</SelectItem>
            <SelectItem value="operator">Operator</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Facilitators</SelectLabel>
            <SelectItem value="lead">Lead facilitator</SelectItem>
            <SelectItem value="support">Support facilitator</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </StoryFrame>
  ),
};
