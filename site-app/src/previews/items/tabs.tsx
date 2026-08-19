import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <Tabs defaultValue="brief">
      <TabsList>
        <TabsTrigger value="brief">Brief</TabsTrigger>
        <TabsTrigger value="evidence">Evidence</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="brief" className="gs-body pt-4">
        Your table has twelve minutes to agree a recommendation.
      </TabsContent>
      <TabsContent value="evidence" className="gs-body pt-4">
        Three sources are available to the group.
      </TabsContent>
      <TabsContent value="notes" className="gs-body pt-4">
        Notes are private to you.
      </TabsContent>
    </Tabs>
  ),
} satisfies Preview;
