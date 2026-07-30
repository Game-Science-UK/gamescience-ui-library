import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Primary interactive control. Use semantic `intent` and `size` props. Theme appearance comes from GameScienceProvider — never pass theme props.",
      },
    },
  },
  argTypes: {
    intent: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost", "outline"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    emphasis: { control: "select", options: ["default", "strong"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Submit decision",
    intent: "primary",
    size: "lg",
  },
};

export const Variants: Story = {
  render: () => (
    <StoryFrame>
      <ButtonGroup>
        <Button intent="primary">Primary</Button>
        <Button intent="secondary">Secondary</Button>
        <Button intent="outline">Outline</Button>
        <Button intent="ghost">Ghost</Button>
        <Button intent="danger">Danger</Button>
      </ButtonGroup>
    </StoryFrame>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryFrame>
      <ButtonGroup>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </ButtonGroup>
    </StoryFrame>
  ),
};

export const States: Story = {
  render: () => (
    <StoryFrame>
      <ButtonGroup>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </ButtonGroup>
    </StoryFrame>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <ButtonGroup>
      <Button aria-label="Start session">Start</Button>
      <Button loading aria-busy>
        Saving
      </Button>
    </ButtonGroup>
  ),
};

export const Emphasis: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" className="w-full max-w-sm p-6">
      <Button intent="primary" emphasis="default" size="lg" className="w-full">
        Default emphasis
      </Button>
      <Button intent="primary" emphasis="strong" size="lg" className="w-full">
        Strong emphasis
      </Button>
      <Button intent="primary" emphasis="strong" size="lg" className="w-full" disabled>
        Strong disabled
      </Button>
      <Button intent="primary" emphasis="strong" size="lg" className="w-full" loading>
        Strong loading
      </Button>
    </ButtonGroup>
  ),
};
