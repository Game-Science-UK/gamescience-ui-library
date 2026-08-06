import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";
import { StoryFrame } from "../../_utils/story-frame";

const intents = ["default", "primary", "success", "warning", "danger", "information"] as const;

const treatments = ["solid", "subtle", "outlined"] as const;

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    intent: { control: "select", options: [...intents] },
    treatment: { control: "select", options: [...treatments] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Active",
    intent: "primary",
    treatment: "solid",
  },
};

export const IntentTreatment: Story = {
  render: () => (
    <StoryFrame className="space-y-6">
      {treatments.map((treatment) => (
        <div key={treatment} className="space-y-2">
          <p className="gs-label capitalize text-muted-foreground">{treatment}</p>
          <div className="flex flex-wrap gap-2">
            {intents.map((intent) => (
              <Badge key={`${intent}-${treatment}`} intent={intent} treatment={treatment}>
                {intent}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </StoryFrame>
  ),
};
