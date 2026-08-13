import type { Meta, StoryObj } from "@storybook/react-vite";
import { Results } from "@/patterns/results";
import { resultsFixture, sharedDisplayResultsFixture } from "@/fixtures/results";
import { FacilitatorShell, SharedDisplayShell } from "@/templates";

const meta = {
  title: "Components/Examples/Patterns/Results",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Staged outcome reveal: headline OutcomeSummary plus a Stat grid for detailed, public-safe metrics.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Facilitator: Story = {
  parameters: { viewport: { defaultViewport: "facilitator" } },
  globals: { context: "facilitator" },
  render: () => (
    <FacilitatorShell subtitle="Round results">
      <Results {...resultsFixture} />
    </FacilitatorShell>
  ),
};

export const SharedDisplay: Story = {
  parameters: { viewport: { defaultViewport: "sharedDisplay" } },
  globals: { context: "shared-display" },
  render: () => (
    <SharedDisplayShell>
      <Results {...sharedDisplayResultsFixture} />
    </SharedDisplayShell>
  ),
};
