import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ParticipantIdentity } from "@/components/game/participant-identity";
import { RolePanel } from "@/components/game/role-panel";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/RolePanel",
  component: RolePanel,
  tags: ["autodocs"],
} satisfies Meta<typeof RolePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    role: { title: "Risk Analyst", subtitle: "Third-party oversight" },
    priorities: ["Identify exposure", "Escalate blockers", "Protect private goals"],
    objective: { title: "Limit cascade risk", goal: "Keep critical systems offline-safe" },
    defaultExpanded: false,
  },
  render: (args) => (
    <StoryFrame>
      <RolePanel {...args} />
    </StoryFrame>
  ),
};

export const Expanded: Story = {
  args: {
    role: { title: "Risk Analyst", subtitle: "Third-party oversight" },
    priorities: ["Identify exposure", "Escalate blockers"],
    defaultExpanded: true,
  },
  render: (args) => (
    <StoryFrame>
      <RolePanel {...args} />
    </StoryFrame>
  ),
};

export const Controlled: Story = {
  args: {
    role: { title: "Lead Facilitator" },
    priorities: ["Keep pace", "Surface dissent"],
  },
  render: function ControlledRender(args) {
    const [expanded, setExpanded] = useState(false);
    return (
      <StoryFrame>
        <RolePanel {...args} expanded={expanded} onExpandedChange={setExpanded} />
      </StoryFrame>
    );
  },
};

export const WithIdentitySlot: Story = {
  args: {
    role: { title: "Operator" },
    priorities: ["Monitor"],
    identity: <ParticipantIdentity value="Alex" onChange={() => undefined} />,
  },
  render: (args) => (
    <StoryFrame>
      <RolePanel {...args} />
    </StoryFrame>
  ),
};

export const WithoutObjective: Story = {
  args: {
    role: { title: "Observer" },
    priorities: ["Listen first"],
  },
  render: (args) => (
    <StoryFrame>
      <RolePanel {...args} />
    </StoryFrame>
  ),
};

export const LongPriorities: Story = {
  args: {
    role: { title: "Counsel" },
    defaultExpanded: true,
    priorities: [
      "Preserve privilege while coordinating cross-team disclosure",
      "Document assumptions that affect contractual exposure",
      "Avoid revealing private negotiation constraints on shared surfaces",
    ],
  },
  render: (args) => (
    <StoryFrame>
      <RolePanel {...args} />
    </StoryFrame>
  ),
};
