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
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
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
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ComponentWrapper } from "./component-wrapper";

/**
 * Single-page gallery of approved UI primitives (shadbook All Components pattern).
 * Theme/Context toolbars drive tokens via GameScienceDocsContainer + provider.
 */
export function AllComponentsGallery() {
  return (
    <div className="grid flex-1 gap-4">
      <ComponentWrapper name="accordion">
        <Accordion type="single" collapsible className="w-full max-w-md">
          <AccordionItem value="a">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. It comes with default styles that match the theme.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="c">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>Yes. Motion tokens respect prefers-reduced-motion.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentWrapper>

      <ComponentWrapper name="alert">
        <div className="grid w-full max-w-xl gap-3">
          <Alert intent="success" title="Session open" />
          <Alert intent="information" title="Participants joining" />
          <Alert intent="warning" title="Connection unstable" />
          <Alert intent="danger" title="Room closed" />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="alert-dialog">
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
      </ComponentWrapper>

      <ComponentWrapper name="aspect-ratio" className="max-w-sm">
        <AspectRatio ratio={16 / 9} className="w-full overflow-hidden rounded-card bg-muted">
          <div className="flex h-full items-center justify-center gs-label text-muted-foreground">
            16:9
          </div>
        </AspectRatio>
      </ComponentWrapper>

      <ComponentWrapper name="avatar">
        <Avatar>
          <AvatarFallback>TA</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>GS</AvatarFallback>
        </Avatar>
      </ComponentWrapper>

      <ComponentWrapper name="badge">
        <Badge intent="primary">Primary</Badge>
        <Badge intent="success">Ready</Badge>
        <Badge intent="warning">Reconnecting</Badge>
        <Badge intent="danger">Offline</Badge>
        <Badge intent="information" treatment="outlined">
          Information
        </Badge>
      </ComponentWrapper>

      <ComponentWrapper name="breadcrumb">
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
      </ComponentWrapper>

      <ComponentWrapper name="button">
        <ButtonGroup>
          <Button intent="primary">Primary</Button>
          <Button intent="secondary">Secondary</Button>
          <Button intent="outline">Outline</Button>
          <Button intent="ghost">Ghost</Button>
          <Button intent="danger">Danger</Button>
          <Button loading>Loading</Button>
        </ButtonGroup>
      </ComponentWrapper>

      <ComponentWrapper name="calendar">
        <Calendar mode="single" className="rounded-card border border-border" />
      </ComponentWrapper>

      <ComponentWrapper name="card">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Participants</CardTitle>
          </CardHeader>
          <CardContent className="gs-body text-muted-foreground">
            Card content for denser lists inside panels.
          </CardContent>
        </Card>
      </ComponentWrapper>

      <ComponentWrapper name="carousel" className="max-w-md">
        <Carousel className="w-full">
          <CarouselContent>
            {["Briefing", "Vote", "Reveal"].map((label) => (
              <CarouselItem key={label}>
                <div className="flex h-28 items-center justify-center rounded-card border border-border gs-title">
                  {label}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </ComponentWrapper>

      <ComponentWrapper name="checkbox">
        <div className="flex items-center gap-2">
          <Checkbox id="gallery-check" defaultChecked />
          <Label htmlFor="gallery-check">Ready to start</Label>
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="collapsible">
        <Collapsible defaultOpen className="w-72 space-y-2">
          <CollapsibleTrigger asChild>
            <Button intent="secondary" size="sm">
              Collapsible
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="rounded-card border border-border p-3 gs-body text-muted-foreground">
            Disclosure content for facilitator-only notes.
          </CollapsibleContent>
        </Collapsible>
      </ComponentWrapper>

      <ComponentWrapper name="context-menu">
        <ContextMenu>
          <ContextMenuTrigger className="flex h-24 w-48 items-center justify-center rounded-card border border-dashed border-border gs-body text-muted-foreground">
            Right click
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Refresh</ContextMenuItem>
            <ContextMenuItem>Inspect</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </ComponentWrapper>

      <ComponentWrapper name="dialog">
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
      </ComponentWrapper>

      <ComponentWrapper name="drawer">
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
      </ComponentWrapper>

      <ComponentWrapper name="dropdown-menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button intent="secondary">Dropdown</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentWrapper>

      <ComponentWrapper name="empty">
        <Empty className="w-full max-w-md border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Inbox />
            </EmptyMedia>
            <EmptyTitle>No submissions yet</EmptyTitle>
            <EmptyDescription>Participants appear here once they join the lobby.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </ComponentWrapper>

      <ComponentWrapper name="hover-card">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button intent="ghost">Hover card</Button>
          </HoverCardTrigger>
          <HoverCardContent className="gs-body">Quick identity peek for a participant.</HoverCardContent>
        </HoverCard>
      </ComponentWrapper>

      <ComponentWrapper name="input">
        <Input className="max-w-xs" placeholder="Display name" />
      </ComponentWrapper>

      <ComponentWrapper name="input-otp">
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSeparator />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </ComponentWrapper>

      <ComponentWrapper name="label">
        <div className="grid max-w-xs gap-1">
          <Label htmlFor="gallery-label">Callsign</Label>
          <Input id="gallery-label" placeholder="Enter callsign" />
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="menubar">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New session</MenubarItem>
              <MenubarItem>Export report</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </ComponentWrapper>

      <ComponentWrapper name="navigation-menu">
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
      </ComponentWrapper>

      <ComponentWrapper name="pagination">
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
      </ComponentWrapper>

      <ComponentWrapper name="panel">
        <Panel elevation="raised" className="w-full max-w-sm space-y-3">
          <PanelHeader>
            <PanelTitle>Lobby</PanelTitle>
            <PanelDescription>Operational game surface</PanelDescription>
          </PanelHeader>
          <Button className="w-full">Start session</Button>
        </Panel>
      </ComponentWrapper>

      <ComponentWrapper name="popover">
        <Popover>
          <PopoverTrigger asChild>
            <Button intent="secondary">Popover</Button>
          </PopoverTrigger>
          <PopoverContent>Quick reference for the current stage.</PopoverContent>
        </Popover>
      </ComponentWrapper>

      <ComponentWrapper name="progress" className="max-w-md">
        <Progress value={42} className="w-full" />
      </ComponentWrapper>

      <ComponentWrapper name="radio-group">
        <RadioGroup defaultValue="a" className="flex gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="a" id="radio-a" />
            <Label htmlFor="radio-a">Option A</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="b" id="radio-b" />
            <Label htmlFor="radio-b">Option B</Label>
          </div>
        </RadioGroup>
      </ComponentWrapper>

      <ComponentWrapper name="resizable" className="max-w-lg">
        <ResizablePanelGroup direction="horizontal" className="min-h-32 w-full rounded-card border">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center gs-label">One</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center gs-label">Two</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ComponentWrapper>

      <ComponentWrapper name="scroll-area" className="max-w-sm">
        <ScrollArea className="h-32 w-full rounded-card border border-border p-3">
          <div className="space-y-2 gs-body text-muted-foreground">
            {Array.from({ length: 8 }, (_, i) => (
              <p key={i}>Scrollable row {i + 1}</p>
            ))}
          </div>
        </ScrollArea>
      </ComponentWrapper>

      <ComponentWrapper name="select">
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="north">North</SelectItem>
            <SelectItem value="south">South</SelectItem>
          </SelectContent>
        </Select>
      </ComponentWrapper>

      <ComponentWrapper name="separator" className="max-w-sm">
        <div className="w-full space-y-3">
          <p className="gs-body">Above</p>
          <Separator />
          <p className="gs-body">Below</p>
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="sheet">
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
      </ComponentWrapper>

      <ComponentWrapper name="skeleton">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </ComponentWrapper>

      <ComponentWrapper name="slider" className="max-w-sm">
        <Slider defaultValue={[42]} max={100} step={1} className="w-full" />
      </ComponentWrapper>

      <ComponentWrapper name="spinner">
        <Spinner />
        <Spinner className="size-6" />
      </ComponentWrapper>

      <ComponentWrapper name="switch">
        <div className="flex items-center gap-2">
          <Switch id="gallery-switch" defaultChecked />
          <Label htmlFor="gallery-switch">Notify</Label>
        </div>
      </ComponentWrapper>

      <ComponentWrapper name="table" className="max-w-lg">
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
            <TableRow>
              <TableCell>Sam</TableCell>
              <TableCell>Joining</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ComponentWrapper>

      <ComponentWrapper name="tabs">
        <Tabs defaultValue="live" className="w-64">
          <TabsList>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="live">Live session</TabsContent>
          <TabsContent value="history">History</TabsContent>
        </Tabs>
      </ComponentWrapper>

      <ComponentWrapper name="textarea">
        <Textarea className="max-w-md" placeholder="Facilitator notes" />
      </ComponentWrapper>

      <ComponentWrapper name="toggle">
        <Toggle aria-label="Bold">B</Toggle>
        <Toggle aria-label="Italic" pressed>
          I
        </Toggle>
      </ComponentWrapper>

      <ComponentWrapper name="toggle-group">
        <ToggleGroup type="single" defaultValue="a">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </ComponentWrapper>

      <ComponentWrapper name="tooltip">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button intent="secondary">Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>Connection is stable</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ComponentWrapper>
    </div>
  );
}
