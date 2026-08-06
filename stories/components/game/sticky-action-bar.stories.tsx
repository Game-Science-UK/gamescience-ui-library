import type { Meta, StoryObj } from "@storybook/react-vite";
import { StickyActionBar } from "@/components/game/sticky-action-bar";
import { VoteStatus } from "@/components/game/vote-status";
import { Button } from "@/components/ui/button";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Game/StickyActionBar",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <StoryFrame className="flex min-h-[50vh] flex-col justify-end p-0">
      <StickyActionBar>
        <Button type="button" className="w-full">
          Continue
        </Button>
      </StickyActionBar>
    </StoryFrame>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <StoryFrame className="flex min-h-[50vh] flex-col justify-end p-0">
      <StickyActionBar status={<VoteStatus voted={2} total={5} progress="pips" />}>
        <Button type="button" className="w-full">
          Cast vote
        </Button>
      </StickyActionBar>
    </StoryFrame>
  ),
};

export const Information: Story = {
  render: () => (
    <StoryFrame className="flex min-h-[50vh] flex-col justify-end p-0">
      <StickyActionBar
        intent="information"
        status={<span className="gs-label">Waiting for the room to advance</span>}
      >
        <Button type="button" intent="outline" className="w-full" disabled>
          Locked
        </Button>
      </StickyActionBar>
    </StoryFrame>
  ),
};

export const Warning: Story = {
  render: () => (
    <StoryFrame className="flex min-h-[50vh] flex-col justify-end p-0">
      <StickyActionBar intent="warning" status={<span className="gs-label">Time running out</span>}>
        <Button type="button" intent="danger" className="w-full">
          Lock in
        </Button>
      </StickyActionBar>
    </StoryFrame>
  ),
};

export const Critical: Story = {
  render: () => (
    <StoryFrame className="flex min-h-[50vh] flex-col justify-end p-0">
      <StickyActionBar intent="critical" status={<span className="gs-label">Final seconds</span>}>
        <Button type="button" intent="danger" className="w-full">
          Submit now
        </Button>
      </StickyActionBar>
    </StoryFrame>
  ),
};

export const MobileSafeArea: Story = {
  render: () => (
    <StoryFrame className="mx-auto flex min-h-[70vh] max-w-[390px] flex-col justify-end p-0">
      <div className="gs-body flex-1 p-4">Scrollable content above the action region.</div>
      <StickyActionBar>
        <Button type="button" className="w-full">
          Primary action
        </Button>
      </StickyActionBar>
    </StoryFrame>
  ),
};

export const KeyboardViewportStress: Story = {
  render: () => (
    <StoryFrame className="mx-auto flex min-h-[80vh] max-w-[390px] flex-col p-0">
      <div className="flex-1 space-y-3 p-4">
        <label className="gs-label" htmlFor="note">
          Note
        </label>
        <textarea
          id="note"
          className="min-h-32 w-full rounded-control border border-border bg-surface p-3"
          defaultValue="Focus this field — sticky bar should not silently cover it when layout owns scroll."
        />
      </div>
      <StickyActionBar sticky>
        <Button type="button" className="w-full">
          Save
        </Button>
      </StickyActionBar>
    </StoryFrame>
  ),
};
