import type { Meta, StoryObj } from "@storybook/react-vite";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Panel",
  component: Panel,
  tags: ["autodocs"],
  argTypes: {
    elevation: { control: "select", options: ["flat", "subtle", "raised", "overlay"] },
    emphasis: { control: "select", options: ["default", "strong"] },
    padding: { control: "select", options: ["none", "sm", "md", "lg"] },
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <StoryFrame>
      <Panel {...args} className="max-w-md">
        <PanelHeader>
          <PanelTitle>Round briefing</PanelTitle>
          <PanelDescription>Review objectives before the session begins.</PanelDescription>
        </PanelHeader>
        <p className="text-muted-foreground">Panel content inherits semantic surface tokens.</p>
      </Panel>
    </StoryFrame>
  ),
  args: {
    elevation: "raised",
    emphasis: "default",
    padding: "md",
  },
};

export const Elevations: Story = {
  render: () => (
    <StoryFrame className="grid max-w-md gap-4">
      {(["flat", "subtle", "raised", "overlay"] as const).map((elevation) => (
        <Panel key={elevation} elevation={elevation}>
          <PanelHeader>
            <PanelTitle className="capitalize">{elevation}</PanelTitle>
            <PanelDescription>Elevation `{elevation}` surface treatment.</PanelDescription>
          </PanelHeader>
        </Panel>
      ))}
    </StoryFrame>
  ),
};

export const Emphasis: Story = {
  render: () => (
    <StoryFrame className="grid max-w-md gap-4">
      {(["default", "strong"] as const).map((emphasis) => (
        <Panel key={emphasis} emphasis={emphasis}>
          <PanelHeader>
            <PanelTitle className="capitalize">{emphasis} emphasis</PanelTitle>
            <PanelDescription>Compare emphasis levels on the same elevation.</PanelDescription>
          </PanelHeader>
        </Panel>
      ))}
    </StoryFrame>
  ),
};

export const Padding: Story = {
  render: () => (
    <StoryFrame className="grid max-w-md gap-4">
      {(["none", "sm", "md", "lg"] as const).map((padding) => (
        <Panel key={padding} padding={padding} elevation="raised">
          <PanelHeader>
            <PanelTitle className="capitalize">Padding {padding}</PanelTitle>
            <PanelDescription>Content inset for `{padding}` padding.</PanelDescription>
          </PanelHeader>
        </Panel>
      ))}
    </StoryFrame>
  ),
};
