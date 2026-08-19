import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import type { Preview } from "@site/previews";

const ROWS = [
  { team: "Table 1", answer: "Contain", time: "4:12" },
  { team: "Table 2", answer: "Escalate", time: "5:38" },
  { team: "Table 3", answer: "Contain", time: "3:04" },
];

export default {
  context: "facilitator",
  viewport: "full",
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Team</TableHead>
          <TableHead>Answer</TableHead>
          <TableHead>Committed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ROWS.map((row) => (
          <TableRow key={row.team}>
            <TableCell>{row.team}</TableCell>
            <TableCell>{row.answer}</TableCell>
            <TableCell>{row.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
} satisfies Preview;
