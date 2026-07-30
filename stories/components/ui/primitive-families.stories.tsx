import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Inbox } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StoryFrame } from "../../_utils/story-frame";

function Frame({ children }: { children: ReactNode }) {
  return <StoryFrame className="min-h-[28rem]">{children}</StoryFrame>;
}

const meta = {
  title: "Components/UI/Primitive families",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Grouped galleries of core UI primitives. Switch theme with the Storybook toolbar — stories inherit the preview provider and do not nest GameScienceProvider.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Forms: Story = {
  name: "Forms",
  render: () => (
    <Frame>
      <div className="grid max-w-md gap-3">
        <div className="grid gap-1">
          <Label htmlFor="gallery-name">Name</Label>
          <Input id="gallery-name" placeholder="Participant name" />
        </div>
        <Textarea placeholder="Notes" />
        <div className="flex items-center gap-2">
          <Checkbox id="gallery-ready" />
          <Label htmlFor="gallery-ready">Ready</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="gallery-notify" />
          <Label htmlFor="gallery-notify">Notify</Label>
        </div>
        <RadioGroup defaultValue="a" className="flex gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="a" id="gallery-a" />
            <Label htmlFor="gallery-a">Option A</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="b" id="gallery-b" />
            <Label htmlFor="gallery-b">Option B</Label>
          </div>
        </RadioGroup>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="north">North</SelectItem>
            <SelectItem value="south">South</SelectItem>
          </SelectContent>
        </Select>
        <Slider defaultValue={[42]} max={100} step={1} />
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSeparator />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <Button>Submit</Button>
      </div>
    </Frame>
  ),
};

export const Overlays: Story = {
  name: "Overlays",
  render: () => (
    <Frame>
      <TooltipProvider>
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button intent="secondary">Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm start</DialogTitle>
                <DialogDescription>Review participants before starting the session.</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button intent="secondary">Alert dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>End session?</AlertDialogTitle>
                <AlertDialogDescription>
                  Participants will be returned to the join screen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>End session</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Sheet>
            <SheetTrigger asChild>
              <Button intent="secondary">Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Session details</SheetTitle>
                <SheetDescription>Operational metadata for the active room.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Drawer>
            <DrawerTrigger asChild>
              <Button intent="secondary">Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Mobile actions</DrawerTitle>
                <DrawerDescription>Participant-safe actions for small screens.</DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
          <Popover>
            <PopoverTrigger asChild>
              <Button intent="secondary">Popover</Button>
            </PopoverTrigger>
            <PopoverContent>Quick reference for the current stage.</PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button intent="secondary">Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>Connection is stable</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </Frame>
  ),
};

export const Menus: Story = {
  name: "Menus",
  render: () => (
    <Frame>
      <div className="flex flex-wrap items-start gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button intent="secondary">Dropdown</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ContextMenu>
          <ContextMenuTrigger className="flex h-24 w-48 items-center justify-center rounded-card border border-dashed border-border text-sm text-muted-foreground">
            Right click
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Refresh</ContextMenuItem>
            <ContextMenuItem>Inspect</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New session</MenubarItem>
              <MenubarItem>Export report</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                Overview
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                Participants
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Tabs defaultValue="live" className="w-64">
          <TabsList>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="live">Live session</TabsContent>
          <TabsContent value="history">History</TabsContent>
        </Tabs>
        <Accordion type="single" collapsible className="w-72">
          <AccordionItem value="one">
            <AccordionTrigger>Details</AccordionTrigger>
            <AccordionContent>Operational detail content.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Collapsible defaultOpen className="w-72 space-y-2">
          <CollapsibleTrigger asChild>
            <Button intent="secondary" size="sm">
              Collapsible
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="rounded-card border border-border p-3 text-sm text-muted-foreground">
            Disclosure content for facilitator-only notes.
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Frame>
  ),
};

export const DataAndFeedback: Story = {
  name: "Data and feedback",
  render: () => (
    <Frame>
      <div className="grid max-w-2xl gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Alex</TableCell>
                  <TableCell>Ready</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Separator />
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>TA</AvatarFallback>
              </Avatar>
              <Badge intent="success">Ready</Badge>
            </div>
          </CardContent>
        </Card>
        <Alert intent="information" title="Session open" />
        <Progress value={42} />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-48" />
          <Spinner />
        </div>
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Inbox />
            </EmptyMedia>
            <EmptyTitle>No submissions yet</EmptyTitle>
            <EmptyDescription>Participants appear here once they join the lobby.</EmptyDescription>
          </EmptyHeader>
        </Empty>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Sessions</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Lobby</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Frame>
  ),
};
