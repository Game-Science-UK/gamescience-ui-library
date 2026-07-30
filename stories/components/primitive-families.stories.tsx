import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
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

function Frame({
  theme,
  context,
  children,
}: {
  theme: "gamescience" | "citadel";
  context: "participant" | "facilitator";
  children: React.ReactNode;
}) {
  return (
    <GameScienceProvider theme={theme} context={context}>
      <div className="min-h-[28rem] bg-background p-6 text-foreground">{children}</div>
    </GameScienceProvider>
  );
}

const meta = {
  title: "Components/UI/Primitive families",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const FormsAcrossThemes: Story = {
  name: "Forms across themes",
  render: () => (
    <div className="grid gap-6 lg:grid-cols-2">
      {(["gamescience", "citadel"] as const).map((theme) => (
        <Frame key={theme} theme={theme} context="participant">
          <h2 className="mb-4 font-display text-xl">{theme}</h2>
          <div className="grid gap-3">
            <div className="grid gap-1">
              <Label htmlFor={`${theme}-name`}>Name</Label>
              <Input id={`${theme}-name`} placeholder="Participant name" />
            </div>
            <Textarea placeholder="Notes" />
            <div className="flex items-center gap-2">
              <Checkbox id={`${theme}-ready`} />
              <Label htmlFor={`${theme}-ready`}>Ready</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id={`${theme}-notify`} />
              <Label htmlFor={`${theme}-notify`}>Notify</Label>
            </div>
            <RadioGroup defaultValue="a" className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="a" id={`${theme}-a`} />
                <Label htmlFor={`${theme}-a`}>Option A</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="b" id={`${theme}-b`} />
                <Label htmlFor={`${theme}-b`}>Option B</Label>
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
            <Button>Submit</Button>
          </div>
        </Frame>
      ))}
    </div>
  ),
};

export const OverlaysAcrossThemes: Story = {
  name: "Overlays across themes",
  render: () => (
    <div className="grid gap-6 lg:grid-cols-2">
      {(["gamescience", "citadel"] as const).map((theme) => (
        <Frame key={theme} theme={theme} context="facilitator">
          <h2 className="mb-4 font-display text-xl">{theme}</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm start</DialogTitle>
                <DialogDescription>Portal content inherits root theme tokens.</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Frame>
      ))}
    </div>
  ),
};

export const MenusAndDisclosure: Story = {
  name: "Menus and disclosure",
  render: () => (
    <Frame theme="gamescience" context="facilitator">
      <div className="flex flex-wrap gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button intent="secondary">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Tabs defaultValue="live">
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
      </div>
    </Frame>
  ),
};

export const DataAndFeedback: Story = {
  name: "Data display and feedback",
  render: () => (
    <Frame theme="citadel" context="facilitator">
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        <Alert intent="information" title="Session open" />
        <Progress value={42} />
        <Skeleton className="h-8 w-48" />
      </div>
    </Frame>
  ),
};
