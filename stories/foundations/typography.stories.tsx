import type { Meta, StoryObj } from "@storybook/react-vite";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const meta = {
  title: "Foundations/Typography",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Type roles use semantic classes (`gs-display`, `gs-title`, `gs-body`, `gs-label`, `gs-mono`, `gs-data`, `gs-micro`) backed by theme tokens. Prefer these over ad-hoc font sizes.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Cohesive prose sample — structure mirrors shadbook’s Typography Demo. */
export const TypographyDemo: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-6 text-foreground">
      <h1 className="gs-display scroll-m-20 tracking-tight">Briefing: Operation Horizon</h1>
      <p className="gs-body leading-7 text-foreground">
        Once the room code is live, participants join from their phones while the shared display
        holds the lobby. Facilitators keep the session moving — the library only presents state you
        pass in.
      </p>
      <h2 className="gs-title mt-10 scroll-m-20 border-b border-border pb-2 tracking-tight first:mt-0">
        The facilitator plan
      </h2>
      <p className="gs-body leading-7">
        Keep the lobby open until the cohort looks ready, then confirm start. Prefer a{" "}
        <a
          href="#phase-directive"
          className="font-medium text-primary underline underline-offset-4"
        >
          phase directive
        </a>{" "}
        when you need a single clear instruction on every surface.
      </p>
      <blockquote className="mt-6 border-l-2 border-border pl-6 italic text-muted-foreground">
        “Everyone should know what to do next without reading the facilitator console.”
      </blockquote>
      <h3 className="gs-title mt-8 scroll-m-20 text-[length:var(--type-scale-title)] tracking-tight">
        Role checklist
      </h3>
      <p className="gs-body leading-7">Before you advance the stage, confirm:</p>
      <ul className="gs-body my-6 ml-4 list-disc marker:text-primary [&>li]:mt-2">
        <li>Participant join flow covers invalid codes and disconnect recovery</li>
        <li>Shared display shows the room code at display scale</li>
        <li>Status colours use intent tokens — never raw brand hex</li>
      </ul>
      <p className="gs-body leading-7">
        When the vote opens, keep counts anonymous until reveal. Outcome copy stays short enough to
        read from the back of the room.
      </p>
      <h3 className="gs-title mt-8 scroll-m-20 tracking-tight">Session signals</h3>
      <div className="my-6 w-full overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-t border-border">
              <th className="gs-label border border-border px-4 py-2">Signal</th>
              <th className="gs-label border border-border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border even:bg-muted/40">
              <td className="gs-body border border-border px-4 py-2">gs-display</td>
              <td className="gs-body border border-border px-4 py-2">Shared-display headlines</td>
            </tr>
            <tr className="border-t border-border even:bg-muted/40">
              <td className="gs-body border border-border px-4 py-2">gs-title</td>
              <td className="gs-body border border-border px-4 py-2">Section and panel headings</td>
            </tr>
            <tr className="border-t border-border even:bg-muted/40">
              <td className="gs-body border border-border px-4 py-2">gs-body</td>
              <td className="gs-body border border-border px-4 py-2">Participant reading copy</td>
            </tr>
            <tr className="border-t border-border even:bg-muted/40">
              <td className="gs-body border border-border px-4 py-2">gs-label / gs-micro</td>
              <td className="gs-body border border-border px-4 py-2">
                Meta, captions, dense chrome
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="gs-body leading-7">
        Room codes and OTP stay on{" "}
        <code className="gs-mono rounded-control bg-muted px-1.5 py-0.5 text-[length:var(--type-scale-label)]">
          gs-mono
        </code>{" "}
        or{" "}
        <code className="gs-data rounded-control bg-muted px-1.5 py-0.5 text-[length:var(--type-scale-label)]">
          gs-data
        </code>{" "}
        so digits stay tabular and scannable.
      </p>
      <Separator />
      <p className="gs-label text-muted-foreground">
        Switch Theme and Context in the toolbar — type tokens retune with the active theme.
      </p>
    </div>
  ),
};

export const Scale: Story = {
  render: () => (
    <div className="w-full max-w-xl space-y-6">
      <div className="space-y-1">
        <p className="gs-label text-muted-foreground">gs-display</p>
        <p className="gs-display">Display</p>
      </div>
      <div className="space-y-1">
        <p className="gs-label text-muted-foreground">gs-title</p>
        <p className="gs-title">Title</p>
      </div>
      <div className="space-y-1">
        <p className="gs-label text-muted-foreground">gs-body</p>
        <p className="gs-body">Body copy for participant and facilitator reading.</p>
      </div>
      <div className="space-y-1">
        <p className="gs-label text-muted-foreground">gs-label</p>
        <p className="gs-label">Label / meta</p>
      </div>
      <div className="space-y-1">
        <p className="gs-label text-muted-foreground">gs-mono</p>
        <p className="gs-mono">B7K2 · room code</p>
      </div>
      <div className="space-y-1">
        <p className="gs-label text-muted-foreground">gs-data</p>
        <p className="gs-data">12 / 18 ready</p>
      </div>
      <div className="space-y-1">
        <p className="gs-label text-muted-foreground">gs-micro</p>
        <p className="gs-micro text-muted-foreground">Micro · dense chrome</p>
      </div>
    </div>
  ),
};

export const InPanel: Story = {
  name: "In panel",
  render: () => (
    <Panel elevation="raised" className="w-full max-w-md space-y-3">
      <PanelHeader>
        <PanelTitle>Lobby ready</PanelTitle>
        <PanelDescription>Type roles inside a raised panel surface.</PanelDescription>
      </PanelHeader>
      <div className="flex flex-wrap items-center gap-2">
        <Badge intent="success">Ready</Badge>
        <span className="gs-label text-muted-foreground">14 participants</span>
      </div>
      <p className="gs-body text-muted-foreground">
        Keep supporting copy on body scale. Use labels for status chrome, not long paragraphs.
      </p>
    </Panel>
  ),
};
