import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { StoryFrame } from "../../_utils/story-frame";

const meta = {
  title: "Components/UI/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Stages</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-48 gap-2 p-4">
                <li>
                  <NavigationMenuLink href="#">Briefing</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">Vote</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">Debrief</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="inline-flex h-9 items-center px-4 text-sm">
              Participants
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </StoryFrame>
  ),
};

export const SimpleLinks: Story = {
  render: () => (
    <StoryFrame>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="inline-flex h-9 items-center px-4 text-sm">
              Briefing
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="inline-flex h-9 items-center px-4 text-sm">
              Vote
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="inline-flex h-9 items-center px-4 text-sm">
              Debrief
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </StoryFrame>
  ),
};
