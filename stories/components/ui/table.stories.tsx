import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StoryFrame } from "../../_utils/story-frame";

const participants = [
  { name: "Alex Morgan", status: "Ready", sector: "North" },
  { name: "Jordan Lee", status: "Voting", sector: "South" },
  { name: "Sam Patel", status: "Ready", sector: "East" },
  { name: "Riley Chen", status: "Offline", sector: "West" },
];

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <Table>
        <TableCaption>Participants in the current session.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sector</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.name}>
              <TableCell className="font-medium">{participant.name}</TableCell>
              <TableCell>{participant.status}</TableCell>
              <TableCell>{participant.sector}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StoryFrame>
  ),
};

export const Striped: Story = {
  render: () => (
    <StoryFrame>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sector</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant, index) => (
            <TableRow
              key={participant.name}
              className={index % 2 === 1 ? "bg-muted/50" : undefined}
            >
              <TableCell className="font-medium">{participant.name}</TableCell>
              <TableCell>{participant.status}</TableCell>
              <TableCell>{participant.sector}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StoryFrame>
  ),
};

export const WithoutCaption: Story = {
  render: () => (
    <StoryFrame>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stage</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Briefing</TableCell>
            <TableCell>5 min</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vote</TableCell>
            <TableCell>2 min</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Debrief</TableCell>
            <TableCell>8 min</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </StoryFrame>
  ),
};
