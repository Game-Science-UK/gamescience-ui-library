import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";

const meta = {
  title: "Foundations/Themes",
  parameters: {
    docs: {
      description: {
        component:
          "Use the Storybook Theme, Context, and Register toolbar controls to preview every theme across all experience contexts.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const TokenSurfaces: Story = {
  render: () => (
    <div className="grid gap-4 p-6 md:grid-cols-2">
      <Panel elevation="flat">
        <PanelHeader>
          <PanelTitle>Flat surface</PanelTitle>
          <PanelDescription>Background and border tokens</PanelDescription>
        </PanelHeader>
        <Button intent="primary">Primary action</Button>
      </Panel>
      <Panel elevation="raised">
        <PanelHeader>
          <PanelTitle>Raised surface</PanelTitle>
          <PanelDescription>Card elevation and accent badges</PanelDescription>
        </PanelHeader>
        <div className="flex flex-wrap gap-2">
          <Badge intent="success">Ready</Badge>
          <Badge intent="warning">Reconnecting</Badge>
          <Badge intent="danger">Offline</Badge>
        </div>
      </Panel>
    </div>
  ),
};
