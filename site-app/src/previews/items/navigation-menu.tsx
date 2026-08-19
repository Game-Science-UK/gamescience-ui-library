import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  context: "facilitator",
  viewport: "full",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        {["Overview", "Roster", "Results"].map((label) => (
          <NavigationMenuItem key={label}>
            <NavigationMenuLink href="#">{label}</NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  ),
} satisfies Preview;
