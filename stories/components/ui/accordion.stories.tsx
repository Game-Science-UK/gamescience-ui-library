import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { type: "single", collapsible: true },
  render: (args) => (
    <StoryFrame>
      <Accordion {...args} className="w-full max-w-md">
        <AccordionItem value="briefing">
          <AccordionTrigger>Briefing objectives</AccordionTrigger>
          <AccordionContent>
            Review the scenario context and team roles before voting begins.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rules">
          <AccordionTrigger>Session rules</AccordionTrigger>
          <AccordionContent>
            One vote per participant. Facilitator controls stage transitions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>Need help?</AccordionTrigger>
          <AccordionContent>
            Raise your hand or message the facilitator from the lobby panel.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </StoryFrame>
  ),
};

export const DefaultOpen: Story = {
  args: { type: "single", collapsible: true, defaultValue: "briefing" },
  render: (args) => (
    <StoryFrame>
      <Accordion {...args} className="w-full max-w-md">
        <AccordionItem value="briefing">
          <AccordionTrigger>Briefing objectives</AccordionTrigger>
          <AccordionContent>
            Review the scenario context and team roles before voting begins.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rules">
          <AccordionTrigger>Session rules</AccordionTrigger>
          <AccordionContent>
            One vote per participant. Facilitator controls stage transitions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </StoryFrame>
  ),
};

export const MultipleOpen: Story = {
  args: { type: "multiple", defaultValue: ["briefing", "support"] },
  render: (args) => (
    <StoryFrame>
      <Accordion {...args} className="w-full max-w-md">
        <AccordionItem value="briefing">
          <AccordionTrigger>Briefing objectives</AccordionTrigger>
          <AccordionContent>
            Review the scenario context and team roles before voting begins.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rules">
          <AccordionTrigger>Session rules</AccordionTrigger>
          <AccordionContent>
            One vote per participant. Facilitator controls stage transitions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>Need help?</AccordionTrigger>
          <AccordionContent>
            Raise your hand or message the facilitator from the lobby panel.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </StoryFrame>
  ),
};
