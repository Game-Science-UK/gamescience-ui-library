import { RolePanel } from "@/components/game";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <RolePanel
      role={{ title: "Head of Security", subtitle: "Private to you" }}
      objective={{ title: "Objective", goal: "Contain the breach without alarming customers." }}
      priorities={["Protect customer data", "Keep the board informed", "Avoid public disclosure"]}
      defaultExpanded
    />
  ),
} satisfies Preview;
