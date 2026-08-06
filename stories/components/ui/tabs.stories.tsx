import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <Tabs defaultValue="live" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="live">Active session participants and votes.</TabsContent>
        <TabsContent value="history">Past sessions and exported results.</TabsContent>
        <TabsContent value="settings">Timer, scoring, and display preferences.</TabsContent>
      </Tabs>
    </StoryFrame>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <StoryFrame>
      <Tabs defaultValue="live" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings" disabled>
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="live">Active session participants and votes.</TabsContent>
        <TabsContent value="history">Past sessions and exported results.</TabsContent>
        <TabsContent value="settings">Timer, scoring, and display preferences.</TabsContent>
      </Tabs>
    </StoryFrame>
  ),
};
