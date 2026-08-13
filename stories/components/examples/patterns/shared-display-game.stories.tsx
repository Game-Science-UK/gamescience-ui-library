import type { Meta, StoryObj } from "@storybook/react-vite";
import { SharedDisplayGame } from "@/patterns/shared-display-game";
import { Results } from "@/patterns/results";
import {
  sharedDisplayGameFixture,
  waitingDisplayGameFixture,
} from "@/fixtures/shared-display-game";
import { sharedDisplayResultsFixture } from "@/fixtures/results";
import { SharedDisplayShell } from "@/templates";

const meta = {
  title: "Patterns/Shared Display Game",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "In-game shared display states (waiting / active / reveal / results / debrief), privacy-safe by contract.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const display = {
  parameters: { viewport: { defaultViewport: "sharedDisplay" } },
  globals: { context: "shared-display" },
};

export const Waiting: Story = {
  ...display,
  render: () => (
    <SharedDisplayShell>
      <SharedDisplayGame {...waitingDisplayGameFixture} />
    </SharedDisplayShell>
  ),
};

export const Active: Story = {
  ...display,
  render: () => (
    <SharedDisplayShell>
      <SharedDisplayGame {...sharedDisplayGameFixture} />
    </SharedDisplayShell>
  ),
};

export const ResultsState: Story = {
  ...display,
  render: () => (
    <SharedDisplayShell>
      <SharedDisplayGame state="results" eyebrow="GameScience session" heading="Cohort results">
        <Results {...sharedDisplayResultsFixture} />
      </SharedDisplayGame>
    </SharedDisplayShell>
  ),
};
