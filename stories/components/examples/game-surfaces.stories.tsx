import type { Meta, StoryObj } from "@storybook/react-vite";
import { Countdown } from "@/components/game/countdown";
import { PhaseDirective } from "@/components/game/phase-directive";
import { PhaseHeader } from "@/components/game/phase-header";
import { RolePanel } from "@/components/game/role-panel";
import { StickyActionBar } from "@/components/game/sticky-action-bar";
import { VoteStatus } from "@/components/game/vote-status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ParticipantShell } from "@/templates/participant-shell/participant-shell";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/Examples/Game Surfaces",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Phase, vote, and outcome compositions using approved game components inside context shells. Not published as registry patterns.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Storybook reference only — not a published DiscussionView pattern. */
export const ParticipantDiscussionComposition: Story = {
  name: "Participant discussion composition",
  render: () => (
    <StoryFrame variant="full" className="p-0">
      <ParticipantShell
        header={
          <PhaseHeader
            sticky
            eyebrow={<span className="gs-label text-muted-foreground">GameScience</span>}
            phase={<Badge intent="primary">Discussion</Badge>}
            trailing={
              <Countdown
                formattedTime="04:12"
                state="running"
                treatment="inline"
                accessibleLabel="4 minutes 12 seconds remaining"
              />
            }
          />
        }
        footer={
          <StickyActionBar status={<span className="gs-label text-muted-foreground">Ready?</span>}>
            <Button type="button" className="w-full">
              Mark ready
            </Button>
          </StickyActionBar>
        }
      >
        <div className="w-full space-y-4">
          <RolePanel
            role={{ title: "Risk Analyst", subtitle: "Private role" }}
            priorities={["Surface conflicts", "Protect private goals"]}
            objective={{ title: "Contain cascade risk" }}
            defaultExpanded
          />
          <PhaseDirective treatment="strip" eyebrow="Directive" intent="information">
            Align on one recommendation before the vote opens.
          </PhaseDirective>
        </div>
      </ParticipantShell>
    </StoryFrame>
  ),
};

/** Storybook reference only — not a published VoteView pattern. */
export const ParticipantVoteComposition: Story = {
  name: "Participant vote composition",
  render: () => (
    <StoryFrame variant="full" className="p-0">
      <ParticipantShell
        header={
          <PhaseHeader
            sticky
            intent="warning"
            eyebrow={<span className="gs-label">Session</span>}
            phase={<Badge intent="warning">Vote</Badge>}
            trailing={
              <Countdown
                formattedTime="00:42"
                intent="warning"
                state="running"
                treatment="inline"
              />
            }
          />
        }
        footer={
          <StickyActionBar status={<VoteStatus voted={3} total={5} progress="pips" size="sm" />}>
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" className="w-full">
                  Confirm selection
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Lock selection?</DialogTitle>
                  <DialogDescription>
                    Application owns vote mutations. This dialog is composition chrome only.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="button">Lock in</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </StickyActionBar>
        }
      >
        <div className="w-full space-y-4">
          <PhaseDirective treatment="panel" eyebrow="Cast" intent="warning">
            Select one option. Your choice stays private until reveal.
          </PhaseDirective>
          <VoteStatus voted={3} total={5} anonymous treatment="framed" />
        </div>
      </ParticipantShell>
    </StoryFrame>
  ),
};
