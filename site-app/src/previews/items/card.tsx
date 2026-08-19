import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Round 2 complete</CardTitle>
        <CardDescription>Your table agreed on containment.</CardDescription>
      </CardHeader>
      <CardContent className="gs-body">Results are shown on the room display.</CardContent>
    </Card>
  ),
} satisfies Preview;
